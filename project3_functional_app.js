/* ============================================================
   PROJECT 3 ΓÇô ORDERFLOW | Main Logic (Roles, Split, UI)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initUserSelector();
  renderApp();

  document.getElementById('userRoleSelector').addEventListener('change', (e) => {
    currentUser = getUser(e.target.value);
    renderApp();
    showToast(`Switched to ${currentUser.name} (${currentUser.role})`, 'info');
  });

  // Admin Actions
  document.getElementById('triggerCutoffBtn').addEventListener('click', () => {
    if (session.status !== 'open') return;
    const changed = triggerCutoff();
    renderApp();
    showToast('Session locked. Cutoff applied.', 'success');
    if (changed) {
      setTimeout(() => showToast('Unpaid orders were auto-cancelled (BR-04)', 'info'), 1500);
    }
  });

  document.getElementById('placeOrderBtn').addEventListener('click', () => {
    const splitData = calculateSplit();
    if (!splitData.is100PercentPaid) {
      showToast('Cannot place order: 100% of funds not yet collected (BR-03)', 'error');
      return;
    }
    if (session.status === 'open') {
      showToast('Please lock the session first', 'error');
      return;
    }
    session.status = 'ordered';
    persist();
    renderApp();
    showToast('Order successfully placed with Vendor!', 'success');
  });

  // QR Modal
  document.getElementById('closeQrBtn').addEventListener('click', () => {
    document.getElementById('qrModal').classList.remove('active');
  });
  document.getElementById('payQrBtn').addEventListener('click', () => {
    const splitData = calculateSplit();
    const mySplit = splitData.userSplits[currentUser.id];
    if (!mySplit || mySplit.status === 'paid' || mySplit.total === 0) return;
    
    document.getElementById('qrAmountDisplay').textContent = formatVND(mySplit.total - mySplit.walletDeducted);
    if (mySplit.walletDeducted > 0) {
      document.getElementById('qrWalletNote').textContent = `* ${formatVND(mySplit.walletDeducted)} deducted from Internal Wallet.`;
    } else {
      document.getElementById('qrWalletNote').textContent = '';
    }
    document.getElementById('qrModal').classList.add('active');
  });
  document.getElementById('simulatePaidBtn').addEventListener('click', () => {
    // Mark all orders of current user as paid
    session.orders.filter(o => o.userId === currentUser.id).forEach(o => o.status = 'paid');
    
    // Deduct wallet if applicable
    const splitData = calculateSplit(); // recalculate to get wallet deduction
    const mySplit = splitData.userSplits[currentUser.id];
    if (mySplit && mySplit.walletDeducted > 0) {
      currentUser.walletBalance -= mySplit.walletDeducted;
    }
    
    persist();
    document.getElementById('qrModal').classList.remove('active');
    renderApp();
    showToast('Payment successful!', 'success');
  });
});

function initUserSelector() {
  const select = document.getElementById('userRoleSelector');
  select.innerHTML = users.map(u => `<option value="${u.id}">${u.name} (${u.role})</option>`).join('');
  select.value = currentUser.id;
}

function renderApp() {
  // Update header
  document.getElementById('currentUserAvatar').textContent = currentUser.name.substring(0, 2).toUpperCase();
  document.getElementById('walletBalanceInfo').textContent = `Wallet: ${formatVND(currentUser.walletBalance)}`;

  // Session info
  document.getElementById('cutoffTimeDisplay').textContent = session.cutoffTime;
  const badge = document.getElementById('sessionStatusBadge');
  badge.textContent = session.status.toUpperCase();
  badge.className = `badge badge-${session.status}`;

  // Role visibility
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = currentUser.role === 'admin' ? '' : 'none';
  });

  // Render Menu
  const menuList = document.getElementById('menuList');
  menuList.innerHTML = MOCK_MENU.map(m => `
    <div class="menu-item">
      <div class="menu-info">
        <div class="menu-name">${m.name}</div>
        <div class="menu-price">${formatVND(m.price)}</div>
      </div>
      <button class="btn-small" onclick="addToOrder('${m.id}')" ${session.status !== 'open' ? 'disabled' : ''}>Add</button>
    </div>
  `).join('');

  renderOrdersAndSplit();
}

function addToOrder(menuId) {
  if (session.status !== 'open') return;
  session.orders.push({
    id: uid(), userId: currentUser.id, itemId: menuId, qty: 1, note: '', status: 'unpaid'
  });
  persist();
  renderApp();
  showToast('Item added', 'success');
}

function renderOrdersAndSplit() {
  const tbody = document.getElementById('ordersTableBody');
  tbody.innerHTML = session.orders.map(o => {
    const menu = MOCK_MENU.find(m => m.id === o.itemId);
    const user = getUser(o.userId);
    if (!menu) return '';
    return `
      <tr class="${o.status === 'cancelled' ? 'cancelled-row' : ''}">
        <td>${user.name}</td>
        <td>${menu.name}</td>
        <td>${o.qty}</td>
        <td>${o.note || '-'}</td>
        <td><span class="badge badge-${o.status}">${o.status}</span></td>
        <td class="admin-only text-right">
          ${(o.status === 'paid' && session.status === 'ordered') ? `<button class="btn-small refund-btn" onclick="triggerRefund('${o.id}')">Refund (OOS)</button>` : ''}
          ${(o.status === 'unpaid' && session.status === 'open') ? `<button class="btn-small" style="color:red;border-color:red;" onclick="removeOrder('${o.id}')">Remove</button>` : ''}
        </td>
      </tr>
    `;
  }).join('');

  const splitData = calculateSplit();
  
  // Summary
  document.getElementById('summaryItemTotal').textContent = formatVND(splitData.totalOrder);
  document.getElementById('summaryShipping').textContent = formatVND(session.shippingFee);
  document.getElementById('summaryDiscount').textContent = '-' + formatVND(session.discount);
  document.getElementById('summaryFinalTotal').textContent = formatVND(splitData.finalTotal);

  // Personal
  const mySplit = splitData.userSplits[currentUser.id] || { itemTotal: 0, sharedFee: 0, total: 0, status: 'unpaid' };
  document.getElementById('personalItemCost').textContent = formatVND(mySplit.itemTotal);
  document.getElementById('personalSharedFee').textContent = formatVND(mySplit.sharedFee);
  document.getElementById('personalTotal').textContent = formatVND(mySplit.total);

  const payBtn = document.getElementById('payQrBtn');
  if (mySplit.status === 'paid' || mySplit.total === 0) {
    payBtn.disabled = true;
    payBtn.innerHTML = '<i class="ph ph-check-circle"></i> Paid';
    payBtn.style.background = 'var(--green)';
    payBtn.style.color = '#fff';
  } else {
    payBtn.disabled = false;
    payBtn.innerHTML = '<i class="ph ph-qr-code"></i> Pay via QR (BR-03)';
    payBtn.style.background = 'var(--teal)';
  }

  // Admin Verification List
  const verifyList = document.getElementById('paymentVerificationList');
  verifyList.innerHTML = Object.keys(splitData.userSplits).map(uid => {
    const u = getUser(uid);
    const spl = splitData.userSplits[uid];
    return `
      <div class="verify-item">
        <div class="verify-user">${u.name} <span class="verify-amt">${formatVND(spl.total)}</span></div>
        <div class="verify-status ${spl.status}">${spl.status === 'paid' ? '<i class="ph ph-check-circle"></i> Paid' : '<i class="ph ph-clock"></i> Unpaid'}</div>
      </div>
    `;
  }).join('');
}

function removeOrder(id) {
  session.orders = session.orders.filter(o => o.id !== id);
  persist();
  renderApp();
}

function triggerRefund(orderId) {
  if (refundToWallet(orderId)) {
    renderApp();
    showToast('Refunded to user Internal Wallet (BR-Out of Stock)', 'success');
  }
}

function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

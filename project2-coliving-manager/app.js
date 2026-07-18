/* ============================================================
   PROJECT 2 – PROPERTY MANAGER | Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- KPI Calculation & Rendering ---
  let totalRevenue = 0;
  let totalOverdue = 0;
  let totalPaid = 0;
  let overdueCount = 0;
  let paidCount = 0;
  let openCount = 0;

  invoices.forEach(inv => {
    totalRevenue += inv.amount;
    
    if (inv.status === 'Overdue') {
      totalOverdue += inv.amount;
      overdueCount++;
    } else if (inv.status === 'Paid') {
      totalPaid += inv.amount;
      paidCount++;
    } else {
      openCount++;
    }
  });

  document.getElementById('kpi-revenue-title').textContent = `$${totalRevenue.toFixed(2)}`;
  
  const overdueTitle = document.getElementById('kpi-overdue-title');
  overdueTitle.textContent = `$${totalOverdue.toFixed(2)}`;
  overdueTitle.nextElementSibling.nextElementSibling.textContent = overdueCount > 0 ? `${overdueCount} invoices` : 'No invoices';

  const paidTitle = document.getElementById('kpi-paid-title');
  paidTitle.textContent = `$${totalPaid.toFixed(2)}`;
  paidTitle.nextElementSibling.nextElementSibling.textContent = paidCount > 0 ? `${paidCount} invoices` : 'No invoices';

  // --- Table Rendering ---
  const tbody = document.getElementById('invoiceTableBody');
  
  function getStatusBadge(status) {
    const s = status.toLowerCase();
    return `<span class="status-badge ${s}">${status}</span>`;
  }

  function renderTable() {
    tbody.innerHTML = '';
    
    invoices.forEach(inv => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="checkbox-col" onclick="event.stopPropagation()"><input type="checkbox"></td>
        <td>${inv.id}</td>
        <td>${getStatusBadge(inv.status)}</td>
        <td>${inv.dueDate}</td>
        <td>${inv.customer}</td>
        <td>$${inv.amount.toFixed(2)}</td>
      `;
      
      tr.addEventListener('click', () => {
        openDrawer(inv);
      });
      
      tbody.appendChild(tr);
    });
  }

  renderTable();

  // --- Drawer Logic ---
  const drawer = document.getElementById('invoiceDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerContent = document.getElementById('drawerContent');

  function openDrawer(invoice) {
    // Generate Invoice Breakdown HTML
    
    let itemsHtml = '';
    invoice.breakdown.forEach(item => {
      itemsHtml += `
        <tr>
          <td>${item.description}</td>
          <td class="num">${item.quantity}</td>
          <td class="num">$${item.price.toFixed(2)}</td>
          <td class="num">$${item.total.toFixed(2)}</td>
        </tr>
      `;
    });

    const html = `
      <div class="invoice-paper">
        
        <div class="invoice-top">
           <div class="invoice-title">
             <h1>Invoice</h1>
             <div class="invoice-meta">
               <div>Invoice No: <span>${invoice.id}</span></div>
               <div>Issue Date: <span>${invoice.issueDate}</span></div>
               <div>Due Date: <span>${invoice.dueDate}</span></div>
             </div>
           </div>
           <div class="invoice-logo">
              SLM
           </div>
        </div>

        <div class="invoice-parties">
           <div class="party-group">
              <div class="party-label">From</div>
              <div class="party-value">SLMobbin</div>
           </div>
           <div class="party-group">
              <div class="party-label">To</div>
              <div class="party-value">
${invoice.customer}
${invoice.address}
${invoice.customerEmail}
${invoice.customerPhone}
              </div>
           </div>
        </div>

        <table class="invoice-items">
           <thead>
             <tr>
               <th>Description</th>
               <th>Quantity</th>
               <th>Price</th>
               <th>Total</th>
             </tr>
           </thead>
           <tbody>
             ${itemsHtml}
           </tbody>
        </table>

        <div class="invoice-summary">
           <div class="summary-row">
              <span>Subtotal</span>
              <span>$${invoice.subtotal.toFixed(2)}</span>
           </div>
           <div class="summary-row">
              <span>VAT (0%)</span>
              <span>$${invoice.vat.toFixed(2)}</span>
           </div>
           <div class="summary-row total">
              <span>Total</span>
              <span>$${invoice.total.toFixed(2)}</span>
           </div>
        </div>

      </div>
    `;

    drawerContent.innerHTML = html;
    
    // Show drawer
    drawer.classList.add('active');
    drawerOverlay.classList.add('active');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
  }

  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  // --- Mobile Nav Logic ---
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if(mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      sidebar.classList.add('active');
      if (sidebarOverlay) sidebarOverlay.classList.add('active');
    });
  }
  if(sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  }

});

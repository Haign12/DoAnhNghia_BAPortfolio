import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update renderTransactions
new_render_tx = """
    const sortedTx = [...filteredTx].sort((a,b) => new Date(b.date) - new Date(a.date));
    tbody.innerHTML = sortedTx.map(t => {
      const sub = state.subscriptions.find(s => s.id === t.subId);
      return `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">${t.date}</td>
        <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">${sub ? sub.name : 'Unknown'}</td>
        <td class="px-6 py-4 whitespace-nowrap"><span class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">${t.category}</span></td>
        <td class="px-6 py-4 whitespace-nowrap font-bold text-gray-900 dark:text-white">${formatMoney(t.amount)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="editTx('${t.id}')"><i class="ph ph-pencil-simple text-lg"></i></button>
          <button class="text-red-600 hover:text-red-900" onclick="deleteTx('${t.id}')"><i class="ph ph-trash text-lg"></i></button>
        </td>
      </tr>
      `;
    }).join('');
"""
js = re.sub(r'const sortedTx.*?join\(\'\'\);', new_render_tx.strip(), js, flags=re.DOTALL)

# Update renderSubscriptions
new_render_sub = """
    tbody.innerHTML = filteredSubs.map(s => {
      let badge = '<span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">ACTIVE</span>';
      if(s.status === 'Ghost') badge = '<span class="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">GHOST</span>';
      if(s.status === 'Cancelled') badge = '<span class="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">CANCELLED</span>';
      
      let actionBtn = s.status === 'Cancelled' ? '-' : `<button class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onclick="openGhostDrilldown('${s.id}')">Manage</button>`;
      if (s.status === 'Ghost') {
        actionBtn = `<button class="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" onclick="openGhostDrilldown('${s.id}')">Manage Ghost</button>`;
      }
      
      let nextBillingStr = s.lastTxDate;
      if (s.status !== 'Cancelled') {
         if (s.status === 'Ghost') {
            nextBillingStr = '<span class="text-red-600 font-semibold flex items-center gap-1"><i class="ph ph-warning-circle"></i> Action Required</span>';
         } else {
            let baseDate = new Date(s.lastTxDate || s.added);
            if (s.cycle === 'Monthly') baseDate.setMonth(baseDate.getMonth() + 1);
            if (s.cycle === 'Yearly') baseDate.setFullYear(baseDate.getFullYear() + 1);
            if (s.cycle === 'Weekly') baseDate.setDate(baseDate.getDate() + 7);
            
            const diffDays = Math.ceil((baseDate - new Date()) / (1000 * 60 * 60 * 24));
            if (diffDays > 0) {
               nextBillingStr = `In ${diffDays} days`;
            } else {
               nextBillingStr = 'Overdue / Pending';
            }
         }
      } else {
         nextBillingStr = '-';
      }
      
      return `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 ${s.status === 'Cancelled' ? 'opacity-50' : ''}">
        <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center gap-3"><span class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">${s.icon}</span> ${s.name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${nextBillingStr}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${s.cycle}</td>
        <td class="px-6 py-4 whitespace-nowrap font-bold text-gray-900 dark:text-white">${formatMoney(s.cost)}</td>
        <td class="px-6 py-4 whitespace-nowrap">${badge}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">${actionBtn}</td>
      </tr>
      `;
    }).join('');
"""

js = re.sub(r'tbody\.innerHTML = filteredSubs.*?join\(\'\'\);', new_render_sub.strip(), js, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

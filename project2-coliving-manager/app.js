
// Render Chores
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');

chores.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
        <div class="task-title">${task.title}</div>
        <div class="assignee">${task.assignee}</div>
    `;
    if (task.status === 'todo') todoList.appendChild(card);
    else doneList.appendChild(card);
});

// Render Ledger Balances
const balanceCards = document.getElementById('balanceCards');
roommates.forEach(person => {
    const div = document.createElement('div');
    div.className = 'b-card';
    const amtClass = person.balance > 0 ? 'positive' : (person.balance < 0 ? 'negative' : '');
    const prefix = person.balance > 0 ? '+' : '';
    div.innerHTML = `
        <div class="name">${person.name}</div>
        <div class="amt ${amtClass}">${prefix}$${Math.abs(person.balance).toFixed(2)}</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">
            ${person.balance > 0 ? 'Gets back' : 'Owes'}
        </div>
    `;
    balanceCards.appendChild(div);
});

// Render Expenses
const expenseTable = document.getElementById('expenseTable');
expenses.forEach(exp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td style="color: var(--text-secondary);">${exp.date}</td>
        <td><strong>${exp.item}</strong></td>
        <td>${exp.paidBy}</td>
        <td>$${exp.amount.toFixed(2)}</td>
        <td><span class="assignee">${exp.split}</span></td>
    `;
    expenseTable.appendChild(tr);
});

// Delete obsolete files if they exist (req-data.js)
// Not required in browser JS, just logic rendering.

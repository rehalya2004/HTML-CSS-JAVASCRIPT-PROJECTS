const transactionForm = document.getElementById('form');
const transactionDescription = document.getElementById('text');
const transactionAmount = document.getElementById('amount');
const transactionsList = document.getElementById('list');
const notification = document.getElementById('notification');
const balanceDisplay = document.getElementById('balance');

let transactions = [];

function addTransaction(event) {
    event.preventDefault();

    if (transactionDescription.value.trim() === '' || isNaN(parseFloat(transactionAmount.value))) {
        notification.style.opacity = '1';
        setTimeout(() => notification.style.opacity = '0', 3000);
        return;
    }

    const amount = parseFloat(transactionAmount.value);
    const transaction = {
        id: generateID(),
        description: transactionDescription.value,
        amount: amount
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateBalance();
    updateTotalIncomeAndExpenditure();
    transactionDescription.value = '';
    transactionAmount.value = '';
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
    const listItem = document.createElement('div');
    listItem.classList.add('transaction');
    const symbol = transaction.amount >= 0 ? '+' : '-';
    const color = transaction.amount >= 0 ? '#4caf50' : '#f44336';
    listItem.innerHTML = `
        <p>${transaction.description}</p>
        &nbsp;&nbsp;&nbsp;
        <p style="color: ${color};">${symbol}$${Math.abs(transaction.amount).toFixed(2)}</p>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;
    transactionsList.appendChild(listItem);
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    transactionsList.innerHTML = '';
    transactions.forEach(transaction => addTransactionDOM(transaction));
    updateBalance();
    updateTotalIncomeAndExpenditure();
}

function deleteHistory() {
    transactions = [];
    transactionsList.innerHTML = '';
    updateBalance();
    updateTotalIncomeAndExpenditure();
}

function updateBalance() {
    let total = 0;

    transactions.forEach(transaction => {
        total += transaction.amount;
    });

    balanceDisplay.textContent = `$${total.toFixed(2)}`;
}

function updateTotalIncomeAndExpenditure() {
    let totalIncome = 0;
    let totalExpenditure = 0;

    transactions.forEach(transaction => {
        if (transaction.amount >= 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpenditure += Math.abs(transaction.amount);
        }
    });

    document.getElementById('total-income').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('total-expenditure').textContent = `$${totalExpenditure.toFixed(2)}`;
}

transactionForm.addEventListener('submit', addTransaction);

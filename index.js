let expenseForm = document.getElementById('expenseForm');
let expenseList = document.getElementById('expenseList');
let totalExpense = document.getElementById('totalExpense');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to display expenses
function displayExpenses() {
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        let div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
            <span>Date: ${expense.date}</span>
            <span>Amount: $${expense.amount}</span>
            <span>Description: ${expense.description}</span>
            <button onclick="deleteExpense(${index})">Delete</button>
            <button onclick="editExpense(${index})">Edit</button>
        `;
        expenseList.appendChild(div);
        total += parseFloat(expense.amount);
    });

    totalExpense.textContent = `Total Expenses: $${total.toFixed(2)}`;

    // Update localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to add expense
function addExpense(event) {
    event.preventDefault();
    let date = document.getElementById('dateInput').value;
    let amount = document.getElementById('amountInput').value;
    let description = document.getElementById('descriptionInput').value;

    expenses.push({ date, amount, description });
    displayExpenses();
}

// Function to delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
}

// Function to edit expense
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('dateInput').value = expense.date;
    document.getElementById('amountInput').value = expense.amount;
    document.getElementById('descriptionInput').value = expense.description;

    // Remove the expense from the list
    expenses.splice(index, 1);
    displayExpenses();
}

// Load expenses from localStorage on page load
window.addEventListener('load', () => {
    displayExpenses();
});

// Event listener for form submission
expenseForm.addEventListener('submit', addExpense);

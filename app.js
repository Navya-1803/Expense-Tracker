let expenses = JSON.parse(localStorage.getItem("savedExpenses")) || [];

const totalDisplay = document.getElementById("total");
const expenseList = document.getElementById("expense-list");

const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");

const updateUI = () => {

    expenseList.innerHTML = "";

    expenses.forEach((expense) => {
        expenseList.innerHTML += `
        <div class="expense-item">
            <span>${expense.name}</span>
            <span>$${expense.amount}</span>
            <button onclick="deleteExpense(${expense.id})" sytle="background: red; padding:5px;">X</button>
        </div>
        `;
    });

    let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    totalDisplay.textContent = total.toFixed(2);
};

expenseForm.addEventListener("submit", (event)=>{
    
    event.preventDefault();

    let expenseName = nameInput.value;
    let expenseAmount = parseFloat(amountInput.value);

    let newExpense = {
        id: Date.now(),
        name: expenseName,
        amount: expenseAmount
    }

    expenses.push(newExpense);

    localStorage.setItem("savedExpenses", JSON.stringify(expenses));

    console.log(expenses);

    updateUI();

    expenseForm.reset();
})

function deleteExpense(id){
    expenses = expenses.filter(expense => expense.id !== id);

    localStorage.setItem("savedExpenses", JSON.stringify(expenses));

    updateUI();
}
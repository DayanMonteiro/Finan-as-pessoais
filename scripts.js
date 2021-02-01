
const Modal = {
    open() {
        // Abrir o modal
        // Adicionar a classe active ao modal
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close() {
        // Fechar o modal
        // Remover a class active do modal
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50001,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 50000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20012,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    },
]


/*Somar as entradas e somar as saídas
remover das entradas os valores das saídas e obter o total */

const Transaction = {
    incomes() {
        return "Cheguei"
    },
    expenses() {
        return "Aqui"
    },
    total() {
        return "Discover"
    }
}

/* Substituit os dados do HTML com os dados do  JS
pegar as transações do objeto aqui no
javascript e colocar no HTML */

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionContainer.appendChild(tr)

        console.log(tr.innerHTML)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
     
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
               <img src="./assets/minus.svg" alt="Remover transação">
              </td>
        `
        return html
    },

    updateBalance() {
        document
          .getElementById('incomeDisplay')
            .innerHTML = Transaction.incomes()
        document
            .getElementById('expenseDisplay')
            .innerHTML = Transaction.expenses()
            .getElementById('totalDisplay')
            .innerHTML = "total"
    }
}

const Utils = {

    // formatando o numero para real
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency:"BRL"
        })
        return signal + value 
    }
}

transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance()

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
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    },
]


/*Somar as entradas e somar as saídas
remover das entradas os valores das saídas e obter o total */

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        let income = 0;
        // pegar todas as transações
        // para cada transação
        Transaction.all.forEach(transaction => {
             // se ela for maior que zero
            if(transaction.amount > 0) {
            // somar a uma variável e retornar a variável
            income += transaction.amount;

            }
        })
        return income;
    },
    expenses() {
        let expense = 0;
        // pegar todas as transações
        // para cada transação
        Transaction.all.forEach(transaction => {
             // se ela for menor que zero
            if(transaction.amount < 0) {
            // somar a uma variável e retornar a variável
            expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        // entrada menos saída
        return Transaction.incomes() + Transaction.expenses();
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
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionContainer.innerHTML =  ""
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

const App = {
    init() {
        
    Transaction.all.forEach(transaction => {
        DOM.addTransaction(transaction)
    })

    DOM.updateBalance()

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()


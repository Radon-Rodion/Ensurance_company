var assert = require('assert');
const fetch = require('node-fetch')

describe('transactionsController tests', function () {
    describe('Get tests', function () {

        it('should GET all transactions', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/transactions');
            assert.equal(response.status, 200)
            const transactions = await response.json()
            console.log(transactions)
            assert.equal(transactions.length, 4)
        })

        it('should GET transaction with valid id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/transactions/6');
            assert.equal(response.status, 200)
            const transaction = await response.json()
            console.log(transaction)
            assert.equal(transaction.transaction_id, 6)
        })

        it('should not GET transaction with non-existing id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/transactions/12312313');
            assert.equal(response.status, 404)
        })


        it('should GET transaction with valid id, with data from roles', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/transactions/6');
            assert.equal(response.status, 200)
            const transaction = await response.json()
            console.log(Object.keys(transaction).length)
            assert.equal(Object.keys(transaction).length, 5)
        })


    })
    describe('Post tests', function () {
        let newTransaction
        before(function () {
            newTransaction = {
                transaction_sum: 200,
                transaction_date: new Date(),
                sender_bank_number: "1111-1111-1111-1111",
                reciever_bank_number: "2222-2222-2222-2222",
            }
        })

        it('should POST valid transaction', async function () {
            const response = await fetch('http://localhost:5000/api/transactions', {
                method: 'post',
                body: JSON.stringify(newTransaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

            const transaction = await response.json()
            console.log(transaction)
            assert.equal(transaction.transaction_sum, newTransaction.transaction_sum)
            //assert.equal(transaction.transaction_date, newTransaction.transaction_date)
            assert.equal(transaction.sender_bank_number, newTransaction.sender_bank_number)
            assert.equal(transaction.reciever_bank_number, newTransaction.reciever_bank_number)
        })


        it('should not POST transaction with invalid sum', async function () {
            newTransaction.transaction_sum = "qwwrtyu"
            const response = await fetch('http://localhost:5000/api/transactions', {
                method: 'post',
                body: JSON.stringify(newTransaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST transaction with invalid sender bank number', async function () {
            newTransaction.transaction_sum = 200;
            newTransaction.sender_bank_number = "4444"
            const response = await fetch('http://localhost:5000/api/transactions', {
                method: 'post',
                body: JSON.stringify(newTransaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST transaction with invalid receiver bank number', async function () {
            newTransaction.sender_bank_number = "4444-4444-4444-4444"
            newTransaction.reciever_bank_number = "1234"
            const response = await fetch('http://localhost:5000/api/transactions', {
                method: 'post',
                body: JSON.stringify(newTransaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })


    })
    describe('Put tests', function () {
        let updatedTransaction
        let transactionId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/transactions');
            const transaction = await tempResponse.json();
            transactionId = transaction[transaction.length-1].transaction_id;
            console.log(transactionId)
            updatedTransaction = {
                transaction_id: transaction[transaction.length-1].transaction_id,
                transaction_sum: 200,
                transaction_date: new Date(),
                sender_bank_number: "1111-1111-1111-1111",
                reciever_bank_number: "2222-2222-2222-2222",
            }
        })

        it('should UPDATE a transaction with valid id', async function () {
            const response = await fetch(`http://localhost:5000/api/transactions`, {
                method: 'put',
                body: JSON.stringify(updatedTransaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should UPDATE a transaction with invalid id', async function () {
            updatedTransaction.transaction_id = 10000000;
            console.log(updatedTransaction)
            const response = await fetch(`http://localhost:5000/api/transactions`, {
                method: 'put',
                body: JSON.stringify(updatedTransaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should not UPDATE a transaction with invalid sender bank number', async function () {
            updatedTransaction.transaction_id = transactionId;
            updatedTransaction.sender_bank_number = "qweqweqqweqw"
            console.log(updatedTransaction)
            const response = await fetch(`http://localhost:5000/api/transactions`, {
                method: 'put',
                body: JSON.stringify(updatedTransaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)

        })

    })
    describe('Delete tests', function () {
        let updatedTransaction
        let transactionId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/transactions');
            const transaction = await tempResponse.json();
            transactionId = transaction[transaction.length-1].transaction_id;
            console.log(transactionId)
            updatedTransaction = {
                transaction_id: transaction[transaction.length-1].transaction_id,
                transaction_sum: 200,
                transaction_date: new Date(),
                sender_bank_number: "1111-1111-1111-1111",
                reciever_bank_number: "2222-2222-2222-2222",
            }
        })

        it('should DELETE a transaction with valid id', async function () {

            const response1 = await fetch('http://localhost:5000/api/transactions');
            const transactions1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/transactions` + '/' + String(transactionId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/transactions');
            const transactions2 = await response2.json()

            assert.equal(response.status, 204)
            assert.notEqual(transactions1.length,transactions2.length)
        })

        it('should DELETE a transaction with invalid id', async function () {
            transactionId = 100000000;

            const response1 = await fetch('http://localhost:5000/api/transactions');
            const transactions1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/transactions` + '/' + String(transactionId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/transactions');
            const transactions2 = await response2.json()

            assert.equal(response.status, 204)
            assert.equal(transactions1.length,transactions2.length)
        })


    })
});

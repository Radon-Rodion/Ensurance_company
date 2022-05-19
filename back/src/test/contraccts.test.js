var assert = require('assert');
const fetch = require('node-fetch')

describe('contractsController tests', function () {
    describe('Get tests', function () {

        it('should GET all contracts', async function () {
            const response = await fetch('http://localhost:5000/api/contracts');
            assert.equal(response.status, 200)
            const contracts = await response.json()
            console.log(contracts)
            assert.equal(contracts.length, 13)
        })

        it('should GET contract with valid id', async function () {
            const response = await fetch('http://localhost:5000/api/contracts/8');
            assert.equal(response.status, 200)
            const contract = await response.json()
            console.log(contract)
            assert.equal(contract.contract_id, 8)
        })

        it('should not GET contract with non-existing id', async function () {
            const response = await fetch('http://localhost:5000/api/contracts/100012');
            assert.equal(response.status, 404)
        })


        it('should GET contract with valid id, with data from roles', async function () {
            const response = await fetch('http://localhost:5000/api/contracts/8');
            assert.equal(response.status, 200)
            const contract = await response.json()
            console.log(Object.keys(contract).length)
            assert.equal(Object.keys(contract).length, 11)
        })


    })
    describe('Post tests', function () {
        let newContract
        before(function () {
            let date = new Date();
            newContract = {
                real_price: 20,
                status: "new",
                request_date: date,
                userUserId: 1,
                catalogueId: 2,
            }
        })

        it('should POST valid contract', async function () {
            const response = await fetch('http://localhost:5000/api/contracts', {
                method: 'post',
                body: JSON.stringify(newContract),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

            const contract = await response.json()
            console.log(contract)
            assert.equal(contract.real_price, newContract.real_price)
            //assert.equal(contract.status, newContract.status)
            assert.equal(contract.passwordHash, newContract.passwordHash)
            //assert.equal(contract.request_date, newContract.request_date)
            assert.equal(contract.userUserId, newContract.userUserId)
            assert.equal(contract.catalogue_id, newContract.catalogue_id)
        })


        it('should not POST contract with invalid price', async function () {
            newContract.real_price = "123asdadad"
            const response = await fetch('http://localhost:5000/api/contracts', {
                method: 'post',
                body: JSON.stringify(newContract),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST contract with invalid user id', async function () {
            newContract.real_price = 123;
            newContract.userUserId = 123456;
            const response = await fetch('http://localhost:5000/api/contracts', {
                method: 'post',
                body: JSON.stringify(newContract),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

    })
    describe('Put tests', function () {
        let updatedcontract
        let contractId

        before(async function () {
            const date = new Date();
            const tempResponse = await fetch('http://localhost:5000/api/contracts');
            const contract = await tempResponse.json();
            contractId = contract[contract.length - 1].contract_id;
            console.log(contractId)
            updatedcontract = {
                contract_id: contract[contract.length - 1].contract_id,
                real_price: 20,
                status: "new",
                request_date: date,
                userUserId: 1,
                catalogueId: 1,
            }
        })

        it('should UPDATE a contract with valid id', async function () {
            const response = await fetch(`http://localhost:5000/api/contracts`, {
                method: 'put',
                body: JSON.stringify(updatedcontract),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should UPDATE a contract with invalid id', async function () {
            updatedcontract.contract_id = 10000000;
            console.log(updatedcontract)
            const response = await fetch(`http://localhost:5000/api/contracts`, {
                method: 'put',
                body: JSON.stringify(updatedcontract),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should not UPDATE a contract with invalid real price', async function () {
            updatedcontract.contract_id = contractId;
            updatedcontract.real_price = "qweerty"
            console.log(updatedcontract)
            const response = await fetch(`http://localhost:5000/api/contracts`, {
                method: 'put',
                body: JSON.stringify(updatedcontract),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)

        })

    })
    describe('Delete tests', function () {
        let updatedcontract
        let contractId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/contracts');
            const contract = await tempResponse.json();
            contractId = contract[contract.length - 1].contract_id;
            console.log(contractId)
            updatedcontract = {
                contract_id: contract[contract.length - 1].contract_id,
                real_price: 20,
                status: "new",
                request_date: new Date(),
                userUserId: 1,
                catalogue_id: 1,
            }
        })

        it('should DELETE a contract with valid id', async function () {

            const response1 = await fetch('http://localhost:5000/api/contracts');
            const contracts1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/contracts` + '/' + String(contractId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/contracts');
            const contracts2 = await response2.json()

            assert.equal(response.status, 204)
            assert.notEqual(contracts1.length, contracts2.length)
        })

        it('should DELETE a contract with invalid id', async function () {
            contractId = 100000000;

            const response1 = await fetch('http://localhost:5000/api/contracts');
            const contracts1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/contracts` + '/' + String(contractId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/contracts');
            const contracts2 = await response2.json()

            assert.equal(response.status, 204)
            assert.equal(contracts1.length, contracts2.length)
        })


    })
});

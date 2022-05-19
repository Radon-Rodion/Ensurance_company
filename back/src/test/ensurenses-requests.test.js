var assert = require('assert');
const fetch = require('node-fetch')

describe('ensuranceRequestsController tests', function () {
    describe('Get tests', function () {

        it('should GET all ensuranceRequests', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/ensurance-requests');
            assert.equal(response.status, 200)
            const ensuranceRequests = await response.json()
            console.log(ensuranceRequests)
            assert.equal(ensuranceRequests.length, 1)
        })

        it('should GET ensuranceRequest with valid id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/ensurance-requests/10');
            assert.equal(response.status, 200)
            const ensuranceRequest = await response.json()
            console.log(ensuranceRequest)
            assert.equal(ensuranceRequest.id, 10)
        })

        it('should not GET ensuranceRequest with non-existing id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/ensurance-requests/65');
            assert.equal(response.status, 200)
        })


        it('should GET ensuranceRequest with valid id, with data from roles', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/ensurance-requests/10');
            assert.equal(response.status, 200)
            const ensuranceRequest = await response.json()
            console.log(Object.keys(ensuranceRequest).length)
            assert.equal(Object.keys(ensuranceRequest).length, 7)
        })

    })
    describe('Post tests', function () {
        let newEnsuranceRequest
        before(function () {
            newEnsuranceRequest = {
                user_comment: "Volodia",
                photo_approvement: "https://vk.com/im?peers=210047085&sel=165853074",
                request_date: new Date(),
                status: "new",
                contractContractId: 2,
                transactionTransactionId: 7,
            }
        })

        it('should POST valid ensuranceRequest', async function () {
            const response = await fetch('http://localhost:5000/api/ensurance-requests', {
                method: 'post',
                body: JSON.stringify(newEnsuranceRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

            const ensuranceRequest = await response.json()
            console.log(ensuranceRequest)
            assert.equal(ensuranceRequest.user_comment, newEnsuranceRequest.user_comment)
            assert.equal(ensuranceRequest.photo_approvement, newEnsuranceRequest.photo_approvement)
            assert.equal(ensuranceRequest.status, newEnsuranceRequest.status)
            assert.equal(ensuranceRequest.contractContractId, newEnsuranceRequest.contractContractId)
            assert.equal(ensuranceRequest.transactionTransactionId, newEnsuranceRequest.transactionTransactionId)
        })

        it('should not POST ensuranceRequest with invalid comment', async function () {
            newEnsuranceRequest.user_comment = ""
            const response = await fetch('http://localhost:5000/api/ensurance-requests', {
                method: 'post',
                body: JSON.stringify(newEnsuranceRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST ensuranceRequest with invalid photo approvement', async function () {
            newEnsuranceRequest.user_comment = ""
            const response = await fetch('http://localhost:5000/api/ensurance-requests', {
                method: 'post',
                body: JSON.stringify(newEnsuranceRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })


    })
    describe('Put tests', function () {
        let updatedEnsuranceRequest
        let ensuranceRequestId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/ensurance-requests');
            const ensuranceRequest = await tempResponse.json();
            ensuranceRequestId = ensuranceRequest[ensuranceRequest.length - 1].id;
            console.log(ensuranceRequestId)
            updatedEnsuranceRequest = {
                id: ensuranceRequest[ensuranceRequest.length - 1].id,
                user_comment: "Volodia",
                photo_approvement: "https://vk.com/im?peers=210047085&sel=165853074",
                request_date: new Date(),
                status: "new",
                contractContractId: 2,
                transactionTransactionId: 7,
            }
        })

        it('should UPDATE a ensuranceRequest with valid id', async function () {
            const response = await fetch(`http://localhost:5000/api/ensurance-requests`, {
                method: 'put',
                body: JSON.stringify(updatedEnsuranceRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should UPDATE a ensuranceRequest with invalid id', async function () {
            updatedEnsuranceRequest.ensuranceRequest_id = 10000000;
            console.log(updatedEnsuranceRequest)
            const response = await fetch(`http://localhost:5000/api/ensurance-requests`, {
                method: 'put',
                body: JSON.stringify(updatedEnsuranceRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should UPDATE a ensuranceRequest with invalid url', async function () {
            updatedEnsuranceRequest.ensuranceRequest_id = ensuranceRequestId;
            updatedEnsuranceRequest.photo_approvement = "qwertty"
            console.log(updatedEnsuranceRequest)
            const response = await fetch(`http://localhost:5000/api/ensurance-requests`, {
                method: 'put',
                body: JSON.stringify(updatedEnsuranceRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)

        })

    })
    describe('Delete tests', function () {
        let updatedEnsuranceRequest
        let ensuranceRequestId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/ensurance-requests');
            const ensuranceRequest = await tempResponse.json();
            ensuranceRequestId = ensuranceRequest[ensuranceRequest.length - 1].id;
            console.log(ensuranceRequestId)
            updatedEnsuranceRequest = {
                ensuranceRequest_id: ensuranceRequest[ensuranceRequest.length - 1].id,
                user_comment: "Volodia",
                photo_approvement: "/path",
                request_date: new Date(),
                status: "new",
                contractContractId: 1,
                transactionTransactionId: 1,
            }
        })

        it('should DELETE a ensuranceRequest with valid id', async function () {
            console.log(`http://localhost:5000/api/ensurance-requests` + '/' + String(ensuranceRequestId))
            const response1 = await fetch('http://localhost:5000/api/ensurance-requests');
            const ensuranceRequests1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/ensurance-requests` + '/' + String(ensuranceRequestId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/ensurance-requests');
            const ensuranceRequests2 = await response2.json()

            assert.equal(response.status, 204)
            assert.notEqual(ensuranceRequests1.length, ensuranceRequests2.length)
        })

        it('should DELETE a ensuranceRequest with invalid id', async function () {
            ensuranceRequestId = 100000000;

            const response1 = await fetch('http://localhost:5000/api/ensurance-requests');
            const ensuranceRequests1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/ensurance-requests` + '/' + String(ensuranceRequestId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/ensurance-requests');
            const ensuranceRequests2 = await response2.json()

            assert.equal(response.status, 204)
            assert.equal(ensuranceRequests1.length, ensuranceRequests2.length)
        })

    })
});

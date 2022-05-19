var assert = require('assert');
const fetch = require('node-fetch')

describe('proposalsController tests', function () {
    describe('Get tests', function () {

        it('should GET all proposals', async function () {
            const response = await fetch('http://localhost:5000/api/proposal');
            assert.equal(response.status, 200)
            const proposals = await response.json()
            console.log(proposals)
            assert.equal(proposals.length, 3)
        })

        it('should GET proposal with valid id', async function () {
            const response = await fetch('http://localhost:5000/api/proposal/1');
            assert.equal(response.status, 200)
            const proposal = await response.json()
            console.log(proposal)
            assert.equal(proposal.proposal_id, 1)
        })

        it('should not GET proposal with non-existing id', async function () {
            const response = await fetch('http://localhost:5000/api/proposals/1000');
            assert.equal(response.status, 404)
        })

        it('should GET proposal with valid id, with data from roles', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/proposal/1');
            assert.equal(response.status, 200)
            const proposal = await response.json()
            console.log(Object.keys(proposal).length)
            assert.equal(Object.keys(proposal).length, 3)
        })


    })
    describe('Post tests', function () {
        let newProposal
        before(function () {
            newProposal = {
                proposal_name: "Volodia",
                description: "Putin",
            }
        })

        it('should POST valid proposal', async function () {
            const response = await fetch('http://localhost:5000/api/proposal', {
                method: 'post',
                body: JSON.stringify(newProposal),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

            const proposal = await response.json()
            console.log(proposal)
            assert.equal(proposal.proposal_name, newProposal.proposal_name)
            assert.equal(proposal.description, newProposal.description)
        })

        it('should not POST proposal with already existing  proposal_name', async function () {

            const response = await fetch('http://localhost:5000/api/proposal', {
                method: 'post',
                body: JSON.stringify(newProposal),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST proposal with invalid name', async function () {
            newProposal.proposal_name = ""
            const response = await fetch('http://localhost:5000/api/proposal', {
                method: 'post',
                body: JSON.stringify(newProposal),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST proposal with invalid description', async function () {
            newProposal.proposal_name = "Volodia"
            newProposal.description=""
            const response = await fetch('http://localhost:5000/api/proposal', {
                method: 'post',
                body: JSON.stringify(newProposal),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })


    })
    describe('Put tests', function () {
        let updatedProposal
        let proposalId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/proposal');
            const proposal = await tempResponse.json();
            proposalId = proposal[proposal.length - 1].proposal_id;
            console.log(proposalId)
            updatedProposal = {
                proposal_id: proposal[proposal.length - 1].proposal_id,
                proposal_name: "Volodia",
                description: "Putin",
            }
        })

        it('should UPDATE a proposal with valid id', async function () {
            const response = await fetch(`http://localhost:5000/api/proposal`, {
                method: 'put',
                body: JSON.stringify(updatedProposal),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })


        it('should UPDATE a proposal with invalid id', async function () {
            updatedProposal.proposal_id = 10000000;
            const response = await fetch(`http://localhost:5000/api/proposal`, {
                method: 'put',
                body: JSON.stringify(updatedProposal),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should not UPDATE a proposal with invalid description', async function () {
            updatedProposal.proposal_id = proposalId;
            updatedProposal.description = "";
            console.log(updatedProposal)
            const response = await fetch(`http://localhost:5000/api/proposal`, {
                method: 'put',
                body: JSON.stringify(updatedProposal),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)

        })

    })
    describe('Delete tests', function () {
        let updatedProposal
        let proposalId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/proposal');
            const proposal = await tempResponse.json();
            proposalId = proposal[proposal.length - 1].proposal_id;
            console.log(proposalId)
            updatedProposal = {
                proposal_id: proposal[proposal.length - 1].proposal_id,
                proposal_name: "Volodia",
                description: "Putin",
            }
        })

        it('should DELETE a proposal with valid id', async function () {

            const response1 = await fetch('http://localhost:5000/api/proposal');
            const proposals1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/proposal` + '/' + String(proposalId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/proposal');
            const proposals2 = await response2.json()

            assert.equal(response.status, 204)
            assert.notEqual(proposals1.length, proposals2.length)
        })

        it('should DELETE a proposal with invalid id', async function () {
            proposalId = 100000000;

            const response1 = await fetch('http://localhost:5000/api/proposal');
            const proposals1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/proposal` + '/' + String(proposalId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/proposal');
            const proposals2 = await response2.json()

            assert.equal(response.status, 204)
            assert.equal(proposals1.length, proposals2.length)
        })


    })
});

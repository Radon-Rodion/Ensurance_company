var assert = require('assert');
const fetch = require('node-fetch')

describe('CatalogueController tests', function () {
    describe('Get tests', function () {

        it('should GET all catalogues', async function () {
            const response = await fetch('http://localhost:5000/api/catalogue');
            assert.equal(response.status, 200)
            const catalogues = await response.json()
            console.log(catalogues)
            assert.equal(catalogues.length, 3)
        })

        it('should GET catalogue with valid id', async function () {
            const response = await fetch('http://localhost:5000/api/catalogue/1');
            assert.equal(response.status, 200)
            const catalogue = await response.json()
            console.log(catalogue.id)
            assert.equal(catalogue.id, 1)
        })

        it('should not GET catalogue with non-existing id', async function () {
            const response = await fetch('http://localhost:5000/api/catalogue/10');
            assert.equal(response.status, 404)
        })


        it('should GET catalogue with valid id, with data from proposal', async function () {
            const response = await fetch('http://localhost:5000/api/catalogue/1');
            assert.equal(response.status, 200)
            const catalogue = await response.json()
            console.log(Object.keys(catalogue).length)
            assert.equal(Object.keys(catalogue).length, 6)
        })


    })
    describe('Post tests', function () {
        let newCatalogue
        before(function () {
            newCatalogue = {
                price_per_year: 1,
                proposalProposalId: 1,
            }
        })

        it('should POST valid catalogue', async function () {
            const response = await fetch('http://localhost:5000/api/catalogue', {
                method: 'post',
                body: JSON.stringify(newCatalogue),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

            const catalogue = await response.json()
            console.log(catalogue)
            assert.equal(catalogue.price_per_year, newCatalogue.price_per_year)
            assert.equal(catalogue.proposalProposalId, newCatalogue.proposalProposalId)

        })


        it('should not POST catalogue with invalid price', async function () {
            newCatalogue.price_per_year = "123dawdawdaw"
            const response = await fetch('http://localhost:5000/api/catalogue', {
                method: 'post',
                body: JSON.stringify(newCatalogue),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST catalogue with invalid proposal id', async function () {
            newCatalogue.price_per_year = 123
            newCatalogue.proposalProposalId = 123456
            const response = await fetch('http://localhost:5000/api/catalogue', {
                method: 'post',
                body: JSON.stringify(newCatalogue),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

    })
    describe('Put tests', function () {
        let updatedCatalogue
        let catalogueId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/catalogue');
            const catalogue = await tempResponse.json();
            catalogueId = catalogue[catalogue.length - 1].id;
            console.log(catalogueId)
            updatedCatalogue = {
                id: catalogue[catalogue.length - 1].id,
                price_per_year: 123,
                proposalProposalId: 1,
            }
        })

        it('should UPDATE a catalogue with valid id', async function () {
            const response = await fetch(`http://localhost:5000/api/catalogue`, {
                method: 'put',
                body: JSON.stringify(updatedCatalogue),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)
        })

        it('should UPDATE a catalogue with invalid id', async function () {
            updatedCatalogue.catalogue_id = 10000000;
            console.log(updatedCatalogue)
            const response = await fetch(`http://localhost:5000/api/catalogue`, {
                method: 'put',
                body: JSON.stringify(updatedCatalogue),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should not UPDATE a catalogue with invalid price per year', async function () {
            updatedCatalogue.catalogue_id = catalogueId;
            updatedCatalogue.price_per_year="qwerty"
            console.log(updatedCatalogue)
            const response = await fetch(`http://localhost:5000/api/catalogue`, {
                method: 'put',
                body: JSON.stringify(updatedCatalogue),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)

        })

    })
    describe('Delete tests', function () {
        let updatedCatalogue
        let catalogueId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/catalogue');
            const catalogue = await tempResponse.json();
            catalogueId = catalogue[catalogue.length - 1].id;
            console.log(catalogueId)
            updatedCatalogue = {
                catalogue_id: catalogue[catalogue.length - 1].id,
                price_per_year: 1,
                proposalProposalId: 1,
            }
        })

        it('should not DELETE a catalogue with valid id, but exist', async function () {

            const response1 = await fetch('http://localhost:5000/api/catalogue');
            const catalogues1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/catalogue` + '/' + String(catalogueId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/catalogue');
            const catalogues2 = await response2.json()

            assert.equal(response.status, 204)
            assert.notEqual(catalogues1.length, catalogues2.length)
        })

        it('should DELETE a catalogue with invalid id', async function () {
            catalogueId = 100000000;

            const response1 = await fetch('http://localhost:5000/api/catalogue');
            const catalogues1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/catalogue` + '/' + String(catalogueId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/catalogue');
            const catalogues2 = await response2.json()

            assert.equal(response.status, 204)
            assert.equal(catalogues1.length, catalogues2.length)
        })


    })
});

var assert = require('assert');
const fetch = require('node-fetch')

describe('selectedController tests', function () {
    describe('Get tests', function () {

        it('should GET all selected', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/selected');
            assert.equal(response.status, 200)
            const selected = await response.json()
            assert.equal(selected.length, 13)
        })

        it('should GET selected with valid id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/selected/1');
            assert.equal(response.status, 200)
            const selected = await response.json()
            console.log(selected)
            assert.equal(selected.id, 1)
        })

        it('should not GET selected with non-existing id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/selected/100000000000');
            assert.equal(response.status, 404)
        })

        it('should GET selected with valid id, with data from roles', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/selected/1');
            assert.equal(response.status, 200)
            const selected = await response.json()
            console.log(Object.keys(selected).length)
            assert.equal(Object.keys(selected).length, 7)
        })


    })
    describe('Post tests', function () {
        let newSelected
        before(function () {
            newSelected = {
                adding_date: new Date(),
                catalogueId: 1,
                userUserId: 1,
            }
        })

        it('should POST valid selected', async function () {
            const response = await fetch('http://localhost:5000/api/selected', {
                method: 'post',
                body: JSON.stringify(newSelected),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

            const selected = await response.json()
            console.log(selected)
            assert.equal(selected.catalogueId, newSelected.catalogueId)
            assert.equal(selected.userUserId, newSelected.userUserId)
        })


        it('should not POST invalid selected', async function () {
            newSelected.catalogueId = "123yh"
            const response = await fetch('http://localhost:5000/api/selected', {
                method: 'post',
                body: JSON.stringify(newSelected),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST selected with invalid catalogue id', async function () {
            newSelected.catalogueId = 12345
            const response = await fetch('http://localhost:5000/api/selected', {
                method: 'post',
                body: JSON.stringify(newSelected),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST selected with invalid proposal id', async function () {
            newSelected.catalogueId = 1
            newSelected.userUserId = 666;
            const response = await fetch('http://localhost:5000/api/selected', {
                method: 'post',
                body: JSON.stringify(newSelected),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })
    })
    describe('Put tests', function () {
        let updatedSelected
        let selectedId

        before(async function () {
            const date = new Date();
            const tempResponse = await fetch('http://localhost:5000/api/selected');
            const selected = await tempResponse.json();
            selectedId = selected[selected.length - 1].id;
            console.log(selectedId)
            updatedSelected = {
                id: selected[selected.length - 1].id,
                adding_date: date,
                catalogueId: 1,
                userUserId: 1,
            }
        })

        it('should UPDATE a selected with valid id', async function () {
            const response = await fetch(`http://localhost:5000/api/selected`, {
                method: 'put',
                body: JSON.stringify(updatedSelected),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should UPDATE a selected with invalid id', async function () {
            updatedSelected.selected_id = 10000000;
            console.log(updatedSelected)
            const response = await fetch(`http://localhost:5000/api/selected`, {
                method: 'put',
                body: JSON.stringify(updatedSelected),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)
        })

        it('should not UPDATE a selected with invalid catalogue id', async function () {
            updatedSelected.selected_id = selectedId;
            updatedSelected.catalogueId = 100000000;
            console.log(updatedSelected)
            const response = await fetch(`http://localhost:5000/api/selected`, {
                method: 'put',
                body: JSON.stringify(updatedSelected),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

    })
    describe('Delete tests', function () {
        let updatedSelected
        let selectedId

        before(async function () {
            const date = new Date();
            const tempResponse = await fetch('http://localhost:5000/api/selected');
            const selected = await tempResponse.json();
            selectedId = selected[selected.length - 1].id;
            console.log(selectedId)
            updatedSelected = {
                id: selected[selected.length - 1].id,
                adding_date: date,
                catalogueId: 1,
                userUserId: 1,
            }
        })

        it('should DELETE a selected with valid id', async function () {

            const response1 = await fetch('http://localhost:5000/api/selected');
            const selected1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/selected` + '/' + String(selectedId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/selected');
            const selected2 = await response2.json()

            assert.equal(response.status, 204)
            assert.notEqual(selected1.length, selected2.length)
        })

        it('should DELETE a selected with invalid id', async function () {
            selectedId = 100000000;

            const response1 = await fetch('http://localhost:5000/api/selected');
            const selected1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/selected` + '/' + String(selectedId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/selected');
            const selected2 = await response2.json()

            assert.equal(response.status, 204)
            assert.equal(selected1.length, selected2.length)
        })


    })
});

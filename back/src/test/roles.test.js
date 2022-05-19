var assert = require('assert');
const fetch = require('node-fetch')

describe('rolesController tests', function () {
    describe('Get tests', function () {

        it('should GET all roles', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/roles');
            assert.equal(response.status, 200)
            const roles = await response.json()
            console.log(roles)
            assert.equal(roles.length, 3)
        })

        it('should not GET role with non-existing id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/roles/1000');
            assert.equal(response.status, 404)
        })

        it('should GET role with valid id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/roles/3');
            assert.equal(response.status, 200)
            const role = await response.json()
            console.log(role)
            assert.equal(role.role_id, 3)
        })

        it('should GET role with valid id, with data from roles', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/roles/3');
            assert.equal(response.status, 200)
            const role = await response.json()
            console.log(Object.keys(role).length)
            assert.equal(Object.keys(role).length, 2)
        })


    })
    describe('Post tests', function () {
        let newRole
        before(function () {
            newRole = {
                role_name: "Volodia"
            }
        })

        it('should POST valid role', async function () {
            const response = await fetch('http://localhost:5000/api/roles', {
                method: 'post',
                body: JSON.stringify(newRole),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

            const role = await response.json()
            console.log(role)
            assert.equal(role.role_name, newRole.role_name)
        })

        it('should not POST role with already existing name', async function () {
            const response = await fetch('http://localhost:5000/api/roles', {
                method: 'post',
                body: JSON.stringify(newRole),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST role with invalid role name', async function () {
            newRole.role_name = ""
            const response = await fetch('http://localhost:5000/api/roles', {
                method: 'post',
                body: JSON.stringify(newRole),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })


    })
    describe('Put tests', function () {
        let updatedRole
        let roleId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/roles');
            const role = await tempResponse.json();
            roleId = role[role.length - 1].role_id;
            console.log(roleId)
            updatedRole = {
                role_id: role[role.length - 1].role_id,
                role_name: "Volodia123"
            }
        })

        it('should UPDATE a role with valid id', async function () {
            const response = await fetch(`http://localhost:5000/api/roles`, {
                method: 'put',
                body: JSON.stringify(updatedRole),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should UPDATE a role with invalid id', async function () {
            updatedRole.role_id = 10000000;
            console.log(updatedRole)
            const response = await fetch(`http://localhost:5000/api/roles`, {
                method: 'put',
                body: JSON.stringify(updatedRole),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should not UPDATE a role with invalid name', async function () {
            updatedRole.role_id = roleId;
            updatedRole.role_name = "Jurist";
            console.log(updatedRole)
            const response = await fetch(`http://localhost:5000/api/roles`, {
                method: 'put',
                body: JSON.stringify(updatedRole),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)

        })

    })
    describe('Delete tests', function () {
        let updatedRole
        let roleId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/roles');
            const role = await tempResponse.json();
            roleId = role[role.length - 1].role_id;
            console.log(roleId)
            updatedRole = {
                role_id: role[role.length - 1].role_id,
                role_name: "Volodia"
            }
        })

        it('should DELETE a role with valid id', async function () {

            const response1 = await fetch('http://localhost:5000/api/roles');
            const roles1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/roles` + '/' + String(roleId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/roles');
            const roles2 = await response2.json()

            assert.equal(response.status, 204)
            assert.notEqual(roles1.length, roles2.length)
        })

        it('should DELETE a role with invalid id', async function () {
            roleId = 100000000;

            const response1 = await fetch('http://localhost:5000/api/roles');
            const roles1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/roles` + '/' + String(roleId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/roles');
            const roles2 = await response2.json()

            assert.equal(response.status, 204)
            assert.equal(roles1.length, roles2.length)
        })


    })
});

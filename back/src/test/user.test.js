var assert = require('assert');
const fetch = require('node-fetch')

describe('UsersController tests', function () {
    describe('Get tests', function () {

        it('should GET all users', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/users');
            assert.equal(response.status, 200)
            const users = await response.json()
            console.log(users)
            assert.equal(users.length, 3)
        })

        it('should GET user with valid id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/users/1');
            assert.equal(response.status, 200)
            const user = await response.json()
            console.log(user)
            assert.equal(user.user_id, 1)
        })

        it('should not GET user with non-existing id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/users/6');
            assert.equal(response.status, 404)
        })

        it('should GET user with valid id', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/users/1');
            assert.equal(response.status, 200)
            const user = await response.json()
            console.log(user)
            assert.equal(user.user_id, 1)
        })

        it('should GET user with valid id, with data from roles', async function () {
            let temp
            const response = await fetch('http://localhost:5000/api/users/1');
            assert.equal(response.status, 200)
            const user = await response.json()
            console.log(Object.keys(user).length)
            assert.equal(Object.keys(user).length, 11)
        })


    })
    describe('Post tests', function () {
        let newUser
        before(function () {
            newUser = {
                first_name: "Volodia",
                last_name: "Putin",
                passwordHash: "qwerty123",
                email: "12vegor@gmail.com",
                passportNumber: "7449552A001PB5",
                phone_number: "+375296146695",
                bank_number: "4444-4444-4444-4444",
                status: "active",
                role_id: 2
            }
        })

        it('should POST valid user', async function () {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'post',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

            const user = await response.json()
            console.log(user)
            assert.equal(user.firstName, newUser.firstName)
            assert.equal(user.lastName, newUser.lastName)
            assert.equal(user.passwordHash, newUser.passwordHash)
            assert.equal(user.email, newUser.email)
            assert.equal(user.passportNumber, newUser.passportNumber)
            assert.equal(user.phone_number, newUser.phone_number)
            assert.equal(user.bank_number, newUser.bank_number)
            assert.equal(user.status, newUser.status)
            assert.equal(user.roleRoleId, newUser.role_id)
        })

        it('should not POST user with already existing login', async function () {

            const response = await fetch('http://localhost:5000/api/users', {
                method: 'post',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })

        it('should not POST invalid user', async function () {
            newUser.email = "123"
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'post',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 406)
        })


    })
    describe('Put tests', function () {
        let updatedUser
        let userId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/users');
            const user = await tempResponse.json();
            userId = user[0].user_id;
            console.log(userId)
            updatedUser = {
                user_id: user[0].user_id,
                first_name: "Volodia2",
                last_name: "Putin2",
                passwordHash: "qwerty123",
                email: "12vegor2@gmail.com",
                passportNumber: "7449552A001PB2",
                phone_number: "375296146692",
                bank_number: "4444-4441-4444-4440",
                status: "active",
                role_id: 2
            }
        })

        it('should UPDATE a user with valid id', async function () {
            const response = await fetch(`http://localhost:5000/api/users`, {
                method: 'put',
                body: JSON.stringify(updatedUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

        it('should UPDATE a user with invalid id', async function () {
            updatedUser.user_id = 10000000;
            console.log(updatedUser)
            const response = await fetch(`http://localhost:5000/api/users`, {
                method: 'put',
                body: JSON.stringify(updatedUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            assert.equal(response.status, 200)

        })

    })
    describe('Delete tests', function () {
        let updatedUser
        let userId

        before(async function () {
            const tempResponse = await fetch('http://localhost:5000/api/users');
            const user = await tempResponse.json();
            userId = user[0].user_id;
            console.log(userId)
            updatedUser = {
                user_id: user[0].user_id,
                first_name: "Volodia2",
                last_name: "Putin2",
                passwordHash: "qwerty123",
                email: "12vegor2@gmail.com",
                passportNumber: "7449552A001PB2",
                phone_number: "375296146692",
                bank_number: "4444-4441-4444-4440",
                status: "active",
                role_id: 2
            }
        })

        it('should DELETE a user with valid id', async function () {

            const response1 = await fetch('http://localhost:5000/api/users');
            const users1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/users` + '/' + String(userId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/users');
            const users2 = await response2.json()

            assert.equal(response.status, 204)
            assert.notEqual(users1.length,users2.length)
        })

        it('should DELETE a user with invalid id', async function () {
            userId = 100000000;

            const response1 = await fetch('http://localhost:5000/api/users');
            const users1 = await response1.json()
            const response = await fetch(`http://localhost:5000/api/users` + '/' + String(userId), {
                method: 'delete',
            })
            const response2 = await fetch('http://localhost:5000/api/users');
            const users2 = await response2.json()

            assert.equal(response.status, 204)
            assert.equal(users1.length,users2.length)
        })


    })
});

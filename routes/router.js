const { getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/controller.js')

async function router(fastify, options) {
    fastify.get('/', getUsers)

    fastify.post('/create-user', createUser)

    fastify.put('/update-user/:id', updateUser)

    fastify.get('/user/:id', getUser)

    fastify.delete('/delete-user/:id', deleteUser)
}

module.exports = router;
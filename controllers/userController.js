const userModel = require('../data/service')

function createUser(req, res) {
    userModel.createUser(req, res)
}

function updateUser(req, res) {
    userModel.updateUser(req, res)
}

async function deleteUser(req, res) {
    try {
        const user = await userModel.deleteUser(req.params.id)
        if (!user) {
            res.status(404).send('user not found')
        }
        else{
            res.send('user was deleted').status(200)
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}

async function getUserById(req, res) {
    try {
        const user = await userModel.getUserById(req.params.id)
        if (!user) {
            res.status(404).send('user not found')
        }
        else{
            res.status(200).send(user)
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}


module.exports = { createUser, updateUser, deleteUser, getUserById }

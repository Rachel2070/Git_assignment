const userModel = require('../data/model')

async function createUser(req, res) {
    try {
        const newUser = await userModel.createUser(req.body)
        res.status(200).send(`user created ${newUser}`)
    } catch (error) {
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

async function updateUser(req, res) {
    try {
        const user = await userModel.updateUser(req.params.id, req.body);
        if (user == null) {
            res.status(404).send(`This id does not exist`);
        } else {
            res.status(200).send(`User updated: ${user}`);
        }
    } catch (error) {
        res.status(500).send(`Error updating user: ${error}`);
    }
}

function deleteUser(req, res) {
    userModel.deleteUser(req, res)
}

function getUserById(req, res) {
    userModel.getUserById(req, res)
}

module.exports = { createUser, updateUser, deleteUser, getUserById }

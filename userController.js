const userModel = require('./data/model')

function createUser(req, res) {
    userModel.createUser(req, res)
}

function updateUser(req, res) {
    userModel.updateUser(req, res)
}

function deleteUser(req, res) {
    userModel.deleteUser(req, res)
}

function getUserById(req, res) {
    userModel.getUserById(req, res)
}

module.exports = { createUser, updateUser, deleteUser, getUserById }
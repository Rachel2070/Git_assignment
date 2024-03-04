const userModel = require('./data/model')

function createUser(){
    userModel.User.createUser()
}

function updateUser(){
    userModel.User.updateUser()
}

function deleteUser(){
    userModel.User.delteUser()
}

function getUserById(){
    userModel.User.getUserById()
}

module.exports={createUser, updateUser, deleteUser, getUserById}
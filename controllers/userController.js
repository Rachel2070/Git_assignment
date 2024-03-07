const userService = require('../data/service')

async function createUser(req, res) {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(200).send(`user created ${newUser}`)
    } catch (error) {
        res.status(500).send(`Internal Server Error ${error}`);
    }
}

async function updateUser(req, res) {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (user == null) {
            res.status(404).send(`This id does not exist`);
        } else {
            res.status(200).send(`User updated: ${user}`);
        }
    } catch (error) {
        res.status(500).send(`Error updating user: ${error}`);
    }
}

async function deleteUser(req, res) {
    try {
        const user = await userService.deleteUser(req.params.id)
        if (!user) {
            res.status(404).send(`user not found`)
        }
        else{
            res.send(`user was deleted`).status(200)
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}

async function getUserById(req, res) {
    try {
        const user = await userService.getUserById(req.params.id)
        if (!user) {
            res.status(404).send(`user not found`)
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

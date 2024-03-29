const userService = require('../data/service')


async function createUser(req, res) {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(200).send(`user created ${newUser}`)
    } catch (error) {
        console.log(error);
        res.status(500).send(`Internal Server Error`);
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
        console.log(error);
        res.status(500).send(`Error updating user`);
    }
}

async function deleteUser(req, res) {
    try {
        const user = await userService.deleteUser(req.params.id)
        if (!user) {
            res.status(404).send(`user not found`)
        }
        else{
            res.status(200).send(`user was deleted`)
        }
    }
    catch (err) {
        res.status(404).send(`${err}`);
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

const User = require('./mongooseSchema')


async function createUser(req, res) {
    try {
        const newUser = new User({
            id: req.body.id,
            fullName: req.body.fullName,
            email: req.body.email,
            tel: req.body.tel
        })
        await newUser.save()
        res.send(`user created ${newUser}`).status(200)
    } catch (err) {
        console.error(`Error creating user: ${err}`);
        res.send(`Internal Server Error`).status(500);
    }
}

async function updateUser(req, res) {
    try {
        const tempUser = await User.findOne({ id: req.params.id })
        if (!tempUser) {
            return res.send(`This id does not exist`).status(404)
        }
        else {
            if (req.body.fullName) {
                tempUser.fullName = req.body.fullName;
            }
            if (req.body.email) {
                tempUser.email = req.body.email;
            }
            if (req.body.tel) {
                tempUser.tel = req.body.tel;
            }
            const userToUpdate = await User.findOneAndUpdate({ id: req.params.id }, tempUser, { new: true })
            res.send(`user updated ${userToUpdate}`)
        }
    }
    catch (err) {
        console.error(`Error updating user: ${err}`);
        res.status(500).send(`Internal Server Error`);
    }
}

async function deleteUser(id) {
    try {
        const userToDelete = await User.findOneAndDelete({ id: id })
        return userToDelete
    }
    catch (err) {
        new Error(`Error: Could not delete this user ${err}`)
    }

}

async function getUserById(id) {
    try {
        const findUser = await User.findOne({ id: id })     
        return findUser
    }
    catch (err) {
        throw new Error(`Error: Could not get this user ${err}`)
    }
}

module.exports = { createUser, updateUser, deleteUser, getUserById }




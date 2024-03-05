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
    } catch (error) {
        console.error('Error creating user:', error);
        res.send('Internal Server Error').status(500);
    }
}

async function updateUser(req, res) {
    try {
        const tempUser = await User.findOne({ id: req.params.id })
        if (!tempUser) {
            return res.send("This id does not exist").status(404)
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
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteUser(req, res) {
    try {
        const userToDelete = await User.findOneAndDelete({ id: req.params.id })
        if (!userToDelete) {
            return res.send("This id does not exist").status(404)
        }
        res.send('user deleted').status(200)
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }

}

async function getUserById(req, res) {
    try{
        const findUser = await User.findOne({ id: req.params.id })
    if (!findUser) {
        return res.send("This id does not exist").status(404)
    }
    res.send(findUser).status(200)
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    } 
}

module.exports = { createUser, updateUser, deleteUser, getUserById }




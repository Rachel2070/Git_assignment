const User = require('./mongooseSchema')


async function createUser(user) {
    try {
        const newUser = new User({
            id: user.id,
            fullName:user.fullName,
            email: user.email,
            tel:user.tel
        })
        await newUser.save()
        return newUser;
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function updateUser(useId,user) {
    try {
        const tempUser = await User.findOne({ id: useId })
        if (!tempUser) {
            return tempUser
        }
        else {
            if (user.fullName) {
                tempUser.fullName = user.fullName;
            }
            if (user.email) {
                tempUser.email = user.email;
            }
            if (user.tel) {
                tempUser.tel = user.tel;
            }
            const userToUpdate = await User.findOneAndUpdate({ id: useId }, tempUser, { new: true })
            return userToUpdate
        }
    }
    catch (eror) {
        throw new Error(`${eror}`);
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




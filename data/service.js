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




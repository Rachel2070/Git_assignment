class User {

    constructor(id, fullName, email, tel) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.tel = tel;
    }

    static createUser(req, res) {
        let newUser = new User(User.users.length + 1, req.body.fullName, req.body.email, req.body.tel)
        User.users.push(newUser)
    }

    static updateUser(req, res) {
        let index = User.users.findIndex(x => x.id === parseInt(req.params.id));
        if (index != -1) {
            // Check each parameter individually and update the user's attributes if provided
            if (req.body.fullName) {
                User.users[index].fullName = req.body.fullName;
            }
            if (req.query.email) {
                User.users[index].email = req.query.email;
            }
            if (req.body.tel) {
                User.users[index].tel = req.body.tel;
            }
            res.send(User.users[index]).status(200);
        } else {
            res.send("User not found").status(404);
        }
    }

    static deleteUser(req, res) {
        try {
            User.users = User.users.filter(u => u.id != parseInt(req.params.id))
            // User.users = [...newArr]
        }
        catch (err) {
            console.log(err).status(404)
        }
    }

    static getUserById(req, res) {
        let index = User.users.findIndex(x => x.id = parseInt(req.params.id))
        if (index != -1) {
            res.send(User.users[index]).status(200)
        }
        else {
            res.send("user not found").status(404)
        }
    }
}

User.users = [{ id: 1, fullName: "fhjk", email: "fdfgvb", tel: "ghjk" }]
module.exports = User

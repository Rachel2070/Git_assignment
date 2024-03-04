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
        res.send(newUser).status(200)
    }

    static updateUser(req, res) {
        let index = User.users.findIndex(x => x.id === parseInt(req.params.id));
        if (index != -1) {
            if (req.body.fullName) {
                User.users[index].fullName = req.body.fullName;
            }
            if (req.body.email) {
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
            const idToDelete = parseInt(req.params.id)
            if(User.users.findIndex(u=>u.id==idToDelete)!=-1){
                User.users = User.users.filter(u => u.id != idToDelete)
                res.send("user deleted succssesfully").status(200)
            }
            else{
                res.send("user not found")
            }
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

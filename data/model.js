class User {
    static users = [];
    constructor(id, fullName, email, tel) {
        this.id = id,
        this.fullName = fullName,
        this.email = email,
        this.tel = tel
    }

    static createUser(req,res) {
        let newUser = new User((users.length + 1), req.body.fullName, req.body.email, req.body.tel)
        users.push(newUser)
    }

    static updateUser(req, res) {
        let index = users.findIndex(x => x.id = req.params.id)
        if (index != -1) {
            users[index].fullName = req.query.fullName || users[index].fullName
            users[index].email = req.query.email || users[index].email
            users[index].tel = req.query.tel || users[index].tel
            res.send(users[index]).status(200)
        }
        else {
            res.send("user not found").status(404)
        }
    }

    static delteUser(req, res) {
        try {
            const newArr = this.users.filter(u => u.id != req.params.id)
            this.users = [...newArr]
        }
        catch (err) {
            console.log(err).status(404)
        }
    }

    static getUserById(req,res){
        let index = users.findIndex(x => x.id = req.params.id)
        if(index!=-1){
            res.send(this.users[index]).status(200)
        }
        else {
            res.send("user not found").status(404)
        }
    }
}
module.exports={User}

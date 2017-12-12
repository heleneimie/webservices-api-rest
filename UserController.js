class UserController {

    /* lui permet de récupérer le tableau de users et de le passer à l'objet userController */
    constructor(users) {
        this.users = users;
    }

    getAll(req, res) {
        res.json(this.users);
    }

    getById(req, res) {
        const id = req.params.id - 1;

        if(id > this.users.length - 1 || id < 1) {
            res.status(404);
        }

        res.json(this.users[id] || null);
    }

    createUser(req, res) {
        const user = req.body;

        // Tester si on a toutes valeurs
        console.log(user);

        // Requête de base de données
        this.users.push(user);

        res.json(this.users.length);
    }

    updateUser(req, res) {
        const id = req.params.id - 1;
        const user = req.body;

        console.log(this.users[id]);
        console.log(user);

        this.users[id] = user;

        res.json(this.users[id]);
    }

    deleteUser(req, res) {
        const id = req.params.id - 1;

        if(id > this.users.length - 1) {
            res.json(null);
            return;
        }

        this.users.splice(id, 1);

        res.json(null);
    }
}

module.exports = UserController;
const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const app = express();

/* Version de l'API */
const version = 'v1';

/* Tableau d'utilisateurs */
const users = [];


/* Interpréter une valeur postée de façon à transformer cette donnée en objet json */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


/* on simule une BDD avec des utilisateurs grâce à faker */
for (let i = 0; i < 10; i++) {
    users.push({
        firstname:  faker.name.firstName(),
        lastname: faker.name.lastName(),
        email:  faker.internet.email(),
    });
}


/* on lui passe la variable de version 'v1' -> utiliser les backquotes `` */
app.get(`/${version}/users`, (req, res) => {
    res.json(users);
});


/* Récupère un utilisateur par son id */
app.get(`/${version}/users/:id`, (req, res) => {
    const id = req.params.id - 1;

    /*  si l'id dépasse la longueur du tableau,
     alors ça veut dire qu'il n'existe pas et donc ça renvoie une erreur 404
     */
    if(id > users.length -1 || id < 1) {
        res.status(404);
    }
    res.json(users[id] || null);
});


/* Ajoute un utilisateur au tableau des users, avec la méthode POST */
app.post(`/${version}/users`, (req, res) => {
    const user = req.body;

    users.push(user);
    console.log(user.email);

    res.json(null);
});


/* Récupère un utilisateur par son id */
app.put(`/${version}/users/:id`, (req, res) => {
    const id = req.params.id - 1;
    const user = req.body;

    users[id] = user;
    // console.log(users[id]);
    // console.log(user);

    res.json(users[id]);
});


/* Supprime l'utilisateur par son id */
app.delete(`/${version}/users/:id`, (req, res) => {
    const id = req.params.id - 1;

    if(id > users.length -1) {
        res.json(null);
        return;
    }

    //supprime l'utilisateur du tableau
    users.splice(id, 1);

    res.json(null);

});


app.listen(3000, () => console.log('Example app listening on port 3000!'));
const express = require("express");

const Users = require("../users/usersModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up", dbenv: process.env.DB_ENV });
});

server.get("/users", (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.post("/users", (req, res) => {
    Users.insert(req.body)
        .then(([id]) => {
        res.status(201).json(id);
        })
        .catch(error => {
        res.status(500).json(error);
        });
});

server.delete("/:id", (req, res)=>{
    Users.remove(req.params.id)
        .then(count => {
            if(count > 0){
                res.status(200).json({ message: `${count} users deleted.` });
            } else {
                res.status(404).json({ error: `Could not find user with id of ${req.params.id}`});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

module.exports = server;

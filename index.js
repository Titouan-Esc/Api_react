const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const PORT = process.env.POST || 3000;
const app = express();

app.use(bodyParser.json())

const posts = [
    {
        id: 1,
        titre: "Premier titre",
        contenu : "Ceci est un contenu"
    },
    {
        id: 2,
        titre: "Second titre",
        contenu : "Ceci est un contenu de mon deuxieme post"
    },
    {
        id: 3,
        titre: "Troisieme titre",
        contenu : "Ceci est un contenu de mon troisieme post"
    },
]


app.get("/", (req, res) => {
    res.send("<h1>Tu est bien sur la page moray</h1>")
})

app.get("/api/v1/posts", (req,res) => {
    res.send(posts)
})

app.get("/api/v1/posts/:id", (req,res) => {
    const post = posts.find((e) => {
        return e.id === parseInt(req.params.id)
    });
    if(!post) {
        res.status(404).send("<h2>Hooooo tu commet une grave erreur mon bonhomme</h2>");
    }
    res.send(post);
});

// ! Si cette action n'est pas faite le server ne marche pas donc il est très important de le mettre
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
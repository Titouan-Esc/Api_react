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
// ! Si cette action n'est pas faite le server ne marche pas donc il est très important de le mettre
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


app.get("/", (req, res) => {
    res.send("<h1>Tu est bien sur la page moray</h1>")
})

app.get("/api/v1/posts", (req,res) => {
    res.send(posts)
})



// ! get sert à voir ce que j'ai dans mon array
app.get("/api/v1/posts/:id", (req,res) => {
    const post = posts.find((e) => {
        return e.id === parseInt(req.params.id)
    });
    if(!post) {
        res.status(404).send("<h2>Hooooo tu commet une grave erreur mon bonhomme</h2>");
    }
    res.send(post);
});


// ! post va ensuite servir à créer du contenu
app.post("/api/v1/posts", (req,res) => {
    const schema = Joi.object({
        titre: Joi.string().min(2).required(),
        contenu: Joi.string().min(10).required()
    });

    const result = schema.validate(req.body);
    console.log(result.error)

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }else{
        const post = {
            id: posts.length + 1,
            titre: req.body.titre,
            contenu: req.body.contenu 
    };
    posts.push(post)
    res.send(post)
    }
})

// ! put lui sert à update notre post c'est assez simple car il suffit juste de reprendre les choses que nous avons écrite au dessus
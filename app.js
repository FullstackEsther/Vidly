const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const genres = [
    {id:1, name:"Action"},
    {id:2, name: "Horror"},
    {id:3, name : "Romance"}
];

app.get('/api/genres', (req,res)=>{
    res.send(genres);
});

app.get('/api/genres/:id', (req,res)=>{
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre wuth the specified ID can't be found");
    res.send(genre);
});

app.post('/api/genres', (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length+1,
        name : req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req,res)=>{
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre wuth the specified ID can't be found");
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req,res)=>{
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre wuth the specified ID can't be found");
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});

function validate(genre){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    return schema.validate(genre);
}



const port = process.env.PORT || 3000;
app.listen(port);
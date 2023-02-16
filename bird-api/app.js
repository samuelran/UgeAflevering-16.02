const express = require("express");
const app = express();
const birds = require('./data');

app.use(express.json());

app.get("/birds", (req,res) => {
    res.json({birds});

});

app.get("/birds/:id",(req, res) => {
    const id = Number(req.params.id);
    const bird = birds.find((bird) => bird.id === id);

    if (bird) {
        res.json(bird);
    } else {
        res.status(404).send("Unable to find bird");
    }
});

app.listen(8080);
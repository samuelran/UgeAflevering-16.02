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

app.post("/birds",(req,res) => {
    const {name, species } =req.body;
    const newBird = {
        id:birds.length + 1,
        name,
        species
    };
    birds.push(newBird)
    res.json(newBird)
})

app.delete("/birds/:id",(req, res) => {
    const id = Number (req.params.id);
    const birdIndex = birds.findIndex((bird) => bird.id === id);
    if (birdIndex >= 0)  {
        birds.splice(birdIndex, 1);
        res.send("bird with id ${id} deleted");
    } else {
        res.status(404).send("Unable to find bird")
    }
    
})

app.put("/birds/:id",(req,res) => {
    const id = Number(req.params.id);
    const bird = birds.find((bird) => bird.id === id);
  
    if (bird) {
      Object.assign(bird, { id, ...req.body });
      res.json(bird);
    } else {
      res.status(404).send("Unable to find bird");
    }
  });
  
  
  app.patch("/birds/:id",(req,res) => {
    const id = Number(req.params.id);
    const bird = birds.find((bird) => bird.id === id);
  
    if (bird) {
      Object.assign(bird, req.body, { id });
      res.json(bird);
    } else {
      res.status(404).send("Unable to find bird");
    }
  });
  

app.listen(8080, () => {
    console.log("Server is now running on port", 8080);
});
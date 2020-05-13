const express = require('express');
const posts = require('./data/db');

const router = express.Router();

//POST
router.post("/api/posts", (req, res) => {
    req.body.title && req.body.contents;

    !title || !contents ? res.status(400).json({ message: "Please provide title and contents for the post." })
        : posts.insert(req.body)

    .then(posts => {
        res.status(201).json(req.body);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database." });
     })
})

//POST
router.post("/api/posts/:id/comments", (req, res) => {
    posts.findById(req.params.id)

    !post ? res.status(404).json({ error: "The post with the specified ID does not exist." })
        : req.comments.text && req.comments.id;

    !text ? res.status(400).json({ errorMessage: "Please provide text for the comment." })
        : posts.findById(req.params.id);

    posts.newComment(comment)
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error while saving the comment to the database." })
        })
})

//GET
router.get("/api/posts", (req, res) => {
    posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved."})
        })
})

//GET
router.get("/api/posts/:id", (req, res) => {
    data.findById(req.params.id)
    .then((post) => {
        !post ? res.status(404).json({ message:"The post with the specified ID does not exist." }) 
            : res.status(200).json(post);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "The post information could not be retrieved" })
    })
})

//GET
router.get("/api/posts/:id/comments", (req, res) => {
    posts.findPostComments(id)
    .then(data => {
        data ? res.status(200).json(data)
            : res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(error => {
        res.status(500).json({ message: "The comments information would not be retrieved" })
    })
})

//DELETE
router.delete("/api/posts/:id", (req, res) => {
    posts.remove(id)
    .then(removed => {
        removed 
            ? res.status(200).json({ message: "The post with the specified ID was deleted", deleted })
            : res.status(404).json({message: "The post with the specified ID does not exist" })
    })
    .catch(error => {
        res.status(500).json({ message: "The post could not be removed" })
    })
})

//PUT
router.put("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
    .then((post) => {
        !post ? res.status(404).json({ message:"The post with the specified ID does not exist." }) 
            : res.status(200).json(post);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "The post information could not be retrieved" })
    })

    !title || !contents ? res.status(400).json({ message: "Please provide title and contents for the post." })
        : posts.update(req.params.id, req.body) 
            .then(updated => {
                updated ? res.status(200).json : res.status(200).json
            })
            .catch(error => {
                res.status(500).json({ error: "The post information could not be modified." });
            })
})

module.exports = router;
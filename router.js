const express = require('express');
const posts = require('./data/db');

const router = express.Router();

//POST
router.post("/api/posts", (req, res) => {
    console.log('body', req.body)
    const title = req.body.title; 
    const contents = req.body.contents;

    !title || !contents 
        ? res.status(400).json({ message: "Please provide title and contents for the post." })
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
    const post = posts.findById(req.params.id);
    const comment = post.text;

    if (!post) {
        res.status(404).json({ error: 'The post with the specified ID does not exist'});
    } else  if (!post.text) {
        res.status(400).json({ error: 'Please provide text for the comment' })
    }

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
    posts.findById(req.params.id)
    .then((post) => {
        !post 
            ? res.status(404).json({ message:"The post with the specified ID does not exist." }) 
            : res.status(200).json(post);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "The post information could not be retrieved" })
    })
})

//GET
router.get("/api/posts/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)
    .then(data => {
        data 
            ? res.status(200).json(data)
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
    const post = posts.findById(req.params.id);
    const title = post.title;
    const contents = post.contents;

    if (!title || !contents) {
        res.status(400).json({ error: 'Please provide title or contents' })
    } else {
        res.status(200).json(post)
    }
})

module.exports = router;
import express from 'express';
import Post from '../models/Post.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// create post
router.post('/create', authenticateToken, async (req, res) => {
    try {
        console.log(req.body.content);
        const post = new Post ({
            user: req.user._id,
            content: req.body.content
        })
        const newPost =  await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

router.get('/', authenticateToken,async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['username', 'email']).populate('likes', ['username']).populate('comments.user', 'username');
        res.status(201).json(posts);
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

router.post('/:postId/like', authenticateToken,async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);;
        if (!post) return res.status(404).json({ message: "Post not found" });

        if(!post.likes.includes(req.user._id)){
            post.likes.push(req.user._id);
            await post.save();
            res.status(200).json('post liked successfully');
        } else {
            res.status(404).json({ message: "you already liked this post" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// add comment to post

router.post('/:postId/comment', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);;
        if (!post) return res.status(404).json({ message: "Post not found" });

        const comment = {
            user: req.user._id,
            content: req.body.content
        }

        post.comments.push(comment);

        await post.save();
        res.status(200).json('comment added successfully');
        
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

export default router;
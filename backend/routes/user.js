import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authenticateToken from '../middleware/auth.js';


const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
        })
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log("user===>", user)
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({_id: user._id, username: user.username}, process.env.JWT_SECRET)

    res.header('Authorization', 'Bearer ' + token).json({ 'token': token, "userID": user._id})
})

router.get('/profile', authenticateToken, async (req, res) => {
    console.log(req.user._id);
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
})

router.post('/:id/follow', authenticateToken, async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if(!currentUser.following.includes(userToFollow._id)) {
            currentUser.following.push(userToFollow._id);
            userToFollow.followers.push(currentUser._id);
            await currentUser.save();
            await userToFollow.save();
            
            res.status(200).json({
                ...userToFollow.toObject(),
                isFollowing: true,
            });
        } else {
            res.status(400).json({message: "You are already following this user"})
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
 })

router.post('/:id/unfollow', authenticateToken, async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        if(!userToUnfollow) return res.status(404).json({message: "User not found"})

        const currentUser = await User.findById(req.user._id);

        if(currentUser.following.includes(userToUnfollow._id)) {
            currentUser.following = currentUser.following.filter(
                id => id.toString() !== userToUnfollow._id.toString()
            );

            userToUnfollow.followers = userToUnfollow.followers.filter(
                id => id.toString() !== currentUser._id.toString()
            )

            await currentUser.save();
            await userToUnfollow.save();

            res.status(200).json({
                ...userToUnfollow.toObject(),
                isFollowing: false,
            });
        } else {
            res.status(400).json({message: "You are not following this user"})
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
 })

 // fetch all the current user

router.get('/explore', authenticateToken, async (req, res) => {
    try {
        const currentUserId = req.user._id;

        const users = await User.find({_id: { $ne: currentUserId }}).select('-password');

        const usersWithFollowStatus = users.map(user => ({
            ...user.toObject(),
            isFollowing: user.followers.includes(currentUserId),
        }));

        res.status(200).json(usersWithFollowStatus);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const users = await User.findById(req.params.id).select('-password');

        if(!users) return res.status(404).json({message: "User not found"})
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})




export default router;

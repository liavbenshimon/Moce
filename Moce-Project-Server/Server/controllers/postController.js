import Post from '../models/Post.js';
import User from '../models/User.js';

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find(); // Retrieve all posts
        res.status(200).json(posts); // Return posts
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new post
export const createPost = async (req, res) => {
    const { title, content, authorId } = req.body;

    try {
        const user = await User.findById(authorId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const post = new Post({ title, content, authorId });
        await post.save();
        res.status(201).json(post); // Return created post
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific post by its ID
export const getPostById = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId).populate('comments'); // Populate comments
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post); // Return post with comments
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
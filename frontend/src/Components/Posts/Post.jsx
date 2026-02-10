import React from 'react';

import "./Post.css";

import { likePost, commentPost } from '../../services/api';

export default function Posts({post}) {
  const handleComment = async (e) => {
    e.preventDefault();
    const content =  e.target.elements.comment.value;
    try {
      await commentPost(post._id, {content});

      e.target.elements.comment.value = '';
      alert('comment added successfully');
    } catch (err) {
      console.log(err);
    }
  }

  const handleLike = async () => {
    try {
      await likePost(post._id);
      alert('post liked successfully');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="post-container">
      <p className='post-content'>{post.content}</p>
      <button className='post-like-button' onClick={handleLike}>{post.likes?.length > 0 && post.likes.length} Like </button>
      <form onSubmit={handleComment} className='post-comment-form'>
        <input type='text' name="comment" placeholder='Add the comment' className='post-comment-input' />
        <button className='post-comment-button' type='submit'>Comment</button>
      </form>

      <div className='post-comments'>
        {post.comments.map((comment) => (
          <div key={comment._id} className='post-comment'>
            <p>{comment.user?.username || "Unknown user"}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { createPost } from '../../services/api';
import "./CreatePost.css";

export default function CreatePost() {

  const [content, setContent] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createPost({content})
      setContent('');
      alert("Post created successfully!")
    } catch (err) {
      console.log(err);
      alert(err.message)
    }
  }

  return (
    <div className='create-post-container'>
      <form className='create-post-form' onSubmit={handleSubmit}>
        <textarea name="content"
        id=""
        placeholder="What's on your mind?"
        className='create-post-textarea'
        value={content}
        onChange={(e) => {setContent(e.target.value)}}>
        </textarea>
        <button className="create-post-button" type='submit'>Post</button>

      </form>
    </div>
  );
}
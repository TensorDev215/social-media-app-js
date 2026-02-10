import React, {useState, useEffect} from 'react';

import "./Feed.css";

import { fetchPosts } from '../../services/api';
import Post from '../Posts/Post';

export default function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const {data} = await fetchPosts();
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.log(err)
      }
    }
    getPosts();
  }, [posts])



  return (
    <div className='feed-container'>
      {posts.map(post => (<Post key={post._id} post={post} />))}
    </div>
  );
}
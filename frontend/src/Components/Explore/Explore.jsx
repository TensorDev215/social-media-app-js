import React, { useEffect, useState } from 'react';
import './Explore.css';

import { fetchExploreUsers, followUser, unfollowUser } from '../../services/api';

export default function Explore() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchExploreUsers();
      
        setUsers(res.data);
      } catch (err) {
        console.log(err);   
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const res = await followUser(userId);
      
      setUsers(prevUsers => prevUsers.map((user) => user._id === userId ? res.data : user));
    } catch (err) {
      console.log(err);
    }
  }

  const handleUnfollow = async (userId) => {
    try {
      const res = await unfollowUser(userId);
      setUsers(prevUsers => prevUsers.map((user) => user._id === userId ? res.data : user));
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className='explore-container'>
      <h1>Explore Users</h1>
      <ul className='user-list'>
        {
          users.map((user) => {
            return (
              <li key={user._id} className='user-item'>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <p>Followers: {user.followers.length}</p>
                <p>Following: {user.following.length}</p>
                {
                  user.isFollowing?(
                    <button className='unfollow-button' onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                  ):
                  (
                    <button className='follow-button' onClick={() => handleFollow(user._id)}>Follow</button>
                  )
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
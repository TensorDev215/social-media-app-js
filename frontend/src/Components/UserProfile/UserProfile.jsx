import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { fetchUserById, unfollowUser, followUser } from '../../services/api';

import "./UserProfile.css";

export default function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchUserById(userId)
        setUser(res.data);
        console.log(res.data)
        setIsFollowing(res.data.followers.includes(localStorage.getItem('userID')))

      } catch (err) {
        console.log(err)
      }
    }

    console.log(userId)

    fetchUser();
  }, [])

  const handleUnfollow = async () => {
    try {
      await unfollowUser(userId);
      setIsFollowing(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handlefollow = async () => {
    try {
      await followUser(userId);
      setIsFollowing(true);
    } catch (err) {
      console.log(err);
    }
  }

  if (!user) {
    return <h1>Loading...</h1>
  }

  console.log(isFollowing);
  

  return (
    <div className='user-profile-container'>
      <h1 className='username'>{user?.username}</h1>
      <p className='username'>{user?.email}</p>
      {
        isFollowing?
        <button className='user-profile-button'onClick={handleUnfollow}>Unfollow</button>
        :
        <button className='user-profile-button' onClick={handlefollow}>Follow</button>
      }
    </div>
  );
}
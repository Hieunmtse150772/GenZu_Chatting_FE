// src/EditProfile.js

import React, { useState } from 'react'
import axios from 'axios'

const EditProfile = ({ userId, token }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    address: '',
    gender: 'male',
    email: '',
    phoneNumber: '',
    picture: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        `https://genzu-chatting-be.onrender.com/users/update/${userId}`,
        profile,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        },
      )
      console.log('Profile updated successfully:', response.data)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <input type='text' name='fullName' value={profile.fullName} onChange={handleChange} />
      </div>
      <div>
        <label>Address</label>
        <input type='text' name='address' value={profile.address} onChange={handleChange} />
      </div>
      <div>
        <label>Gender</label>
        <select name='gender' value={profile.gender} onChange={handleChange}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <div>
        <label>Email</label>
        <input type='email' name='email' value={profile.email} onChange={handleChange} />
      </div>
      <div>
        <label>Phone Number</label>
        <input type='text' name='phoneNumber' value={profile.phoneNumber} onChange={handleChange} />
      </div>
      <div>
        <label>Picture</label>
        <input type='text' name='picture' value={profile.picture} onChange={handleChange} />
      </div>
      <button type='submit'>Update Profile</button>
    </form>
  )
}

export default EditProfile

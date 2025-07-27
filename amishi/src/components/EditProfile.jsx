import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import supabase from '../utils/supabaseClient';
import './EditProfile.css';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    avatar_url: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
     
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;

      if (user) {
       
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfile({
          username: data?.username || '',
          email: user.email,
          bio: data?.bio || '',
          avatar_url: data?.avatar_url || ''
        });
      }
    } catch (error) {
      toast.error('Error fetching profile: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

  
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: profile.username,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          updated_at: new Date()
        });

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => setProfile({...profile, username: e.target.value})}
            placeholder="Enter username"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            placeholder="Tell us about yourself"
          />
        </div>

        <button 
          type="submit" 
          className="save-button"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
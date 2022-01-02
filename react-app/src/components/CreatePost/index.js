import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../store/post';
import './createPost.css';

const CreatePostForm = () => {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState('');
  const [image_url, setImage_url] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.id);
    const formData = new FormData();
    formData.append('image_url', image_url);
    formData.append('content', content);
    formData.append('user_id', +user.id);
    console.log('image', formData.get('image_url'));
    console.log('content', formData.get('content'));
    console.log('user id', formData.get('user_id'));
    const data = await dispatch(createPost(formData));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-image-form">
      <div>
        {errors?.map((error, i) => {
          <div key={i}>{error}</div>;
        })}
      </div>
      <div className="upload-post-div">
        <label>Choose an image</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          onChange={(e) => setImage_url(e.target.files[0])}
          className="image-input"
        />
        <label>Describe your image</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          name="description"
          placeholder="Description..."
          className="description-input"
        />
      </div>
      <button type="submit" className="upload-button">
        upload
      </button>
    </form>
  );
};

export default CreatePostForm;

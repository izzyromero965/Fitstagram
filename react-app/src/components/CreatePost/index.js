import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../store/post';
import './createPost.css';

const CreatePostForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState('');
  const [image_url, setImage_url] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData();
    formData.append('image_url', image_url);
    formData.append('content', content);
    formData.append('user_id', +user.id);
    const data = await dispatch(createPost(formData));
    if (!data) {
      setShowModal(false);
    } else if (data) {
      console.log('this is data', data);
      setErrors(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-image-form">
      <div className="errors-div">
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

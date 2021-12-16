import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../store/post';

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
    <form onSubmit={handleSubmit}>
      <div>
        {errors?.map((error, i) => {
          <div key={i}>{error}</div>;
        })}
      </div>
      <div>
        <label>Description</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          name="description"
        />
        <label>Image</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          onChange={(e) => setImage_url(e.target.files[0])}
        />
      </div>
      <button type="submit">upload</button>
    </form>
  );
};

export default CreatePostForm;

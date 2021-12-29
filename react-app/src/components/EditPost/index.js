import React, { useState } from 'react';
import { editOnePost, getSingleUserPosts } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';

const EditPost = ({ post, setShowModal, setShowwModal }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState();
  const userid = useSelector((state) => state.session.user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editOnePost(userid, content, post.id));
    dispatch(getSingleUserPosts(userid));
    setShowwModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="description"
        />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditPost;

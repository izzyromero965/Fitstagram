import React, { useState } from 'react';
import { editOnePost, getSingleUserPosts } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import './editPost.css';

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
    <form onSubmit={handleSubmit} className="edit-post-form">
      <span>Edit Post</span>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="description"
        className="edit-post-input"
      />
      <button type="submit" className="edit-post-button">
        Edit
      </button>
    </form>
  );
};

export default EditPost;

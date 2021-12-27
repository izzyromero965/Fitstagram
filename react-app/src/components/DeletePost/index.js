import React, { useState } from 'react';
import { deleteOnePost } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import './deletePost.css';

const DeletePost = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const postId = id;
  const deleteFunc = async () => {
    await dispatch(deleteOnePost(user.id, postId));
  };
  return <i className="far fa-trash-alt delete-post" onClick={deleteFunc}></i>;
};

export default DeletePost;

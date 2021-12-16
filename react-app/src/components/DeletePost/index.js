import React, { useState } from 'react';
import { deleteOnePost } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';

const DeletePost = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const postId = id;
  const deleteFunc = async () => {
    await dispatch(deleteOnePost(user.id, postId));
  };
  return (
    <div>
      <button onClick={deleteFunc}>delete</button>
    </div>
  );
};

export default DeletePost;

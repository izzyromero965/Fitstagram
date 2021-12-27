import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeletePostModal from '../DeletePost/DeletePostModal';
import './postModal.css';

const SinglePost = ({ setShowModal, post }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const postComments = useSelector(
    (state) => state.session.user.posts[post.id].comments
  );

  let buttons;

  if (sessionUser.id == post.user_id) {
    buttons = (
      <div className="edit-delete-buttons">
        <i className="far fa-edit"></i>
        <DeletePostModal post={post} setShowModal={setShowModal}/>
      </div>
    );
  }
  return (
    <div className="single-post-container">
      <img src={post?.image_url} className="single-post-img" />
      <div className="comment-container">
        <div className="comments-header">
          <div className="profile">
            <img
              src={sessionUser.profile_image_url}
              className="profile-pic-comments"
            />
            <a href={`/users/${sessionUser.id}`} className="profile-link">
              {sessionUser.username}
            </a>
          </div>
          {buttons}
        </div>
        <div className="comments">
          <div className="description">
            <img
              src={sessionUser.profile_image_url}
              className="profile-pic-comments"
            />
            <a href={`/users/${sessionUser.id}`} className="profile-link">
              {sessionUser.username}
            </a>
            <span>{post?.content}</span>
          </div>
          <div className="post-comments">
            {Object.values(postComments)?.map((comment) => {
              return <div>{comment.content}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

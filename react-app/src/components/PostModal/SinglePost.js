import { useSelector, useDispatch } from 'react-redux';
import { createALike, deleteAlike } from '../../store/post';
import { useState } from 'react';
import CreateComment from '../CreateComment';
import EditAndDeleteComment from '../CreateComment/CommentEditDelete';
import DeletePostModal from '../DeletePost/DeletePostModal';
import EditPostModal from '../EditPost/EditPostModal';
import './postModal.css';

const SinglePost = ({ setShowModal, post }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const postComments = useSelector((state) => state.posts[post.id].comments);
  const thisPost = useSelector((state) => state.posts[post.id]);
  const [isLoaded, setIsLoaded] = useState(false);

  let buttons;

  if (sessionUser.id === post.user_id) {
    buttons = (
      <div className="edit-delete-buttons">
        <EditPostModal post={post} setShowModal={setShowModal} />
        <DeletePostModal post={post} setShowModal={setShowModal} />
      </div>
    );
  }

  const handleLike = () => {
    const like = {
      user_id: sessionUser.id,
      post_id: post.id,
    };
    dispatch(createALike(like));
  };

  const handleUnlike = () => {
    if (sessionUser.id in post.likes) {
      dispatch(deleteAlike(post?.likes[sessionUser.id]?.id));
    }
  };
  let likeBtns = null;
  console.log(thisPost.likes);
  if (!post.likes.hasOwnProperty(sessionUser.id)) {
    likeBtns = <i className="far fa-heart like-icon" onClick={handleLike}></i>;
  } else if (sessionUser.id in thisPost.likes) {
    likeBtns = (
      <i className="fa fa-heart unlike-icon" onClick={handleUnlike}></i>
    );
  }

  return (
    <div className="single-post-container">
      <img src={post?.image_url} className="single-post-img" />
      <div className="comment-container">
        <div className="comments-header">
          <div className="profile">
            <img
              src={post.user.profile_image_url}
              className="profile-pic-comments"
            />
            <a href={`/users/${post.user.id}`} className="profile-link">
              {post.user.username}
            </a>
          </div>
          {buttons}
        </div>
        <div className="comments">
          <div className="description">
            <img
              src={post.user.profile_image_url}
              className="profile-pic-comments"
            />
            <a href={`/users/${post.user_id}`} className="profile-link">
              {post.user.username}
            </a>
            <span>{post?.content}</span>
          </div>
          <div className="post-comments">
            {Object.values(postComments)?.map((comment) => {
              return (
                <div className="description">
                  <img
                    src={comment?.user?.profile_image_url}
                    className="profile-pic-comments"
                  ></img>
                  <div>
                    <a
                      href={`/users/${comment?.user?.id}`}
                      className="profile-link"
                    >
                      {comment?.user?.username}
                    </a>
                  </div>
                  <div className="comment-span">{comment?.content} </div>
                  <EditAndDeleteComment comment={comment} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="create-comment">
          <div className="like-div">
            {likeBtns}
            <span>{Object.values(thisPost.likes).length}</span>
          </div>
          <CreateComment post={post} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

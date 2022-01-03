import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/post';
import { getFollowedUsers } from '../../store/followers';
import { Modal } from '../context/Modal';
import SinglePost from '../PostModal/SinglePost';
import CreateComment from '../CreateComment';
import './homepage.css';

export const HomepagePost = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  const postCheker = (postArr) => {
    if (postArr.length > 1) {
      return (
        <>
          <div className="profile">
            {/* <img
              src={postArr[postArr.length - 1].user.profile_image_url}
              className="profile-pic"
            /> */}
            <a
              href={`/users/${postArr[postArr.length - 1].user.id}`}
              className="comment-username"
            >
              {postArr[0].user.username}
            </a>
            <span className="comment-content">
              {postArr[postArr.length - 1].content}{' '}
            </span>
          </div>
          <div className="profile">
            {/* <img
              src={postArr[postArr.length - 2].user.profile_image_url}
              className="profile-pic"
            /> */}
            <a
              href={`/users/${postArr[postArr.length - 2].user.id}`}
              className="comment-username"
            >
              {postArr[0].user.username}
            </a>
            <span className="comment-content">
              {postArr[postArr.length - 2].content}
            </span>
          </div>
        </>
      );
    } else if (postArr.length === 1) {
      return (
        <>
          <div className="profile">
            {/* <img
              src={postArr[0].user.profile_image_url}
              className="profile-pic"
            /> */}
            <a
              href={`/users/${postArr[0].user.id}`}
              className="comment-username"
            >
              {postArr[0].user.username}
            </a>
            <span className="comment-content">{postArr[0].content}</span>
          </div>
        </>
      );
    } else return null;
  };

  return (
    <div className="homepage-post-container">
      <div className="homepage-post-header">
        <div className="homepage-post-profile">
          <img src={post?.user.profile_image_url} className="profile-pic" />
          <a href={`/users/${post.user.id}`} className="profile-username">
            {post.user.username}
          </a>
        </div>
        <img
          src={`${post.image_url}`}
          className="homepage-post-img"
          onClick={() => setShowModal(true)}
        ></img>
        <div className="post-description-user">
          <a
            href={`/users/${post?.user?.id}`}
            className="profile-username-desc"
          >
            {post?.user?.username}
          </a>
          <span className="post-description">{post?.content}</span>
        </div>
        {postCheker(Object.values(post.comments))}
        <div onClick={() => setShowModal(true)} className="view-comments-div">
          <span className="view-comment-span">View all comments...</span>
        </div>
        <CreateComment
          post={post}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SinglePost setShowModal={setShowModal} post={post} />
          </Modal>
        )}
      </div>
    </div>
  );
};

const Homepage = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  const followed = useSelector((state) => state.follows);
  const posts = useSelector((state) => state.posts);

  useEffect(async () => {
    await dispatch(getPosts());
    await dispatch(getFollowedUsers(sessionUser.id));
    await setIsLoaded(true);
  }, [dispatch, sessionUser.id]);

  const followed_posts_arr = [];
  for (let post in posts) {
    let onePost = posts[post];
    if (onePost.user_id === sessionUser.id || onePost.user_id in followed) {
      followed_posts_arr.push(onePost);
    }
  }
  return (
    <>
      {isLoaded && (
        <div className="homepage-container">
          <div className="homepage-posts">
            {followed_posts_arr.map((post) => (
              <div key={post.id}>
                <HomepagePost post={post} />
              </div>
            ))}
          </div>
          {/* <div className="profile-container">
            <div className="profile-info">
              <img
                src={sessionUser.profile_image_url}
                className="profile-image"
              ></img>
              <div className="username-nickname">
                <a href={`/users/${sessionUser.id}`}>{sessionUser.username}</a>
                <span>{sessionUser.nick_name}</span>
              </div>
            </div>
          </div> */}
          <div className="homepage-footer">
            <span>Developed by Israel Romero</span>
            <div className="splash-icons">
              <a href="https://github.com/snakedreamz">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/israel-romero-917a54219/">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;

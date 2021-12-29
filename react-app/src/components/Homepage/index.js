import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAComment, getPosts } from '../../store/post';
import { getFollowedUsers } from '../../store/followers';
import { Modal } from '../context/Modal';
import SinglePost from '../PostModal/SinglePost';
import CreateComment from '../CreateComment';
import './homepage.css';

const HomepagePost = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="homepage-post-container">
      <div className="homepage-post-header">
        <div className="profile">
          <img src={post.user.profile_image_url} className="profile-pic" />
          <a href={`/users/${post.user.id}`}>{post.user.username}</a>
        </div>
        <img
          src={`${post.image_url}`}
          className="homepage-post-img"
          onClick={() => setShowModal(true)}
        ></img>
        <div>
          <a href={`/users/${post?.user?.id}`}>{post?.user?.username}</a>
          <span>{post?.content}</span>
        </div>
        <div onClick={() => setShowModal(true)}>View all comments</div>
        <createAComment
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
    setIsLoaded(true);
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
        </div>
      )}
    </>
  );
};

export default Homepage;

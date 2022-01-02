import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/post';
import SinglePost from '../PostModal/SinglePost';
import { Modal } from '../context/Modal';
import './discover.css';

export const DiscoverPost = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <img
        src={post?.image_url}
        alt="discover-image"
        onClick={() => setShowModal(true)}
        className="post-img"
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SinglePost setShowModal={setShowModal} post={post} />
        </Modal>
      )}
    </div>
  );
};

const Discover = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="discover-container">
      <span>Discover users around the world!</span>
      <div className="posts-container">
        {Object.values(posts)?.map((post, i) => {
          if (post.user_id !== sessionUser.id)
            return (
              <div key={i}>
                <DiscoverPost post={post} />
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Discover;

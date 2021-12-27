import { useState } from 'react';
import { Modal } from '../context/Modal';
import SinglePost from './SinglePost';
import './postModal.css';

const SinglePostModal = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <img
        src={post?.image_url}
        onClick={() => {
          setShowModal(true);
        }}
        className="post-img"
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)} id="postModal">
          <SinglePost setShowModal={setShowModal} post={post} />
        </Modal>
      )}
    </>
  );
};

export default SinglePostModal;

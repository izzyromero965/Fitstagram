import { useState } from 'react';
import { deleteOnePost, getSingleUserPosts } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal';

const DeletePostModal = ({ post, setShowModal }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [showModal, setShowwModal] = useState(false);
  const deleteFunc = () => {
    dispatch(deleteOnePost(user.id, post.id));
    setShowwModal(false);
    setShowModal(false);
    dispatch(getSingleUserPosts(user.id));
  };

  return (
    <>
      <i
        className="far fa-trash-alt"
        onClick={() => {
          setShowwModal(true);
        }}
      ></i>
      {showModal && (
        <Modal onClose={() => setShowwModal(false)}>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={deleteFunc}>Delete</button>
        </Modal>
      )}
    </>
  );
};

export default DeletePostModal;

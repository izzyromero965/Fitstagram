import { useState } from 'react';
import { deleteOnePost } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import './deletePost.css';

const DeletePostModal = ({ post, setShowModal }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [showModal, setShowwModal] = useState(false);
  const deleteFunc = () => {
    dispatch(deleteOnePost(user.id, post.id));
    setShowwModal(false);
    setShowModal(false);
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
          <div className="delete-post-div">
            <p>Are you sure you want to delete this post?</p>
            <button onClick={deleteFunc} className="delete-btn">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeletePostModal;

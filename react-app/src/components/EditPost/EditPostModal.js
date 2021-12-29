import { useState } from 'react';
import EditPost from '.';
import { Modal } from '../context/Modal';

const EditPostModal = ({ post, setShowModal }) => {
  const [showModal, setShowwModal] = useState(false);
  return (
    <>
      <i
        className="far fa-edit"
        onClick={() => {
          setShowwModal(true);
        }}
      ></i>
      {showModal && (
        <Modal onClose={() => setShowwModal(false)}>
          <EditPost post={post} setShowwModal={setShowwModal} />
        </Modal>
      )}
    </>
  );
};

export default EditPostModal;

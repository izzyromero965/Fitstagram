import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAcomment } from '../../store/post';
import EditComment from '../EditComment';
import './CreateComment.css';

const EditAndDeleteComment = ({ comment }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const profile = useSelector((state) => state.profile);
  let editDeleteButtons;

  const handleDelete = () => {
    console.log(comment.id);
    dispatch(deleteAcomment(comment.id));
  };

  const checkUser = (comment) => {
    if (sessionUser.id === comment?.user?.id || sessionUser.id === profile.id) {
      editDeleteButtons = (
        <div className="edit-delete-icons">
          <i className="fas fa-edit" onClick={() => setShowEdit(true)}></i>
          <i
            className="far fa-trash-alt"
            onClick={handleDelete}
            value={comment?.id}
          ></i>
        </div>
      );
    }
  };

  return (
    <div>
      {!showEdit && checkUser(comment)}
      {!showEdit && editDeleteButtons}
      {showEdit && <EditComment comment={comment} setShowEdit={setShowEdit} />}
    </div>
  );
};

export default EditAndDeleteComment;

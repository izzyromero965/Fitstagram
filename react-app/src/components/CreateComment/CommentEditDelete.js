import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAcomment } from '../../store/post';
import EditComment from '../EditComment';

const EditAndDeleteComment = ({ comment }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const profile = useSelector((state) => state.profile);
  let editDeleteButtons;

  const handleDelete = (e) => {
    dispatch(deleteAcomment(e.target.value));
  };

  const checkUser = (comment) => {
    if (sessionUser.id === comment?.user?.id || sessionUser.id === profile.id) {
      editDeleteButtons = (
        <div>
          <button onClick={() => setShowEdit(true)}>Edit</button>
          <button onClick={handleDelete} value={comment?.id}>
            Delete
          </button>
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

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editAComment } from '../../store/post';

import './editComment.css';
const EditComment = ({ comment, setShowEdit }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(comment?.content);

  const handleEdit = (e) => {
    e.preventDefault();
    const payload = {
      content,
      id: comment?.id,
    };

    dispatch(editAComment(payload));
    setShowEdit(false);
  };
  const hideEdit = () => {
    setShowEdit(false);
  };

  return (
    <div>
      <form onSubmit={handleEdit} className="edit-comment-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="comment-edit-input"
        />
        <button type="submit" className="edit-submit-btn">
          Submit
        </button>
        <button onClick={hideEdit} className="edit-submit-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditComment;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editAComment } from '../../store/post';

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
      <form onSubmit={handleEdit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
        <button onClick={hideEdit}>Cancel</button>
      </form>
    </div>
  );
};

export default EditComment;

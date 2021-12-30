import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createAComment } from '../../store/post';

import './CreateComment.css';

const CreateComment = ({ post }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [comment, setComment] = useState('');
  const [disable, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      post_id: post.id,
      content: comment,
      user_id: sessionUser.id,
    };

    dispatch(createAComment(newComment));
    setComment('');
  };

  useEffect(() => {
    if (comment === '') {
      setDisable(true);
    } else if (comment !== '') {
      setDisable(false);
    }
  }, [disable, comment]);

  return (
    <div className="create-comment-container">
      <form onSubmit={handleSubmit} className="create-comment-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="create-comment-field"
          required
        />
        <button type="submit" disabled={disable}>
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateComment;

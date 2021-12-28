import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createAComment } from '../../store/post';

const CreateComment = ({ post }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [comment, setComment] = useState('');

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

  return (
    <div className="create-comment-container">
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreateComment;

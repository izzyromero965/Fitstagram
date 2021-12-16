import React, { useState } from 'react';
import { editOnePost } from '../../store/post';
import { useDispatch } from 'react-redux';

const EditPost = ({ id }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editOnePost(content, id));

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="description"
          />
          <button type="submit"></button>
        </form>
      </div>
    );
  };
};

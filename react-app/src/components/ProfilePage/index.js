import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleUserPosts } from '../../store/post';
import './profilepage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);

  useEffect(async () => {
    await dispatch(getSingleUserPosts(sessionUser.id));
    if (!isLoaded) setIsLoaded(true);
  }, [dispatch, sessionUser.id]);

  return (
    <>
      {isLoaded && (
        <div>
          <h1>Profile Page</h1>
        </div>
      )}
    </>
  );
};

export default ProfilePage;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserPosts } from '../../store/post';
import CreatePostForm from '../CreatePost';
import DeletePost from '../DeletePost';
import EditPost from '../EditPost';
import './profilepage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);

  useEffect(async () => {
    await dispatch(getSingleUserPosts(sessionUser.id));
    if (!isLoaded) setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div>
          {Object.values(sessionUser.posts)?.map((post, i) => {
            return (
              <div key={i}>
                <img src={post.image_url} />
                <div>{post.content}</div>
                <EditPost id={post.id} />
                <DeletePost id={post.id} />
              </div>
            );
          })}
          <CreatePostForm />
        </div>
      )}
    </>
  );
};

export default ProfilePage;

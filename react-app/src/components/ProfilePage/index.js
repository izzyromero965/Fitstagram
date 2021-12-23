import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleUserPosts } from '../../store/post';
import { loadProfile } from '../../store/userProfile';
import CreatePostForm from '../CreatePost';
import DeletePost from '../DeletePost';
import EditPost from '../EditPost';
import './profilepage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);
  const profile = useSelector((state) => state.profile);

  let { userId } = useParams();

  useEffect(async () => {
    await dispatch(loadProfile(userId));
    await dispatch(getSingleUserPosts(userId));
    if (!isLoaded) setIsLoaded(true);
  }, [dispatch, userId, sessionUser.id]);



  return (
    <>
      {isLoaded && (
        <div className="profile-page-container">
          <div className="profile-info">
            <div className="profile-img">
              <img src={profile?.profile_image_url}></img>
            </div>
            <div className="profile-description">
              <div className="username-div">
                <h2>{profile?.username}</h2>
              </div>
              <div className="follower-div">
                <div>posts</div>
                <div>followers</div>
                <div>following</div>
              </div>
              <div className="desc-div">{profile?.nick_name}</div>
            </div>
          </div>
        </div>
      )}
      {/* {isLoaded && (
        <div>
          {Object.values(profile?.posts)?.map((post, i) => {
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
      )} */}
    </>
  );
};

export default ProfilePage;

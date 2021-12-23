import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  followUser,
  getFollowedUsers,
  unfollowUser,
} from '../../store/followers';
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
  const follows = useSelector((state) => state.follows);

  let { userId } = useParams();

  useEffect(async () => {
    await dispatch(loadProfile(userId));
    await dispatch(getSingleUserPosts(userId));
    await dispatch(getFollowedUsers(sessionUser.id));
    if (!isLoaded) setIsLoaded(true);
  }, [dispatch, userId, sessionUser.id]);

  const handleFollow = () => {
    const user = {
      follower_id: sessionUser.id,
      followed_id: Number(userId),
    };
    dispatch(followUser(user));
  };

  const handleUnfollow = () => {
    const userData = {
      follower_id: sessionUser.id,
      followed_id: Number(userId),
    };
    dispatch(unfollowUser(userData));
  };

  let button = null;
  if (sessionUser.id === Number(userId)) {
    button = null;
  } else if (Number(userId) in follows) {
    button = (
      <div>
        <button onClick={handleUnfollow}>Unfollow</button>
      </div>
    );
  } else if (!(Number(userId) in follows)) {
    button = (
      <div>
        <button onClick={handleFollow}>Follow</button>
      </div>
    );
  }

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
                <div>{button}</div>
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

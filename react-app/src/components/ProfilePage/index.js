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
import SinglePostModal from '../PostModal/PostModal';
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
    profile.numberOfPosts = 0;
    for (let post in profile?.posts) {
      profile.numberOfPosts += 1;
    }
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
      <button onClick={handleUnfollow} className="followBtn">
        Unfollow
      </button>
    );
  } else if (!(Number(userId) in follows)) {
    button = (
      <button onClick={handleFollow} className="followBtn">
        Follow
      </button>
    );
  }

  return (
    <>
      {isLoaded && (
        <div className="profile-page-container">
          <div className="profile-info">
            <div className="desc">
              <div className="profile-img">
                <img
                  src={profile?.profile_image_url}
                  className="profile-pic"
                ></img>
              </div>
              <div className="profile-description">
                <div className="username-div">
                  <h2>{profile?.username}</h2>
                  {button}
                </div>
                <div className="follower-div">
                  <div>{console.log(profile?.numberOfPosts)} posts</div>
                  <div>followers</div>
                  <div>following</div>
                </div>
                <div className="desc-div">
                  <h2>{profile?.nick_name}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="sections">
            <i className="fas fa-border-all"></i>
            <h3>POSTS</h3>
          </div>
          <div className="images-container">
            {Object.values(posts)?.map((post, i) => {
              return (
                <div key={i} className="img-div">
                  <SinglePostModal post={post} className="post-img" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  fetchUserInfo,
  followUser,
  unFollowUser,
} from "../features/user/userSlice";
import { AiOutlineCalendar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import SwitchTabComponent from "../Components/ProfilePageComponents/SwitchTabComponent";
import SideNavigationBar from "../Components/SideNavigationBar/SideNavigationBar";
import { useParams } from "react-router";
import Spinner from "../Components/Spinner";
import EditProfileModal from "../Components/ProfilePageComponents/EditProfileModal";
import { RecentlyJoinedUsers } from "../Components/RecentlyJoinedUsers";

export const Profile = () => {
  const { retrievedUser, retrievedUserLoading: loading } = useSelector(
    (state) => state.user
  );
  const loggedInUser = useSelector((state) => state.user.data);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const isLoggedInUser = loggedInUser._id === retrievedUser._id;
  const joinedOn = dayjs(retrievedUser?.createdAt).format("MMMM YYYY");
  const isFollowedByLoggedInUser = retrievedUser.followers.some(
    (id) => loggedInUser._id === id
  );

  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUserInfo({ userId }));
  }, [userId]);

  const handleClick = () => {
    if (isFollowedByLoggedInUser) {
      dispatch(unFollowUser({ targetId: retrievedUser._id }));
    } else {
      dispatch(followUser({ targetId: retrievedUser._id }));
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border">
        <div className="fixed w-600 h-10 bg-white flex items-center p-2 border">
          <span className="font-semibold" role="heading">
            Profile
          </span>
        </div>
        {loading ? (
          <div className="flex justify-center mt-12">
            <Spinner />
          </div>
        ) : (
          <div className="mt-10 w-full">
            <div className="p-2 border">
              <img
                src={retrievedUser.profileUrl}
                alt={retrievedUser.name}
                loading="lazy"
                className="w-28 h-28 mr-2 rounded-full"
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{retrievedUser.name}</p>
                  <p>{`@${retrievedUser.username}`}</p>
                </div>
                {isLoggedInUser && (
                  <button
                    className="py-2 px-3 border-2 border-black rounded-full"
                    onClick={() => setShowProfileModal(true)}
                  >
                    Edit profile
                  </button>
                )}
                {!isLoggedInUser && (
                  <button
                    onClick={handleClick}
                    className={
                      isFollowedByLoggedInUser
                        ? "button-black--clicked"
                        : "button-black"
                    }
                  >
                    {isFollowedByLoggedInUser ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <div className="py-2 text-base">{retrievedUser.bio}</div>
              <div className="flex items-center space-x-1 mt-2">
                <AiOutlineCalendar />
                <p className="text-gray-400 text-sm">{`Joined ${joinedOn}`}</p>
              </div>
              <div className="space-x-2 mt-2">
                <span>
                  <span className="font-semibold">
                    {retrievedUser.following.length}
                  </span>
                  <span className="text-gray-400"> Following</span>
                </span>
                <span>
                  <span className="font-semibold">
                    {retrievedUser.followers.length}
                  </span>
                  <span className="text-gray-400">
                    {retrievedUser.followers.length == 1
                      ? " Follower"
                      : " Followers"}
                  </span>
                </span>
              </div>
            </div>
            <SwitchTabComponent userId={userId} />
          </div>
        )}
      </div>
      <div className="ml-8">
        <RecentlyJoinedUsers />
      </div>
      {showProfileModal && (
        <EditProfileModal
          setShowProfileModal={setShowProfileModal}
          user={retrievedUser}
        />
      )}
    </div>
  );
};

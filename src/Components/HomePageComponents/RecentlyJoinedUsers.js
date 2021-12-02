import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import {
  fetchRecentlyJoinedUsers,
  followUser,
} from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export const RecentlyJoinedUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recentlyJoinedUsers, recentlyJoinedUsersLoading } = useSelector(
    (state) => state.user
  );
  const [buttonStateArray, setButtonStateArray] = useState([]);
  const handleClick = (id, index) => {
    setButtonStateArray(
      buttonStateArray.map((i, idx) => (idx === index ? !i : i))
    );
    dispatch(followUser({ targetId: id }));
  };

  useEffect(() => {
    dispatch(fetchRecentlyJoinedUsers());
    setButtonStateArray(new Array(recentlyJoinedUsers.length).fill(false));
  }, []);

  return (
    <aside
      aria-label="Recently joined users"
      role="complementary"
      className="rounded-3xl bg-gray-100 h-96 w-80 mt-10 fixed bg-opacity-80"
    >
      <div className="px-5 py-3 text-lg font-semibold border-b">
        Recently Joined Users
      </div>

      {recentlyJoinedUsersLoading ? (
        <div className="justify-center flex mt-2">
          <Spinner />
        </div>
      ) : (
        recentlyJoinedUsers.map((user, index) => {
          return (
            <div
              key={user._id}
              className="flex py-2 px-3 mb-1 items-start cursor-pointer"
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <img
                src={user.profileUrl}
                alt={user.name}
                loading="lazy"
                className="w-10 h-10 mr-2"
              />
              <div>
                <p className="leading-4 font-medium">{user.name}</p>
                <p className="leading-4 text-gray-400">@{user.username}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(user._id, index);
                }}
                className={
                  buttonStateArray[index]
                    ? "button-black--clicked"
                    : "button-black"
                }
              >
                {buttonStateArray[index] ? "Following" : "Follow"}
              </button>
            </div>
          );
        })
      )}
    </aside>
  );
};

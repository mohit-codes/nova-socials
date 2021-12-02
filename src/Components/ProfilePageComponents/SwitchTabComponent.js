import { useState } from "react";
import Followers from "./Followers";
import Following from "./Following";
import { UserPosts } from "./UserPosts";

const SwitchTabComponent = ({ userId }) => {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <>
      <div className="flex justify-evenly border-b">
        <button
          onClick={() => setCurrentTab(1)}
          className={`py-3 px-3 hover:bg-gray-50 ${
            currentTab == 1 && "border-b-4 border-blue-400"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setCurrentTab(2)}
          className={`py-3 px-3 hover:bg-gray-50 ${
            currentTab == 2 && "border-b-4 border-blue-400"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setCurrentTab(3)}
          className={`py-3 px-3 hover:bg-gray-50 ${
            currentTab == 3 && "border-b-4 border-blue-400"
          }`}
        >
          Following
        </button>
      </div>
      <div>
        {currentTab == 1 ? (
          <UserPosts userId={userId} />
        ) : currentTab == 2 ? (
          <Followers userId={userId} />
        ) : (
          <Following userId={userId} />
        )}
      </div>
    </>
  );
};

export default SwitchTabComponent;

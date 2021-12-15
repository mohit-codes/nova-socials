import { fetchUserFeed } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Feed from "../Components/HomePageComponents/Feed";
import NewPost from "../Components/HomePageComponents/NewPost";
import SideNavigationBar from "../Components/SideNavigationBar/SideNavigationBar";
import { RecentlyJoinedUsers } from "../Components/RecentlyJoinedUsers";
import SearchBox from "../Components/Search/SearchBox";

export const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data._id);
  const { feed } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchUserFeed({ userId }));
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border border-b-0">
        <div className="fixed w-600 h-10 bg-white flex items-center p-2 border">
          <span className="font-semibold" role="heading">
            Home
          </span>
        </div>
        <div className="mt-10 w-full">
          <NewPost />
          <Feed feed={feed} />
        </div>
      </div>
      <div className="ml-5 w-80">
        <SearchBox />
        <RecentlyJoinedUsers />
      </div>
    </div>
  );
};

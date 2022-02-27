import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../features/post/postSlice";
import Feed from "../HomePageComponents/Feed";

export const UserPosts = ({ userId }) => {
  const { userPosts } = useSelector((state) => state.post);
  const { _id: clientId } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts({ userId, clientId }));
  }, []);

  return <Feed feed={userPosts} isRetrievedUserPosts={true} />;
};

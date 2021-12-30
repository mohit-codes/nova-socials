import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import { Post } from "./Post";

const Feed = ({ feed }) => {
  const { loading, errMessage } = useSelector((state) => state.post);
  return (
    <div className="pb-16 md:pb-0">
      {loading ? (
        <div className="flex justify-center mt-4 ">
          <Spinner />
        </div>
      ) : (
        feed.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      )}
      {feed.length === 0 && errMessage && (
        <div className="text-center font-medium mt-4">{errMessage}</div>
      )}
      {!loading && feed.length === 0 && (
        <div className="text-center font-medium mt-4">No posts to display</div>
      )}
    </div>
  );
};

export default Feed;

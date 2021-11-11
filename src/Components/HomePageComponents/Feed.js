import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import { Post } from "./Post";

const Feed = () => {
  const { feed, loading, errMessage } = useSelector((state) => state.post);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-4">
          <Spinner />
        </div>
      ) : (
        feed.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      )}
      {!feed && errMessage && (
        <div className="text-center font-medium mt-4">{errMessage}</div>
      )}
      {!loading && feed.length === 0 && (
        <div className="text-center font-medium mt-4">No posts to display</div>
      )}
    </div>
  );
};

export default Feed;

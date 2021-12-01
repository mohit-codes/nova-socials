import dayjs from "dayjs";
dayjs.extend(window.dayjs_plugin_relativeTime);
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likePost, unlikePost } from "../../features/post/postSlice";

export const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data._id);
  const createdAt = dayjs(post.createdAt).fromNow();

  const likeHandler = (e, isLikedByUser) => {
    e.stopPropagation();
    isLikedByUser
      ? dispatch(unlikePost({ userId, postId: post._id }))
      : dispatch(likePost({ userId, postId: post._id }));
  };

  return (
    <div
      className="p-2 w-full flex border cursor-pointer hover:bg-gray-50"
      onClick={() => navigate(`/post/${post._id}`)}
    >
      <img
        src={post.authorProfileUrl}
        alt={post.authorName}
        loading="lazy"
        className="w-10 h-10 mr-2 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${post.author}`);
        }}
      />
      <div className="ml-2 w-full">
        <div className="leading-tight flex">
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${post.author}`);
            }}
            className="hover:underline"
          >
            <p className="font-semibold">{post.authorName}</p>
            <p className="text-gray-400">{`@${post.authorUsername}`}</p>
          </div>
          <span className="text-gray-400 text-sm ml-auto">{createdAt}</span>
        </div>
        <div className="py-5">{post.content}</div>
        <div className="flex space-x-4 items-center">
          <span>
            <i>
              <FaRegComment className="inline mr-1" />
            </i>
            {post.comments.length}
          </span>
          <span onClick={(e) => likeHandler(e, post.isLikedByUser)}>
            <i>
              {post.isLikedByUser ? (
                <FaHeart className="text-pink-600 inline mr-1 " />
              ) : (
                <FaRegHeart className="inline mr-1" />
              )}
            </i>
            {post.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

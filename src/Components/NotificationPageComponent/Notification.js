import dayjs from "dayjs";
import { FaRegComment, FaHeart, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
dayjs.extend(window.dayjs_plugin_relativeTime);

const NotificationTemplate = ({ notification }) => {
  const createdAt = dayjs(notification.createdAt).fromNow();
  return (
    <div className="border py-5 px-3">
      <p>
        <i>
          {notification.type === "LIKED" ? (
            <FaHeart className="text-pink-400 inline mr-3" />
          ) : notification.type === "NEW_COMMENT" ? (
            <FaRegComment className="inline mr-3" />
          ) : (
            <FaRegUser className="inline mr-3" />
          )}
        </i>
        <Link to={`/profile/${notification.sourceId}`}>
          <span className="font-semibold mr-1">{notification.sourceName}</span>
        </Link>
        <span>
          {notification.type === "LIKED"
            ? "liked your post"
            : notification.type === "NEW_COMMENT"
            ? "commented on your post"
            : "followed you"}
        </span>
        <span className="text-gray-400 text-sm float-right">{createdAt}</span>
      </p>
    </div>
  );
};

export default NotificationTemplate;

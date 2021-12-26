import { useSelector } from "react-redux";
import { decryptMessage, copyToClipboard } from "../../utils/utility";
import dayjs from "dayjs";
import { FaRegTrashAlt, FaRegCopy } from "react-icons/fa";
import { useState } from "react";

const Message = ({ msg }) => {
  const { _id: id } = useSelector((state) => state.user.data);
  const messageByUser = msg.sender._id === id;
  const timestamp = dayjs(msg.createdAt).format("MMM D, YYYY, h:mm a");
  const [showEllipsis, setShowEllipsis] = useState(false);
  const decryptedMessage = decryptMessage(msg.key, msg.message, msg.iv);

  return (
    <div
      className="flex w-full mb-4"
      onMouseEnter={() => setShowEllipsis(true)}
      onMouseLeave={() => setShowEllipsis(false)}
    >
      <div
        className={`message-base-style ${
          messageByUser ? "message-sender-style" : "message-receiver-style"
        }`}
      >
        {decryptedMessage}
        <p className="absolute text-black -bottom-5 right-0 text-xs">
          {timestamp}
        </p>
        {showEllipsis && (
          <div
            aria-label="Message options"
            className={`absolute bottom-1 flex border space-x-3 ${
              messageByUser ? "-left-14" : "-right-14"
            }`}
          >
            <i
              role="button"
              aria-label="Copy message"
              className="text-gray-600 text-lg"
              onClick={() => copyToClipboard(decryptedMessage)}
            >
              <FaRegCopy />
            </i>
            <i
              role="button"
              aria-label="Delete Message"
              className="text-red-700 text-lg"
            >
              <FaRegTrashAlt />
            </i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;

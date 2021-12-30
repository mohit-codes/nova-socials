import { useEffect } from "react";
import { fetchChats, newChat } from "../../features/message/messageSlice";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../SocketContext/socketContext";
import { Link } from "react-router-dom";

const RecipientList = () => {
  const dispatch = useDispatch();
  const { chats, loadingChats } = useSelector((state) => state.message);
  const { _id: userId } = useSelector((state) => state.user.data);
  const socket = useSocket();

  useEffect(() => {
    dispatch(fetchChats({ userId }));

    socket.on("newRecipient", (info) => {
      dispatch(newChat(info));
    });

    return () => {
      socket.off("newRecipient", (info) => {
        dispatch(newChat(info));
      });
    };
  }, []);

  return (
    <div>
      {loadingChats ? (
        <div className="flex justify-center mt-2">
          <Spinner />
        </div>
      ) : (
        chats.map((recipient) => {
          return (
            <Link key={recipient._id} to={recipient._id} state={recipient}>
              <div className="space-x-2 px-1 py-2 flex hover:bg-gray-50 border-b">
                <img
                  src={recipient.profileUrl}
                  alt={recipient.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="leading-5 font-medium">{recipient.name}</p>
                  <p className="leading-3 text-gray-400 text-sm">{`@${recipient.username}`}</p>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default RecipientList;

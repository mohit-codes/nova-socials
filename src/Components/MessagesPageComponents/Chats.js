import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { fetchMessages, newMessage } from "../../features/message/messageSlice";
import { useSocket } from "../../SocketContext/socketContext";
import Spinner from "../Spinner";
import Header from "./Header";
import Message from "./Message";
import SendMessageForm from "./SendMessageForm";

const Chats = () => {
  const { state: recipient } = useLocation();
  const { _id: userId } = useSelector((state) => state.user.data);
  const { messages, loadingMessages } = useSelector((state) => state.message);
  const { id } = useParams();
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    dispatch(fetchMessages({ userId, receiverId: recipient._id }));

    socket.on("message", (info) => {
      dispatch(newMessage(info));
    });

    return () => {
      socket.off("message", (info) => {
        dispatch(newMessage(info));
      });
    };
  }, [id]);

  return (
    <div className="fixed flex flex-col bg-white lg:static border w-full lg:max-w-xl">
      <Header recipient={recipient} />
      {loadingMessages ? (
        <div className="flex justify-center mt-2">
          <Spinner />
        </div>
      ) : (
        <div className="pt-4 px-2 h-full overflow-auto">
          {messages.map((msg) => {
            return <Message key={msg.messageId} msg={msg} />;
          })}
        </div>
      )}
      <SendMessageForm recipient={recipient} />
    </div>
  );
};

export default Chats;

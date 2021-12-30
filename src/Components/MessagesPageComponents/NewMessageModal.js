import { useState } from "react";
import { ImCross } from "react-icons/im";
import ModalWrapper from "../ModalWrapper";
import { newChat } from "../../features/message/messageSlice";
import SearchField from "../Search/SearchField";
import { useSearch } from "../Search/useSearch";
import { useSocket } from "../../SocketContext/socketContext";
import Spinner from "../Spinner";
import { useSelector, useDispatch } from "react-redux";

const NewMessageModal = ({ setShowNewMessageModal }) => {
  const [searchText, setSearchText] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const { _id: id, email } = useSelector((state) => state.user.data);
  const socket = useSocket();
  const dispatch = useDispatch();
  const { result, loading } = useSearch(searchText);

  const handleStart = () => {
    socket.emit("startMessage", {
      senderId: id,
      receiverEmail: receiverEmail,
      senderEmail: email,
    });
    const recipient = result.find((obj) => obj.email === receiverEmail);
    dispatch(newChat(recipient));
    setShowNewMessageModal(false);
  };

  return (
    <ModalWrapper
      ariaLabel="New Message"
      callback={() => setShowNewMessageModal(false)}
    >
      <div
        className="p-2 bg-white rounded-md h-80 w-80 flex flex-col items-start"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="py-1 px-2 flex w-full items-center mb-2">
          <span className="font-semibold text-lg">New Message</span>
          <i className="ml-auto">
            <ImCross />
          </i>
        </div>
        <SearchField
          callback={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <div className="w-full">
          {loading ? (
            <div className="flex w-80 justify-center mt-2">
              <Spinner />
            </div>
          ) : (
            <div className="w-full py-1 h-44 overflow-auto">
              {result.map((user) => {
                return (
                  <div
                    key={user._id}
                    onClick={() => setReceiverEmail(user.email)}
                    className={`user-tile-base-style space-x-2 px-1 py-2 ${
                      receiverEmail === user.email && "bg-gray-100"
                    }`}
                  >
                    <img
                      src={user.profileUrl}
                      alt={user.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="leading-5 font-medium">{user.name}</p>
                      <p className="leading-3 text-gray-400 text-sm">{`@${user.username}`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button onClick={handleStart} className="button mt-auto ml-auto">
          Start
        </button>
      </div>
    </ModalWrapper>
  );
};

export default NewMessageModal;

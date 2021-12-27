import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";
import { FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat } from "../../features/message/messageSlice";

const Header = ({ recipient }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { _id: senderId } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteChat({ senderId, recipientId: recipient._id }));
    setShowMenu(false);
    navigate(-1);
  };

  return (
    <div className="flex px-2 py-1 items-center relative">
      <i aria-label="Back" role="button" className="lg:hidden">
        <BiArrowBack className="inline" onClick={() => navigate(-1)} />
      </i>
      <img
        src={recipient.profileUrl}
        alt={recipient.name}
        loading="lazy"
        className="w-10 h-10 rounded-full mr-2"
      />
      <div className="">
        <p className="leading-5 font-medium">{recipient.name}</p>
        <p className="leading-3 text-gray-400 text-sm">{`@${recipient.username}`}</p>
      </div>
      <i
        role="button"
        aria-label="Chat Menu"
        className="ml-auto"
        onClick={() => setShowMenu((bool) => !bool)}
      >
        <FaEllipsisV />
      </i>
      {showMenu && (
        <div
          role="listbox"
          className="bg-blue-400 absolute -bottom-5 -right-20 rounded-md"
        >
          <button onClick={handleDelete} className="text-white py-1 px-2">
            Delete Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

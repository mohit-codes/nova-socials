import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideNavigationBar from "../Components/SideNavigationBar/SideNavigationBar";
import { useSocket } from "../SocketContext/socketContext";
import RecipientList from "../Components/MessagesPageComponents/RecipientList";
import { RiMailAddLine } from "react-icons/ri";
import InitialSectionCover from "../Components/MessagesPageComponents/InitialSectionCover";
import { Outlet, useLocation } from "react-router";
import NewMessageModal from "../Components/MessagesPageComponents/NewMessageModal";
import Toast from "../Components/Toast/Toast";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Messages = () => {
  const user = useSelector((state) => state.user.data);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const socket = useSocket();
  const { pathname } = useLocation();

  useEffect(() => {
    useDocumentTitle("Messages | Nova Socials");
    socket.emit("connectUser", { name: user.name });
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="flex ml-0 md:ml-28 lg:ml-0 w-full">
        <div className="w-full lg:w-80 border">
          <div className="h-10 bg-white flex items-center p-2 border">
            <p className="font-semibold" role="heading">
              Messages
            </p>
            <i
              className="ml-auto text-xl"
              onClick={() => setShowNewMessageModal(true)}
            >
              <RiMailAddLine />
            </i>
          </div>
          <div className="w-full">
            <RecipientList />
          </div>
        </div>
        {pathname === "/messages" && (
          <InitialSectionCover
            setShowNewMessageModal={setShowNewMessageModal}
          />
        )}
        <Outlet />
      </div>
      {showNewMessageModal && (
        <NewMessageModal setShowNewMessageModal={setShowNewMessageModal} />
      )}
      <Toast />
    </div>
  );
};

export default Messages;

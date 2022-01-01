import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/notification/notificationSlice";
import SideNavigationBar from "../Components/SideNavigationBar/SideNavigationBar";
import Spinner from "../Components/Spinner";
import NotificationTemplate from "../Components/NotificationPageComponent/Notification";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Notification = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data._id);
  const { loading, errMessage, notifications } = useSelector(
    (state) => state.notification
  );

  useDocumentTitle("Notifications | Nova Socials");

  useEffect(() => {
    dispatch(fetchNotifications({ userId }));
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border ml-0 md:ml-28 lg:ml-0">
        <div className="fixed w-600 h-10 bg-white flex items-center p-2 border">
          <span className="font-semibold" role="heading">
            Notifications
          </span>
        </div>
        <div className="mt-10 w-full">
          {loading ? (
            <div className="flex justify-center mt-14">
              <Spinner />
            </div>
          ) : (
            notifications.map((notification) => {
              return (
                <NotificationTemplate
                  key={notification._id}
                  notification={notification}
                />
              );
            })
          )}
          {!loading && errMessage && (
            <div className="text-center font-medium mt-4">{errMessage}</div>
          )}
          {!loading && notifications.length === 0 && (
            <div className="text-center font-medium mt-12">
              No Notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;

import { BiHomeCircle } from "react-icons/bi";
import { VscBell } from "react-icons/vsc";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/nova.svg";
import { logoutUser } from "../../features/user/userSlice";
import SideBarNavLink from "./SideBarNavLink";

const SideNavigationBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  return (
    <div className="flex flex-col w-1/4 items-end h-full">
      <div className="flex flex-col justify-between h-full px-4 fixed">
        <div className="flex flex-col mt-2 mr-4">
          <div className="">
            <img src={Logo} className="w-9" />
          </div>
          <div className="mt-2 mb-4 font-medium">
            <nav aria-label="Primary" role="navigation">
              <SideBarNavLink to="/home" ariaLabel="Home" role="link">
                <BiHomeCircle className=" text-2xl" />
                <span>Home</span>
              </SideBarNavLink>
              <SideBarNavLink
                to="/notifications"
                ariaLabel="Notifications"
                role="link"
              >
                <VscBell className=" text-2xl" /> <span>Notifications</span>
              </SideBarNavLink>
              <SideBarNavLink to="/messages" ariaLabel="Messages" role="link">
                <HiOutlineMail className=" text-2xl" /> <span>Messages</span>
              </SideBarNavLink>
              <SideBarNavLink
                to={`/profile/${user._id}`}
                ariaLabel="Profile"
                role="link"
              >
                <HiOutlineUser className=" text-2xl" /> <span>Profile</span>
              </SideBarNavLink>
            </nav>
          </div>
          <button className="py-2 px-3 bg-blue-500 text-white rounded-full font-medium">
            Tweet
          </button>
        </div>
        <button
          className="py-2 px-3 bg-blue-500 text-white rounded-full font-medium mb-2"
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNavigationBar;

import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";

const Header = ({ recipient }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2 px-2 py-1">
      <i aria-label="Back" role="button" className="lg:hidden">
        <BiArrowBack className="inline" onClick={() => navigate(-1)} />
      </i>
      <img
        src={recipient.profileUrl}
        alt={recipient.name}
        loading="lazy"
        className="w-10 h-10 rounded-full"
      />
      <div className="">
        <p className="leading-5 font-medium">{recipient.name}</p>
        <p className="leading-3 text-gray-400 text-sm">{`@${recipient.username}`}</p>
      </div>
    </div>
  );
};

export default Header;

import ModalWrapper from "../ModalWrapper";
import { GrClose } from "react-icons/gr";
import { Label } from "../../Components/FormComponents";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../features/user/userSlice";

const EditProfileModal = ({ setShowProfileModal, user }) => {
  const [formState, setFormState] = useState({
    Name: user.name,
    Bio: user.bio,
  });
  const [profileUrl, setProfileUrl] = useState(user.profileUrl);
  const dispatch = useDispatch();

  const openWidget = (e) => {
    e.preventDefault();
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "nova-socials-cloud",
          uploadPreset: "ml_default",
          cropping: true,
        },
        (error, result) => {
          if (result.info?.secure_url) {
            console.log(result.info.secure_url);
            setProfileUrl(result.info.secure_url);
          }
        }
      )
      .open();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserInfo({
        name: formState["Name"],
        bio: formState["Bio"],
        profileUrl: profileUrl,
      })
    );
    setShowProfileModal(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <ModalWrapper
      callback={() => setShowProfileModal(false)}
      ariaLabel="Edit Profile"
    >
      <div
        className="bg-white rounded-md py-2 px-2 w-600"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={submitHandler}>
          <div className="py-1 flex w-full text-lg items-center border-b">
            <i
              role="button"
              aria-label="Close"
              aria-describedby="Button to close dialog"
            >
              <GrClose onClick={() => setShowProfileModal(false)} />
            </i>
            <span className="font-semibold  ml-4">Edit profile</span>
            <button type="submit" className="button-black ml-auto">
              Save
            </button>
          </div>
          <div className="py-2">
            <div className="flex w-1/2 items-center ml-auto mr-auto">
              <img
                src={profileUrl}
                alt={user.name}
                loading="lazy"
                className="w-24 h-24 rounded-full"
              />
              <button onClick={openWidget} className="button-black">
                Change Profile Picture
              </button>
            </div>
            <Label labelText="Name" id="name-label" htmlFor="edit-name" />
            <input
              name="Name"
              value={formState["Name"]}
              onChange={changeHandler}
              id="edit-name"
              aria-labelledby="name-label"
              className="border-2 border-gray-400 rounded-md w-full p-2 my-2"
            />
            <Label labelText="Bio" id="bio-label" htmlFor="edit-bio" />
            <input
              name="Bio"
              value={formState["Bio"]}
              onChange={changeHandler}
              aria-labelledby="bio-label"
              id="edit-bio"
              className="border-2 border-gray-400 rounded-md w-full p-2 my-2"
            />
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditProfileModal;

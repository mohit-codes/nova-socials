import ModalWrapper from "../ModalWrapper";
import { GrClose } from "react-icons/gr";
import { Label, Input } from "../../Components/FormComponents";
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
        className="bg-white rounded-md py-2 px-2 w-96 lg:w-600"
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
          <div className="py-2 px-2 lg:px-0">
            <div className="flex px-5 lg:px-0 lg:w-1/2 items-center ml-auto mr-auto">
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
            <Input
              name="Name"
              value={formState["Name"]}
              callback={changeHandler}
              id="edit-name"
              ariaLabelledBy="name-label"
            />
            <Label labelText="Bio" id="bio-label" htmlFor="edit-bio" />
            <Input
              name="Bio"
              value={formState["Bio"]}
              callback={changeHandler}
              id="edit-bio"
              ariaLabelledBy="bio-label"
            />
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditProfileModal;

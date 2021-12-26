import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostLikes } from "../../features/post/postSlice";
import { GrClose } from "react-icons/gr";
import Spinner from "../Spinner";
import ModalWrapper from "../ModalWrapper";
import { UserTileComponent } from "../UserTileComponent";

export const LikesModal = ({ postId, setShowModal }) => {
  const { likes, loadingLikes, errMessage } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostLikes({ postId }));
  }, []);
  return (
    <ModalWrapper callback={() => setShowModal(false)} ariaLabel="Likes">
      <div
        className="h-96 w-96 bg-white rounded-md overflow-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="py-2 px-3 flex items-center border-b-2 border-gray-200">
          <span className="text-xl font-medium ">Liked by</span>
          <i
            className="ml-auto"
            role="button"
            aria-label="Close"
            aria-describedby="Button to close dialog"
          >
            <GrClose onClick={() => setShowModal(false)} />
          </i>
        </div>
        {errMessage && <div>{errMessage}</div>}
        {loadingLikes ? (
          <div className="flex justify-center mt-2">
            <Spinner />
          </div>
        ) : (
          likes.map((user) => {
            return <UserTileComponent key={user._id} user={user} />;
          })
        )}
      </div>
    </ModalWrapper>
  );
};

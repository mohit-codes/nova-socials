import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostLikes } from "../../features/post/postSlice";
import { GrClose } from "react-icons/gr";
import Spinner from "../Spinner";

export const LikesModal = ({ postId, setShowModal }) => {
  const { likes, loadingLikes, errMessage } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostLikes({ postId }));
  }, []);
  return (
    <div
      aria-modal="true"
      aria-label="Likes"
      role="dialog"
      className="absolute h-screen w-full flex justify-center items-center bg-black top-0 bg-opacity-50"
      onClick={() => setShowModal(false)}
    >
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
            return (
              <div
                key={user._id}
                className="flex border py-2 px-3 items-center"
              >
                <div className="bg-gray-300 w-10 h-10 rounded-full mr-2"></div>
                <div>
                  <p>{user.name}</p>
                  <p className="text-gray-400">@{user.username}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

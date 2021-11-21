import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../features/post/postSlice";

export const Comment = ({ comment }) => {
  const userId = useSelector((state) => state.user.data._id);
  const isCommentAuthor = comment.commentBy === userId;
  const dispatch = useDispatch();
  return (
    <div className="border p-2 flex justify-between">
      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      <div className="ml-2 w-full">
        <div>
          <div>
            <span className="font-semibold">{comment?.commenterName}</span>
            <div className="float-right text-gray-400">
              <span className=" text-sm ">{`${dayjs(
                comment.createdAt
              ).fromNow()}`}</span>
              {isCommentAuthor && (
                <button
                  onClick={() =>
                    dispatch(deleteComment({ commentId: comment._id }))
                  }
                  className="small-button"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-400">{`@${comment?.commenterUsername}`}</p>
          <div className="my-2">{comment.comment}</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

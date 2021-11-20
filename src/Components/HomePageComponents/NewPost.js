import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/postSlice";

const NewPost = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [showContentLengthChip, setShowContentLengthChip] = useState(false);

  const color = content.length > 350 ? { color: "red" } : { color: "white" };
  const disableBtn = content === "" || content.length > 350;

  const submitHandler = (e) => {
    e.preventDefault();
    setContent("");
    dispatch(createPost({ author: user._id, content: content }));
  };

  return (
    <div className="py-2 px-3 border">
      <form onSubmit={submitHandler}>
        <div className="flex">
          <div className="w-12 h-10 mr-3 rounded-full bg-gray-400"></div>
          <div className="w-full">
            <textarea
              value={content}
              ref={textareaRef}
              onFocus={() => setShowContentLengthChip(true)}
              onChange={(e) => setContent(e.target.value)}
              className="p-2 focus:outline-none w-full rounded-sm resize-none"
              style={{
                height: `${textareaRef?.current?.scrollHeight}px`,
              }}
              placeholder="What's Happening?"
              name="content"
              id="content-input-field"
              aria-label="Post content"
            ></textarea>
            <div className="flex justify-between w-full">
              <div>
                {showContentLengthChip && (
                  <span className="bg-blue-400 rounded-full py-1 px-2 text-white">
                    <span style={color}>{content.length}</span>
                    {" / 350"}
                  </span>
                )}
              </div>
              <button type="submit" className="button" disabled={disableBtn}>
                Tweet
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPost;

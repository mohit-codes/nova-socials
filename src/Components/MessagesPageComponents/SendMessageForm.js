import { useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../SocketContext/socketContext";

const SendMessageForm = ({ recipient }) => {
  const [text, setText] = useState("");
  const socket = useSocket();
  const { _id, name, email, username } = useSelector(
    (state) => state.user.data
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");

    socket.emit("sendMessage", {
      sender: { _id, name, email, username },
      receiver: recipient,
      message: text,
    });
  };

  return (
    <form
      className="flex mt-auto py-3 px-2 border space-x-2"
      onSubmit={handleSubmit}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Your Message"
        placeholder="Your Message"
        className="rounded-full px-2 py-1 border-2 w-full"
      />
      <button className="button" type="submit" disabled={text === ""}>
        Send
      </button>
    </form>
  );
};

export default SendMessageForm;

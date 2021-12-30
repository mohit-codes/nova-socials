const InitialSectionCover = ({ setShowNewMessageModal }) => {
  return (
    <div className="border hidden h-full lg:flex items-center justify-center w-4/5 max-w-xl">
      <div className="">
        <p className="font-bold text-2xl">
          You don’t have a<br /> message selected
        </p>
        <p className="mt-2">
          Choose one from your existing messages, or start <br /> a new one.
        </p>
        <button
          onClick={() => setShowNewMessageModal(true)}
          className="button mt-4"
        >
          New Message
        </button>
      </div>
    </div>
  );
};

export default InitialSectionCover;

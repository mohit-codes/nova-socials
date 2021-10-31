export const Input = ({ callback, value, placeholder, id, ariaLabelledBy }) => {
  return (
    <input
      onChange={(e) => callback(e.target.value)}
      placeholder={placeholder}
      value={value}
      id={id}
      type="text"
      className="border-2 border-gray-400 rounded-md w-full p-2 my-2"
      aria-labelledby={ariaLabelledBy}
    />
  );
};

export const Label = ({ labelText, htmlFor, id }) => {
  return (
    <label htmlFor={htmlFor} className="font-semibold" id={id}>
      {labelText}
    </label>
  );
};

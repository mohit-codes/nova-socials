const SearchField = ({ onFocus, onBlur, role, ariaOwns, value, callback }) => {
  return (
    <input
      onFocus={onFocus}
      onBlur={onBlur}
      type="search"
      role={role}
      aria-label="Search"
      aria-owns={ariaOwns}
      placeholder="Search Users"
      value={value}
      onChange={callback}
      className="rounded-full border-2 border-gray-200 w-full h-10 outline-none px-2"
    />
  );
};

export default SearchField;

import { useState } from "react";
import { UserTileComponent } from "../ProfilePageComponents/UserTileComponent";
import Spinner from "../Spinner";
import { useSearch } from "./useSearch";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const { loading, result } = useSearch(searchText);
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="w-full mt-2">
      <input
        onFocus={() => setShowDropDown(true)}
        onBlur={() => setShowDropDown(false)}
        type="search"
        role="combobox"
        aria-label="Search"
        aria-owns="dropdown-1"
        placeholder="Search Users"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="rounded-full border-2 border-gray-200 w-full h-10 outline-none px-2"
      />
      {showDropDown && (
        <div
          role="listbox"
          id="dropdown-1"
          className="rounded-lg h-32 w-full shadow-md mb-2 text-center pt-4"
        >
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div>
              {result.length === 0 && (
                <p className=" font-medium text-gray-500">
                  Try searching by name or username
                </p>
              )}
              {result.map((user) => (
                <UserTileComponent user={user} key={user._id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;

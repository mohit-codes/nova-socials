import { useState } from "react";
import { UserTileComponent } from "../ProfilePageComponents/UserTileComponent";
import Spinner from "../Spinner";
import SearchField from "./SearchField";
import { useSearch } from "./useSearch";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const { loading, result } = useSearch(searchText);
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="w-full mt-2">
      <SearchField
        onFocus={() => setShowDropDown(true)}
        onBlur={() => setShowDropDown(false)}
        role="combobox"
        ariaOwns="dropdown-1"
        value={searchText}
        callback={(e) => setSearchText(e.target.value)}
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

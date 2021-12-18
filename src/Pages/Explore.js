import { useState } from "react";
import { UserTileComponent } from "../Components/ProfilePageComponents/UserTileComponent";
import { useSearch } from "../Components/Search/useSearch";
import SideNavigationBar from "../Components/SideNavigationBar/SideNavigationBar";
import Spinner from "../Components/Spinner";

export const Explore = () => {
  const [searchText, setSearchText] = useState("");
  const { loading, result } = useSearch(searchText);

  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border ml-0 md:ml-28 lg:ml-0">
        <div className="fixed w-600 h-10 bg-white flex items-center p-2 border">
          <span className="font-semibold" role="heading">
            Explore
          </span>
        </div>
        <div className="mt-10 w-full px-5">
          <div className="pt-3">
            <input
              type="search"
              aria-label="Search"
              placeholder="Search Users"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="rounded-full border-2 border-gray-200 w-full h-10 outline-none px-2"
            />
          </div>
          <div className="w-full pt-4">
            {loading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <div>
                {result.length === 0 && (
                  <p className="text-center font-medium text-gray-500">
                    Try searching by name or username
                  </p>
                )}
                {result.map((user) => (
                  <UserTileComponent user={user} key={user._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

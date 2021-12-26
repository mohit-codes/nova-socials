import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFollowing } from "../../features/user/userSlice";
import Spinner from "../Spinner";

import { UserTileComponent } from "../UserTileComponent";

const Following = ({ userId }) => {
  const {
    data: { _id: clientId },
    retrievedUser: { following },
    profileTabsFetching,
    errorMessage,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFollowing({ userId, clientId }));
  }, []);

  return (
    <div className="mt-2">
      {following.length != 0 && !profileTabsFetching && errorMessage && (
        <div className="text-center">{errorMessage}</div>
      )}
      {following.length == 0 && !profileTabsFetching && (
        <div className="text-center">No Following</div>
      )}
      {profileTabsFetching ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        following.map((user) => {
          return <UserTileComponent key={user._id} user={user} />;
        })
      )}
    </div>
  );
};

export default Following;

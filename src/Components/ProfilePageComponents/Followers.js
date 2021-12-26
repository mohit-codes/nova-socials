import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFollowers } from "../../features/user/userSlice";
import Spinner from "../Spinner";
import { UserTileComponent } from "../UserTileComponent";

const Followers = ({ userId }) => {
  const {
    data: { _id: clientId },
    retrievedUser: { followers },
    profileTabsFetching,
    errorMessage,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFollowers({ userId, clientId }));
  }, []);

  return (
    <div className="mt-2">
      {followers.length != 0 && !profileTabsFetching && errorMessage && (
        <div className="mt-5 text-center">{errorMessage}</div>
      )}
      {followers.length == 0 && !profileTabsFetching && (
        <div className="mt-5 text-center">No Followers</div>
      )}
      {profileTabsFetching ? (
        <div className="flex justify-center mt-5">
          <Spinner />
        </div>
      ) : (
        followers.map((follower) => {
          return <UserTileComponent key={follower._id} user={follower} />;
        })
      )}
    </div>
  );
};

export default Followers;

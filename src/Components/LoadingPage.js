import Spinner from "./Spinner";
const LoadingPage = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center bg-blend-saturation bg-white">
      <Spinner />
      <h1 className="mt-4 text-lg font-semibold tracking-wider">Loading...</h1>
    </div>
  );
};

export default LoadingPage;

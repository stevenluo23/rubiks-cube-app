import { Link } from "react-router-dom";
import Button from "../components/button/Button";

const PageNotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <span className="text-[5vh]">❌ Page Not Found</span>
      <Link to="/">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
};

export default PageNotFound;

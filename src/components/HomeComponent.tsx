import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase-config";
import { useNavigate, Link } from "react-router-dom";
import BlogField from "./BlogField";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out success");
        navigate("/signup");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className='p-5 h-screen '>
      <div className='flex gap-3 mb-5'>
        <Button
          size='lg'
          variant='outline'
          asChild>
          <Link to='/add-new-post'>Add New Post</Link>
        </Button>
        <Button
          size='lg'
          variant='outline'
          onClick={handleSignOut}>
          Log Out
        </Button>
      </div>
      <BlogField />
    </div>
  );
};

export default HomeComponent;

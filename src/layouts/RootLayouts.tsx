import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase-config";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import BlogField from "@/components/BlogField";

const RootLayouts = () => {
  const location = useLocation();
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
    <div className='p-5 bg-blue-950 h-full'>
      <div className='flex gap-3 mb-5'>
        <Button
          className='bg-zinc-800 text-white hover:bg-zinc-900'
          size='lg'
          asChild>
          <Link to='/add-new-post'>Add New Post</Link>
        </Button>
        <Button
          className='bg-zinc-800 text-white hover:bg-zinc-900'
          size='lg'
          onClick={handleSignOut}>
          Log Out
        </Button>
      </div>
      {location.pathname === "/" ? <BlogField /> : <Outlet />}
    </div>
  );
};

export default RootLayouts;

import { auth } from "@/firebase-config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import HomeComponent from "@/components/HomeComponent";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/signup");

        return;
      }

      setIsLoading(false);
    });
  }, []);

  return isLoading ? <Loader /> : <HomeComponent />;
};

export default HomeScreen;

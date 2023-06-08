import { useState, useEffect } from "react";
import { auth } from "@/firebase-config";
import { useNavigate } from "react-router-dom";

export const useValidateUsers = (navigatedTo: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate(navigatedTo);

        return;
      }
      setIsLoading(false);
    });
  }, []);

  return { isLoading };
};

import SignUpComponent from "@/components/SignUpComponent";
import Loader from "@/components/Loader";
import { useValidateUsers } from "@/hooks/useValidateUsers";

const SignInScreen = () => {
  const { isLoading } = useValidateUsers("/homepage");

  return isLoading ? <Loader /> : <SignUpComponent componentModel='SignIn' />;
};

export default SignInScreen;

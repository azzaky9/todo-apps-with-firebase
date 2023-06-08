import SignUpComponent from "@/components/SignUpComponent";
import { useValidateUsers } from "@/hooks/useValidateUsers";
import Loader from "@/components/Loader";

const SignUpScreen = () => {
  const { isLoading } = useValidateUsers("/homepage");

  return isLoading ? <Loader /> : <SignUpComponent componentModel='SignUp' />;
};

export default SignUpScreen;

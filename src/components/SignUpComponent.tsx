import { ChangeEvent, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase-config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type SignInputProps = {
  componentModel: "SignUp" | "SignIn";
};

type ErrorInfoTypes = {
  errorCode: string;
  errorMessage: string;
};

const SignUpComponent: React.FC<SignInputProps> = ({ componentModel }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorInfo, setErrorInfo] = useState<ErrorInfoTypes>({
    errorCode: "",
    errorMessage: "",
  });

  const { toast } = useToast();

  const navigate = useNavigate();

  const mountToastSuccess = () => {
    toast({
      title: "Succesfully Created Your Account ",
      description: "Please Log in with your email and password you've created",
      action: (
        <ToastAction altText='Log In'>
          <Navigate to='/signin' />
          Log In
        </ToastAction>
      ),
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, input.email, input.password)
      .then(() => {
        mountToastSuccess();
        setInput({ email: "", password: "" });
      })
      .catch((e) => {
        setErrorInfo({ ...errorInfo, errorCode: e.code, errorMessage: e.message });
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((e) => {
        return e;
      });
  };

  const renderTextDynamic = componentModel === "SignUp" ? "Sign Up" : "Sign In";

  return (
    <div className='h-screen grid place-content-center space-y-5 bg-blue-950'>
      <Card className='sm:w-full md:w-[420px]  py-5'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>{renderTextDynamic}</CardTitle>
          <CardDescription>
            {componentModel === "SignUp" ? (
              <>
                Already have account? please{" "}
                <Link
                  to='/signin'
                  className='text-rose-600 font-bold hover:underline '>
                  Log in
                </Link>
              </>
            ) : (
              <>
                Not already have account?
                <Link
                  to='/signup'
                  className='text-rose-600 font-bold hover:underline pl-2'>
                  Signup
                </Link>
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label
            htmlFor='email'
            className='text-lg'>
            Email
          </Label>
          <Input
            value={input.email}
            type='email'
            placeholder='Email'
            name='email'
            className='mb-2'
            autoComplete='off'
            onChange={handleInput}
          />
          <span className='text-red-600 text-xs block mb-5'>{errorInfo.errorMessage}</span>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <Input
              value={input.password}
              type={isPasswordVisible ? "text" : "password"}
              placeholder='password'
              name='password'
              onChange={handleInput}
            />
            <span
              className='absolute right-0 top-0 hover:cursor-pointer p-2 pr-3'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <AiOutlineEye className='text-2xl' />
              ) : (
                <AiOutlineEyeInvisible className='text-2xl' />
              )}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant='secondary'
            onClick={componentModel === "SignUp" ? signUp : signIn}>
            {renderTextDynamic}
          </Button>
          <Toaster />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpComponent;

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
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type SignInputProps = {
  componentModel: "SignUp" | "SignIn";
};

const SignUpComponent: React.FC<SignInputProps> = ({ componentModel }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErr("");
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/homepage");
      })
      .catch((e) => {
        const errorCode = e.code;
        // const errorMsg = e.message;

        setErr(errorCode);
      });
  };

  const renderTextDynamic = componentModel === "SignUp" ? "Sign Up" : "Sign In";

  return (
    <div className='h-screen p-16 grid place-content-center space-y-5'>
      <Card className='w-[463px]'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>{renderTextDynamic}</CardTitle>
          {componentModel === "SignUp" ? (
            <CardDescription>
              If you already have account please{" "}
              <Link
                to='/signin'
                className='text-rose-600 font-bold hover:underline'>
                Log in
              </Link>
            </CardDescription>
          ) : null}
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
          <span className='text-red-600 text-xs block mb-5'>{err}</span>
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpComponent;

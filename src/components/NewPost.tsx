import { ChangeEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "@/firebase-config";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";

type Todo = {
  headline: string;
  description: string;
};

const NewPost = () => {
  const navigate = useNavigate();

  const [blogpost, setBlogpost] = useState<Todo>({
    headline: "",
    description: "",
  });

  const handleBlogPost = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlogpost({ ...blogpost, [name]: value });
  };

  const user = auth.currentUser;
  const uuid = user?.uid || "";
  const email = user?.email || "";

  const onSubmitBlog = async () => {
    const postRef = doc(db, "blogPost", "Cb51UF1OSe5swgBG0ACp");

    await updateDoc(postRef, {
      post: arrayUnion({
        id: uuid,
        title: blogpost.headline,
        description: blogpost.description,
        email: email,
      }),
    })
      .then(() => {
        navigate("/homepage");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className='h-screen w-full grid place-content-center'>
      <Card className='w-96 bg-transparent '>
        <CardHeader>
          <CardTitle>Add New Post</CardTitle>
          <CardDescription>Try to add text for your blog</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-5'>
          <Label htmlFor='headline'>Headline</Label>
          <Input
            className='focus-visible:ring-offset-0'
            type='text'
            value={blogpost.headline}
            name='headline'
            onChange={handleBlogPost}
          />
          <Label>Description</Label>
          <textarea
            className='focus-visible:ring-offset-0'
            value={blogpost.description}
            name='description'
            onChange={handleBlogPost}
          />
        </CardContent>
        <CardFooter>
          <Button
            className='bg-rose-500 hover:bg-rose-800 w-full'
            onClick={onSubmitBlog}>
            Create Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewPost;

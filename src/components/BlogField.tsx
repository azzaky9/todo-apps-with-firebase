import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardFooter } from "./ui/card";
import { RxInfoCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

export interface TRetrieveData {
  id: string;
  title: string;
  description: string;
  email: string;
}

const BlogField = () => {
  const [retrieveData, setRetrieveData] = useState<TRetrieveData[]>([]);
  const docRef = doc(db, "blogPost", "Cb51UF1OSe5swgBG0ACp");

  const getDataFromFireBase = async () => {
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    setRetrieveData(data?.post);
  };

  useEffect(() => {
    getDataFromFireBase();
  }, []);

  return (
    <div className='p-10 h-[1000px] flex flex-col gap-3 items-center'>
      {retrieveData?.map((user, index) => (
        <Card
          key={index}
          className='w-full md:w-[480px] lg:w-[1000px] '>
          <CardHeader className='gap-3'>
            <div>
              <h2
                className='font-semibold text-lg
              '>
                {user.title}
              </h2>
              <span className='text-rose-800 text-sm'>dipost oleh: {user.email}</span>
            </div>
            <CardDescription>{user.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link to={`/${user.id}`}>
              <RxInfoCircled className='text-2xl text-black hover:cursor-pointer' />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogField;

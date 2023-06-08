import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface TRetrieveData {
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
    <div className='h-screen w-full flex flex-col gap-3 items-center'>
      {retrieveData?.map((user, index) => (
        <Card
          key={index}
          className='w-[489px]'>
          <CardHeader className='gap-3'>
            <CardTitle>
              {user.title}
              <span className='font-normal text-rose-800 text-sm ps-2'>
                Di Post Oleh: {user.email}
              </span>
            </CardTitle>
            <CardTitle className='font-normal'>{user.description}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default BlogField;

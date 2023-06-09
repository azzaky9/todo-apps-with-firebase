import { getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { TRetrieveData } from "./BlogField";
import { useEffect, useState } from "react";

const RenderPost = () => {
  const { IdPost } = useParams();
  const [retrieveObject, setRetrieveObject] = useState<TRetrieveData>();

  const docRef = doc(db, "blogPost", "Cb51UF1OSe5swgBG0ACp");

  const findItem = async () => {
    const docSnap = await getDoc(docRef);
    const datas: TRetrieveData[] = docSnap?.data()?.post;
    const getItemFromDatas = datas.find((item) => item.id === IdPost);

    setRetrieveObject(getItemFromDatas);
  };

  useEffect(() => {
    findItem();
  }, []);

  return (
    <div>
      <h1>{retrieveObject?.title}</h1>
      <p>{retrieveObject?.description}</p>
    </div>
  );
};

export default RenderPost;

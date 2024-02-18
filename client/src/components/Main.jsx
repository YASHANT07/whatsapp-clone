import  { useEffect ,useState} from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged} from "firebase/auth";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";

function Main() {
  const router = useRouter();
  const [{userInfo},dispatch] = useStateProvider();
  const[redirectLogin,setRedirectLogin]=useState(false);

  

  useEffect(()=>{
    if(redirectLogin)
    {
      router.push("/login");
    }
  },[redirectLogin]);


  return (<>
  <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full over">
    <ChatList/>
    {/* <Empty/> */}
    {/* <Chat/> */}
    </div></>
)};

export default Main;

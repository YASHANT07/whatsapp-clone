import React, { useEffect } from "react";
import Image from "next/image";
import {FcGoogle} from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from 'next/router';
import { reducerCases } from "@/context/constants.js";
import { useStateProvider } from "@/context/StateContext";
import axios from "axios";


function login() {
  const router = useRouter()


  const [{userInfo,newUser},dispatch] = useStateProvider();

  useEffect(()=>{
 if(userInfo?.id && !newUser){
  router.push("/");
 }
  },[userInfo,newUser])

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    console.log(provider)
    const {
      user:{ displayName: name, email, photoUrl: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    console.log(user)
    if (email) {
      try {
          const { data } = await axios.post(CHECK_USER_ROUTE, { email });
          console.log({ data });
    
          if (!data.status) {
            dispatch({
              type: reducerCases.SET_NEW_USER,
              newUser: true,
            });
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                name,
                email,
                profileImage,
                status: "",
              },
            });
            router.push("/onboarding");
          } else{
            const {id,name,email,profilePicture:profileImage,status} = data.data;
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
              id,
              name,
              email,
              profileImage,
              status,
              },
            });
            router.push("/");
  
          }
        
      } catch (error) {
        console.error("Login error:", error);
    
        // You can display a user-friendly error message to the user, or log more details for debugging.
        // For example:
        // alert("An error occurred during login. Please try again.");
      }
    }
    
  };

  return <div className=" flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
    <div className="flex item-center justify-center text-white gap-2 ">
     <Image
     src="/whatsapp.gif" alt="whatsapp" height={300} width={300}/>
     <span className="text-7xl m-28">whatsapp</span>
    </div>
    <button className="flex item-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg">
      <FcGoogle className="text-4xl"/>
      <span className="text-white text-2xl " onClick={handleLogin}> Login with google</span>
    </button>

  </div> 
};

export default login;

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppContext } from "../../Container/App";
import { Apptype } from "../../Interfaces/interfaces";
import { auth } from "../../Firebase";
import { HomeContext } from "./Home";
import { HomeType } from "../../Interfaces/interfaces";
import { AiFillGoogleCircle } from "react-icons/ai";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { GrCheckmark } from "react-icons/gr";
import { showModal } from "../Pages/Modal";

function Login() {
  const showPreloader = useContext<Apptype | null>(AppContext);
  const mailref: React.RefObject<HTMLInputElement> = useRef(null);
  const passref: React.RefObject<HTMLInputElement> = useRef(null);
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const login = useContext<HomeType | null>(HomeContext);

  // const [datas, setDatas] = useState<dataType>();

  const signin = () => {
    let mail: string = mailref.current?.value as string;
    let pass: string = passref.current?.value as string;
    setLoading(true);
    if (mail && pass && mailref.current?.style.border !== "2px solid red") {
      signInWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          showPreloader?.showPreloader();
          setLoading(false);
          try {
            (async () => {
              const data = await getDoc(
                doc(db, "Users", `${mail.substring(0, mail.length - 10)}`)
              );
              const dataval = { ...data.data() };
              // setDatas(dataval as dataType);
              navigate("/dashBoard", {
                state: {
                  data: {
                    mail: `${mail.substring(0, mail.length - 10)}`,
                    Username: dataval.Username,
                    Type: dataval.Type,
                  },
                },
              });
            })();
          } catch (error) {
            setLoading(false);
            showModal({
              title: `${error}`,
              type: "ok",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.message === "Firebase: Error (auth/network-request-failed)."
          ) {
            showModal({
              title: "No Internet Connection",
              type: "ok",
            });
          } else if (
            error.message === "Firebase: Error (auth/invalid-email)."
          ) {
            showModal({
              title: "Invalid Login Details",
              type: "ok",
            });
          } else {
            showModal({
              title: error.message,
              type: "ok",
            });
          }
        })
        .finally(() => {
          mailref.current!.focus();
          passref.current!.focus();
          setLoading(false);
          setLoaded(true);
          setTimeout(() => {
            setLoaded(false);
          }, 2000);
        });
    } else {
      setLoaded(false);
      showModal({
        title: "Please Fill all input fields",
        type: "ok",
      });
    }
  };

  const register = () => {
    login?.setlogin(false);
  };

  const forgotpass = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, mailref.current!.value)
      .then(() => {
        showModal({
          title: "Password Rest Link Sent To Registered Email",
          type: "ok",
        });
      })
      .catch((err) => {
        err.message === "Firebase: Error (auth/network-request-failed)."
          ? showModal({
              title: "Network Error, Please Check Your Network Connection",
              type: "ok",
            })
          : showModal({
              title: err.message,
              type: "ok",
            });
      });
  };

  const spec = () => {
    showPreloader?.showPreloader();
    navigate("/dashBoard", {
      state: {
        data: {
          Username: "dammy",
          Email: "damil@gmail.com",
          Tel: "090779568585",
          Balance: 9,
          Type: "Admin",
        },
      },
    });
  };

  return (
    <div className="loginform shadow-black flex flex-col justify-center">
      <img
        className="homelogo"
        src={require("../../Assets/d.png")}
        alt="Logo"
      />
      <h1 className="text-center font-bold text-3xl mb-2"> Welcome Back!!! </h1>
      <input
        className="border-2 border-solid border-black my-3 rounded-md"
        placeholder="Enter Your Email"
        type="email"
        ref={mailref}
      />
      <input
        className="border-2 border-solid rounded-md border-black my-3"
        type="Password"
        placeholder="Enter Your Password"
        ref={passref}
      />
      <div className="flex flex-row mb-3">
        <input type="checkbox" name="" id="" />
        <p className="ml-1"> Remember Me </p>
        <p className="ml-auto cursor-pointer" onClick={forgotpass}>
          {" "}
          Forgot Password{" "}
        </p>
      </div>
      <button
        onClick={signin}
        className={`bg-black ${
          loaded && "bg-white"
        } signinbtn rounded-md mb-3 text-sm text-white py-2 transition-all hover:bg-white border-2 hover:text-black border-black`}
      >
        {loading && !loaded ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 loadsvg w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : loaded ? (
          <div className="loaded">
            <GrCheckmark color="white" />
          </div>
        ) : (
          `Sign In`
        )}
      </button>

      <button
        onClick={spec}
        className="rounded-md flex text-center justify-center mb-3 text-sm text-black py-2 transition-all hover:bg-white border-2 border-black"
      >
        {" "}
        <AiFillGoogleCircle size={20} /> Sign In With Google{" "}
      </button>

      <div className="flex flex-row">
        {" "}
        Dont have an account?{" "}
        <p className="ml-1 font-bold cursor-pointer" onClick={register}>
          {" "}
          Sign Up{" "}
        </p>{" "}
      </div>
    </div>
  );
}

export default Login;

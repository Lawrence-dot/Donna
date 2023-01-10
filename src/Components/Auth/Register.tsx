import React, { useContext, useRef, useState } from "react";
import { HomeContext } from "./Home";
import { dataType, HomeType } from "../../Interfaces/interfaces";
import { AiFillEye, AiFillGoogleCircle } from "react-icons/ai";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { AppContext } from "../../Container/App";
import { Apptype } from "../../Interfaces/interfaces";
import { showModal } from "../Pages/Modal";

function Register() {
  const login = useContext<HomeType | null>(HomeContext);
  const loader = useContext<Apptype | null>(AppContext);
  const mailref: React.RefObject<HTMLInputElement> = useRef(null);
  const passref: React.RefObject<HTMLInputElement> = useRef(null);
  const nameref: React.RefObject<HTMLInputElement> = useRef(null);
  const phoneref: React.RefObject<HTMLInputElement> = useRef(null);
  const [Loading, setLoading] = useState<boolean>(false);

  const loginpage = () => {
    login?.setlogin(true);
  };

  const showText = (e: any) => {
    let input = e.target.parentNode.children[0];
    let span: Event = e.target;
    input.classList.toggle("eye");
    // if ((span.className = "eye")) {
    //   input.type = "text";
    //   console.log("kk");
    // } else {
    //   input.type = "password";
    // }

    console.log(span);
  };

  const register = () => {
    const auth = getAuth();
    if (
      mailref.current?.value &&
      nameref.current?.value &&
      passref.current?.value &&
      phoneref.current?.value
    ) {
      const info: dataType = {
        Username: nameref.current?.value,
        Tel: Number(phoneref.current?.value),
        Balance: 0,
        Email: mailref.current?.value,
      };
      setLoading(true);
      try {
        createUserWithEmailAndPassword(
          auth,
          mailref.current.value,
          passref.current.value
        )
          .then(() => {
            setDoc(
              doc(
                db,
                "Users",
                `${mailref.current!.value.substring(
                  0,
                  mailref.current!.value.length - 10
                )}`
              ),
              info
            )
              .then(() => {
                showModal({
                  title: "User Created Succesfully",
                  type: "ok",
                });
                loader?.showPreloader();
                loginpage();
              })
              .finally(() => {
                setLoading(false);
              });
          })
          .catch((err) => {
            setLoading(false);
            if (
              err.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
              alert("User Exists");
            } else {
              alert(err.message);
            }
          });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Fill all blank fields");
    }
  };

  return (
    <div className="register">
      <div className="back cursor-pointer" onClick={loginpage}>
        &#9754;
      </div>
      <div className="regform flex flex-col justify-center">
        <img
          className="homelogo"
          src={require("../../Assets/d.png")}
          alt="Logo"
        />
        <h1 className="text-center font-bold text-3xl mb-2"> Register </h1>
        <input
          className="border-2 border-solid border-black my-3 rounded-md"
          placeholder="Enter Your Email Address"
          type="email"
          ref={mailref}
        />
        <input
          className="border-2 border-solid rounded-md border-black my-3"
          type="text"
          placeholder="Enter Your Phone Number"
          ref={phoneref}
        />
        <input
          className="border-2 border-solid rounded-md border-black my-3"
          type="text"
          placeholder="Username"
          ref={nameref}
        />
        <div className="flex relative">
          <input
            className="border-2 w-full border-solid rounded-md border-black my-3"
            type="text"
            placeholder="Enter Your Password"
          />
          <span className="absolute eyes cursor-pointer" onClick={showText}>
            <AiFillEye />
          </span>
        </div>
        <div className="flex relative">
          <input
            className="border-2 w-full border-solid rounded-md border-black my-3"
            type="text"
            placeholder="Confirm Your Password"
            ref={passref}
          />
          <span className="absolute eyes cursor-pointer" onClick={showText}>
            <AiFillEye />
          </span>
        </div>
        <button
          onClick={register}
          className="bg-black signinbtn rounded-md mb-3 text-sm text-white py-2 transition-all hover:bg-white border-2 hover:text-black border-black"
        >
          {Loading ? (
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
          ) : (
            `Register`
          )}
        </button>

        <button className="rounded-md flex text-center justify-center mb-3 text-sm text-black py-2 transition-all hover:bg-white border-2 border-black">
          {" "}
          <AiFillGoogleCircle size={20} /> Sign Up With Google{" "}
        </button>
      </div>
    </div>
  );
}

export default Register;

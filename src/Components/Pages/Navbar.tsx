import { getAuth, signOut } from "firebase/auth";
import React, { useContext } from "react";
import { navtype } from "../../Interfaces/interfaces";
import { AppContext } from "../../Container/App";
import { Apptype } from "../../Interfaces/interfaces";
import { navContext } from "./Dasboard";
import {
  AiOutlineAccountBook,
  AiOutlineBank,
  AiOutlineDollar,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";
import { showModal } from "./Modal";
import { useNavigate } from "react-router";

function Navbar() {
  const navcontext = useContext<navtype | null>(navContext);
  const showPreloader = useContext<Apptype | null>(AppContext);
  // const login = useContext<HomeType | null>(HomeContext);
  const navigate = useNavigate();
  const signout = () => {
    const auth = getAuth();
    showModal({
      title: "Are you sure you want to logout ?",
      type: "yesno",
      function: () => {
        signOut(auth)
          .then(() => {
            showPreloader?.showPreloader();
            navigate("/");
          })
          .catch((err) => {
            console.log(err.message);
          });
      },
    });
  };
  return (
    <div
      className={`navbar bg-blue-900 ${
        navcontext?.open ? "show" : "hide"
      } fixed z-20 md:relative w-60 md:w-80`}
    >
      <div className="dashback"></div>
      <div
        className={`dashboardnav opacity-95 fixed bg-blue-900 border border-none border-l-1 py-5 container-d transition-all backdrop-blur-sm`}
      >
        <div className="flex flex-col">
          <img
            className="navimg mt-2"
            src={require("../../Assets/d.png")}
            height="50"
            alt=""
          />
        </div>

        <div className="navlinks md:mt-20 mt-16 text-white">
          <div className="flex flex-col">
            <div
              id="dashboard"
              onClick={navcontext?.switchNav}
              className="navli px-4 cursor-pointer border border-blue-900 hover:border-blue-700 hover:bg-blue-900 py-2 md:text-lg text-md font-thin font-sans rounded-md flex"
            >
              <span className="mt-1">
                <AiOutlineCalendar />
              </span>
              <span className="ml-1 font-semibold"> My Dashboard</span>
            </div>
            <div
              id="sell"
              onClick={navcontext?.switchNav}
              className="navli px-4 cursor-pointer border border-blue-900 hover:border-blue-700 hover:bg-blue-900 py-2 md:text-lg text-md font-thin font-sans rounded-md flex"
            >
              <span className="mt-1">
                <AiOutlineDollar />
              </span>
              <span className="ml-1 font-semibold"> Sell a Giftcard</span>
            </div>
            <div
              id="transact"
              onClick={navcontext?.switchNav}
              className="navli px-4 cursor-pointer border border-blue-900 hover:border-blue-700 hover:bg-blue-900 py-2 md:text-lg text-md  font-thin font-sans rounded-md flex"
            >
              <span className="mt-1">
                <AiOutlineUser />
              </span>
              <span className="ml-1 font-semibold"> Transaction Status</span>
            </div>
            <div
              id="withdraw"
              onClick={navcontext?.switchNav}
              className="navli px-4 cursor-pointer border border-blue-900 hover:border-blue-700 hover:bg-blue-900 py-2 md:text-lg text-md font-thin font-sans rounded-md flex"
            >
              <span className="mt-1">
                <AiOutlineDollar />
              </span>
              <span className="ml-1 font-semibold"> Withdraw Funds</span>
            </div>
            <div
              id="records"
              onClick={navcontext?.switchNav}
              className="navli px-4 cursor-pointer border border-blue-900 hover:border-blue-700 hover:bg-blue-900 py-2 md:text-lg text-md placeholder:font-thin font-sans rounded-md flex"
            >
              <span className="mt-1">
                <AiOutlineAccountBook />
              </span>
              <span className="ml-1 font-semibold"> General Records</span>
            </div>
            <div
              id="bank"
              onClick={navcontext?.switchNav}
              className="navli px-4 cursor-pointer border border-blue-900 hover:border-blue-700 hover:bg-blue-900 py-2 md:text-lg text-md font-thin font-sans rounded-md flex"
            >
              <span className="mt-1">
                <AiOutlineBank />
              </span>
              <span className="ml-1 font-semibold"> Bank Details</span>
            </div>
          </div>
        </div>

        <div className="logout">
          <span
            className="logout cursor-pointer flex text-white text-md md:text-xl "
            onClick={signout}
          >
            <AiOutlineLogout color="red" />
            <p className="ml-2 font-semibold">Log Out</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

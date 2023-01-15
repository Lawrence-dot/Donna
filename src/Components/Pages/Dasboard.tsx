import React, { useEffect, createContext } from "react";
import { useLocation } from "react-router";
import { dataType } from "../../Interfaces/interfaces";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgMenuBoxed, CgCloseR } from "react-icons/cg";
import Navbar from "./Navbar";
import { navtype } from "../../Interfaces/interfaces";
import { showModal } from "./Modal";
import Main from "./Main";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";

export const navContext = createContext<navtype | null>(null);

function Dasboard() {
  const [datas, setDatas] = useState<dataType>();
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  const fetchdata = async () => {
    const data = await getDoc(doc(db, "Users", `${location.state.data.mail}`));
    const dats = data.data();
    setDatas(dats as dataType);
  };

  useEffect(() => {
    (async () => {
      const data = await getDoc(
        doc(db, "Users", `${location.state.data.mail}`)
      );
      var dats = data.data();
      setDatas(dats as dataType);
    })();
    // console.log(dats);
    window.innerWidth > 639 ? setOpen(true) : setOpen(false);
  }, [location.state.data.mail]);

  useEffect(() => {
    showModal({
      type: "ok",
      title: `Welcome! ${location.state.data.Username}`,
    });

    window.innerWidth > 639 ? setOpen(true) : setOpen(false);
  }, [location.state.data.Username]);

  return (
    <navContext.Provider value={{ open, setOpen, fetchdata }}>
      <div className="dashBoard md:flex">
        <Navbar type={location.state.data.Type} />

        <div
          className="dasboardbody md:w-full bg-blue-900"
          onClick={() => {
            open && window.innerWidth < 640 && setOpen(false);
          }}
        >
          <div className="dashboardbdy py-2 pt-3 pb-10 w-full container-d">
            <div className="flex hometop relative">
              <img src={require("../../Assets/dw.png")} alt="" />

              <div
                className="flex relative w-full mx-auto"
                style={{ maxWidth: "180px" }}
              >
                <input
                  className="border z-10 w-full mx-auto text-white border-dark bg-transparent rounded-md"
                  type="text"
                />
                <span className="absolute flex justify-end mt-1.5 pr-2 w-full cursor-pointer">
                  <AiOutlineSearch color="white" />
                </span>
              </div>

              <span
                onClick={() => {
                  setOpen(!open);
                }}
                className=" md:hidden transition-all navtoggler w-11"
              >
                {" "}
                {open ? (
                  <CgCloseR color="white" />
                ) : (
                  <CgMenuBoxed color="white" />
                )}{" "}
              </span>
            </div>

            <Main datas={datas as dataType} />
          </div>
        </div>
      </div>
    </navContext.Provider>
  );
}

export default Dasboard;

import React, { useEffect, createContext } from "react";
import { useLocation } from "react-router";
import { dataType } from "../../Interfaces/interfaces";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineCalendar } from "react-icons/ai";
import { CgMenuBoxed, CgCloseR } from "react-icons/cg";
import { TbCurrencyNaira } from "react-icons/tb";
import Navbar from "./Navbar";
import { navtype } from "../../Interfaces/interfaces";
import Bank from "./Bank";
import { showModal } from "./Modal";
import { addbank, AddBank } from "./AddBank";
import { GrAddCircle } from "react-icons/gr";

export const navContext = createContext<navtype | null>(null);

function Dasboard() {
  const [datas, setDatas] = useState<dataType>();
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setDatas(location.state.data);
    showModal({
      type: "ok",
      title: `Welcome! ${location.state.data.Username}`,
    });
    window.innerWidth > 639 ? setOpen(true) : setOpen(false);
  }, [location.state.data]);

  const switchNav = (e: any) => {
    const docs: Element[] = Array.from(
      document.getElementsByClassName("contentmain")
    );
    console.log("Kolier");

    const classNames: string[] = [
      "bank",
      "sell",
      "transact",
      "dashboard",
      "withdraw",
      "records",
    ];

    if (classNames.includes(e.target?.id)) {
      docs.forEach((each, index) => {
        each.classList.add("hidden");
        each.id === e.target.id && each.classList.remove("hidden");
      });
      window.innerWidth < 640 && setOpen(false);
    } else if (classNames.includes(e.target!.parentNode.id)) {
      docs.forEach((each, index) => {
        each.classList.add("hidden");
        each.id === e.target.parentNode.id && each.classList.remove("hidden");
      });
      window.innerWidth < 640 && setOpen(false);
    } else if (classNames.includes(e.target!.parentNode.parentNode.id)) {
      docs.forEach((each, index) => {
        each.classList.add("hidden");
        each.id === e.target.parentNode.parentNode.id &&
          each.classList.remove("hidden");
      });
      window.innerWidth < 640 && setOpen(false);
    }
  };

  const getDate = () => {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var d = new Date();
    setInterval(() => {
      d = new Date();
    }, 1000);
    return `${months[d.getDay() - 1]} ${d.getDate()} ${d.getFullYear()} ${
      d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
    } : ${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()} ${
      d.getHours() > 12 ? "PM" : "AM"
    }`;
  };

  return (
    <navContext.Provider value={{ open, setOpen, switchNav }}>
      <div className="dashBoard md:flex">
        <Navbar />

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

            <div className="dashcontent relative">
              <div
                className="contentmain p-3 transition-all bg-gray-100 mt-12 rounded-d"
                id="dashboard"
              >
                <div className="flex flex-col sm:flex-row">
                  <h1 className="text-blue pt-4 justify-center text-center sm:text-left flex flex-row font-bold font-serif">
                    <AiOutlineCalendar className="mt-1" /> My Dashboard
                  </h1>
                  <div className="date mt-2 sm:mt-4 py-1 sm:ml-auto bg-white px-5 rounded-md">
                    {getDate()}
                  </div>
                </div>
              </div>

              <div
                className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
                id="sell"
              >
                <h1 className="text-blue pt-4 font-bold font-serif">
                  Sell A Giftcard
                </h1>
              </div>

              <div
                className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
                id="transact"
              >
                <h1 className="text-blue pt-4 font-bold font-serif">
                  Transaction Status
                </h1>
                <table className="mx-auto rounded-sm mt-3">
                  <thead>
                    <tr className="bg-blue-800 rounded-md">
                      <th className="px-3 font-semibold text-lg text-white">
                        {" "}
                        S/N{" "}
                      </th>
                      <th className="px-3 font-semibold text-lg text-white">
                        {" "}
                        Transaction Date{" "}
                      </th>
                      <th className="px-3 font-semibold text-lg text-white">
                        {" "}
                        Transaction Id{" "}
                      </th>
                      <th className="px-3 font-semibold text-lg text-white">
                        {" "}
                        Transaction Type{" "}
                      </th>
                      <th className="px-3 font-semibold text-lg text-white">
                        {" "}
                        Transaction Status{" "}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div
                className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
                id="withdraw"
              >
                <h1 className="text-blue pt-4 font-bold font-serif">
                  Withdraw Funds
                </h1>
                <h2 className="flex withdrawtext justify-center">
                  {" "}
                  Total Balance: <TbCurrencyNaira
                    height="100%"
                    color="black"
                  />{" "}
                  {datas?.Balance}{" "}
                </h2>
              </div>

              <div
                className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
                id="records"
              >
                <h1 className="text-blue pt-4 font-bold font-serif">
                  General Records
                </h1>
              </div>

              <div
                className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
                id="bank"
              >
                <h1 className="text-blue pt-4 font-bold font-serif">
                  <div className="flex flex-col text-left">
                    <h1
                      onClick={
                        () =>
                          showModal({
                            type: "custom",
                            title: "Add New Bank",
                            custom: AddBank,
                            function: addbank,
                          })
                        // document.getelemen
                      }
                      className="text-blue-900 mx-auto w-fit flex z-10  mb-3 cursor-pointer font-semibold text-center"
                    >
                      <GrAddCircle
                        className="mt-1 mr-1 text-blue-900"
                        color="blue"
                      />{" "}
                      Add A New Bank
                    </h1>
                    <div className="w-full md:w-1/2 mx-2">
                      <Bank
                        name={datas?.Account?.Main.name as string}
                        number={datas?.Account?.Main.number as number}
                        type={datas?.Account?.Main.type as string}
                      />
                    </div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </navContext.Provider>
  );
}

export default Dasboard;

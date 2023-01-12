import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import Bank from "./Bank";
import { showModal } from "./Modal";
import { addbank, AddBank } from "./AddBank";
import { GrAddCircle, GrUserAdmin } from "react-icons/gr";
import { dataType } from "../../Interfaces/interfaces";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

interface Props {
  datas: dataType;
}

function Main(props: Props) {
  var [data, setData] = useState<number>();
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

  useEffect(() => {
    const fetchUser = async () => {
      const dataref = collection(db, "Users");
      const datas = await getDocs(dataref);
      const ext = datas.docs;
      setData(ext.length as number);
    };
    props.datas?.Type === "Admin" && fetchUser();
  }, [props.datas?.Type]);

  return (
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

        {props.datas?.Type === "User" ? (
          <div></div>
        ) : (
          <div className="flex mt-4">
            <div className="user w-40 h-772 py-12 px-9 bg-white text-xl">
              <span className="w-full mx-auto text-center">
                <GrUserAdmin size="md" />
              </span>
              <span className="text-3xl"> {data} </span> Users
            </div>
          </div>
        )}
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="sell"
      >
        <h1 className="text-blue pt-4 font-bold font-serif">Sell A Giftcard</h1>
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="transact"
      >
        <h1 className="text-blue pt-4 font-bold font-serif">
          Transaction Status
        </h1>
        <table className="mx-auto flex flex-col sm:flex-row overflow-hidden rounded-md mt-3">
          <thead>
            <tr className="bg-blue-800 rounded-md">
              <th className="px-3 font-semibold text-lg text-white"> S/N </th>
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
        <h1 className="text-blue pt-4 font-bold font-serif">Withdraw Funds</h1>
        <h2 className="flex withdrawtext justify-center">
          {" "}
          Total Balance: <TbCurrencyNaira height="100%" color="black" />{" "}
          {props.datas?.Balance}{" "}
        </h2>
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="records"
      >
        <h1 className="text-blue pt-4 font-bold font-serif">General Records</h1>
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
              <GrAddCircle className="mt-1 mr-1 text-blue-900" color="blue" />{" "}
              Add A New Bank
            </h1>
            <div className="w-full md:w-1/2 mr-2 sm:mx-2">
              {props.datas?.Bank?.map((each) => {
                return (
                  <Bank
                    name={each.name as string}
                    number={each.number as number}
                    type={each.type as string}
                  />
                );
              })}
            </div>
          </div>
        </h1>
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="user"
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
              <GrAddCircle className="mt-1 mr-1 text-blue-900" color="blue" />{" "}
              Add A New Bank
            </h1>
            <div className="w-full md:w-1/2 mr-2 sm:mx-2">
              {props.datas?.Bank?.map((each) => {
                return (
                  <Bank
                    name={each.name as string}
                    number={each.number as number}
                    type={each.type as string}
                  />
                );
              })}
            </div>
          </div>
        </h1>
      </div>
    </div>
  );
}

export default Main;

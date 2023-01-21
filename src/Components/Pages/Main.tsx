import React, {
  useEffect,
  useContext,
  useState,
  RefObject,
  useRef,
} from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import Bank from "./Bank";
import { showModal } from "./Modal";
import { AddBank } from "./AddBank";
import { GrAddCircle, GrUserAdmin } from "react-icons/gr";
import { dataType, history } from "../../Interfaces/interfaces";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { navContext } from "../Pages/Dasboard";
import Status from "./Status";
import Choose from "./Choose";

interface Props {
  datas: dataType;
}

function Main(props: Props) {
  const [data, setData] = useState<number>();
  const ammountref: RefObject<HTMLInputElement> = useRef(null);
  const [history, setHistory] = useState<history[]>([]);
  const navcontext = useContext(navContext);
  // var dashcontent = useContext()

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
    var hour = d.getHours();
    setInterval(() => {
      d = new Date();
      hour = d.getHours();
      hour > 12 && (hour = hour - 12);
    }, 1000);
    return `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()} ${
      hour < 10 ? `0${hour}` : hour
    } : ${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()} ${
      d.getHours() > 12 ? "PM" : "AM"
    }`;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const dataref = collection(db, "Users");
      const datas = await getDocs(dataref);
      const ext = datas.docs;
      setData((ext.length - 1) as number);
    };
    fetchUser();
  }, [props.datas?.Type]);

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     const dataref = doc(db, "History", "All");
  //     const records = await getDoc(dataref);
  //     var spliced = records.data()?.History;
  //     var dara = spliced?.filter((item: history) => {
  //       return item.name === props.datas?.Username;
  //     });
  //     setHistory(dara as history[]);
  //   };
  //   console.log(props.datas.Type === "Admin");

  //   props.datas.Type === "Admin" && fetchHistory();
  // }, [props.datas?.Type]);

  useEffect(() => {
    (async () => {
      var dara;
      const dataref = doc(db, "History", "All");
      const records = await getDoc(dataref);
      var spliced = records.data()?.History;
      if (props.datas.Type !== "Admin") {
        dara = spliced?.filter((item: history) => {
          return item.name === props.datas?.Username;
        });
        setHistory(dara as history[]);
      } else {
        setHistory(spliced as history[]);
      }
    })();
  }, [props.datas]);

  const Addbanks = async () => {
    const data = {
      name: (document.getElementById("name") as HTMLInputElement)!.value,
      number: Number(
        (document.getElementById("number") as HTMLInputElement)!.value
      ),
      type: (document.getElementById("type") as HTMLInputElement)!.value,
    };

    const dataref = doc(
      db,
      "Users",
      `${props.datas.Email.substring(0, props.datas.Email.length - 10)}`
    );
    if (data.name.length > 1 && data.number > 10000 && data.type.length > 1) {
      await updateDoc(dataref, { Bank: arrayUnion(data) })
        .then(() => {
          navcontext?.fetchdata();
          showModal({
            type: "ok",
            title: "Bank Added Successfully",
          });
        })
        .catch((err) => {
          showModal({
            type: "ok",
            title: err.message,
          });
        });
    } else {
      showModal({
        type: "ok",
        title: `${props.datas.Username} Please Fill Out All Input Fields Correctly`,
      });
    }
  };

  const withdraw = async () => {
    const amount = ammountref.current?.value;
    const opts: Element[] = Array.from(
      document.getElementsByClassName("bankchoose")
    );
    var opt = opts.filter((each) => {
      return each.classList.contains("active");
    });

    if (opt.length === 1 && amount !== "" && amount !== null) {
      if (props.datas.Balance >= Number(amount)) {
        var pos: number = Number(opt[0].id);
        var obj = {
          bank: props.datas.Bank![pos],
          amount: amount,
          type: "withdraw",
          name: props.datas.Username,
          mail: props.datas.Email,
          status: "Pending",
          date: new Date().toDateString(),
          id: "lsmcsclm",
        };
        const dataref = doc(
          db,
          "Users",
          `${props.datas.Email.substring(0, props.datas.Email.length - 10)}`
        );

        const href = doc(db, "History", "All");

        await updateDoc(href, { History: arrayUnion(obj) })
          .then(async () => {
            const newbal = props.datas.Balance - Number(amount);
            await updateDoc(dataref, { Balance: newbal })
              .then(() => {
                navcontext?.fetchdata();
                (async () => {
                  const dataref = doc(db, "History", "All");
                  const records = await getDoc(dataref);
                  var spliced = records.data()?.History;
                  var dara = spliced?.filter((item: history) => {
                    return item.name === props.datas?.Username;
                  });
                  setHistory(dara as history[]);
                })();
                showModal({
                  type: "ok",
                  title: "Withdrawal is being Processed",
                });
              })
              .catch((err) => {
                showModal({
                  type: "ok",
                  title: err.message,
                });
              });
          })
          .catch((err) => {
            showModal({
              type: "ok",
              title: err.message,
            });
          });
      } else {
        showModal({
          type: "ok",
          title: "Insufficient Funds",
        });
      }
    } else {
      showModal({
        type: "ok",
        title: "Please Fill all Fields (Select Only One Bank)",
      });
    }

    // const data = {
    //   name: (document.getElementById("name") as HTMLInputElement)!.value,
    //   number: Number(
    //     (document.getElementById("number") as HTMLInputElement)!.value
    //   ),
    //   type: (document.getElementById("type") as HTMLInputElement)!.value,
    // };
  };

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

        {props.datas !== undefined && props.datas!.Type === "User" ? (
          <div></div>
        ) : props.datas !== undefined && props.datas!.Type === "Admin" ? (
          <div className="flex flex-wrap mt-4">
            <div className="user w-1/2 h-fit sm:w-40 rounded-md py-12 px-12 bg-white text-xl">
              <span className="w-full mx-auto text-center">
                <GrUserAdmin size="md" />
              </span>
              <span className="text-3xl"> {data} </span>
              Users
            </div>
            <div className="user h-fit rounded-md w-40 ml-2 py-12 px-12 bg-white text-xl">
              <span className="w-full mx-auto text-center">
                <GrUserAdmin size="md" />
              </span>
              <span className="text-3xl"> 0 </span>
              New Users
            </div>
          </div>
        ) : (
          <div> </div>
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
        <h1 className="text-blue pt-4 font-bold font-serif mb-2">
          Transaction Status
        </h1>

        {history.map((each, id) => {
          return (
            <Status
              card={each.card as string}
              type={each.card as string}
              status={each.status as string}
              id={each.id as string}
              date={each.date as string}
              amount={each.amount}
              key={id}
            />
          );
        })}
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="atransact"
      >
        <h1 className="text-blue-800 pt-4 font-bold font-serif mb-2">
          Transaction Statuss
        </h1>

        <div>
          {history.map((each) => {
            return (
              <Status
                type={each.card as string}
                status={each.status as string}
                id={each.id as string}
                date={each.date as string}
                amount={each.amount}
                name={each.name as string}
                mail={each.mail}
              />
            );
          })}
        </div>
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="withdraw"
      >
        <h1 className="text-blue pt-4 font-bold font-serif">Withdraw Funds</h1>
        <h2 className="flex withdrawtext  mt-3 w-full text-center rounded-sm justify-center p-2 bg-white">
          {" "}
          Total Balance: <TbCurrencyNaira height="100%" color="black" />{" "}
          {props.datas?.Balance}{" "}
        </h2>
        <input
          className="rounded-md my-4 flex justify-center mx-auto bg-white w-full sm:w-72 p-2"
          type="text"
          placeholder="Amount to Withdraw"
          id="wamount"
          ref={ammountref}
        />
        <div className="flex">
          {props.datas?.Bank?.map((each, id) => {
            return (
              <Choose
                name={each.name as string}
                number={each.number as number}
                type={each.type as string}
                pos={id}
                bank={props.datas!.Bank as []}
                key={id}
              />
            );
          })}
        </div>

        <button
          onClick={() =>
            showModal({
              type: "yesno",
              title: `Are You Sure You Want To Withdraw &#8358;${ammountref.current?.value}`,
              function: withdraw,
            })
          }
          className="bg-blue-600 hover:bg-blue-400 text-white py-1 px-3 rounded-md"
        >
          {" "}
          Withdraw{" "}
        </button>
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="records"
      >
        <h1 className="text-blue-700 pt-4 font-bold font-serif">
          General Records
        </h1>
        <table className="mx-auto justify-center flex flex-col sm:flex-row overflow-hidden rounded-md mt-3">
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
                Amount{" "}
              </th>
              <th className="px-3 font-semibold text-lg text-white">
                {" "}
                Transaction Status{" "}
              </th>
            </tr>

            {history.map((each, index) => {
              return (
                <tr className="bg-white py-5">
                  <td style={{ padding: "10px 0" }}> {index + 1} </td>
                  <td style={{ padding: "10px 0" }}> {each.date} </td>
                  <td style={{ padding: "10px 0" }}> {each.id} </td>
                  <td style={{ padding: "10px 0" }}> {each.type} </td>
                  <td style={{ padding: "10px 0" }}> &#8358;{each.amount} </td>
                  <td style={{ padding: "10px 0" }}>
                    {" "}
                    <span
                      className={`${
                        each.status === "Pending"
                          ? "text-red-700 bg-red-200 "
                          : "text-green-900 bg-green-200"
                      }  py-2 px-3 rounded-md`}
                    >
                      {" "}
                      {each.status}
                    </span>{" "}
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="arecords"
      >
        <h1 className="text-blue-700 pt-4 font-bold font-serif">
          General Records
        </h1>
        <table className="mx-auto justify-center flex flex-col sm:flex-row overflow-hidden rounded-md mt-3">
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
                User Name{" "}
              </th>
              <th className="px-3 font-semibold text-lg text-white">
                {" "}
                Amount{" "}
              </th>
              <th className="px-3 font-semibold text-lg text-white">
                {" "}
                Transaction Status{" "}
              </th>
            </tr>

            {history.map((each, index) => {
              return (
                <tr className="bg-white py-5">
                  <td style={{ padding: "10px 0" }}> {index + 1} </td>
                  <td style={{ padding: "10px 0" }}> {each.date} </td>
                  <td style={{ padding: "10px 0" }}> {each.id} </td>
                  <td style={{ padding: "10px 0" }}> {each.type} </td>
                  <td style={{ padding: "10px 0" }}> {each.name} </td>
                  <td style={{ padding: "10px 0" }}> &#8358;{each.amount} </td>
                  <td style={{ padding: "10px 0" }}>
                    {" "}
                    <span
                      className={`${
                        each.status === "Pending"
                          ? "text-red-700 bg-red-200 "
                          : "text-green-900 bg-green-200"
                      }  py-2 px-3 rounded-md`}
                    >
                      {" "}
                      {each.status}
                    </span>{" "}
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="bank"
      >
        <div className="flex flex-col text-left">
          <h1
            onClick={() => {
              showModal({
                type: "custom",
                title: "Add New Bank",
                custom: AddBank,
                function: Addbanks,
              });
            }}
            className="text-blue-900 mx-auto mt-3 w-fit flex z-10  mb-3 cursor-pointer font-semibold text-center"
          >
            <GrAddCircle className="mt-1 mr-1 text-blue-900" color="blue" /> Add
            A New Bank
          </h1>
          <div className="flex flex-col md:flex-row font-semibold mr-2 sm:mx-2">
            {props.datas?.Bank?.map((each, id) => {
              return (
                <Bank
                  name={each.name as string}
                  number={each.number as number}
                  type={each.type as string}
                  pos={id}
                  bank={props.datas!.Bank as []}
                  key={id}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="contentmain p-2 hidden bg-gray-100 mt-12 rounded-d"
        id="user"
      >
        <div className="flex flex-col text-left">
          <h1 className="text-blue-900 mx-auto w-fit flex z-10  mb-3 cursor-pointer font-semibold text-center">
            User Information
          </h1>
          <div className="flexmb-2 mr-2 sm:mx-2">
            <table className="mx-auto justify-center flex flex-col sm:flex-row overflow-hidden rounded-md mt-3">
              <thead>
                <tr className="bg-blue-800 rounded-md">
                  <th className="px-3 font-semibold text-lg text-white">
                    {" "}
                    S/N{" "}
                  </th>
                  <th className="px-3 font-semibold text-lg text-white">
                    {" "}
                    Username{" "}
                  </th>
                  <th className="px-3 font-semibold text-lg text-white">
                    {" "}
                    User Email{" "}
                  </th>
                  <th className="px-3 font-semibold text-lg text-white">
                    {" "}
                    Total Transaction{" "}
                  </th>
                  <th className="px-3 font-semibold text-lg text-white">
                    {" "}
                    User Status{" "}
                  </th>
                </tr>
                {/* 
                {data?.map((each, index) => {
                  return (
                    <tr>
                      <td> {index} </td>
                      <td> {each.date} </td>
                      <td> {each.id} </td>
                      <td> {each.type} </td>
                      <td> {each.status} </td>
                    </tr>
                  );
                })} */}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

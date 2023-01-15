import { doc, arrayRemove, updateDoc } from "firebase/firestore";

import { AiFillDelete } from "react-icons/ai";
import { dataType } from "../../Interfaces/interfaces";
import { db } from "../../Firebase";
import { showModal } from "./Modal";
import { useContext } from "react";
import { navContext } from "./Dasboard";

interface Props {
  type: string;
  number: number;
  name: string;
  pos: number;
  bank?: dataType[];
}

function Bank(props: Props) {
  const navcontext = useContext(navContext);
  const deletebank = (number: number) => {
    const deleteb = () => {
      console.log(number);

      const dataref = doc(db, "Users", "damilareojediran3");
      var arr = props.bank![number];
      //console.log(arr);

      updateDoc(dataref, {
        Bank: arrayRemove(arr),
      })
        .then(() => {
          navcontext?.fetchdata();
          showModal({
            type: "ok",
            title: "Bank Deleted Successfully",
          });
        })
        .catch((err) => {
          showModal({
            type: err.message,
            title: "Bank Deleted Successfully",
          });
        });
    };
    showModal({
      type: "yesno",
      title: " Are You Sure You Want To Delete",
      function: deleteb,
    });
  };
  return (
    <div className="w-full lg:w-1/2 mb-4 mr-2 sm:mx-2  rounded-md text-left border border-blue-900">
      <div className="flex flex-col ml-2 Z-50 py-3 pl-1 pr-2">
        <span
          className="ml-auto cursor-pointer"
          onClick={() => {
            deletebank(props.pos);
          }}
        >
          {" "}
          <AiFillDelete color="red" />{" "}
        </span>
        <div className="bankname">Bank Name: {props.type}</div>
        <div className="bankname">Account Number: {props.number}</div>
        <div className="bankname">Account Name: {props.name}</div>
      </div>
    </div>
  );
}

export default Bank;

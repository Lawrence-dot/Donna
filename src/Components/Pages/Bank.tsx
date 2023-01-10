import { updateDoc, doc, deleteField } from "firebase/firestore";

import { AiFillDelete } from "react-icons/ai";
import { db } from "../../Firebase";
import { showModal } from "./Modal";

interface Props {
  type: string;
  number: number;
  name: string;
}

function Bank(props: Props) {
  const deletebank = () => {
    const deleteb = () => {
      console.log("ll");

      const dataref = doc(db, "Users", "damilareojediran3");
      updateDoc(dataref, {
        Main: deleteField(),
      })
        .then(() => {
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
    <div className="flex flex-col ml-2 Z-50 py-3 px-3 rounded-md text-left border border-blue-900">
      <span
        className="ml-auto cursor-pointer"
        onClick={() => {
          deletebank();
        }}
      >
        {" "}
        <AiFillDelete color="red" />{" "}
      </span>
      <div className="bankname">Bank Name: {props.type}</div>
      <div className="bankname">Account Number: {props.number}</div>
      <div className="bankname">Account Name: {props.name}</div>
    </div>
  );
}

export default Bank;

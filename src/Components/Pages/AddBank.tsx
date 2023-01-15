import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../Firebase";
import { showModal } from "./Modal";

export const AddBank = `
<div class="addbank mt-2 mx-3">
  <div class="flex flex-col text-sm">
    <input type="text" placeholder="Bank Name" id="type">
    <input id="name" type="text" placeholder="Account Name" />
    <input id="number" type="text" placeholder="Account Number" />  
    <button id="custom" class="border py-1 mt-2 mb-2 text-sm rounded-md hover:bg-blue-900 hover:text-white border-blue-900 text-black"> Submit </button>
  </div>
</div>
`;

export const Addbanks = async (b: string) => {
  const data = {
    name: (document.getElementById("name") as HTMLInputElement)!.value,
    number: Number(
      (document.getElementById("number") as HTMLInputElement)!.value
    ),
    type: (document.getElementById("type") as HTMLInputElement)!.value,
  };

  const dataref = doc(db, "Users", "damilareojediran3");
  await updateDoc(dataref, { Bank: arrayUnion(data) })
    .then(() => {
      // navcontext?.fetchdata();
    })
    .catch((err) => {
      showModal({
        type: "ok",
        title: err.message,
      });
    });
};

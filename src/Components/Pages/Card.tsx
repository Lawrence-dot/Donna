import React, { useContext } from "react";
import { MainContext, mainType, crdinfo } from "../Pages/Main";

interface Props {
  rate: number;
  cardtype: string;
  need: string;
  cardname?: string;
}

function Card(props: Props) {
  const Physical = useContext<mainType | null>(MainContext);
  const sellpage = () => {
    const docs: Element[] = Array.from(
      document.getElementsByClassName("contentmain")
    );

    var crdinfo: crdinfo = {
      name: props?.cardname,
      rate: props.rate,
      need: props.need,
      type: props.cardtype,
    };

    Physical?.setcrddetails(crdinfo);

    docs.forEach((each) => {
      each.classList.add("hidden");
      each.id === "sellpage" && each.classList.remove("hidden");
    });
  };
  return (
    <div className="card border rounded-sm mb-2 p-3">
      <div className="sell flex sm:text-md flex-col text-left">
        <button
          onClick={() => sellpage()}
          className="bg-blue-600 mb-2 rounded-md ml-auto p-1 sm:px-3 text-sm sm:text-md px-2 hover:bg-blue-300 text-white"
        >
          {" "}
          Sell Now{" "}
        </button>
        <span> Rate: {props.rate}</span>
        <span className="border w-fit p-1 rounded-md"> {props.cardtype} </span>
        <span> Need: {props.need}</span>
        <span className="text-sm">
          Note: Please confirm the value of the card before upload{" "}
        </span>
      </div>
    </div>
  );
}

export default Card;

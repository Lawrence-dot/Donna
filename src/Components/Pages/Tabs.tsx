import React from "react";
import { BsGraphUp } from "react-icons/bs";

interface Props {
  title: string;
  content: number | string | undefined;
  color?: string;
}

function Tabs(props: Props) {
  return (
    <div className={`flex border w-full sm:w-1/2 border-b-blue-700 flex-col my-2`}>
      <h4 className="font-bold">{props.title}:</h4>
      <p className="text-sm"> {props.content} </p>
      <span
        className={`${
          props.color === "red"
            ? "bg-red-200 text-red-600"
            : "bg-green-200  text-green-600"
        } w-fit px-2 rounded-md mx-auto flex flex-row`}
      >
        <BsGraphUp className="mt-1" /> 15.00%
      </span>
    </div>
  );
}

export default Tabs;

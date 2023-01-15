import { dataType } from "../../Interfaces/interfaces";
import { CgCreditCard } from "react-icons/cg";
import React, { useState } from "react";

interface Props {
  type: string;
  number: number;
  name: string;
  pos: number;
  bank?: dataType[];
}

function Choose(props: Props) {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div
      className={`w-full ${
        active && "border border-blue"
      } lg:w-1/2  mb-4 my-2  rounded-md text-left border bg-white`}
    >
      <div className="flex flex-col Z-50 py-1 pl-2 pr-2">
        <span className="ml-auto cursor-pointer" onClick={() => {}}>
          <input
            onClick={() => setActive(!active)}
            type="radio"
            name=""
            id=""
          />
        </span>
        <div className="bankname flex">
          {" "}
          <CgCreditCard className="mt-1 mr-1" /> {props.type}{" "}
        </div>
        <div className="bankname">
          {" "}
          <span className="mr-5"></span> {props.number}
        </div>
        <div className="bankname">
          {" "}
          <span className="mr-5"></span> {props.number} {props.name}
        </div>
      </div>
    </div>
  );
}

export default Choose;

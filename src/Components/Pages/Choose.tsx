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
      className={`w-full mr-2 ${
        active && "border border-blue-900 active"
      } md:w-1/2 lg:w-1/3 bankchoose  mb-4 my-2  rounded-md text-left border bg-white`}
      onClick={() => setActive(!active)}
      id={`${props.pos}`}
    >
      <div className="flex flex-col Z-50 py-2 pl-2 pr-2">
        <div className="bankname flex">
          {" "}
          <div className="w-4 mr-1">
            {" "}
            <CgCreditCard className="mt-1 mr-1" />{" "}
          </div>
          {props.type}{" "}
        </div>
        <div className="bankname flex">
          {" "}
          <div className="w-4 mr-1"> </div>
          {props.number}
        </div>
        <div className="bankname flex">
          {" "}
          <div className="w-4 mr-1"> </div>
          {props.name}
        </div>
      </div>
    </div>
  );
}

export default Choose;

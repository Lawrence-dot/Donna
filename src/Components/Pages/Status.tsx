import { TbCurrencyNaira } from "react-icons/tb";

interface Props {
  type: string;
  id: string;
  status: string;
  date?: string;
  card?: string;
  name?: string;
  mail?: string;
  amount?: number;
}

function Status(props: Props) {
  const opentrans = () => {
    console.log("kk");
  };
  return (
    <div
      className={`wi-98 cursor-pointer ${
        props.status === "Pending" ? "border-red-900" : "border-green-900"
      } bg-white lg:w-1/2 mb-4 mr-2 sm:mx-2  rounded-md text-left border`}
      onClick={() => opentrans()}
    >
      <div className="flex flex-col ml-2 Z-50 py-3 pl-1 pr-2">
        <div className="bankname"> Transaction Id: {props.id}</div>
        <div className="bankname">
          {" "}
          Status:{" "}
          <span
            className={`bankname ${
              props.status === "Pending" ? "text-red-700" : "text-green-700"
            }`}
          >
            {props.status}
          </span>{" "}
        </div>
        {props.card && <div className="bankname"> Card: {props.card}</div>}
        <div className="bankname"> Date: {props.date}</div>
        {props.name && <div className="bankname">Name: {props.name}</div>}
        {props.amount && (
          <div className="bankname flex">
            Amount: <TbCurrencyNaira className="mt-1" color="black" />{" "}
            {props.amount}
          </div>
        )}
        {props.mail && <div className="bankname">Mail: {props.mail}</div>}
      </div>
    </div>
  );
}

export default Status;

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
  return (
    <div className="wi-98 lg:w-1/2 mb-4 mr-2 sm:mx-2  rounded-md text-left border border-blue-900">
      <div className="flex flex-col ml-2 Z-50 py-3 pl-1 pr-2">
        <div className="bankname"> Transaction Id: {props.id}</div>
        <div className="bankname"> Status: {props.status}</div>
        <div className="bankname"> Card: {props.card}</div>
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

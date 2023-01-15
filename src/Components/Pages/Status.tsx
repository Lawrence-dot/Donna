interface Props {
  type: string;
  id: number;
  status: string;
  date?: string;
  card: string;
}

function Status(props: Props) {
  return (
    <div className="w-full lg:w-1/2 mb-4 mr-2 sm:mx-2  rounded-md text-left border border-blue-900">
      <div className="flex flex-col ml-2 Z-50 py-3 pl-1 pr-2">
        <div className="bankname"> Transaction Id: {props.id}</div>
        <div className="bankname"> Status: {props.status}</div>
        <div className="bankname"> Card: {props.card}</div>
        <div className="bankname"> Date: {props.date}</div>
      </div>
    </div>
  );
}

export default Status;

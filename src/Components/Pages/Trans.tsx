import React from "react";
import { useLocation, useNavigate } from "react-router";
import { dataType } from "../../Interfaces/interfaces";

interface Props {}

function Trans(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const dats: dataType = location.state;
  const back = () => {
    navigate(-1);
  };

  return (
    <div className="trans">
      <div className="back text-blue-800" onClick={back}>
        {" "}
        Back{" "}
      </div>
      <div className="btns">
        <div className="apprv">
          <button> Approve </button>
        </div>
        <div className="rjct">
          <button> Reject </button>
        </div>
        <div className="trf">{dats.Username}</div>
      </div>
    </div>
  );
}

export default Trans;

import React from "react";
import "./loader.css";
import spinner from "../../../assets/imgs/spinner.gif";

interface Props {
  message?: string;
}

const LoaderView: React.FC<Props> = props => {
  const message = props.message ? <div>{props.message}</div> : undefined;
  return (
    <div className="login_canvas">
      <h2>Succesfully connected!</h2>
      <p>Loading DAO's...</p>
      <img src={spinner} alt="Spinner" />
    </div>
  );
};

export default LoaderView;

import React from "react";
import "./loader.css";

interface Props {
  message?: string;
}

const LoaderView: React.FC<Props> = props => {
  const message = props.message ? <div>{props.message}</div> : undefined;
  return (
    <div className="loader-center">
      {message}
      <div className="donut-loader" />
    </div>
  );
};

export default LoaderView;

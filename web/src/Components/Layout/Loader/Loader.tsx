import React, { Component } from "react";
import "./loader.css";

class Loader extends Component {
  public render() {
    return (
      <div className="loader-center">
        <div className="donut-loader" />
      </div>
    );
  }
}

export default Loader;

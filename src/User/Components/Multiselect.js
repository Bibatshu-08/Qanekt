import React, { Component } from "react";
import { options } from "../Helpers/data";
import CreatableSelect from "react-select/creatable";

class Multiselect extends Component {
  handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect isMulti onChange={this.handleChange} options={options} />
    );
  }
}

export default Multiselect;

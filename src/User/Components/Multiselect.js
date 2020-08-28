import React, {Component} from 'react'
import {options} from './data'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

export default class Multiselect extends Component<*, State> {
    
      handleChange = (newValue: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
      };
      render() {
        return (
          <CreatableSelect
            isMulti
            onChange={this.handleChange}
            options={options}
          />
        );
      }
    }

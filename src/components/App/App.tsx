import React, { PureComponent } from 'react';

import { WorkloadListContainer } from '../WorkloadList';
import { WorkloadFormContainer } from '../WorkloadForm';
import './App.css';


class App extends PureComponent {
    clickHandler() {
        const theme = document.body.dataset.theme;
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        document.body.dataset.theme=nextTheme;
    }
    render() {
    return (
      <div className="center">
        <h1>CloudWork</h1>
        <hr />
        
        <div >
          <WorkloadFormContainer />
        </div>
        <hr />

        <div>
          <h2 className="center">Workloads</h2>
          <WorkloadListContainer />
        </div>
          Dark Mode:
          <input className="tgl tgl-light" id="cb1" type="checkbox" onChange={this.clickHandler}/>
          <label className="tgl-btn" htmlFor="cb1"></label>
      </div>
    );
  }
}

export default App;

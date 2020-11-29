import React from 'react';
import './App.css';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {NextMoviesApp} from "./components/main-component/NextMoviesApp";


function App() {
  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <NextMoviesApp/>
      </MuiPickersUtilsProvider>
  );
}

export default App;

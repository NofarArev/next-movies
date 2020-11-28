import './App.css';
import {NextMoviesApp} from "./components/main-component/NextMoviesApp";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React from "react";

function App() {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <NextMoviesApp/>
        </MuiPickersUtilsProvider>
    );
}

export default App;

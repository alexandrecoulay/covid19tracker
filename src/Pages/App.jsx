import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import CovidHome from "./Covid";
import "../Styles/styles.css";

function App() {
    return (
        <div className="theme-main">
            <BrowserRouter>
                <Switch />
                    <Route exact path="/" component={CovidHome} />
                <Switch />
            </BrowserRouter>
        </div>
    );
}

export default App;

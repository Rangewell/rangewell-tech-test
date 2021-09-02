import React, { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import logo from "./logo.svg";
import "./App.css";

const App = ()=>{
	const [deals, setDeals] = useState([])
	useEffect(()=>{
		fetch(`http://localhost:3001/api/deals`)
        .then(response => response.json())
        .then(response => {
            setDeals(response)
        });
	},[])
	return (
		<div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>

        <main className="BodyContent">
            <h1>Deals <small className="text-muted">({deals.length})</small></h1>
            <div>
                ...
            </div>
        </main>
      </div>
	)
}
export default App;

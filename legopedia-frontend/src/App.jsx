// import { useState } from "react";

import "./App.css";

import Histogram from "./components/Histogram";
import TableSection from "./components/TableSection";
import Title from "./components/Title";

function App() {
    return (
        <>
            <Title />
            <TableSection />
            <Histogram />
        </>
    );
}

export default App;

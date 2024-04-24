import { useState } from "react";

import "./App.css";

import Histogram from "./components/Histogram";
import OptionToggle from "./components/OptionToggle";
import TableSection from "./components/TableSection";
import Title from "./components/Title";

function App() {
    const [option, setOption] = useState("sets");
    return (
        <>
            <Title />
            <OptionToggle setOption={setOption} />
            <TableSection option={option} />
            {option === "sets" && <Histogram />}
        </>
    );
}

export default App;

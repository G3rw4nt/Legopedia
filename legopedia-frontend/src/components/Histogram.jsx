import "./TableSection.css";

import * as d3 from "d3";

import { useEffect, useState } from "react";

import {
    getHistogram,
} from "../api/getData";

const Histogram = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      getHistogram().then((result) => {
        setData(result);
      });
    }, [])

    return (
        <div className="histogram-container">

          {/* 
          
          ZROBIĆ HISTOGRAM WG: 
          https://www.react-graph-gallery.com/histogram
          
          */}
           
        </div>
    );
};

export default Histogram;

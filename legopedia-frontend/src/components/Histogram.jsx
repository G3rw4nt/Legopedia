import "./TableSection.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import { useEffect, useState } from "react";

import { getHistogram } from "../api/getData";

const Histogram = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistogram().then(result => {
      setData(result);
    });
  }, []);

  return (
    <div className="histogram-container">
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
      {/* 
          
          ZROBIĆ HISTOGRAM WG: 
          https://www.react-graph-gallery.com/histogram
          
          */}
    </div>
  );
};

export default Histogram;

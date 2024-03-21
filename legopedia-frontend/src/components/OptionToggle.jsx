import PropTypes from "prop-types";

const Histogram = ({ setOption }) => {
  return (
    <div className="option-toggle-container">
      <div className="table-buttons">
        <button onClick={() => setOption("parts")}>PARTS</button>
        <button onClick={() => setOption("sets")}>SETS</button>
      </div>
    </div>
  );
};

Histogram.propTypes = {
  setOption: PropTypes.func
};

export default Histogram;

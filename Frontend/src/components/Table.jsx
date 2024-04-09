// import React from "react";
import PropTypes from "prop-types";

const Table = ({ option, sets, parts }) => {
    return (
        <table>
            <div className="table-container">
                <div className="table-buttons">
                    {/* <button onClick={setOption("parts")}>PARTS</button>
                <button onClick={setOption("sets")}>SETS</button> */}
                </div>
                <table className="table">
                    {option === "parts" ? (
                        <tr>
                            <th>Part Number</th>
                            <th>Part Name</th>
                            <th>Category</th>
                            <th> </th>
                        </tr>
                    ) : (
                        <tr>
                            <th>Set Number</th>
                            <th>Set Name</th>
                            <th>Year</th>
                            <th>Number of parts</th>
                            <th>Theme</th>
                        </tr>
                    )}
                    {option === "parts"
                        ? parts.map((part) => (
                              <tr key={part.part_num}>
                                  <td>{part.part_num}</td>
                                  <td>{part.name}</td>
                                  <td>{part.part_cat_id}</td>
                              </tr>
                          ))
                        : sets.map((set) => (
                              <tr key={set.set_num}>
                                  <td>{set.set_num}</td>
                                  <td>{set.name}</td>
                                  <td>{set.year}</td>
                                  <td>{set.num_parts}</td>
                                  <td>{set.theme_id}</td>
                              </tr>
                          ))}
                </table>
            </div>
        </table>
    );
};

Table.propTypes = {
    option: PropTypes.string,
    sets: PropTypes.array,
    parts: PropTypes.array,
};

export default Table;

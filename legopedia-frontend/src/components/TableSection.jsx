import { useEffect, useState } from "react";
import "./TableSection.css";
import { getCategories, getParts, getSets, getThemes } from "../api/getData";

const TableSection = () => {
    const [option, setOption] = useState("sets");
    const [parts, setParts] = useState([]);
    const [sets, setSets] = useState([]);

    useEffect(() => {
        getParts().then((data) => {
            getCategories().then((categories) => {
                console.log(categories);
                const partsWithCategories = data.map((part) => {
                    const category = categories.find(
                        (category) => category.id === part.part_cat_id
                    );
                    return {
                        ...part,
                        part_cat_id: category.name,
                    };
                });
                setParts(partsWithCategories);
            });
        });
        getSets().then((data) => {
            console.log(data);
            getThemes().then((themes) => {
                console.log(themes);
                const setsWithThemes = data.map((set) => {
                    const theme = themes.find(
                        (theme) => theme.id === set.theme_id
                    );
                    return {
                        ...set,
                        theme_id: theme.name,
                    };
                });
                setSets(setsWithThemes);
            });
        }, []);
    }, []);

    return (
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
    );
};

export default TableSection;

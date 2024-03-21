import "./TableSection.css";

import {
    getCategories,
    getFilteredParts,
    getFilteredSets,
    getParts,
    getSets,
    getThemes,
} from "../api/getData";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const TableSection = ({ option }) => {
    const [parts, setParts] = useState([]);
    const [sets, setSets] = useState([]);
    const [themes, setThemes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [filterValue, setFilterValue] = useState("");

    const setData = () => {
        getParts().then((data) => {
            console.log(data);
            getCategories().then((categories) => {
                setCategories(categories);
                const partsWithCategories = data.map((part) => {
                    const category = categories.find(
                        (category) => category.id === part.part_cat_id
                    );
                    return {
                        ...part,
                        part_cat_id: category?.name,
                    };
                });
                setParts(partsWithCategories);
            });
        });
        getSets().then((sets) => {
            console.log(sets);
            getThemes().then((themes) => {
                setThemes(themes);
                const setsWithThemes = sets.map((set) => {
                    const theme = themes.find(
                        (theme) => theme.id === set.theme_id
                    );
                    return {
                        ...set,
                        theme_id: theme?.name,
                    };
                });
                setSets(setsWithThemes);
            });
        }, []);
    };

    useEffect(() => {
        setData();
    }, []);

    const columnsParts = [
        {
            field: "part_num",
            headerName: "Part Number",
            // type: "number",
            width: 170,
            editable: true,
        },
        {
            field: "name",
            headerName: "Part Name",
            width: 350,
            editable: true,
        },
        {
            field: "part_cat_id",
            headerName: "Category",
            width: 110,
            editable: true,
        },
    ];

    const columnsSets = [
        {
            field: "set_num",
            headerName: "Set Number",
            width: 150,
            editable: true,
        },
        {
            field: "name",
            headerName: "Set Name",
            width: 260,
            editable: true,
        },
        {
            field: "year",
            headerName: "Year",
            // type: "number",
            width: 100,
            editable: true,
        },
        {
            field: "num_parts",
            headerName: "Number of parts",
            type: "number",
            width: 150,
            editable: true,
        },
        {
            field: "theme_id",
            headerName: "Theme",
            type: "number",
            width: 110,
            editable: true,
        },
    ];

    const selectPartOptions = [
        { value: "part_num", label: "Part Number" },
        { value: "name", label: "Part Name" },
        { value: "part_cat_id", label: "Category" },
    ];

    const selectSetOptions = [
        { value: "set_num", label: "Set Number" },
        { value: "name", label: "Set Name" },
        { value: "year", label: "Year" },
        { value: "num_parts", label: "Number of parts" },
        { value: "theme_id", label: "Theme" },
    ];

    const filterItems = () => {
        console.log(filterBy, filterValue);
        let value = filterValue;
        if (option === "parts" && filterBy === "part_cat_id") {
            value = categories.find(
                (category) => category.name === filterValue
            )?.id;
        }
        if (option === "sets" && filterBy === "theme_id") {
            value = themes.find((theme) => theme.name === filterValue)?.id;
        }
        if (option === "parts")
            getFilteredParts(filterBy, value).then((data) => {
                getCategories().then((categories) => {
                    setCategories(categories);
                    const partsWithCategories = data.map((part) => {
                        const category = categories.find(
                            (category) => category.id === part.part_cat_id
                        );
                        return {
                            ...part,
                            part_cat_id: category?.name,
                        };
                    });
                    setParts(partsWithCategories);
                });
            });
        else
            getFilteredSets(filterBy, value).then((sets) => {
                getThemes().then((themes) => {
                    const setsWithThemes = sets.map((set) => {
                        const theme = themes.find(
                            (theme) => theme.id === set.theme_id
                        );
                        return {
                            ...set,
                            theme_id: theme?.name,
                        };
                    });
                    setSets(setsWithThemes);
                });
            });
    };

    const clearFilters = () => {
        setFilterBy("");
        setFilterValue("");
        setData();
    };

    return (
        <div className="table-container">
            <h2>{option}</h2>
            {/* <div className="table-buttons">
                <button onClick={() => setOption("parts")}>PARTS</button>
                <button onClick={() => setOption("sets")}>SETS</button>
            </div> */}
            <div className="filtering">
                <div className="filtering-label">Filter by: </div>
                <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                >
                    <option value="" disabled />
                    {option === "parts"
                        ? selectPartOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))
                        : selectSetOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                </select>
                <div className="filtering-label">Value: </div>
                <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                <button onClick={filterItems} className="filter-button">
                    Filter
                </button>
                <button onClick={clearFilters} className="filter-button">
                    Clear
                </button>
            </div>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    getRowId={(row) =>
                        option === "parts"
                            ? row.name + row.year + row.set_num
                            : row.set_num
                    }
                    style={{ color: "#fff" }}
                    rows={option === "parts" ? parts : sets}
                    columns={option === "parts" ? columnsParts : columnsSets}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
};
// }

TableSection.propTypes = {
    option: PropTypes.string,
};

export default TableSection;

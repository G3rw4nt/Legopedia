import "./TableSection.css";
import {
    getCategories,
    getFilteredParts,
    getParts,
    getSets,
    getThemes,
} from "../api/getData";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";

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

    const columnsParts = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "part_num",
            headerName: "Part Number",
            type: "number",
            width: 150,
            editable: true,
        },
        {
            field: "name",
            headerName: "Part Name",
            width: 150,
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
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "set_num",
            headerName: "Set Number",
            width: 150,
            editable: true,
        },
        {
            field: "name",
            headerName: "Set Name",
            width: 150,
            editable: true,
        },
        {
            field: "year",
            headerName: "Year",
            type: "number",
            width: 110,
            editable: true,
        },
        {
            field: "num_parts",
            headerName: "Number of parts",
            type: "number",
            width: 110,
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

    return (
        <div className="table-container">
            <div className="table-buttons">
                <button onClick={() => setOption("parts")}>PARTS</button>
                <button onClick={() => setOption("sets")}>SETS</button>
            </div>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
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
            {/* <table className="table">
                <thead>
                    {option === "parts" ? (
                        <tr>
                            <th>Part Number</th>
                            <th>Part Name</th>
                            <th>Category</th>
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
                </thead>
                <tbody>
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
                </tbody>
            </table> */}
        </div>
    );
};

export default TableSection;

import "./TableSection.css";

import {
  getCategories,
  getFilteredParts,
  getSets,
  getThemes
} from "../api/getData";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const TableSection = ({ option }) => {
  const [parts, setParts] = useState([]);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    if (option === "sets") {
      getFilteredParts().then(data => {
        getCategories().then(categories => {
          console.log(categories);
          const partsWithCategories = data.map(part => {
            const category = categories.find(
              category => category.id === part.part_cat_id
            );
            return {
              ...part,
              part_cat_id: category?.name
            };
          });
          setParts(partsWithCategories);
        });
      });
    }

    if (option === "parts") {
      getSets().then(sets => {
        console.log(sets);
        getThemes().then(themes => {
          console.log(themes);
          const setsWithThemes = sets.map(set => {
            const theme = themes.find(theme => theme.id === set.theme_id);
            return {
              ...set,
              theme_id: theme?.name
            };
          });
          setSets(setsWithThemes);
        });
      });
    }
  }, [option]);

  const columnsParts = [
    {
      field: "part_num",
      headerName: "Part Number",
      // type: "number",
      width: 170,
      editable: true
    },
    {
      field: "name",
      headerName: "Part Name",
      width: 350,
      editable: true
    },
    {
      field: "part_cat_id",
      headerName: "Category",
      width: 110,
      editable: true
    }
  ];

  const columnsSets = [
    {
      field: "set_num",
      headerName: "Set Number",
      width: 150,
      editable: true
    },
    {
      field: "name",
      headerName: "Set Name",
      width: 260,
      editable: true
    },
    {
      field: "year",
      headerName: "Year",
      // type: "number",
      width: 100,
      editable: true
    },
    {
      field: "num_parts",
      headerName: "Number of parts",
      type: "number",
      width: 150,
      editable: true
    },
    {
      field: "theme_id",
      headerName: "Theme",
      type: "number",
      width: 110,
      editable: true
    }
  ];

  return (
    <div className="table-container">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={row => (option === "parts" ? row.part_num : row.set_num)}
          style={{ color: "#fff" }}
          rows={
            option === "parts"
              ? parts.filter(part => !!part?.part_num)
              : sets.filter(set => !!set?.set_num)
          }
          columns={option === "parts" ? columnsParts : columnsSets}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

TableSection.propTypes = {
  option: PropTypes.string
};

export default TableSection;

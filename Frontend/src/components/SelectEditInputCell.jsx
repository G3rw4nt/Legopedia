import { Select } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
function SelectEditInputCell({ id, value, field }) {
    // const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = async () => {
        await apiRef.current.setEditCellValue({
            id,
            field,
            value: event.target.value,
        });
        apiRef.current.stopCellEditMode({ id, field });
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            size="small"
            sx={{ height: 1 }}
            native
            autoFocus
        >
            <option value="XD1">Back-end Developer</option>
            <option value="XD2">Front-end Developer</option>
            <option value="XD3">UX Designer</option>
        </Select>
    );
}

SelectEditInputCell.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    field: PropTypes.string,
};

export default SelectEditInputCell;

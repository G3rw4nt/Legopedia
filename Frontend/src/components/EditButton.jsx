import PropTypes from "prop-types";

const EditButton = ({ onClick, id }) => {
    return <button onClick={() => onClick(id)}>Edit</button>;
};

export default EditButton;

EditButton.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.string,
};

import "./TableSection.css";

import {
    getCategories,
    getFilteredParts,
    getFilteredSets,
    getParts,
    getSets,
    getThemes,
} from "../api/getData";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { postParts, postSets } from "../api/postData";
import EditButton from "./EditButton";
import { putParts, putSets } from "../api/putData";

const TableSection = ({ option }) => {
    const [page, setPage] = useState(1);
    const [parts, setParts] = useState([]);
    const [sets, setSets] = useState([]);
    const [themes, setThemes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [addForm, setAddForm] = useState(false);
    const [editForm, setEditForm] = useState(false);

    // loading
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [themesLoading, setThemesLoading] = useState(false);
    const [setsLoading, setSetsLoading] = useState(false);
    const [partsLoading, setPartsLoading] = useState(false);

    //form for parts
    const [partNum, setPartNum] = useState("");
    const [partName, setPartName] = useState("");
    const [partCategory, setPartCategory] = useState("");

    //form for sets
    const [setNum, setSetNum] = useState("");
    const [setName, setSetName] = useState("");
    const [year, setYear] = useState("");
    const [numParts, setNumParts] = useState("");
    const [theme, setTheme] = useState("");

    //edit form for parts
    const [editPartNum, setEditPartNum] = useState("");
    const [editPartName, setEditPartName] = useState("");
    const [editPartCategory, setEditPartCategory] = useState("");

    //edit form for sets
    const [editSetNum, setEditSetNum] = useState("");
    const [editSetName, setEditSetName] = useState("");
    const [editYear, setEditYear] = useState("");
    const [editNumParts, setEditNumParts] = useState("");
    const [editTheme, setEditTheme] = useState("");

    const fetchCategories = async () => {
        setCategoriesLoading(true);
        const categories = await getCategories();
        setCategories(categories);
        setCategoriesLoading(false);
    };

    const fetchThemes = async () => {
        setThemesLoading(true);
        const themes = await getThemes();
        setThemes(themes);
        setThemesLoading(false);
    };

    const fetchData = useCallback(async (page) => {
        setSetsLoading(true);
        setPartsLoading(true);
        const sets = await getSets(page);
        const parts = await getParts(page);
        console.log(sets);
        setSets(sets);
        setParts(parts);
        setSetsLoading(false);
        setPartsLoading(false);
    }, []);

    useEffect(() => {
        fetchCategories();
        fetchThemes();
        fetchData(page);
    }, [page]);

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
                            part_cat_name: category?.name,
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
                            theme_name: theme?.name,
                        };
                    });
                    setSets(setsWithThemes);
                    console.log(setsWithThemes);
                });
            });
    };

    const clearFilters = () => {
        setFilterBy("");
        setFilterValue("");
        fetchData();
    };

    const addData = () => {
        setAddForm(true);
    };

    const hideAddingSection = () => {
        setAddForm(false);
        setPartNum("");
        setPartName("");
        setPartCategory("");
        setSetNum("");
        setSetName("");
        setYear("");
        setNumParts("");
        setTheme("");
    };

    const submitAddNewRow = (e) => {
        e.preventDefault();
        if (option === "parts") {
            const newPart = {
                part_num: partNum,
                name: partName,
                part_cat_id: partCategory,
            };
            postParts(newPart).then((data) => {
                if (data.code === "ERR_BAD_REQUEST")
                    alert(data.response.data.message);
                else {
                    fetchData();
                    hideAddingSection();
                }
            });
        } else {
            const newSet = {
                set_num: setNum,
                name: setName,
                year: year,
                num_parts: numParts,
                theme_id: theme,
            };
            postSets(newSet).then((data) => {
                if (data.code === "ERR_BAD_REQUEST")
                    alert(data.response.data.message);
                else {
                    fetchData();
                    hideAddingSection();
                }
            });
        }
    };

    const editRow = (id) => {
        setEditForm(true);
        if (option === "parts") {
            const part = parts.find((part) => part.part_num === id);
            console.log(part);
            setEditPartNum(part.part_num);
            setEditPartName(part.name);
            setEditPartCategory(part.part_cat_id);
        } else {
            const set = sets.find((set) => set.set_num === id);
            console.log(set);
            setEditSetNum(set.set_num);
            setEditSetName(set.name);
            setEditYear(set.year);
            setEditNumParts(set.num_parts);
            setEditTheme(set.theme_id);
        }
    };

    const hideEditForm = () => {
        setEditForm(false);
        setEditPartNum("");
        setEditPartName("");
        setEditPartCategory("");
        setEditSetNum("");
        setEditSetName("");
        setEditYear("");
        setEditNumParts("");
        setEditTheme("");
    };

    const submitEditRow = (e) => {
        e.preventDefault();
        console.log(themes);
        if (option === "parts") {
            const editedPart = {
                part_num: editPartNum,
                name: editPartName,
                part_cat_id: editPartCategory,
            };
            putParts(editedPart).then((data) => {
                if (data.code === "ERR_BAD_REQUEST") console.log(data);
                else {
                    fetchData(page);
                    hideEditForm();
                }
            });
        } else {
            const editedSet = {
                set_num: editSetNum,
                name: editSetName,
                year: editYear,
                num_parts: editNumParts,
                theme_id: editTheme,
            };
            putSets(editedSet).then((data) => {
                if (data.code === "ERR_BAD_REQUEST")
                    alert(data.response.data.message);
                else {
                    fetchData(page);
                    hideEditForm();
                }
            });
        }
    };

    return setsLoading && partsLoading ? (
        <div>Loading...</div>
    ) : (
        <div className="table-container">
            <h2>{option}</h2>
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
                <button onClick={addData} className="filter-button">
                    Add
                </button>
            </div>
            {addForm && (
                <form className="newRowForm">
                    {option === "parts" ? (
                        <>
                            <h2>Add new part</h2>
                            <label>Part Number</label>
                            <input
                                type="text"
                                placeholder="Part Number"
                                value={partNum}
                                onChange={(e) => setPartNum(e.target.value)}
                            />
                            <label>Part Name</label>
                            <input
                                type="text"
                                placeholder="Part Name"
                                value={partName}
                                onChange={(e) => setPartName(e.target.value)}
                            />
                            <label>Category</label>
                            <select
                                value={partCategory}
                                onChange={(e) =>
                                    setPartCategory(e.target.value)
                                }
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <button onClick={submitAddNewRow}> Dodaj</button>
                            <button onClick={hideAddingSection}> Anuluj</button>
                        </>
                    ) : (
                        <>
                            <h2>Add new set</h2>
                            <label>Set Number</label>
                            <input
                                type="text"
                                placeholder="Set Number"
                                value={setNum}
                                onChange={(e) => setSetNum(e.target.value)}
                            />
                            <label>Set Name</label>
                            <input
                                type="text"
                                placeholder="Set Name"
                                value={setName}
                                onChange={(e) => setSetName(e.target.value)}
                            />
                            <label>Year</label>
                            <input
                                type="number"
                                placeholder="Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <label>Number of parts</label>
                            <input
                                type="text"
                                placeholder="Number of parts"
                                value={numParts}
                                onChange={(e) => setNumParts(e.target.value)}
                            />
                            <label>Theme</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                            >
                                {themes.map((theme) => (
                                    <option key={theme.id} value={theme.id}>
                                        {theme.name}
                                    </option>
                                ))}
                            </select>
                            <button onClick={submitAddNewRow}> Dodaj</button>
                            <button onClick={hideAddingSection}> Anuluj</button>
                        </>
                    )}
                </form>
            )}
            {editForm && (
                <form className="newRowForm">
                    {option === "parts" ? (
                        <>
                            <h2>Edit part</h2>
                            <label>Part Number</label>
                            <input
                                type="text"
                                placeholder="Part Number"
                                value={editPartNum}
                                onChange={(e) => setEditPartNum(e.target.value)}
                            />
                            <label>Part Name</label>
                            <input
                                type="text"
                                placeholder="Part Name"
                                value={editPartName}
                                onChange={(e) =>
                                    setEditPartName(e.target.value)
                                }
                            />
                            <label>Category</label>
                            <select
                                value={editPartCategory}
                                onChange={(e) =>
                                    setEditPartCategory(e.target.value)
                                }
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <>
                            <h2>Edit set</h2>
                            <label>Set Number</label>
                            <input
                                type="text"
                                placeholder="Set Number"
                                value={editSetNum}
                                onChange={(e) => setEditSetNum(e.target.value)}
                            />
                            <label>Set Name</label>
                            <input
                                type="text"
                                placeholder="Set Name"
                                value={editSetName}
                                onChange={(e) => setEditSetName(e.target.value)}
                            />
                            <label>Year</label>
                            <input
                                type="number"
                                placeholder="Year"
                                value={editYear}
                                onChange={(e) => setEditYear(e.target.value)}
                            />
                            <label>Number of parts</label>
                            <input
                                type="text"
                                placeholder="Number of parts"
                                value={editNumParts}
                                onChange={(e) =>
                                    setEditNumParts(e.target.value)
                                }
                            />
                            <label>Theme</label>
                            <select
                                value={editTheme}
                                onChange={(e) => {
                                    setEditTheme(e.target.value);
                                }}
                            >
                                {themes.map((theme) => (
                                    <option key={theme.id} value={theme.id}>
                                        {theme.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                    <button onClick={submitEditRow}>Zapisz</button>
                    <button onClick={hideEditForm}>Anuluj</button>
                </form>
            )}
            <div className="table-height-container">
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
                            <th> </th>
                        </tr>
                    )}
                    {option === "parts"
                        ? parts.map((part) => (
                              <tr key={part.part_num}>
                                  <td>{part.part_num}</td>
                                  <td>{part.name}</td>
                                  <td>{part.part_cat_name}</td>
                                  <td>
                                      <EditButton
                                          onClick={editRow}
                                          id={part.part_num}
                                      />
                                  </td>
                              </tr>
                          ))
                        : sets.map((set) => (
                              <tr key={set.set_num}>
                                  <td>{set.set_num}</td>
                                  <td>{set.name}</td>
                                  <td>{set.year}</td>
                                  <td>{set.num_parts}</td>
                                  <td>{set.theme_name}</td>
                                  <td>
                                      <EditButton
                                          onClick={editRow}
                                          id={set.set_num}
                                      />
                                  </td>
                              </tr>
                          ))}
                </table>
            </div>
            <button
                onClick={() => {
                    if (page >= 1) {
                        setPage(page - 1);
                        // fetchData(page - 1);
                    }
                }}
            >
                Poprzednia strona
            </button>
            <div>{page}</div>
            <button
                onClick={() => {
                    setPage(page + 1);
                    // fetchData(page + 1);
                }}
            >
                Następna strona
            </button>
        </div>
    );
};

TableSection.propTypes = {
    option: PropTypes.string,
};

export default TableSection;

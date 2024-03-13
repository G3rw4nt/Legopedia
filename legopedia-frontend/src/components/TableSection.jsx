import "./TableSection.css";

import { useEffect, useState } from "react";

import {api} from '../api';

const TableSection = () => {
    const [option, setOption] = useState("parts");
    const [parts, setParts] = useState([]);
    const [sets, setSets] = useState([]);

    async function fetchParts () {
        try {
            const fetched = await api.get('/parts')
            setParts(fetched.data)
        } catch (err) {
            console.error('fetchParts error: ', err)
        }
    }
    
    async function fetchSets () {
        try {
            const fetched = await api.get('/sets')
            setSets(fetched.data)
        } catch (err) {
            console.error('fetchParts error: ', err)
        }
    }

    useEffect(() => {
        console.log('==== RELOAD ====')
        fetchParts();
        fetchSets();
    }, []);
    
    return (
        <div className="table-container">
            <div className="table-buttons">
                <button onClick={() => setOption('parts')}>PARTS</button>
                <button onClick={() => setOption('sets')}>SETS</button>
            </div>
            <table className="table">
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
                                {/* zamienić na nazwę kategorii - najlepiej chyba na backu */}
                                {/* <td>{part.category}</td> */}
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
            </table>
        </div>
    );
};

export default TableSection;

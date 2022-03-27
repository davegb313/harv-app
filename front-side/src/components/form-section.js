import React, { useReducer, useState } from "react";
import {
    Card,
    Button,
    TextField
} from "@mui/material";

import LoadingSpinner from "./LoadingSpinner";
import CustomTable from "./table";
import './form-section.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'change':
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case 'touch':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
};


function createData(name, calories) {
    return { name, calories };
}

const rows = [
    { name : 'Cupcake', calories: 305 },
];



const Form = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadedData, setLoadedData] = useState([]);
    const [inputState, dispatch] = useReducer(inputReducer, { value: '', isValid: false, isTouched: false });
    const regex = new RegExp('[a-zA-Z0-9@.]{2,256}\.[a-z]{2,6}');

    const changeHandler = event => {
        dispatch({
            type: 'change',
            value: event.target.value,
            isValid: regex.test(event.target.value),
        });
    };

    const touchHandler = () => {
        dispatch({ type: 'touch' });
    };

    const sendReqHandler = async () => {
        console.log('req sent for:', inputState.value);
        try {
            const response = await fetch('http://localhost:5000/getdata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    domainToCheck: inputState.value
                })
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const returnedData = await response.json();
            let arrayOfData = returnedData.returnedData;
            setLoadedData(arrayOfData);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <React.Fragment>
            <div className="form-section">
                <TextField
                    sx={{ width: 250, }}
                    label="Your website:"
                    variant="standard"
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                    error={!inputState.isValid && inputState.isTouched}
                    helperText={!inputState.isValid && inputState.isTouched && 'incorrect value.'}
                />
                <Button
                    sx={{ height: 40 }}
                    variant="outlined"
                    onClick={sendReqHandler}
                >
                    Fetch data
                </Button>
            </div>
            <div className="results">
                <hr />
                {loadedData.length === 0 ? (
                    <Card className='no-results-card' variant="outlined">
                        <p>
                            Nothing fetched yet, please send a request🔝
                        </p>
                    </Card>
                ) : (
                    <CustomTable rows={loadedData} />
                )}
            </div>
        </React.Fragment >
    )
}

export default Form;
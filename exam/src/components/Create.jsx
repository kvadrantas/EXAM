import { useState } from "react";
import isValidf from "../js/isValidf";

function Create({create, handleNewRecord, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        from_town: '',
        airline: '',
        arrival_time: '',
        is_late: false,
    });


    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        
        if(what ==='is_late') inputsCopy[what] = !inputs.is_late;
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        if(
            !(isValidf('txt', 'required', inputs.from_town, error, setError, 64) &&
            isValidf('txt', 'required', inputs.airline, error, setError, 32) &&
            isValidf('txt', 'required', inputs.arrival_time, error, setError) &&
            isValidf('boolean', 'optional', inputs.is_late, error, setError) 
            )
        ) {
            setShowWarningModal(true);
        } else {
            create(inputs)
            setInputs({
                from_town: '',
                airline: '',
                arrival_time: '',
                is_late: false,
            });
        }
    }

    return (
        <div className="main-form">
            <fieldset>
                <legend>New record</legend>
                <label htmlFor="">From Town*</label>
                <input type="text" value={inputs.from_town} onChange={(e) => formControl(e, 'from_town')} />
                <label htmlFor="">Airline*</label>
                <input type="text" value={inputs.airline} onChange={(e) => formControl(e, 'airline')} />                
                <label htmlFor="">Arrival Time*</label>
                <input type="datetime-local" value={inputs.arrival_time} onChange={(e) => formControl(e, 'arrival_time')} />
                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>Is Late?</label>
                    <input onChange={(e) => formControl(e, 'is_late')} value={inputs.is_late} checked={inputs.is_late} type="checkbox" />
                </div>
                <button className="form-button" onClick={handleCreate}>Add</button>
                <button className="form-button" onClick={handleNewRecord}>New Record...</button>
            </fieldset>
        </div>
    )

}

export default Create;
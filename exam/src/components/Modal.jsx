import { useEffect, useState } from "react";
import isValidf from "../js/isValidf";


function Modal({edit, confirmDelete, modalItem, showModal, setShowModal, airlines, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        from_town: '',
        airline: '',
        arrival_time: '',
        is_late: false,
    });

    useEffect(() => {
        setInputs({
            from_town: modalItem.from_town,
            airline: modalItem.airline,
            arrival_time: modalItem.arrival_time,
            is_late: modalItem.is_late,
        })
    }, [modalItem]);

    const handleEdit = () => {
        if(
            !(isValidf('txt', 'required', inputs.from_town, error, setError, 64) &&
            isValidf('txt', 'required', inputs.airline, error, setError, 32) &&
            isValidf('txt', 'optional', inputs.arrival_time, error, setError) &&
            isValidf('boolean', 'optional', inputs.is_late, error, setError) 
            )
        ) {
            setShowWarningModal(true);
        } else {
            edit({
                from_town: inputs.from_town,
                airline: inputs.airline,
                arrival_time: inputs.arrival_time,
                is_late: inputs.is_late,
            }, modalItem.id)
        }
    };


    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        if(what ==='is_late') inputsCopy[what] = !inputs.is_late;
        setInputs(inputsCopy);
    }

    const textify = (a) => {
        if(a === 1) {
            return 'Late';
        } else {
            return 'On time';
        }
    }


    return (
        <div className="main-modal" style={{
            display: showModal ? 'block' : 'none',
            top: window.scrollY
        }}>
            <div className="main-modal-form">
                <h2>Edit record</h2>
                <label>From Town*</label><input type="text" value={inputs.from_town} onChange={(e) => formControl(e, 'from_town')} />
                <label>Airline*</label><input type="text" value={inputs.airline} onChange={(e) => formControl(e, 'airline')} />
                <label>Airline</label>
                <select name="" id="" value={inputs.airline} onChange={(e) => formControl(e, 'airline')}>
                    <option value="default" hidden>Select...</option>
                    {airlines.map((e, i) => <option key={i} value={e.airline}>{e.airline}</option>)}                    
                </select>
                <label>Current Arrival Time</label><input style={{background: '#dbe3df'}} type="text" value={modalItem.arrival_time.replace('T', ' ')} readOnly />
                <label>Change Arrival Time</label><input type="datetime-local" value={inputs.arrival_time} onChange={(e) => formControl(e, 'arrival_time')} />
                <label style={{marginTop:'15px'}}>Status:</label>
                <input style={{background: '#dbe3df'}} value={textify(modalItem.is_late)} type="text" readOnly />
                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>Is Late?</label>
                    <input onChange={(e) => formControl(e, 'is_late')} value={inputs.is_late} checked={inputs.is_late} type="checkbox" />
                </div> <br/>
            </div>
            <button className="form-button" onClick={handleEdit}>Save</button>
            <button className="form-button" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="form-button" onClick={() => confirmDelete(modalItem.id)}>Delete</button>
        </div>
    )

}

export default Modal;
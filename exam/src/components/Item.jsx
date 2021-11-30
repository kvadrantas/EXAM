import moment from "moment-timezone";

function Item({item, setShowModal, setModalItem, confirmDelete}) {

    const showEdit = () => {
        setShowModal(true);
        setModalItem(item);
    }

    const textify = (a) => {
        if(a === 1) {
            return 'Late';
        } else {
            return 'On time';
        }
    }

    return (
        <div className="main-list-item">    
            <div className="main-list-item-stats">
                <span className="main-list-item-name">{item.from_town}</span>
                <span><span className="field-names">Airline: </span>{item.airline}</span>
                <span><span id='arrtime' className="field-names">Arrival time: </span>{moment.tz(item.arrival_time, "Europe/Vilnius").format('YYYY-MM-DD / HH:mm')}  </span>
                <span><span className="field-names">Is late? </span>{textify(item.is_late)}</span>
                <button className="form-button" onClick={showEdit}>Edit</button>
                <button className="form-button" onClick={() => confirmDelete(item.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Item; 
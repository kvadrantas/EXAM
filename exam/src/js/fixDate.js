import moment from "moment-timezone";

function fixDate(data) {
    // console.log('DUOMENYS ', data)
    return data.map((e, i) =>  {
        return({
            id: e.id,
            from_town: e.from_town,
            airline: e.airline,
            arrival_time: moment.tz(e.arrival_time, "Europe/Vilnius").format('YYYY-MM-DDTHH:mm'),
            is_late: e.is_late,
        })
    })
}

export default fixDate;
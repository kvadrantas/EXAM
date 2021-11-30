function Statistics ({stats}) {

    return(
        <>
            <div className="statistics">
                <fieldset className="sub-statistics">
                    <legend>General Statistics</legend>
                    <div>
                            <span><p>Total Flights: <i>{stats.totalFlights}</i></p></span>
                            <span><p>Total Flights On Time: <i>{stats.totalOnTime}</i></p></span>
                            <span><p>Total Flights Late: <i>{stats.totalLate}</i></p></span>
                    </div>

                </fieldset>
            </div>
            <div className="gradient-bar"></div>
        </>
    )

}

export default Statistics;
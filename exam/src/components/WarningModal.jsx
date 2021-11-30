function WarningModal ({showWarningModal, setShowWarningModal, error}) {

    return(
        <div className="main-modal" style={{
            display: showWarningModal ? 'block' : 'none',
            top: window.scrollY + 300 + 'px',
            width: '84%',
            zIndex: '3000'
            }}>
            <h2>Please check your input!</h2>
            <h4>Recomendations:</h4>
            <ul>
                <li>
                    required fields cannot be empty;
                </li>
                <li>
                    Town lenght should not be greater then 64 symbols.
                </li>
                <li>
                    Airline lenght should not be greater then 32 symbols.
                </li>
            </ul>
                <ul>Error: {error}</ul>
            <button className="form-button" onClick={() => setShowWarningModal(false)}>Ok</button>
        </div>
    )

}

export default WarningModal;
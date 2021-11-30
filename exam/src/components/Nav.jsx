function Nav({ filterBy, setFilterBy, reset, searchBy, setSearchBy, sortConditions, handleSort, airlines}) {

// ----------------- FILTER -----------------


    const selectFilter = e => {
        setFilterBy(e.target.value)
    }


// ----------------- SORT -----------------
    const selectSort = e => {
        sortConditions.current = e.target.value;
        handleSort(e.target.value);
    }  

// ----------------- SEARCH -----------------
    const handleSearchValue = e => {
        // console.log(e)
        if(!e.target.value) reset();
        setSearchBy(e.target.value)
    }

// ----------------- RESET -----------------
    const resetHandler = () => {
        reset();
        setFilterBy('');
        setSearchBy('');
        sortConditions.current = '';
        handleSort('');
    }

    return (
        <div className="main-nav">
            <fieldset>
                <fieldset>
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>By airline</label><br></br>
                        <select onChange={selectFilter} value={filterBy} >
                            <option value="default" hidden>Select filter...</option>
                            {
                                airlines.map(t => <option key={t.airline} value={t.airline}>{t.airline}</option>)
                            }
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Sorting</legend>
                    <div className="sort">
                        <label>Select sort criteria</label><br></br>
                            <button value="default"  hidden>Select sorting...</button>
                            <button onClick={selectSort} value="text-asc,from_town">From town &#8593;</button>
                            <button onClick={selectSort} value="text-desc,from_town">From town &#8595;</button>
                            <button onClick={selectSort} value="date-asc,arrival_time">Arrival time &#8593;</button>
                            <button onClick={selectSort} value="date-desc,arrival_time">Arrival time &#8595;</button>
                    </div>
                </fieldset>
                <button className="form-button" onClick={resetHandler}>Reset</button>
            </fieldset>
            <fieldset>
                <legend>Search</legend>
                <div className="search">
                    <label>airline search text</label>
                    <input onChange={handleSearchValue} value={searchBy}></input>
                </div>
            </fieldset>
        </div>
    )
}

export default Nav;
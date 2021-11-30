import isValid from "./js/isValid.js";


// ----------------- EXPRESS SERVER -----------------
import express, { json } from "express";
const app = express()
const port = 3003
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})

import cors from "cors";
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


// ----------------- MY SQL CONNECT -----------------
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "planes",
    password: "Laikinas1",
    database: "planes",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// -------------------------------------------------




// GET ALL RECORDS FROM TABLE
app.get('/planes/', (req, res) => {
    const sql = `
        select * from planes
    `
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
})


// INSERT NEW RECORD IN TABLE
app.post('/planes', (req, res) => {
    const sql = `
        insert into planes
        (from_town, airline, arrival_time, is_late)
        values (?, ?, ?, ?)
    `
    if(
        isValid('txt', 'required', req.body.from_town) &&
        isValid('txt', 'required', req.body.airline) &&
        isValid('txt', 'optional', req.body.arrival_time) &&
        isValid('boolean', 'optional', req.body.is_late) 
    ) {
        con.query(sql, [
            req.body.from_town, 
            req.body.airline, 
            req.body.arrival_time, 
            req.body.is_late, 
        ], (err, results) => {
            try {
                if (err) throw err;
                res.send(results)
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err)
            }
        });
    } else console.log('BAD DATA');
})


// EDIT RECORD 
app.put('/planes/:id', (req, res) => {
    const sql = `
        UPDATE planes
        SET from_town = ?, airline = ?, arrival_time = ?, is_late = ?
        WHERE id = ?
    `;
    if(
        isValid('txt', 'required', req.body.from_town) &&
        isValid('txt', 'required', req.body.airline) &&
        isValid('txt', 'optional', req.body.arrival_time) &&
        isValid('boolean', 'optional', req.body.is_late) &&
        isValid('num', 'required', req.params.id)
    ) {
        con.query(sql, [
            req.body.from_town,
            req.body.airline,
            req.body.arrival_time,
            req.body.is_late,
            req.params.id
        ], (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                res.send(results);
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err);
            }
        }) 
    } else console.log('BAD DATA');
})


// DELETE RECORD 
app.delete('/planes/:id', (req, res) => {
    const sql = `
        DELETE FROM planes
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        try {
            if (err) {
                throw err;
            }
            res.send(result);
        } catch(err) {
            console.log('THIS IS HANDLED ERROR: ', err);
        }
    })
})
// -------------------------------------------------




// FILTER CHECKBOX CONTENT - GET DISTINCT airlines
app.get('/planes-airlines', (req, res) => {
    const sql = `
        SELECT DISTINCT airline
        FROM planes
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// FILTER - GET DATA BY airline
app.get('/planes-filter/:t', (req, res) => {
    const sql = `
        SELECT *
        FROM planes
        WHERE airline = ?
    `;
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})


// SEARCH DATA
app.get('/planes-search', (req, res) => {
    const searchText = (`%${req.query.s}%`).toLowerCase();
    const sql = `
        SELECT *
        FROM planes
        where LOWER(from_town) like ? OR LOWER(airline) like ? OR LOWER(airline) like ? OR LOWER(arrival_time) like ? OR LOWER(is_late) like ? 
    `;
    con.query(sql, [searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// STATISTICS
app.get('/statistics', (req, res) => {
    
    let totalFlights;
    let totalOnTime;
    let totalLate;

    
    let sql = `
    SELECT 
        COUNT(id) as totalFlights
        FROM planes
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
         
            totalFlights = results[0].totalFlights;
    });


    sql = `
    SELECT 
        COUNT(id) as totalOnTime
    FROM planes
        WHERE is_late = '0'
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
         
            totalOnTime = results[0].totalOnTime;
            res.send({
                totalFlights,
                totalOnTime,
                totalLate: totalFlights - totalOnTime
            });
    });

})

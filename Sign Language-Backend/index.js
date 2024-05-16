const port = 5000;

/* Express */
const express = require('express');

const app = express();


/* Cors */
const cors = require("cors");
app.use(cors());

app.use(express.json());
/* Mysql */
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signlang",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Connect to MySQL
con.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to fetch users
app.get('/GetUsers', (req, res) => {
    const sql = "SELECT accountID, username, email, role, status, datecreated FROM accounts";

    console.log('Executing SQL query:', sql);

    con.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
            return res.status(500).json({ status: 'error', message: err.message });
        }

        try {
            const modifiedData = data.map(user => ({
                accountID: user.accountID,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
                datecreated: user.datecreated,
            }));
            console.log('Modified Data:', modifiedData);
            res.status(200).json({ status: 'success', users: modifiedData });
        } catch (error) {
            console.error('Error processing users:', error.message);
            res.status(500).json({ status: 'error', message: error.message });
        }
    });
});
app.get('/GetTest', (req, res) => {
    const sql = "SELECT tr.accountID, a.username, tr.test_scores, tr.testID FROM test_results tr JOIN accounts a ON tr.accountID = a.accountID";

    console.log('Executing SQL query:', sql);

    con.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
            return res.status(500).json({ status: 'error', message: err.message });
        }

        try {
            const modifiedData = data.map(user => {
                const testScores = parseInt(user.test_scores);
              
                let performance;
                if (testScores < 70) {
                    performance = "Poor";
                } else if (testScores >= 70 && testScores < 85) {
                    performance = "Good";
                } else {
                    performance = "Excellent";
                }

                return {
                    accountID: user.accountID,
                    username: user.username,
                    test_scores: testScores,
                    testID: user.testID, 
                    performance: performance
                };
            });

            console.log('Modified Data:', modifiedData);
            
            res.status(200).json({ status: 'success', users: modifiedData });
        } catch (error) {
            console.error('Error processing test scores:', error.message);
            res.status(500).json({ status: 'error', message: error.message });
        }
    });
});
app.post('/DeleteUser', (req, res) => {
    const { accountID } = req.body;
    console.log(accountID);
    const deleteSql = `
        DELETE FROM accounts WHERE accountID = ?`;

    con.query(deleteSql, [accountID], (deleteErr, deleteResult) => {
        if (deleteErr) {
            console.error('Error deleting user:', deleteErr.message);
            return res.status(500).json({ status: 'error', message: 'Error deleting user' });
        }

        console.log('Delete Result:', deleteResult);

        res.status(200).json({ status: 'success' });
    });
});


// Start the server
app.listen(port, () => {
    console.log('Now Listening: ' + port);
});
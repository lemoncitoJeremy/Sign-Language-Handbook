const port = 5000;

/* Express */
const express = require('express');

const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10; // This determines the complexity of the hashing. You can adjust this value as needed.
const body_parser = require('body-parser');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');



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
    database: "signlanguageapp",
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

/**LEMON-------------------------------- */

//for sign up
app.post('/signup', async (req, res) => {
    try {
        console.log(req.body.password, req.body.email, req.body.username, req.body.role)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const matching = await bcrypt.compare(req.body.password, hashedPassword)
        console.log('is password hashed matching:', matching);
        console.log(hashedPassword)
        const sql = "INSERT INTO accounts (username,email,password,role) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.role,
        ]

        con.query(sql, [values], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json(data);
        })
    } catch (error) {
        return res.status(500).json({ error: "Error occurred while hashing password" });
    }
})

//check existing email UPDATE "username hahanapin" 
app.post('/signup/checkEmail', async (req, res) => {

    const sql = "SELECT email from accounts where email = ?";
    const values = [req.body.email]
    console.log(values)
    con.query(sql, [values], (err, data) => {

        if (err) {
            return res.json("Error");
        }
        //if data found return 
        if (data.length > 0) {
            return res.json({ exists: true });
        }
        return res.json({ exists: false });
    })
})



app.post('/login', (req, res) => {

    const sql = "SELECT accountID, username, email, role, password FROM accounts WHERE username = ?";
    con.query(sql, [req.body.username], async (err, data) => {

        if (err) { return res.json("Error") }

        if (data.length > 0) {

            //when comparing in bcrypt convert retrieved data from database
            const userInputPass = req.body.password.toString();
            const hashedPassword = data[0].password.toString();


            console.log("from database: " + data[0].password)
            console.log("new input: " + userInputPass)

            const matching = await bcrypt.compare(userInputPass, hashedPassword)
            console.log('is password hashed matching:', matching);

            // Compare hashed password with the input password 
            await bcrypt.compare(userInputPass, hashedPassword, (compareErr, result) => {

                if (compareErr) {
                    return res.json("Error comparing");
                }

                if (result) {
                    console.log(data);
                    return res.json({ status: "success", data: data });
                }
                else {
                    return res.json("Incorrect Username or Password");
                }
            });

        } else {
            return res.json("User Not Found"); // No user found for the provided email
        }
    });
});





//Create assessment post
app.post('/createAssessment', (req, res) => {
    const sql = "INSERT INTO tests (test_subject, test_description, test_title) VALUES (?)";
    const values = [
        req.body.test_subject,
        req.body.Description,
        req.body.title,
    ]
    console.log(values)
    con.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });

});


app.post('/createAssessment/insert', (req, res) => {
    const getLatestAssessmentId = 'SELECT MAX(testID) AS latestID FROM tests;';

    con.query(getLatestAssessmentId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving questions');
            return;
        }

        const latestID = result[0].latestID;

        const questions = req.body.questions;
        let completedInsertions = 0;

        for (const question of questions) {
            const questionValues = [
                latestID,
                question.Question,
                question.Correct_Ans,
                question.Incorrect1,
                question.Incorrect2,
                question.Incorrect3
            ];

            const questionQuery = 'INSERT INTO test_qa (testID, question, correct_ans, incorrect1, incorrect2, incorrect3) VALUES (?, ?, ?, ?, ?, ?);';

            con.query(questionQuery, questionValues, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error saving questions');
                    return;
                }
                completedInsertions++;
                if (completedInsertions === questions.length) {
                    res.status(200).send('Assessment created successfully');
                }
            });
        }
    })
});


//Get Assessments
app.get('/assessments', (req, res) => {
    const sql = "SELECT * FROM tests"

    con.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        console.log(data)
        return res.json(data);

    })
});

//Get Assessment Questions
app.get('/assessments/questions/:testID', (req, res) => {
    const testID = req.params.testID;

    const getOpenedAssessmentId = 'SELECT * FROM test_qa WHERE testID = ?';

    con.query(getOpenedAssessmentId, [testID], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving questions');
            return;
        }
        console.log(testID)
        // Send the retrieved data as a response
        res.json(data);
    });
});


app.post('/assessments/testResults', (req, res) => {
    const sql = "INSERT INTO test_results (accountID, testID, test_scores) VALUES (?)";
    const values = [
        req.body.accountID,
        req.body.testID,
        req.body.test_scores,
    ];
    console.log(values);
    con.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

















// Start the server
app.listen(port, () => {
    console.log('Now Listening: ' + port);
});
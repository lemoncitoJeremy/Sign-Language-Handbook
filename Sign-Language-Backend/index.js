const port = 5000;

/* Express */
const express = require('express');

const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10; // This determines the complexity of the hashing. You can adjust this value as needed.
const body_parser = require('body-parser');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const fileUpload = require('express-fileupload');
const path = require('path');

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

    const selectSql = `
        SELECT * FROM accounts WHERE accountID = ?`;
    const archiveSql = `
        INSERT INTO accounts_archived (accountID, username, email, password, role, status, datecreated, last_login)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const deleteSql = `
        DELETE FROM accounts WHERE accountID = ?`;

    con.query(selectSql, [accountID], (selectErr, selectResult) => {
        if (selectErr) {
            console.error('Error selecting user data:', selectErr.message);
            return res.status(500).json({ status: 'error', message: 'Error selecting user data' });
        }

        if (selectResult.length === 0) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        const userData = selectResult[0];

        con.query(archiveSql, [
            userData.accountID,
            userData.username,
            userData.email,
            userData.password,
            userData.role,
            userData.status,
            userData.datecreated,
            userData.last_login
        ], (archiveErr, archiveResult) => {
            if (archiveErr) {
                console.error('Error archiving user data:', archiveErr.message);
                return res.status(500).json({ status: 'error', message: 'Error archiving user data' });
            }

            con.query(deleteSql, [accountID], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error deleting user:', deleteErr.message);
                    return res.status(500).json({ status: 'error', message: 'Error deleting user' });
                }

                console.log('Delete Result:', deleteResult);

                res.status(200).json({ status: 'success' });
            });
        });
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
app.get('/assessments/', (req, res) => {
    const sql = "SELECT * FROM tests"
   
    con.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        
        return res.json(data);

    })
});

app.get('/assessments/maxScore/:accountID', (req, res) => {
    console.log('ID',req.params.accountID)
    const accountID = req.params.accountID;
    const sql = "SELECT MAX(test_scores) as test_score FROM test_results WHERE accountID = ? GROUP BY accountID";
   
    con.query(sql, [accountID], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        console.log(data)
        return res.json(data);

    });
});


//Get Assessment Questions
app.get('/assessments/questions/:testID', (req, res) => {
    const testID = req.params.testID;
    console.log(testID)
    const getOpenedAssessmentId = 'SELECT * FROM test_qa WHERE testID = ?';

    con.query(getOpenedAssessmentId, [testID], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving questions');
            return;
        }
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



// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'acpa.educ.ph@gmail.com', // replace with your Gmail email
        pass: 'haxf hbwc unsv rpqy' // replace with your Gmail password
    },
});

const otpStorage = {};

// Endpoint to send OTP to the user's email
app.post('/sendOTP', (req, res) => {
    const { email } = req.body;
    console.log('Sent OTP to email:', email);
    // Generate a random OTP
    const otp = speakeasy.totp({
        secret: speakeasy.generateSecret().base32,
        encoding: 'base32',
    });

    // Save the OTP in the in-memory storage
    otpStorage[email] = otp;

    // Email configuration
    const mailOptions = {
        from: 'acpa.educ.ph@gmail.com',
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is: ${otp}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP email:', error.message);
            return res.json({ status: 'error', message: 'Error sending OTP email' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({ status: 'success', message: 'OTP sent successfully' });
        }
    });
});


// Endpoint to verify OTP 
app.post('/VerifyOTP', (req, res) => {
    const { email, otp } = req.body;
    console.log('Received OTP verification request for email:', email, 'with OTP:', otp);
    if (otpStorage[email] === otp) {
        // OTP is correct
        delete otpStorage[email]; // Remove the OTP from storage after successful verification
        return res.json('success');
    } else {
        // OTP is incorrect
        return res.json('failed');
    }
});


app.post('/CheckEmail', (req, res) => {
    const { EmailAcc } = req.body;
    const sql = "SELECT * FROM accounts WHERE email = ?";

    con.query(sql, [EmailAcc], (err, data) => {
        if (err) {
            console.error('Error checking email:', err.message);
            return res.json("error");
        }

        if (data.length > 0) {
            // Email already exists
            return res.json("exists");
        } else {
            // Email doesn't exist
            return res.json("not_exists");
        }
    });
});

app.post('/ResetPassword', async (req, res) => {
    const { EmailAcc, NewPassword } = req.body;

    const hashedPassword = await bcrypt.hash(NewPassword, 10);
	const matching = await bcrypt.compare(NewPassword, hashedPassword)
	console.log('Hashed Password Length:', hashedPassword.length);
	console.log('Hashed Password During Registration:', hashedPassword);
	console.log('is password hashed matching:',matching);


    const sql = "UPDATE accounts SET password = ? WHERE email = ?";
    console.log('SQL Query:', sql);
	console.log('Values:', [hashedPassword, EmailAcc]);
	console.log('Email to reset password:', EmailAcc);
    con.query(sql, [hashedPassword, EmailAcc], (err, data) => {
        if (err) {
            console.error('Error during password reset:', err.message);
            return res.json({ status: 'error', message: 'Error during password reset. Please try again later.' });
        }

        console.log('Password changed successfully');
        return res.json({ status: 'success', message: 'Password reset successful' });
    });
});




//---------------------------jords------------------------------------------

app.get('/GetHandbookPage', (req, res) => {
    const getSql = "SELECT * FROM handbook";
    con.query(getSql, (err, result) => {
        res.json({data: result});
    });
})

app.post('/SetTitleDic', (req, res) => {
    const {id, title} = req.body;
    
    const getSql = "UPDATE dictionary SET name = ? WHERE signlanguageID = ?";
    con.query(getSql, [title, id], (err, result) => {
        
    });
})

app.post('/SetDescDic', (req, res) => {
    const {id, desc} = req.body;
    
    const getSql = "UPDATE dictionary SET sign_description = ? WHERE signlanguageID = ?";
    con.query(getSql, [desc, id], (err, result) => {
        
    });
})


app.post('/AddPage', (req, res) =>{
    const { title, description } = req.body;
    const insertSql = 'INSERT INTO handbook (subject_title, subject_description) VALUES (?, ?)'

    con.query(insertSql, [title, description], (err, res) => {
        
    })
});


app.post("/DeleteHandbook", (req, res) => {
    const {id} = req.body;
    const deleteSql = "DELETE FROM handbook WHERE handbookID = ?"

    con.query(deleteSql, [ id], (err, res) => {
        
    })
})

app.post("/DeleteContent", (req, res) => {
    const {id, handbook} = req.body;
    console.log(id, handbook)
    const deleteSql = "DELETE FROM handbook_contents WHERE handbookID = ? AND signlanguageID = ?";

    con.query(deleteSql, [handbook, id  ], (err, res) => {
        
    })
})

app.post('/AddSign', (req, res) =>{
    const { title, description } = req.body;
    const insertSql = 'INSERT INTO dictionary (title, sign_description) VALUES (?, ?)'

    con.query(insertSql, [title, description], (err, res) => {
        
    })
});

app.post('/GetContent', (req, res) =>{
    const {id} = req.body;
    const getSql = 'SELECT * FROM handbook WHERE handbookID = ?';
    con.query(getSql, [id], (err, result) => {
        res.json({data: result});     
    })
})

app.get('/get-image/:id', (req, res) => {
    const imageId = req.params.id;
    const query = 'SELECT img_header_url FROM handbook WHERE handbookID = ?';
  
    con.query(query, [imageId], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        res.json({ imagePath: results[0].imagePath });
      } else {
        res.status(404).send('Image not found');
      }
    });
  });
  
app.post('/SetTitleContent', (req, res) =>{
    const {id, title} = req.body;
    console.log(title);
    const getSql = 'UPDATE handbook SET content_title = ? WHERE handbookID = ?';
    con.query(getSql, [title, id], (err, result) => {
        res.json({data: result});     
    })
})

app.post('/SetDescContent', (req, res) =>{
    const {id, desc} = req.body;
    const getSql = 'UPDATE handbook SET content_description = ? WHERE handbookID = ?';
    con.query(getSql, [desc, id], (err, result) => {
        res.json({data: result});     
    })
})

app.post('/AddCardContent', (req, res) =>{
    const insertSql = 'INSERT INTO dictionary (name, sign_description) VALUES ("Enter Title", "Enter Description")';
    con.query(insertSql, (err, result) => {
        // Get the ID of the inserted row
        const insertedId = result.insertId;
        res.status(201).send({ id: insertedId });
    })
})

app.post('/AddCardToContent', (req, res) =>{
    const {id, handID} = req.body;
    const insertSql = 'INSERT INTO handbook_contents (handbookID, signlanguageID) VALUES (?, ?)';
    con.query(insertSql, [id, handID], (err, result) => {
        
    })
})

app.post('/GetCardContent', (req, res) =>{
    const {id} = req.body;
    const getSql = 'SELECT * FROM dictionary D INNER JOIN handbook_contents HC ON HC.signlanguageID = D.signlanguageID WHERE HC.handbookID = ?';
    con.query(getSql, [id], (err, result) => {
        res.json({data: result});     
    })
})

app.post('/SearchRequest', (req, res) =>{
    const {id} = req.body;
    const getSql = 'SELECT handbookID FROM request WHERE handbookID = ?';
    con.query(getSql, [id], (err, result) => {
        res.json({data: result});     
    })
})

app.post('/PushRequest', (req, res) =>{
    const {id, accountID} = req.body;
    const getSql = 'INSERT INTO request (handbookID, status, accountID) VALUES (?, "pending", ?)';
    con.query(getSql, [id, accountID], (err, result) => {
        res.json({data: result});     
    })
})

app.get('/GetRequest', (req, res) =>{
    const getSql = 'SELECT H.subject_title, R.status, R.submitted_on FROM request R INNER JOIN handbook H ON H.handbookID = R.handbookID';
    con.query(getSql, (err, result) => {
        res.json({data: result});     
    })
})

app.post('/GetImageHandbook', (req, res) => {
    const { id } = req.body;
    const getSql = 'SELECT img_header_url FROM handbook WHERE handbookID = ?';
    con.query(getSql, [id], (err, results) => {
        if (err) {
        console.error('Error fetching image path:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
        }
        if (results.length > 0) {
        console.log('/uploads/${results[0].img_header_url}');
        res.json({ path: '/uploads/${results[0].img_header_url} '});
        } else {
        res.status(404).json({ error: 'Image not found' });
        }
    });
})

app.post('/DeleteContentCard', (req, res) => {
    const {id, handbook} = req.body;

    const deleteSql = "DELETE FROM handbook_contents WHERE handbookID = ? AND signlanguageID = ?"

    con.query(deleteSql, [handbook, id], (err, res) => {
        
    })
})

// Endpoint to handle image upload
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // Access the file
    const {id} = req.body;
    let uploadedFile = req.files.file;
    // Set the upload path
    const uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);
  
      // Move the file to the uploads directory
    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).send(err);
        }

        // Update the database with the relative file path
        const query = 'UPDATE handbook SET img_header_url = ? WHERE handbookID = ?';
        const relativeFilePath = uploadedFile.name; // Store only the filename

        con.query(query, [relativeFilePath, id], (dbErr, result) => {
        if (dbErr) {
            console.error('Database query error:', dbErr);
            return res.status(500).send(dbErr);
        }
        res.send({ filePath:'/uploads/${relativeFilePath}'});
        });
    });
});

app.use('/uploads', express.static('uploads'));




//---------------------rion----------------------------------
app.get('/GetArchivedUsers', (req, res) => {
    const sql = "SELECT accountID, username, email, role, status, datecreated, last_login FROM accounts_archived";

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
                last_login: user.last_login,
            }));
            console.log('Modified Data:', modifiedData);
            res.status(200).json({ status: 'success', users: modifiedData });
        } catch (error) {
            console.error('Error processing users:', error.message);
            res.status(500).json({ status: 'error', message: error.message });
        }
    });
});
app.post('/RestoreArchivedaccount', async (req, res) => {
    const { accountID } = req.body;
    const selectSql = 'SELECT * FROM accounts_archived WHERE accountID = ?';
    const insertSql = 'INSERT INTO accounts (accountID, username, email, password, role, status, datecreated, last_login) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const deleteArchivedSql = 'DELETE FROM accounts_archived WHERE accountID = ?';

    try {
   
        const [archivedAccountInfo] = await queryAsync(selectSql, [accountID]);

        console.log('Select SQL Query:', selectSql, 'Values:', [accountID]);
        console.log('Archived account Info:', archivedAccountInfo);

        if (!archivedAccountInfo) {
            console.log('Archived account not found');
            return res.json({ status: 'failed', message: 'Archived account not found' });
        }

      
        await queryAsync(insertSql, [
            archivedAccountInfo.accountID,
            archivedAccountInfo.username,
            archivedAccountInfo.email,
            archivedAccountInfo.password,
            archivedAccountInfo.role,
            archivedAccountInfo.status,
            archivedAccountInfo.datecreated,
            archivedAccountInfo.last_login,
        ]);

      
        await queryAsync(deleteArchivedSql, [accountID]);

        console.log('Account restored successfully');
        return res.json({ status: 'success', message: 'Account restored successfully' });
    } catch (error) {
        console.error('Error restoring account:', error.message);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});


app.post('/SubmitFeedback', (req, res) => {
    const { email, description, starRating } = req.body;
    const sql = "INSERT INTO Feedback (Email, Description, Star_Rating) VALUES (?, ?, ?)";

    con.query(sql, [email, description, starRating], (err, data) => {
        if (err) {
            console.error('Error during feedback submission:', err.message);
            return res.json({ status: 'error', message: 'Error during feedback submission. Please try again later.' });
        }

        console.log('Feedback submission successful');
        return res.json({ status: 'success', message: 'Feedback submitted successfully' });
    });
});

app.get('/GetFeedback', (req, res) => {
    const sql = "SELECT FeedbackID, Email, Description, Star_Rating, AdminResponded FROM feedback";

    con.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
            return res.status(500).json({ status: 'error', message: `Error fetching feedback: ${err.message}` });
        }

        try {
       
            const modifiedData = data.map(feedback => ({
                FeedbackID: feedback.FeedbackID,
                Email: feedback.Email,
                Description: feedback.Description,
                StarRating: feedback.Star_Rating,
                AdminResponded: feedback.AdminResponded,
            }));

            console.log('Modified Data:', modifiedData);

            res.setHeader('Content-Type', 'application/json');
            console.log('Response Content:', JSON.stringify(modifiedData));

            res.status(200).json({ status: 'success', feedback: modifiedData }); 
        } catch (error) {
            console.error('Error processing feedback:', error.message);
            res.status(500).json({ status: 'error', message: 'Error processing feedback' });
        }
    });
});


app.post('/DeleteFeedback', (req, res) => {
    const { FeedbackID } = req.body;

    const selectSql = `
        SELECT * FROM feedback WHERE FeedbackID = ?`;

    const archiveSql = `
        INSERT INTO feedback_archived (FeedbackID, Email, Description, Star_Rating, AdminResponded)
        SELECT FeedbackID, Email, Description, Star_Rating, AdminResponded FROM feedback WHERE FeedbackID = ?`;

    const deleteSql = `
        DELETE FROM feedback WHERE FeedbackID = ?`;

 
    con.query(selectSql, [FeedbackID], (selectErr, selectResult) => {
        if (selectErr) {
            console.error('Error selecting feedback data:', selectErr.message);
            return res.status(500).json({ status: 'error', message: 'Error selecting feedback data' });
        }

        if (selectResult.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Feedback not found' });
        }

        const feedbackData = selectResult[0];

     
        con.query(archiveSql, [FeedbackID], (archiveErr, archiveResult) => {
            if (archiveErr) {
                console.error('Error archiving feedback data:', archiveErr.message);
                return res.status(500).json({ status: 'error', message: 'Error archiving feedback data' });
            }

         
            con.query(deleteSql, [FeedbackID], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error deleting feedback:', deleteErr.message);
                    return res.status(500).json({ status: 'error', message: 'Error deleting feedback' });
                }

                console.log('Delete Result:', deleteResult);

                res.status(200).json({ status: 'success' });
            });
        });
    });
});
app.get('/GetArchivedFeedback', (req, res) => {
    const sql = "SELECT FeedbackID, Email, Description, Star_Rating, AdminResponded FROM feedback_archived";

    console.log('Executing SQL query:', sql);

    con.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
            return res.status(500).json({ status: 'error', message: err.message });
        }

        try {
            const modifiedData = data.map(feedback => ({
                FeedbackID: feedback.FeedbackID,
                Email: feedback.Email,
                Description: feedback.Description,
                Star_Rating: feedback.Star_Rating,
                AdminResponded: feedback.AdminResponded
            }));
            console.log('Modified Data:', modifiedData);
            res.status(200).json({ status: 'success', feedbacks: modifiedData });
        } catch (error) {
            console.error('Error processing feedback:', error.message);
            res.status(500).json({ status: 'error', message: error.message });
        }
    });
});

app.post('/RestoreArchivedFeedback', async (req, res) => {
    const { FeedbackID } = req.body;
    const selectSql = 'SELECT * FROM feedback_archived WHERE FeedbackID = ?';
    const insertSql = 'INSERT INTO feedback (FeedbackID, Email, Description, Star_Rating, AdminResponded) VALUES (?, ?, ?, ?, ?)';
    const deleteArchivedSql = 'DELETE FROM feedback_archived WHERE FeedbackID = ?';

    try {
       
        const [archivedFeedbackInfo] = await queryAsync(selectSql, [FeedbackID]);

        console.log('Select SQL Query:', selectSql, 'Values:', [FeedbackID]);
        console.log('Archived feedback Info:', archivedFeedbackInfo);

        if (!archivedFeedbackInfo) {
            console.log('Archived feedback not found');
            return res.json({ status: 'failed', message: 'Archived feedback not found' });
        }

        await queryAsync(insertSql, [
            archivedFeedbackInfo.FeedbackID,
            archivedFeedbackInfo.Email,
            archivedFeedbackInfo.Description,
            archivedFeedbackInfo.Star_Rating,
            archivedFeedbackInfo.AdminResponded
        ]);

     
        await queryAsync(deleteArchivedSql, [FeedbackID]);

        console.log('Feedback restored successfully');
        return res.json({ status: 'success', message: 'Feedback restored successfully' });
    } catch (error) {
        console.error('Error restoring feedback:', error.message);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

    app.post('/respondToFeedback', async (req, res) => {
        const { feedbackId, responseText, userEmail } = req.body;
        if (!feedbackId || !responseText || !userEmail) {
            return res.status(400).json({ status: 'error', message: 'Invalid request parameters' });
        }
    
        try {
            const mailOptions = {
                from: 'funtaskmoto@gmail.com',
                to: userEmail,
                subject: 'Response to Your Feedback',
                text: responseText,
            };
    
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${userEmail} successfully`);
    
          
            const updateSql = `UPDATE feedback SET AdminResponded = 'Yes' WHERE FeedbackID = ?`;
    
            const result = await queryAsync(updateSql, [feedbackId]);
            console.log(`FeedbackID ${feedbackId} updated successfully:`, result);
    
            return res.status(200).json({ status: 'success', message: 'Email sent and feedback updated successfully' });
        } catch (error) {
            console.error('Error responding to feedback:', error.message);
            return res.status(500).json({ status: 'error', message: 'Error responding to feedback' });
        }
    });
    
    app.post('/UpdateUser', async (req, res) => {
        const {
            accountID,
            username,
            email,
            role,
        } = req.body;
    
        const updateSql = `
            UPDATE accounts
            SET username = ?,
                email = ?,
                role = ?
            WHERE accountID = ?`;
    
        try {
            await queryAsync(updateSql, [username, email, role, accountID]);
    
            const selectSql = `
                SELECT accountID, username, email, role
                FROM accounts
                WHERE accountID = ?`;
    
            const userData = await queryAsync(selectSql, [accountID]);
    
            if (userData.length === 0) {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }
    
            const updatedUser = {
                accountID: userData[0].accountID,
                username: userData[0].username,
                email: userData[0].email,
                role: userData[0].role,
            };
    
            res.status(200).json({ status: 'success', user: updatedUser });
        } catch (error) {
            console.error('Error updating user:', error.message);
            res.status(500).json({ status: 'error', message: 'Error updating user' });
        }
    });



    app.get('/Getlogs', (req, res) => {
        const sql = "SELECT logID, accountID, username, email, role, activity_date, Activity FROM adminlogs";
        
        console.log('Executing SQL query:', sql);
        
        con.query(sql, (err, data) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                return res.status(500).json({ status: 'error', message: err.message });
            }
        
            try {
                const modifiedData = data.map(user => ({
                    logID: user.logID,
                    accountID: user.accountID,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    activity_date: user.activity_date,
                    Activity: user.Activity,
                }));
                console.log('Modified Data:', modifiedData);
                res.status(200).json({ status: 'success', users: modifiedData });
            } catch (error) {
                console.error('Error processing users:', error.message);
                res.status(500).json({ status: 'error', message: error.message });
            }
        });
    });
    app.post('/logAdminActivity', (req, res) => {
        const { accountID, username, email, role, activity } = req.body;
        const activity_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
        const sql = `INSERT INTO adminlogs (accountID, username, email, role, activity_date, Activity) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [accountID, username, email, role, activity_date, activity];
      
        console.log('Executing SQL query:', sql);
      
        con.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error executing SQL query:', err.message);
            return res.status(500).json({ status: 'error', message: err.message });
          }
      
          console.log('Admin activity logged successfully');
          res.status(200).json({ status: 'success' });
        });
      });


// Start the server
app.listen(port, () => {
    console.log('Now Listening: ' + port);
});
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;
const secretKey1 = 'secret_key_agent';
const secretKey2 = 'secret_key_ph';
const secretKey3 = 'secret_key_admin';
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Sreeja123',
  database: 'insurance_db',
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
  } else {
    console.log('Connected to the MySQL database');
  }
});


/*
app.get('/policy_history', (req, res) => {
    db.query('SELECT * FROM policy_holder', (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log('Data from the database:', result);
        res.status(200).json(result);
       

      }
    });
  });*/

  
  /*
  app.post('/api/demoagent',(req,res)=>{
    const {username}=req.body;

    app.get('/demo_agent', (req, res) => {
  db.query('SELECT * FROM agent_data natural join agent_login where username=?',[username], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('Data from the database:', result);
      res.status(200).json(result);
     

    }
  });
});



  });*/
/*
app.get('/demo_agent', (req, res) => {
  db.query('SELECT * FROM agent_data natural join agent_login', (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('Data from the database:', result);
      res.status(200).json(result);
     

    }
  });
});*/



app.get('/choose_policy', (req, res) => {
  db.query('SELECT * FROM policy', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json(result);
    }
  });
});




/*
app.post('/choose_plan', (req, res) => {
  const { policy_type } = req.body;

  if (!policy_type) {
    return res.status(400).json({ error: 'Missing policy_type' });
  }
  db.query('SELECT plan.* FROM policy JOIN plan ON policy.policy_id = plan.policy_id WHERE policy.type = ?', [policy_type], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('JSON Object sent to the client:', result);

      res.status(200).json(result);
    }
  });
});*/


//NESTED QUERY
app.post('/choose_plan', (req, res) => {
  const { policy_type } = req.body;

  if (!policy_type) {
    return res.status(400).json({ error: 'Missing policy_type' });
  }

  const selectQuery = `
    SELECT * FROM plan 
    WHERE policy_id IN (
      SELECT policy_id FROM policy 
      WHERE type = ?
    )`;

  db.query(selectQuery, [policy_type], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('JSON Object sent to the client:', result);
      res.status(200).json(result);
    }
  });
});


app.get('/get_all_policy', (req, res) => {
  db.query('SELECT * FROM policy', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.post('/sell_policy', (req, res) => {
  const { username, policy_id } = req.body;

  const findQuery = 'SELECT agent_id FROM agent_login WHERE username=?';
  db.query(findQuery, [username], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const agentID = result[0].agent_id;

    const sellPolicyQuery = 'INSERT INTO agent_sold_policy (agent_id, policy_id) VALUES (?, ?)';
    const sellPolicyValues = [agentID, policy_id];

    db.query(sellPolicyQuery, sellPolicyValues, (err, result) => {
      if (err) {
        console.error('Error selling policy:', err);
        return res.status(500).json({ error: 'Error selling policy' });
      }

      console.log('Policy sold successfully');
      res.status(200).json({ message: 'Policy sold successfully' });
    });
  });
});

app.post('/calculate_end_date', (req, res) => {
  const { start_date } = req.body;

  const query = 'SELECT end_date_plan(?) AS end_date';
  db.query(query, [start_date], (error, results) => {
    if (error) {
      console.error('Error calculating end date:', error);
      res.status(500).json({ error: 'Failed to calculate end date' });
    } else {
      const end_date = results[0].end_date;
      res.status(200).json({ end_date });
    }
  });
});




app.post('/chosenpolicy_plan', (req, res) => {
  const {selectedType,plantype,startDate,endDate,policyholder_id} = req.body;


  const get_plan_id='SELECT plan_id from plan where name=?';
  db.query(get_plan_id, [plantype], (err, result) => {
    if (err) {
      console.error('Error finding data from the database:', err);
      res.status(500).send(err);
    } else {
      console.log('Data found:', result);
      res.status(200).json({ message: ' successfully' });
     
      planid=result[0].plan_id;
      const plan_issued = 'INSERT INTO policy_issued_by  (plan_id,policyholder_id,start_date,end_date) VALUES (?, ?, ?,?)';
      db.query(plan_issued, [planid,policyholder_id,startDate,endDate], (err, Result) => {
        if (err) {
          console.error('Error inserting  data:', err);
          res.status(500).send('Error ');
        } else {
         
          console.log("ok");
        }
      });

    }
  });
});

app.post('/demo_agent', (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  const query = 'SELECT * FROM agent_data NATURAL JOIN agent_login WHERE username = ?';

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log('Data from the database:', result);
    res.status(200).json(result);
  });
});


app.post('/demo_holder', (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  const query = 'SELECT * FROM policy_holder NATURAL JOIN policyholder_login WHERE username = ?';

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log('Data from the database:', result);
    
    if (result && result[0] && result[0].message) {
      // Send the trigger error message to the client
      return res.status(400).json({ error: result[0].message });
    }
    res.status(200).json(result);
  });
});


app.post('/policyholder_password_change', (req, res) => {
  const { username, password } = req.body;

  // Assuming you have a 'policyholders' table in your database
  const updateQuery = `UPDATE policyholder_login SET password = ? WHERE username = ?`;

  db.query(updateQuery, [password, username], (err, result) => {
    if (err) {
      console.error('Error updating password:', err);
      res.status(500).json({ loginStatus: 'error' });
    } else if (result.affectedRows > 0) {
      // Password updated successfully
      res.json({ loginStatus: 'success' });
    } else {
      // No rows were affected, meaning the username was not found
      res.status(404).json({ loginStatus: 'not_found' });
    }
  });
});

app.post('/agent_password_change', (req, res) => {
  const { username, password } = req.body;

  // Assuming you have a 'policyholders' table in your database
  const updateQuery = `UPDATE agent_login SET password = ? WHERE username = ?`;

  db.query(updateQuery, [password, username], (err, result) => {
    if (err) {
      console.error('Error updating password:', err);
      res.status(500).json({ loginStatus: 'error' });
    } else if (result.affectedRows > 0) {
      // Password updated successfully
      res.json({ loginStatus: 'success' });
    } else {
      // No rows were affected, meaning the username was not found
      res.status(404).json({ loginStatus: 'not_found' });
    }
  });
});
/*
app.post('/make_claim', (req, res) => {
  const { reason,date,claimed_amount,username,category } = req.body;

  const findQuery = 'SELECT policyholder_id from policyholder_login where username=?';
  db.query(findQuery, [username], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Data queried from the database:', result);

      if (result.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const policyholderId = result[0].policyholder_id;
        const selectSQL = 'SELECT plan_id from policy_issued_by where policyholder_id=?';
        db.query(selectSQL, [policyholderId], (err, result1) => {
          if (err) {
            console.error('Error querying policy data:', err);
            res.status(500).json({ error: 'Database error' });
          } else {
            const planID = result1.map(item => item.plan_id);
            console.log(planID)
            const coveragesql='select coverage_id from coverage where (plan_id in (?) )and  (coverage_name=?) and (coverage_amount>=?)';
            db.query(coveragesql,[planID,category,claimed_amount],(err,result2)=>{
              if (err) {
                console.error('Error querying the database:', err);
                res.status(500).json({ error: 'Database error' });
              }
              else{
                if (result2.length === 0) {
                 
                 
                  const insert_claim='INSERT into claim (claim_id,claim_date,status,reason,policyholder_id) values(?,?,?,?,?)';
                  db.query(insert_claim,[date,"Rejected",reason,policyholderId],(err,result3)=>{
                    if (err) {
                      console.error('Error querying the database:', err);
                      res.status(500).json({ error: 'Database error' });
                    } else {
                      console.log('Data inserted from the database:', result3);

                      const claimID = result3.insertId;
                      const coverageID = result2.map(item => item.coverage_id);
                      const claimrelation='INSERT INTO claims_coverage (claim_id, coverage_id, claimed_amount) VALUES (?,?, ?)';
                      db.query(claimrelation,[claimID,coverageID,claimed_amount],(err,result4)=>{
                        if (err) {
                          console.error('Error querying the database:', err);
                          res.status(500).json({ error: 'Database error' });
                        } else {
                          console.log('Data inserted from the database:', result4);
                        }


                      })
                      
                    }
                
                  })
                  res.status(200).json({ success: 'Rejected' });
                } else {
                 
                  const insert_claim='INSERT into claim (claim_id,claim_date,status,reason,policyholder_id) values(?,?,?,?,?)';
                  db.query(insert_claim,[date,"Accepted",reason,policyholderId],(err,result3)=>{
                    if (err) {
                      console.error('Error querying the database:', err);
                      res.status(500).json({ error: 'Database error' });
                    } else {

                      console.log('Data inserted from the database:', result3);

                      const claimID = result3.insertId;
                      const coverageID = result2.map(item => item.coverage_id);
                      const claimrelation='INSERT INTO claims_coverage (claim_id, coverage_id, claimed_amount) VALUES (?,?, ?)';
                      db.query(claimrelation,[claimID,coverageID,claimed_amount],(err,result4)=>{
                        if (err) {
                          console.error('Error querying the database:', err);
                          res.status(500).json({ error: 'Database error' });
                        } else {
                          console.log('Data inserted from the database:', result4);
                        }


                      })


                    }
                
                  })
                  
                  res.status(200).json({ success: 'Accepted' });
                }

              }

            })

          }
        });
      }
    }
  });
});
*/

/*
app.post('/make_claim', (req, res) => {
  const { reason, date, claimed_amount, username, category } = req.body;

  const findQuery = 'SELECT policyholder_id from policyholder_login where username=?';
  db.query(findQuery, [username], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      //res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Data queried from the database:', result);

      if (result.length === 0) {
        //res.status(404).json({ error: 'User not found' });
      } else {
        const policyholderId = result[0].policyholder_id;
        const selectSQL = 'SELECT plan_id from policy_issued_by where policyholder_id=?';
        db.query(selectSQL, [policyholderId], (err, result1) => {
          if (err) {
            console.error('Error querying policy data:', err);
            //res.status(500).json({ error: 'Database error' });
          } else {
            const planID = result1.map(item => item.plan_id);
            console.log(planID)
            const coveragesql = 'select coverage_id from coverage where (plan_id in (?)) and (coverage_name=?) and (coverage_amount>=?)';
            db.query(coveragesql, [planID, category, claimed_amount], (err, result2) => {
              if (err) {
                console.error('Error querying the database:', err);
                //res.status(500).json({ error: 'Database error' });
              } else {
                const coverageID = result2.map(item => item.coverage_id);
                if (result2.length === 0) {
                  const status = 'Rejected';
                  insertClaimAndCoverage(status, policyholderId,date,reason,claimed_amount,coverageID);
                } else {
                  const status = 'Accepted';
                  insertClaimAndCoverage(status, policyholderId,date,reason,claimed_amount,coverageID);
                }
              }
            });
          }
        });
      }
    }
  });

  function insertClaimAndCoverage(status, policyholderId,date,reason,claimed_amount,coverageID) {
    const insertClaim = 'INSERT into claim (claim_date, status, reason, policyholder_id) values(?,?,?,?)';
    db.query(insertClaim, [date, status, reason, policyholderId], (err, result3) => {
      if (err) {
        console.error('Error querying the database:', err);
        //res.status(500).json({ error: 'Database error' });
      } else {
        console.log('Data inserted from the database:', result3);

        const claimID = result3.insertId;
        
        const claimrelation = 'INSERT INTO claims_coverage (claim_id, coverage_id, claimed_amount) VALUES (?,?, ?)';
        db.query(claimrelation, [claimID, coverageID, claimed_amount], (err, result4) => {
          if (err) {
            console.error('Error querying the database:', err);
           // res.status(500).json({ error: 'Database error' });
          } else {
            console.log('Data inserted from the database:', result4);
          }
        });
      }
    });

    // Send the response outside the nested callbacks
    res.status(200).json({ success: status });
  }
});*/

app.post('/make_claim', (req, res) => {
  const { reason, date, claimed_amount, username, category } = req.body;

  const findQuery = 'SELECT policyholder_id FROM policyholder_login WHERE username=?';
  db.query(findQuery, [username], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Data queried from the database:', result);

      if (result.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const policyholderId = result[0].policyholder_id;
        const selectSQL = 'SELECT plan_id FROM policy_issued_by WHERE policyholder_id=?';
        db.query(selectSQL, [policyholderId], (err, result1) => {
          if (err) {
            console.error('Error querying policy data:', err);
            res.status(500).json({ error: 'Database error' });
          } else {
            const planID = result1.map(item => item.plan_id);
            console.log(planID)
            const coveragesql = 'SELECT coverage_id FROM coverage WHERE (plan_id IN (?)) AND (coverage_name=?) AND (coverage_amount>=?)';
            db.query(coveragesql, [planID, category, claimed_amount], (err, result2) => {
              if (err) {
                console.error('Error querying the database:', err);
                res.status(500).json({ error: 'Database error' });
              } else {
                const coverageID = result2.map(item => item.coverage_id);
                if (result2.length === 0) {
                  const status = 'Rejected';
                  insertClaimAndCoverage(res, status, policyholderId, date, reason, claimed_amount, coverageID);
                } else {
                  const status = 'Accepted';
                  insertClaimAndCoverage(res, status, policyholderId, date, reason, claimed_amount, coverageID);
                }
              }
            });
          }
        });
      }
    }
  });

  function insertClaimAndCoverage(res, status, policyholderId, date, reason, claimed_amount, coverageID) {
    const insertClaim = 'INSERT INTO claim (claim_date, status, reason, policyholder_id) VALUES (?, ?, ?, ?)';
    db.query(insertClaim, [date, status, reason, policyholderId], (err, result3) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Database error' });
      } else {
        console.log('Data inserted from the database:', result3);

        const claimID = result3.insertId;

        const claimrelation = 'INSERT INTO claims_coverage (claim_id, coverage_id, claimed_amount) VALUES (?, ?, ?)';
        db.query(claimrelation, [claimID, coverageID[0], claimed_amount], (err, result4) => {
          if (err) {
            console.error('Error querying the database:', err);
            //res.status(500).json({ error: 'Database error' });
          } else {
            console.log('Data inserted from the database:', result4);
            // Send the response outside the nested callbacks
           
          }
        });
      }
    });
    res.status(200).json({ success: status });
  }
});


app.post('/get_sold_policies', (req, res) => {
  const { username } = req.body;

  const agentIdQuery = `
  SELECT agent_id FROM agent_data NATURAL JOIN agent_login WHERE username = ?;
  `;

  db.query(agentIdQuery, [username], (err, agentResults) => {
    if (err) {
      console.error('Error fetching agent ID:', err);
      res.status(500).send('Failed to fetch agent ID');
    } else {
      const agentId = agentResults[0].agent_id;
      const sqlQuery = `
        SELECT pib.policyholder_id, pib.plan_id, p.policy_id
        FROM policy_issued_by AS pib
        JOIN plan AS p ON pib.plan_id = p.plan_id
        JOIN agent_sold_policy AS asp ON p.policy_id = asp.policy_id
        WHERE asp.agent_id = ?;
      `;

      db.query(sqlQuery, [agentId], (err, results) => {
        if (err) {
          console.error('Error fetching policy IDs:', err);
          res.status(500).send('Failed to fetch policy IDs');
        } else {
          const policyIds = results;
          const policyholderQuery = `
            SELECT ph.fname AS policyholder_name, ph.phone, po.name AS plan_name, pl.type AS policy_type
            FROM (
              SELECT pib.policyholder_id, pib.plan_id, p.policy_id
              FROM policy_issued_by AS pib
              JOIN plan AS p ON pib.plan_id = p.plan_id
              JOIN agent_sold_policy AS asp ON p.policy_id = asp.policy_id
              WHERE asp.agent_id = ?
            ) AS policy_ids
            JOIN policy_holder AS ph ON policy_ids.policyholder_id = ph.policyholder_id
            JOIN plan AS po ON policy_ids.plan_id = po.plan_id
            JOIN policy AS pl ON policy_ids.policy_id = pl.policy_id;
          `;

          db.query(policyholderQuery, [agentId], (err, policyholderResults) => {
            if (err) {
              console.error('Error fetching policyholder data:', err);
              res.status(500).send('Failed to fetch policyholder data');
            } else {
              const combinedData = policyIds.map((policy, index) => ({
                ...policy,
                policyholder_name: policyholderResults[index].policyholder_name,
                phone: policyholderResults[index].phone,
                plan_name: policyholderResults[index].plan_name,
                policy_type: policyholderResults[index].policy_type,
              }));

              res.status(200).json(combinedData);
              console.log('Data Sent:', combinedData);
            }
          });
        }
      });
    }
  });
});

app.post('/bought_policy', (req, res) => {
  const { username } = req.body;

  const findQuery = 'SELECT policyholder_id from policyholder_login where username=?';
  db.query(findQuery, [username], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Data queried from the database:', result);

      if (result.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const policyholderId = result[0].policyholder_id;

        const joinSQL = 'SELECT pib.*, p.type AS policy_type, pl.name AS plan_name  FROM policy_issued_by AS pib JOIN plan AS pl ON pib.plan_id = pl.plan_id JOIN policy AS p ON pl.policy_id = p.policy_id WHERE pib.policyholder_id = ?';
        db.query(joinSQL, [policyholderId], (err, result) => {
          if (err) {
            console.error('Error querying policy data:', err);
            res.status(500).json({ error: 'Database error' });
          } else {
            console.log("Data retrieved successfully");
            console.log(result);
            res.status(200).json(result);
          }
        });
      }
    }
  });
});

app.get('/obsrve_policy', (req, res) => {
  db.query(`SELECT 
  policy_id,
  SUM(count_plan_id) AS total_count_plan_id, 
  MAX(test1.policy_type) AS policy_type
FROM
  (
    SELECT
      plan_id,
      COUNT(plan_id) AS count_plan_id,
      MAX(test.policy_id) AS policy_id,
      MAX(test.policy_type) AS policy_type
    FROM
      (
        SELECT
          pib.plan_id,
          pib.policyholder_id,
          p.type AS policy_type,
          p.policy_id,
          pl.name AS plan_name
        FROM
          policy_issued_by AS pib
          JOIN plan AS pl ON pib.plan_id = pl.plan_id
          JOIN policy AS p ON pl.policy_id = p.policy_id
      ) AS test
    GROUP BY
      plan_id
  ) AS test1
GROUP BY
  policy_id`
, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json(result);
    }
  });
});


/*
app.post('/policy_beneficiary', (req, res) => {
  const { fname, lname, age, email, phone, dob, city, state, pin, username } = req.body;


  const findQuery = 'SELECT policyholder_id FROM policyholder_login WHERE username=?';
  db.query(findQuery, [username], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const policyholderId = result[0].policyholder_id;

        const insertQuery = 'INSERT INTO BENEFICIARY (policyholder_id, fname, lname, age, email, phone, dob, city, state, pin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [policyholderId, fname, lname, age, email, phone, dob, city, state, pin], (err, result) => {
          if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send(err);
          } else {
            console.log('Data inserted into the database:', result);
            res.status(200).json({ message: 'Data inserted successfully' });
          }
        });
      }
    }
  });
});
*/

app.post('/policy_beneficiary', (req, res) => {
  const { fname, lname, age, email, phone, dob, city, state, pin, username } = req.body;


  const findQuery = 'SELECT policyholder_id FROM policyholder_login WHERE username=?';
  db.query(findQuery, [username], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const policyholderId = result[0].policyholder_id;
        const selectsql='select count(beneficiary_id) from BENEFICIARY where policyholder_id=? ';
        db.query(selectsql,[policyholderId],(err,result1)=>{
          if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ error: 'Database error' });
          }
          else{
            if(result1[0]['count(beneficiary_id)']===5){
              res.status(200).json({ success: 'beneficiary limit exceeded can not create a new beneficiary' });

            }
            else{
              const insertQuery = 'INSERT INTO BENEFICIARY (policyholder_id, fname, lname, age, email, phone, dob, city, state, pin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
              db.query(insertQuery, [policyholderId, fname, lname, age, email, phone, dob, city, state, pin], (err, result) => {
                if (err) {
                  console.error('Error inserting data into the database:', err);
                  res.status(500).send(err);
                } else {
                  console.log('Data inserted into the database:', result);
                  res.status(200).json({ message: 'Data inserted successfully' });
                }
              });

            }
          }
        })
     
      }
    }
  });
});


app.delete('/delete_beneficiary', (req, res) => {
  const { fname, lname, phone, username } = req.body;

  const findQuery = 'SELECT policyholder_id FROM policyholder_login WHERE username=?';

  db.query(findQuery, [username], (error, results) => {
    if (error) {
      console.error('Error finding policyholder: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Policyholder not found' });
      return;
    }

    const policyholderId = results[0].policyholder_id;

    const deleteQuery =
      'DELETE FROM beneficiary WHERE fname = ? AND lname = ? AND phone = ? AND policyholder_id = ?';

    db.query(deleteQuery, [fname, lname, phone, policyholderId], (deleteError, deleteResults) => {
      if (deleteError) {
        console.error('Error deleting beneficiary: ', deleteError);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (deleteResults.affectedRows > 0) {
        res.json({ success: 'Beneficiary deleted successfully' });
      } else {
        res.status(404).json({ error: 'Beneficiary not found' });
      }
    });
  });
});







 

  app.post('/policyholder', (req, res) => {
    const { fname, lname, age, email, phone, dob, city, statee, pin,username,password} = req.body;
  
    const insertQuery = 'INSERT INTO policy_holder (fname, lname, age, email, phone, dob, city, statee, pin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [fname, lname, age, email, phone, dob, city, statee, pin], (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).send(err);
      } else {
        console.log('Data inserted into the database:', result);
        res.status(200).json({ message: 'Data inserted successfully' });

        const policyholderId = result.insertId;
        const loginInsertSQL = 'INSERT INTO policyholder_login (policyholder_id, username, password) VALUES (?, ?, ?)';
        db.query(loginInsertSQL, [policyholderId, username, password], (err, loginResult) => {
          if (err) {
            console.error('Error inserting policy holder login data:', err);
            res.status(500).send('Error registering policy holder');
          } else {
            const token = jwt.sign({ username, policyholderId }, secretKey2);
            res.status(200).json({ message: 'Policy holder registered successfully', token });
          }
        });

      }
    });
  });

  
/*
  app.post('/policyholder', async (req, res) => {
    try {
      const { fname, lname, age, email, phone, dob, city, statee, pin, username, password } = req.body;
  
      const insertQuery = `
        INSERT INTO policy_holder (fname, lname, age, email, phone, dob, city, statee, pin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
  
      const result = await new Promise((resolve, reject) => {
        db.query(insertQuery, [fname, lname, age, email, phone, dob, city, statee, pin], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
  
      console.log('Data inserted into the database:', result);
  
      res.status(200).json({ message: 'Data inserted successfully' });
  
      const policyholderId = result.insertId;
      const loginInsertSQL = 'INSERT INTO policyholder_login (policyholder_id, username, password) VALUES (?, ?, ?)';
  
      await new Promise((resolve, reject) => {
        db.query(loginInsertSQL, [policyholderId, username, password], (err, loginResult) => {
          if (err) reject(err);
          else resolve(loginResult);
        });
      });
  
      const token = jwt.sign({ username, policyholderId }, secretKey2);
      res.status(200).json({ message: 'Policy holder registered successfully', token });
    } catch (err) {
      console.error('Error inserting data into the database:', err);
  
      // Check if the error is from the trigger
      if (err.code === 'ER_SIGNAL_EXCEPTION') {
        return res.status(200).json({ message: err.sqlMessage }); // Send the trigger message to the frontend
      }
  
      res.status(500).send(err);
    }
  });
  
  */
  
  
  
  
  
  

  app.post('/login_policyholder', (req, res) => {
    const { username, password } = req.body;
  
   
    const loginSQL = 'SELECT * FROM policyholder_login WHERE username = ?';
    db.query(loginSQL, [username], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        res.status(500).json({ loginStatus: 'error' });
      } else if (results.length > 0) {
        const storedPassword = results[0].password; 
  
        
        if (password === storedPassword) {
          const token = jwt.sign({ username }, secretKey2);
          res.status(200).json({ loginStatus: 'success', token });
        } else {
          res.status(200).json({ loginStatus: 'invalid' });
        }
      } else {
        res.status(200).json({ loginStatus: 'invalid' });
      }
    });
  });

  const verifyToken2 = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).send('Access denied. Token not provided.');
    }
  
    jwt.verify(token, secretKey2, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token.');
      }
  
      req.user = decoded;
      next();
    })};



    app.get('/dashboard2', verifyToken2, (req, res) => {
      // Access to this route is protected. You can access the authenticated user's data through req.user.
      // Example: const userId = req.user.id;
      const user = req.user;
      // Return data or perform actions specific to the authenticated user
      res.status(200).json({ message: 'Access granted to protected route', user });
    });



    


  const verifyToken1 = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).send('Access denied. Token not provided.');
    }
  
    jwt.verify(token, secretKey1, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token.');
      }
  
      req.user = decoded; // Attach the user info to the request
      next();
    })};


   
  
  // Protected route for testing token-based authentication
  app.get('/dashboard1', verifyToken1, (req, res) => {
    // Access to this route is protected. You can access the authenticated user's data through req.user.
    // Example: const userId = req.user.id;
    const user = req.user;
    // Return data or perform actions specific to the authenticated user
    res.status(200).json({ message: 'Access granted to protected route', user });
  });


  

  app.post('/login_agent', (req, res) => {
    const { username, password } = req.body;
  
    // Check the database for the username
    const loginSQL = 'SELECT * FROM agent_login WHERE username = ?';
    db.query(loginSQL, [username], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        res.status(500).json({ loginStatus: 'error' });
      } else if (results.length > 0) {
        const storedPassword = results[0].password; 
  
        
        if (password === storedPassword) {
          const token = jwt.sign({ username }, secretKey1);
          res.status(200).json({ loginStatus: 'success', token });
        } else {
          res.status(200).json({ loginStatus: 'invalid' });
        }
      } else {
        res.status(200).json({ loginStatus: 'invalid' });
      }
    });
  });

  app.post('/login_admin', (req, res) => {
    const { username, password } = req.body;
  
    // Check the database for the username
    const loginSQL = 'SELECT * FROM admin WHERE username = ?';
    db.query(loginSQL, [username], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        res.status(500).json({ loginStatus: 'error' });
      } else if (results.length > 0) {
        const storedPassword = results[0].password; 
  
        
        if (password === storedPassword) {
          const token = jwt.sign({ username }, secretKey3);
          res.status(200).json({ loginStatus: 'success', token });
        } else {
          res.status(200).json({ loginStatus: 'invalid' });
        }
      } else {
        res.status(200).json({ loginStatus: 'invalid' });
      }
    });
  });

  app.post('/calculateBonus', (req, res) => {
    const { agentID } = req.body;
  
    db.query('CALL CalculateBonusForAgent(?)', [agentID], (err, results) => {
      if (err) {
        console.error('Error calling stored procedure:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      const bonusAmount = results[0][0].bonus;
      console.log(bonusAmount)
  
      res.json({ bonus: bonusAmount });
    });
  });
  
  
  

  
  
  app.post('/submit-registration', (req, res) => {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      licensenumber,
      dob,
      city,
      street,
      zipcode,
      username,
      password
    } = req.body;
  
    const sql = 'INSERT INTO agent_data (firstname,lastname,email,phonenumber,licensenumber,dob,city,street,zipcode) VALUES (?, ?, ?, ?, ?, ?,?,?,?)';
    db.query(sql, [firstname, lastname, email, phonenumber, licensenumber, dob, city, street, zipcode], (err, result) => {
      if (err) {
        console.error('Error inserting agent data:', err);
        res.status(500).send('Error submitting agent details');
      } else {
        console.log('Agent details inserted:', result);
  
        const agentId = result.insertId;
        const loginInsertSQL = 'INSERT INTO agent_login (agent_id, username, password) VALUES (?, ?, ?)';
        db.query(loginInsertSQL, [agentId, username, password], (err, loginResult) => {
          if (err) {
            console.error('Error inserting agent login data:', err);
            res.status(500).send('Error registering agent');
          } else {
            const token = jwt.sign({ username, agentId }, secretKey1);
            res.status(200).json({ message: 'Agent registered successfully', token });
          }
        });
      }
    });
  });
  

  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

var express = require("express");
var router = express.Router();
var { uploadImage } = require("./multer");
var pool = require("./pool");
var bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/jwtConfig");
var jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

router.post("/getPrevSpentTime", (req, res) => {
  try {
    pool.query(
      `SELECT spent_time FROM learning_time where userid=? and page_name=? and created_on=?`,
      [
        req.body.userid,
        req.body.pageName,
        new Date().toISOString().split("T")[0],
      ],
      (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
        } else {
          if (result.length == 0)
            return res.status(200).json({ success: false });
          res.status(200).json({ success: true, data: result });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/insertLearningTime", (req, res) => {
  try {
    var { learningTime, userId, pageName } = req.body;
    let q = `
    SELECT created_on FROM learning_time WHERE userid = ${userId} AND page_name = '${pageName}'
    `;
    pool.query(q, (err, result) => {
      if (err) throw err;
      else if (result.length > 0) {
        let dateValues = result.map((item) => {
          return item.created_on;
        });
        if (dateValues.includes(new Date().toISOString().split("T")[0])) {
          let q = `
          UPDATE learning_time SET spent_time = ? WHERE userid = ? AND page_name = ? AND created_on = ?
          `;
          pool.query(
            q,
            [
              learningTime,
              userId,
              pageName,
              new Date().toISOString().split("T")[0],
            ],
            (err, result) => {
              if (err) throw err;
              else {
                res.status(200).json({ success: true, msg: "Updated" });
              }
            }
          ),
            (err) => {
              throw err;
            };
        } else {
          let q = `
          INSERT INTO learning_time (spent_time, userid, page_name, updated_on, created_on) VALUES (? ,? ,? ,?, ?)
          `;
          pool.query(
            q,
            [
              learningTime,
              userId,
              pageName,
              new Date(),
              new Date().toISOString().split("T")[0],
            ],
            (err, result) => {
              if (err) throw err;
              else {
                res.status(200).json({ success: true, msg: "Inserted" });
              }
            }
          ),
            (err) => {
              throw err;
            };
        }
      } else {
        let q = `
          INSERT INTO learning_time (spent_time, userid, page_name, updated_on, created_on) VALUES (? ,? ,? ,?, ?)
          `;
        pool.query(
          q,
          [
            learningTime,
            userId,
            pageName,
            new Date(),
            new Date().toISOString().split("T")[0],
          ],
          (err, result) => {
            if (err) throw err;
            else {
              res.status(200).json(true);
            }
          }
        ),
          (err) => {
            throw err;
          };
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/getLearningData", (req, res) => {
  try {
    let query = `
    select * from learning_time where userid = ?
    `;
    pool.query(query, [req.body.userId], (err, result) => {
      if (err) {
        res.status(500).json({ success: false, error: err });
      } else {
        let xAxisData = result.map((item) => {
          return item.created_on;
        });
        let xAxisLabels = [...new Set(xAxisData)];
        
        let courseData = result
          .filter((item) => item.page_name == "Courses")
          .map((item) => {
            return item.spent_time;
          });
        let mocksData = result
          .filter((item) => item.page_name == "Mock Tests")
          .map((item) => {
            return item.spent_time;
          });

        let seriesData = [
          {
            name: "Courses",
            type: "line",
            data: courseData,
            smooth: true,
          },
          {
            name: "Mock Tests",
            type: "line",
            data: mocksData,
            smooth: true,
          },
        ];
        console.log(seriesData);

        res
          .status(200)
          .json({ data: seriesData, labels: xAxisLabels, success: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteFeedback", (req, res) => {
  try {
    pool.query(
      `DELETE FROM feedbacks WHERE id=?`,
      [req.body.id],
      (err, result) => {
        if (err) {
          console.log("Error in deleting feedback", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateFeedbackStatus", (req, res) => {
  try {
    pool.query(
      "UPDATE feedbacks SET review_status = ? WHERE id = ?",
      [req.body.review_status, req.body.id],
      (err, result) => {
        if (err) throw err;
        else {
          res.status(200).json({ success: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchAllFeedbacks", (req, res, next) => {
  try {
    pool.query(
      `
      SELECT a.*,(select b.username FROM userdetails as b where b.userid = a.userid) as username FROM feedbacks as a;
      `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching feedbacks", err);
          res.status(500).json({ data: [], success: false });
        } else {
          res.status(200).json({ data: result, success: true });
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/checkadminlogin", function (req, res, next) {
  pool.query(
    "select * from `admin` where email=? and password=?",
    [req.body.email, req.body.password],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json([]);
      } else {
        if (result.length == 1) {
          const token = jwt.sign({ id: result[0].emailid }, secret, {
            expiresIn: "1h",
          });
          res.status(200).json({ success: true, data: result, token: token });
        } else {
          console.log(req.body);
          res.status(200).json({ success: false });
        }
      }
    }
  );
});

router.post("/checkuser", (req, res, next) => {
  try {
    pool.query(
      "select * from userdetails where mobileno=?",
      [req.body.phone],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json([]);
        } else {
          if (result.length >= 1) {
            res.status(200).json({ data: result, msg: true });
          } else {
            res.status(200).json({ data: [], msg: false });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchProfile/:userid", (req, res, next) => {
  try {
    let { userid } = req.params;
    pool.query(
      `SELECT a.*,(SELECT DISTINCT COUNT(b.resultid) OVER () from civil_judge.mockresults as b where b.userid = a.userid group by b.mockname,b.subjectname) as mocks_count FROM civil_judge.userdetails as a where a.userid=?; `,
      [userid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json([]);
        } else {
          if (result.length >= 1) {
            res.status(200).json({ data: result[0], msg: true });
          } else {
            res.status(200).json({ data: [], msg: false });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/updateprofilepic",
  uploadImage.single("picture"),
  (req, res, next) => {
    let body = req.body;
    pool.query(
      `
  UPDATE userdetails SET picture=?, updated_on=? WHERE userid = ?
  `,
      [req.file.originalname, new Date(), body.userid],
      (err, result) => {
        if (err) {
          console.log("Error in updating profile picture", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);

router.post("/updateprofile", (req, res, next) => {
  try {
    let currentPassword = req.body.currentPassword;
    let newPassword = req.body.newPassword;
    if (currentPassword != "" && newPassword != "") {
      pool.query(
        "select password from userdetails where userid=?",
        [req.body.userid],
        function (error, result) {
          if (error) {
            console.log(error);
            res.status(500).json({
              data: [],
              msg: "Server Error",
              success: false,
            });
          } else {
            if (result.length == 1) {
              if (bcrypt.compareSync(currentPassword, result[0].password)) {
                pool.query(
                  `
        UPDATE userdetails SET username=?, email=?,password=?, mobileno=?, gender=?, address=?, city=?, state=?, pincode=?, updated_on=? WHERE userid=?
        `,
                  [
                    req.body.username,
                    req.body.email,
                    bcrypt.hashSync(newPassword, 8),
                    req.body.phone,
                    req.body.gender,
                    req.body.address,
                    req.body.city,
                    req.body.state,
                    req.body.pinCode,
                    new Date(),
                    req.body.userid,
                  ],
                  function (passworderror, finalresult) {
                    if (passworderror) {
                      console.log(passworderror);
                      res.status(500).json({
                        data: [],
                        msg: passworderror.message,
                        success: false,
                      });
                    } else {
                      res.status(200).json({
                        data: finalresult,
                        msg: "Profile Updated Successfully",
                        success: true,
                      });
                    }
                  }
                );
              } else {
                res.status(200).json({
                  data: [],
                  msg: "Incorrect Password",
                  success: true,
                });
              }
            }
          }
        }
      );
    } else {
      pool.query(
        `
    UPDATE userdetails SET username=?, email=?, mobileno=?,
    gender=?, address=?, city=?, state=?, pincode=?, updated_on=? WHERE userid=?
    `,
        [
          req.body.username,
          req.body.email,
          req.body.phone,
          req.body.gender,
          req.body.address,
          req.body.city,
          req.body.state,
          req.body.pinCode,
          new Date(),
          req.body.userid,
        ],
        (e, r) => {
          if (e) {
            res.status(500).json({
              data: [],
              msg: e.message,
              success: false,
            });
          } else {
            res.status(200).json({
              data: r,
              msg: "Profile Updated Successfully",
              success: true,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM userdetails WHERE email = ?
        `,
      [req.body.email],
      (err, result) => {
        if (err) {
          console.log("Error in login", err);
          res.status(500).json(false);
        } else {
          if (result.length > 0) {
            var passwordIsSame = bcrypt.compareSync(
              req.body.password,
              result[0]?.password
            );
            if (passwordIsSame) {
              res.status(200).json({ data: result, msg: "success" });
            } else {
              res.status(200).json({ msg: "Invalid password" });
            }
          } else {
            res.status(200).json({ msg: "failure" });
          }
        }
      }
    );
  } catch (error) {
    console.log("Error in login", error);
  }
});

router.post("/signup", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT password FROM userdetails WHERE email = ?
        `,
      [req.body.email],
      (error, ress) => {
        if (error) {
          console.log("Error in fetching userid", error);
          res.status(500).json(false);
        } else {
          if (ress.length > 0) {
            var passwordIsSame = bcrypt.compareSync(
              req.body.password,
              ress[0]?.password
            );
            if (passwordIsSame) {
              return res.status(200).json({ msg: "User already exists" });
            }
          } else {
            pool.query(
              `
        INSERT INTO userdetails (username, email, password, mobileno, created_on, updated_on)
        values (?,?,?,?,?,?)
        `,
              [
                req.body.username,
                req.body.email,
                bcrypt.hashSync(req.body.password, 8),
                req.body.phone,
                new Date(),
                new Date(),
              ],
              (err, result) => {
                if (err) {
                  console.log("Error in inserting user", err);
                  res.status(500).json(false);
                } else {
                  res.status(200).json(true);
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    console.log("Error in signup", error);
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var { uploadImage } = require("./multer");
var pool = require("./pool");

router.post("/sendFeedback", (req, res, next) => {
  try {
    pool.query(
      `
    INSERT INTO feedbacks (userid, rating, subjectname, mockname, feedbacktext, created_on)
    VALUES (?,?,?,?,?,?)`,
      [
        req.body.userid,
        req.body.rating,
        req.body.subjectname,
        req.body.mockname,
        req.body.feedbacktext,
        new Date(),
      ],
      (err, result) => {
        if (err) {
          console.log(err);
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

router.get("/getQuizResultById/:id", (req, res, next) => {
  try {
    pool.query(
      `
      SELECT * FROM mockresults where userid=${req.params.id} order by created_on desc limit 1
    `,
      (error, result) => {
        if (error) {
          res.status(500).json({
            message: error.message,
          });
        } else {
          res.status(200).json({ data: result, message: "success" });
        }
      }
    );
  } catch (err) {
    console.log("Error in getQuizResultById", err);
  }
});

router.post("/submitMock", (req, res, next) => {
  try {
    pool.query(
      `
      INSERT INTO mockresults (userid, mockname, subjectname, totaltime,totalquestion, totalattempt, totalcorrect,created_on)
      VALUES (?,?,?,?,?,?,?,?)
    `,
      [
        req.body.userid,
        req.body.mockname,
        req.body.subjectname,
        req.body.totaltime,
        req.body.totalquestion,
        req.body.totalattempt,
        req.body.totalcorrect,
        new Date(),
      ],
      (err, result) => {
        if (err) {
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

router.post("/fetchQuestionByMock", (req, res, next) => {
  try {
    let body = req.body;
    pool.query(
      `
      SELECT * from questions where question_mockname=? and question_subject=?
      `,
      [body.quiz_name, body.quiz_category],
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, msg: "success" });
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/fetchAllQuestions", (req, res, next) => {
  try {
    pool.query(
      `
      SELECT * from questions
      `,
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, success: true });
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/deleteQuestion", (req, res, next) => {
  try {
    pool.query(
      `
      DELETE from questions where question_id=?
      `,
      [req.body.question_id],
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/updateQuestionText", (req, res, next) => {
  console.log("req.body", req.body);
  try {
    pool.query(
      `
      UPDATE questions SET question_text=? WHERE question_id=?
      `,
      [req.body.question_text, req.body.question_id],
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/updateQuestion", (req, res, next) => {
  try {
    pool.query(
      `
      UPDATE questions SET question_subject=?, question_mockname=?, question_type=?, question_difficulty=?, question_text=?, question_correct_answer=?,options_array=JSON_ARRAY(?),answer_index=?, question_updated_on=? WHERE question_id=?
      `,
      [
        req.body.subject,
        req.body.mockName,
        req.body.type,
        req.body.difficulty,
        req.body.question,
        req.body.answer,
        req.body.optionArr,
        req.body.answerIndex,
        new Date(),
        req.body.question_id,
      ],
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/addQuestion", (req, res, next) => {
  try {
    let body = req.body;
    if (body.length > 0) {
      var query = `
            INSERT INTO questions (
                question_subject, question_mockname, question_type, question_difficulty, question_text, question_correct_answer,options_array,answer_index, question_created_on, question_updated_on
            ) VALUES (?,?,?,?,?,?,JSON_ARRAY(?),?,?,?)
            `;

      body.map((item, index) => {
        let values = [
          item.subject,
          item.mockName,
          item.type,
          item.difficulty,
          item.question,
          item.answer,
          item.optionArr,
          item.answerIndex,
          new Date(),
          new Date(),
        ];
        pool.query(query, values, (err, result) => {
          if (err) {
            console.log("Error in adding question", err);
            return res.status(500).json(false);
          } else {
            if (body.length == index + 1) {
              res.status(200).json(true);
            }
            // res.status(200).json(true);
          }
        });
      });
    } else {
      res.status(500).json(false);
    }
  } catch (error) {
    console.log("Error in adding question", error);
  }
});

router.post("/fetchMockQuizbySubject", (req, res, next) => {
  try {
    let body = req.body;
    let q = `
    SELECT *,(select count(question_id) from questions where question_subject = ?) as question_count FROM mockquiz WHERE quiz_category = ?;
    `;
    let query = `select m.*,count(q.question_id) as individual_count from questions as q left join mockquiz as m on q.question_subject = m.quiz_category where quiz_status = 1 and q.question_subject = ? and  m.quiz_name= q.question_mockname group by m.quiz_name`;
    pool.query(query, [body.mocktest_subject], (err, result) => {
      if (err) {
        console.log("Error in fetching mock quiz by subject", err);
        res.status(500).json(false);
      } else {
        let sum = 0;
        result.map((item) => {
          sum += parseInt(item.individual_count);
        });
        res
          .status(200)
          .json({ data: result, total_questions: sum, msg: "success" });
      }
    });
  } catch (error) {
    console.log("Error in fetching mock quiz by subject", error);
  }
});

router.post("/fetchAllMockQuizbySubject", (req, res, next) => {
  try {
    let body = req.body;
    let q = `
    SELECT * FROM mockquiz WHERE quiz_category = ?;
    `;
    pool.query(q, [body.mocktest_subject], (err, result) => {
      if (err) {
        console.log("Error in fetching mock quiz by subject", err);
        res.status(500).json(false);
      } else {
        res.status(200).json({ data: result, msg: "success" });
      }
    });
  } catch (error) {
    console.log("Error in fetching mock quiz by subject", error);
  }
});

router.get("/fetchMockQuiz", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM mockquiz where quiz_status = 1;
        `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching mocks quiz", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, msg: "success" });
        }
      }
    );
  } catch (error) {
    console.log("Error in fetching mocks quiz", error);
  }
});

router.get("/fetchAllMockQuiz", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM mockquiz;
        `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching mocks quiz", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, msg: "success" });
        }
      }
    );
  } catch (error) {
    console.log("Error in fetching mocks quiz", error);
  }
});

router.post("/updateMockQuiz", (req, res, next) => {
  try {
    let body = req.body;
    pool.query(
      `
    UPDATE mockquiz SET quiz_name=?,quiz_category=?, quiz_difficulty=?, quiz_status=?,quiz_duration=?, quiz_remarks=?, quiz_updated_on = ? WHERE quiz_id = ?
    `,
      [
        body.quiz_name,
        body.quiz_category,
        body.quiz_difficulty,
        body.quiz_status,
        body.quiz_duration,
        body.quiz_remarks,
        new Date(),
        body.quiz_id,
      ],
      (err, result) => {
        if (err) {
          console.log("Error in updating notes category", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  } catch (error) {
    console.log("Error in updating notes category", error);
  }
});

router.post("/insertMockQuiz", (req, res, next) => {
  let body = req.body;
  let status = body.quiz_status === "active" ? 1 : 0;
  pool.query(
    `
    INSERT INTO mockquiz(quiz_name, quiz_category, quiz_difficulty, quiz_status,quiz_duration, quiz_remarks, quiz_created_on, quiz_updated_on) values(?,?,?,?,?,?,?,?)
    `,
    [
      body.quiz_name,
      body.quiz_category,
      body.quiz_difficulty,
      status,
      body.quiz_duration,
      body.quiz_remarks,
      new Date(),
      new Date(),
    ],
    (err, result) => {
      if (err) {
        console.log("Error in inserting mock tests", err);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post("/deleteMockQuiz", (req, res, next) => {
  try {
    let body = req.body;
    pool.query(
      `
        DELETE FROM mockquiz WHERE quiz_id = ?
        `,
      [body.quiz_id],
      (err, result) => {
        if (err) {
          console.log("Error in deleting mock test", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  } catch (error) {
    console.log("Error in deleting mock test", error);
  }
});

module.exports = router;

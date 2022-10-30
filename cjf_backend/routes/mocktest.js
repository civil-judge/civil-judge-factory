var express = require("express");
var router = express.Router();
var { uploadImage } = require("./multer");
var pool = require("./pool");

router.post("/checkPurchasedMock", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM purchasedmocks WHERE userid=? and mockseries=?
        `,
      [req.body.userid, req.body.mockseries],
      (err, result) => {
        if (err) {
          console.log("Error in fetching data", err);
          res.status(500).json({ data: [], success: false });
        } else {
          if (result.length > 0) {
            res.status(200).json({ data: result, success: true });
          } else {
            res.status(200).json({ data: [], success: false });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/fetchMockData", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT count(a.question_id) as question_count,(SELECT count(b.quiz_id) FROM mockquiz as b where b.quiz_category=a.question_subject) as mock_count FROM questions as a where a.question_subject=?;
            `,
      [req.body.mockSubject],
      (err, result) => {
        if (err) {
          console.log("Error in fetching mock data", err);
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

router.get("/fetchMocksCategory", (req, res, next) => {
  try {
    pool.query(
      `
      SELECT a.*,(SELECT count(b.quiz_id) FROM mockquiz as b where b.quiz_category = a.mocktest_name) as mocks_count,(
        SELECT count(c.question_id) FROM questions as c where c.question_subject = a.mocktest_name
        ) as question_count,(SELECT count(d.resultid) FROM mockresults as d where d.subjectname = a.mocktest_name) as attempts FROM mocktests as a where a.mocktest_status = 1; ;
        `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching mocks category", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, msg: "success" });
        }
      }
    );
  } catch (error) {
    console.log("Error in fetching mocks category", error);
  }
});

router.get("/fetchAllMocksCategory", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM mocktests;
        `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching mocks category", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, msg: "success" });
        }
      }
    );
  } catch (error) {
    console.log("Error in fetching mocks category", error);
  }
});

router.post(
  "/updateMocksCategoryPicture",
  uploadImage.single("mocktest_picture"),
  (req, res, next) => {
    try {
      let body = req.body;
      pool.query(
        `
    UPDATE mocktests SET picture=? WHERE mocktest_id = ?
    `,
        [req.file.originalname, body.mocktest_id],
        (err, result) => {
          if (err) {
            console.log("Error in updating mocks category picture", err);
            res.status(500).json(false);
          } else {
            res.status(200).json(true);
          }
        }
      );
    } catch (error) {
      console.log("Error in updating mocks category picture", error);
    }
  }
);

router.post("/updateMocksCategory", (req, res, next) => {
  try {
    let body = req.body;
    pool.query(
      `
    UPDATE mocktests SET mocktest_name=?,mocktest_description=?, mocktest_price=?,mocktest_offer_price=?,mocktest_status =?, updated_on = ? WHERE mocktest_id = ?
    `,
      [
        body.mocktest_name,
        body.mocktest_description,
        body.mocktest_price,
        body.mocktest_offer_price,
        body.mocktest_status,
        new Date(),
        body.mocktest_id,
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

router.post(
  "/insertMocksCategory",
  uploadImage.single("mocktest_picture"),
  (req, res, next) => {
    let body = req.body;
    let status = body.mocktest_status === "active" ? 1 : 0;
    pool.query(
      `
    INSERT INTO mocktests(mocktest_name, mocktest_description, mocktest_price,mocktest_offer_price, mocktest_status, picture, created_on, updated_on) values(?,?,?,?,?,?,?,?)
    `,
      [
        body.mocktest_name,
        body.mocktest_description,
        body.mocktest_price,
        body.mocktest_offer_price,
        status,
        req.file.originalname,
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
  }
);

router.post("/deleteMocksCategory", (req, res, next) => {
  try {
    let body = req.body;
    pool.query(
      `
        DELETE FROM mocktests WHERE mocktest_id = ?
        `,
      [body.mocktest_id],
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

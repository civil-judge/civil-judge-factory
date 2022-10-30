var express = require("express");
var router = express.Router();
var { uploadImage } = require("./multer");
var pool = require("./pool");

router.get("/fetchActiveNotesCategory", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM study_notes_category where notes_status=1;
        `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching notes category", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, success: true });
        }
      }
    );
  } catch (error) {
    console.log("Error in fetching notes category", error);
  }
});

router.get("/fetchNotesCategory", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM study_notes_category
        `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching notes category", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, msg: "success" });
        }
      }
    );
  } catch (error) {
    console.log("Error in fetching notes category", error);
  }
});

router.post(
  "/updateNotesCategoryPicture",
  uploadImage.single("notes_picture"),
  (req, res, next) => {
    try {
      let body = req.body;
      pool.query(
        `
    UPDATE study_notes_category SET notes_picture=? WHERE notes_id = ?
    `,
        [req.file.originalname, body.notes_id],
        (err, result) => {
          if (err) {
            console.log("Error in updating notes category picture", err);
            res.status(500).json(false);
          } else {
            res.status(200).json(true);
          }
        }
      );
    } catch (error) {
      console.log("Error in updating notes category picture", error);
    }
  }
);

router.post("/updateNotesCategory", (req, res, next) => {
  try {
    let body = req.body;
    pool.query(
      `
    UPDATE study_notes_category SET notes_name=?, notes_price=?,notes_status =?, updated_on = ? WHERE notes_id = ?
    `,
      [
        body.notes_name,
        body.notes_price,
        body.notes_status,
        new Date(),
        body.notes_id,
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
  "/insertNotesCategory",
  uploadImage.single("notes_picture"),
  (req, res, next) => {
    let body = req.body;
    let status = body.notes_status === "active" ? 1 : 0;
    pool.query(
      `
    INSERT INTO study_notes_category(notes_name, notes_price, notes_status, notes_picture, created_on, updated_on) values(?,?,?,?,?,?)
    `,
      [
        body.notes_name,
        body.notes_price,
        status,
        req.file.originalname,
        new Date(),
        new Date(),
      ],
      (err, result) => {
        if (err) {
          console.log("Error in inserting notes", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);

router.post("/deleteNotesCategory", (req, res, next) => {
  try {
    let body = req.body;
    pool.query(
      `
        DELETE FROM study_notes_category WHERE notes_id = ?
        `,
      [body.notes_id],
      (err, result) => {
        if (err) {
          console.log("Error in deleting notes", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  } catch (error) {
    console.log("Error in deleting notes", error);
  }
});

module.exports = router;

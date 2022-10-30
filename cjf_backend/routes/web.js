var express = require("express");
var router = express.Router();
var { uploadImage } = require("./multer");
var pool = require("./pool");

router.post("/updateLiveStatus", (req, res) => {
  var { website_status, id } = req.body;
  pool.query(
    "UPDATE websettings SET website_status = ? WHERE id = ?",
    [website_status, id],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).json(true);
      }
    }
  );
});

router.get("/checkStatus", (req, res) => {
  try {
    pool.query("SELECT website_status FROM websettings", (err, result) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        isActive: result[0].website_status,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/configureSettings", uploadImage.any(), (req, res, next) => {
  try {
    if (req.files.length > 0) {
      req.files.forEach((file, index) => {
        pool.query(
          `
              UPDATE websettings SET address='${req.body.address}',phoneno='${req.body.phoneno}',mail='${req.body.mail}',${file.fieldname}='${file.originalname}'
           where id=${req.body.id}
              `,
          (err, result) => {
            if (err) {
              console.log("Error in updating websettings", err);
              res.status(500).json(false);
            } else {
              if (index == req.files.length - 1) {
                res.status(200).json(true);
              }
            }
          }
        );
      });
    } else {
      pool.query(
        `
        UPDATE websettings SET address=?,phoneno=?,mail=? where id=?
        `,
        [req.body.address, req.body.phoneno, req.body.mail, req.body.id],
        (err, result) => {
          if (err) {
            console.log("Error in updating websettings", err);
            res.status(500).json(false);
          } else {
            res.status(200).json(true);
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getSettings", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM websettings
        `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching settings", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, success: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

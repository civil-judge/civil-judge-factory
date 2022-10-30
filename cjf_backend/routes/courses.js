var express = require("express");
var router = express.Router();
var { uploadImage, uploadPdf, uploadVideo } = require("./multer");
var pool = require("./pool");

router.post("/fetchFeedbackByCourse", (req, res, next) => {
  try {
    pool.query(
      `
    SELECT * FROM feedbacks where subjectname='${req.body.subjectname}' and mockname='' and review_status=1 order by rating desc
  `,
      (error, result) => {
        if (error) {
          res.status(500).json({
            message: error.message,
          });
        } else {
          res.status(200).json({ data: result, success: true });
        }
      }
    );
  } catch (err) {
    console.log("Error in fetchFeedbackByCourse", err);
  }
});

router.post("/checkPurchasedCourse", (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM purchased_courses WHERE userid=? and courseid=?
        `,
      [req.body.userid, req.body.courseid],
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

router.post("/getVideobyCourse", (req, res, next) => {
  try {
    pool.query(
      `
            SELECT * FROM course_videos where course_id=${req.body.courseid}
        `,
      (error, result) => {
        if (error) {
          res.status(500).json({
            message: error.message,
            success: false,
          });
        } else {
          res.status(200).json({ data: result, success: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/addVideo", uploadVideo.any(), (req, res, next) => {
  try {
    if (req.files.length > 0) {
      let query = `
          INSERT INTO course_videos (course_id, videoname, created_on, updated_on) VALUES ?
          `;
      pool.query(
        query,
        [
          req.files.map((item) => [
            req.body.courseId,
            item.originalname,
            new Date(),
            new Date(),
          ]),
        ],
        (err, result) => {
          if (err) {
            console.log("Error in inserting video", err);
            res.status(500).json(false);
          } else {
            res.status(200).json(true);
          }
        }
      );
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getPDFbyCourse", (req, res, next) => {
  try {
    pool.query(
      `
            SELECT * FROM course_pdf where course_id=${req.body.courseid}
        `,
      (error, result) => {
        if (error) {
          res.status(500).json({
            message: error.message,
            success: false,
          });
        } else {
          res.status(200).json({ data: result, success: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/addPdf", uploadPdf.any(), (req, res, next) => {
  try {
    if (req.files.length > 0) {
      let query = `
          INSERT INTO course_pdf (course_id, pdfname, created_on, updated_on) VALUES ?
          `;
      pool.query(
        query,
        [
          req.files.map((item) => [
            req.body.courseId,
            item.originalname,
            new Date(),
            new Date(),
          ]),
        ],
        (err, result) => {
          if (err) {
            console.log("Error in inserting pdf", err);
            res.status(500).json(false);
          } else {
            res.status(200).json(true);
          }
        }
      );
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getCourseContent", (req, res, next) => {
  try {
    pool.query(
      `
            SELECT * FROM course_contents where course_id=${req.body.courseid}
        `,
      (error, sections) => {
        if (error) {
          res.status(500).json({
            message: error.message,
            success: false,
          });
        } else {
          pool.query(
            `
                  SELECT * FROM course_pdf where course_id=${req.body.courseid}
              `,
            (error, pdf) => {
              if (error) {
                res.status(500).json({
                  message: error.message,
                  success: false,
                });
              } else {
                pool.query(
                  `
                        SELECT * FROM course_videos where course_id=${req.body.courseid}
                    `,
                  (error, videos) => {
                    if (error) {
                      res.status(500).json({
                        message: error.message,
                        success: false,
                      });
                    } else {
                      res
                        .status(200)
                        .json({ sections, pdf, videos, success: true });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/addSectionContent", (req, res, next) => {
  try {
    pool.query(
      `
            INSERT INTO course_contents (course_id, section_title, section_content, created_on, updated_on)
            VALUES (?,?,?,?,?)`,
      [
        req.body.courseId,
        req.body.sectionTitle,
        req.body.sectionText,
        new Date(),
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

router.get("/fetchActiveCourses", (req, res, next) => {
  try {
    pool.query(
      `
      SELECT a.*,
      (select count(d.id) from course_contents as d where d.course_id=a.course_id) as modulecount,
      (select count(b.id) from course_pdf as b where b.course_id=a.course_id) as pdfcount,
      (select count(c.id) from course_videos as c where c.course_id=a.course_id) as videocount
      from courses as a where a.course_status=1
        `,
      (err, result) => {
        if (err) {
          console.log("Error in fetching active courses", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ data: result, msg: "success" });
        }
      }
    );
  } catch (error) {
    console.log("Error in fetchActiveCourses", error);
  }
});

router.get("/fetchCourses", async (req, res, next) => {
  try {
    pool.query(
      `
        SELECT * FROM courses
        `,
      async (err, result) => {
        if (err) {
          console.log("Error in fetching courses", err);
          res.status(500).json(false);
        } else {
          res.status(200).json({ list: result, msg: "success" });
        }
      }
    );
  } catch (error) {
    console.log("Error in fetching courses", error);
  }
});

router.post("/updateCourse", (req, res, next) => {
  let body = req.body;
  pool.query(
    `
    UPDATE courses SET course_code=?, course_name=?, course_description=?, course_duration=?, course_fee=?, course_offer_fee=?, course_status=?, course_updated_on = ? WHERE course_id = ?
    `,
    [
      body.course_code,
      body.course_name,
      body.course_description,
      body.course_duration,
      body.course_fee,
      body.course_offer_fee,
      body.course_status,
      new Date(),
      body.course_id,
    ],
    (err, result) => {
      if (err) {
        console.log("Error in updating course", err);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post(
  "/updateCoursePicture",
  uploadImage.single("course_picture"),
  (req, res, next) => {
    let body = req.body;
    pool.query(
      `
    UPDATE courses SET picture=?, course_updated_on=? WHERE course_id = ?
    `,
      [req.file.originalname, new Date(), body.course_id],
      (err, result) => {
        if (err) {
          console.log("Error in updating course picture", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);

router.post(
  "/insertCourse",
  uploadImage.single("course_picture"),
  (req, res, next) => {
    let body = req.body;
    let status = body.course_status === "active" ? 1 : 0;
    pool.query(
      `
    INSERT INTO courses(course_code, course_name, course_description, course_duration, course_fee, course_offer_fee, course_status, picture, course_created_on, course_updated_on) values(?,?,?,?,?,?,?,?,?,?)
    `,
      [
        body.course_code,
        body.course_name,
        body.course_description,
        body.course_duration,
        body.course_fee,
        body.course_offer_fee,
        status,
        req.file.originalname,
        new Date(),
        new Date(),
      ],
      (err, result) => {
        if (err) {
          console.log("Error in inserting course", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);

router.post("/deleteCourse", (req, res, next) => {
  try {
    pool.query(
      `
        DELETE FROM courses WHERE course_id = ?
        `,
      [req.body.course_id],
      (err, result) => {
        if (err) {
          console.log("Error in deleting course", err);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  } catch (error) {
    console.log("Error in deleting course", error);
  }
});

module.exports = router;

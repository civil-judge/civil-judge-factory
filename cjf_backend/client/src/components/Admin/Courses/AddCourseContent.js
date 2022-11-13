import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { DropzoneAreaBase } from "material-ui-dropzone";
import React, { Suspense } from "react";
import {
  AttachFile,
  Description,
  PictureAsPdf,
  Theaters,
} from "@material-ui/icons";
import { Quill } from "../Quill/Quill";
import { errorMessage, isEmpty, successMessage } from "../../../helpers/checks";
import { postData, postDataAndImage } from "../../../helpers/FetchApi";
import { useProgress } from "../../../helpers/useProgress";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
  },
});

export const AddCourseContent = (props) => {
  const course = props.course;

  const [active, setActive] = React.useState("section");
  const [sectionTitle, setSectionTitle] = React.useState("");
  const [sectionText, setSectionText] = React.useState("");
  const [pdfList, setPdfList] = React.useState([]);
  const [videoList, setVideoList] = React.useState([]);

  const { uploadFile, cancelUpload, uploadPercentage } = useProgress(
    videoList,
    "courses/addVideo",
    course.course_id
  );

  const handleClick = (val) => {
    setActive(val);
  };

  const submitContent = async () => {
    let err = false;
    if (isEmpty(sectionTitle)) {
      err = true;
      errorMessage("Section Title should not be empty");
    }
    if (isEmpty(sectionText)) {
      err = true;
      errorMessage("Section Text should not be empty");
    }
    if (err) return;
    const body = {
      courseId: course.course_id,
      sectionTitle,
      sectionText,
    };
    const response = await postData("courses/addSectionContent", body);
    if (response) {
      successMessage("Section Content added successfully");
      setSectionTitle("");
      setSectionText("");
    } else {
      errorMessage("Something went wrong");
    }
  };

  const submitPdf = async () => {
    let err = false;
    if (isEmpty(pdfList)) {
      err = true;
      errorMessage("PDF should not be empty");
    }
    if (err) return;
    const formData = new FormData();
    formData.append("courseId", course.course_id);
    pdfList.forEach((file, i) => {
      formData.append("pdf" + (i + 1), file.file);
    });

    const response = await postDataAndImage("courses/addPdf", formData);
    if (response) {
      successMessage("PDF added successfully");
      setPdfList([]);
    } else {
      errorMessage("Something went wrong");
    }
  };

  const submitVideo = () => {
    uploadFile();
    setVideoList([]);
  };

  const handleSubmit = () => {
    switch (active) {
      case "section":
        submitContent();
        break;
      case "pdf":
        submitPdf();
        break;
      case "video":
        submitVideo();
        break;
      default:
        break;
    }
  };

  const handlePreviewIcon = (fileObject, classes) => {
    const { type } = fileObject.file;
    const iconProps = {
      className: classes.image,
    };

    if (type.startsWith("video/")) return <Theaters {...iconProps} />;

    switch (type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Description {...iconProps} />;
      case "application/pdf":
        return <PictureAsPdf {...iconProps} />;
      default:
        return <AttachFile {...iconProps} />;
    }
  };

  const handlePDFAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !pdfList.find((f) => f.data === file.data)
    );
    setPdfList([...pdfList, ...newFiles]);
  };

  const handlePDFDelete = (deleted) => {
    setPdfList(pdfList.filter((f) => f !== deleted));
  };

  const handleVideoAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !videoList.find((f) => f.data === file.data)
    );
    setVideoList([...videoList, ...newFiles]);
  };

  const handleVideoDelete = (deleted) => {
    setVideoList(videoList.filter((f) => f !== deleted));
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const contentContainer = () => {
    switch (active) {
      case "section":
        return (
          <>
            <TextField
              label="Section Name"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Quill
              placeholder="Enter the text here"
              value={sectionText}
              onChange={(value) => setSectionText(value)}
              style={{
                height: "200px",
                paddingBottom: "1rem",
                paddingTop: "1rem",
              }}
            />
          </>
        );
      case "pdf":
        return (
          <DropzoneAreaBase
            acceptedFiles={[
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
            dropzoneText="Drag and drop a pdf/word file here or click"
            fileObjects={pdfList}
            maxFileSize={5000000000000}
            filesLimit={10}
            alertSnackbarProps={{
              autoHideDuration: 1500,
            }}
            showFileNames
            getPreviewIcon={handlePreviewIcon}
            onAdd={handlePDFAdd}
            onDelete={handlePDFDelete}
          />
        );
      case "video":
        return (
          <DropzoneAreaBase
            acceptedFiles={[
              "video/mp4",
              "video/mkv",
              "video/3gp",
              "video/m4v",
              "video/webp",
            ]}
            dropzoneText="Drag and drop a video here or click"
            showFileNames
            fileObjects={videoList}
            maxFileSize={5000000000000}
            alertSnackbarProps={{
              autoHideDuration: 1500,
            }}
            filesLimit={5}
            getPreviewIcon={handlePreviewIcon}
            onAdd={handleVideoAdd}
            onDelete={handleVideoDelete}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <Container>
          <h3>Course Name : {course.course_name}</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                onClick={() => handleClick("section")}
                variant={active == "section" ? "contained" : "outlined"}
                color="primary"
                size="large"
              >
                Add Section
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                onClick={() => handleClick("pdf")}
                variant={active == "pdf" ? "contained" : "outlined"}
                color="primary"
                size="large"
              >
                Add PDF
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                onClick={() => handleClick("video")}
                variant={active == "video" ? "contained" : "outlined"}
                color="primary"
                size="large"
              >
                Add Videos
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              {contentContainer()}
            </Grid>
            <Grid item xs={0} md={4}>
              {uploadPercentage > 0 && (
                <div
                  style={{
                    marginTop: "2rem",
                  }}
                >
                  <LinearProgressWithLabel value={uploadPercentage} />
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {uploadPercentage > 0 && (
                <Button
                  fullWidth
                  style={{
                    float: "right",
                    marginTop: "2rem",
                  }}
                  onClick={cancelUpload}
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Cancel
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                onClick={handleSubmit}
                style={{
                  float: "right",
                  marginTop: "2rem",
                }}
                variant="contained"
                color="primary"
                size="large"
              >{`Add ${active}`}</Button>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </Suspense>
  );
};

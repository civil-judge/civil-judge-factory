import React, { Suspense, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Edit, Add } from "@material-ui/icons";
import { AddQuestions } from "./AddQuestions";
import MTableComponent from "../../Table/mtable";
import parse from "html-react-parser";
import {
  getData,
  postData,
  postDataAndImage,
  ServerURL,
} from "../../../helpers/FetchApi";
import { QuestionEditModal } from "./QuestionEditModal";
import { errorMessage, successMessage } from "../../../helpers/checks";

export const DisplayQuestions = (props) => {
  const title = (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Typography variant="h6" style={{ fontWeight: "bold", marginRight: 20 }}>
        Questions
      </Typography>
      <Button
        startIcon={<Add />}
        variant="contained"
        color="primary"
        onClick={() =>
          props.setComponent(<AddQuestions setComponent={props.setComponent} />)
        }
      >
        Add Questions
      </Button>
    </div>
  );

  const [questionData, setQuestionData] = React.useState([]);
  const [openQuestion, setOpenQuestion] = React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState({});

  const fetchQuestions = async () => {
    let result = await getData("quiz/fetchAllQuestions");
    if (result.success) {
      let tempArr = result.data.map((item) => {
        return {
          ...item,
          options: JSON.parse(item.options_array),
        };
      });
      setQuestionData(tempArr);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOpenQuestion = (question) => {
    setSelectedQuestion({
      id: question.question_id,
      text: question.question_text,
    });
    setOpenQuestion(true);
  };

  const columns = [
    { title: "Id", field: "question_id", editable: "never" },
    {
      title: "Question Text",
      field: "question_text",
      cellStyle: {
        width: "20rem",
        minWidth: "20rem",
      },
      headerStyle: {
        width: "20rem",
        minWidth: "20rem",
      },
      editComponent: (props) => (
        <>
          <Button
            variant="outlined"
            onClick={() => handleOpenQuestion(props.rowData)}
            startIcon={<Edit />}
          >
            Edit Question
          </Button>
        </>
      ),
      render: (rowData) => <div>{parse(rowData.question_text)}</div>,
    },
    {
      title: "Correct Answer",
      field: "question_correct_answer",
      cellStyle: {
        width: "10rem",
        minWidth: "10rem",
      },
      headerStyle: {
        width: "10rem",
        minWidth: "10rem",
      },
      render: (rowData) => <div>{rowData.question_correct_answer}</div>,
      editComponent: (props) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Correct Answer"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          >
            {props.rowData.options.map((option, index) => {
              return (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ),
    },
    {
      title: "Option 1",
      field: "options[0]",
      render: (rowData) => <div>{rowData.options[0]}</div>,
    },
    {
      title: "Option 2",
      field: "options[1]",
      render: (rowData) => <div>{rowData.options[1]}</div>,
    },
    {
      title: "Option 3",
      field: "options[2]",
      render: (rowData) => <div>{rowData.options[2]}</div>,
    },
    {
      title: "Option 4",
      field: "options[3]",
      render: (rowData) => <div>{rowData.options[3]}</div>,
    },
    { title: "Subject Name", field: "question_subject" },
    {
      title: "Question Mockname",
      field: "question_mockname",
    },
    {
      title: "Question Type",
      field: "question_type",
      lookup: { mcq: "MCQ", bool: "True False" },
      render: (rowData) => (
        <span>{rowData.question_type == "mcq" ? "MCQ" : "True False"}</span>
      ),
    },
    {
      title: "Question Difficulty",
      field: "question_difficulty",
      lookup: { easy: "easy", medium: "medium", hard: "hard" },
      render: (rowData) => <span>{rowData.question_difficulty}</span>,
    },

    {
      title: "Created On",
      field: "question_created_on",
      editable: "never",
      render: (rowData) =>
        new Date(rowData.question_created_on).toLocaleString(),
    },
    {
      title: "Updated On",
      field: "question_updated_on",
      editable: "never",
      render: (rowData) =>
        new Date(rowData.question_updated_on).toLocaleString(),
    },
  ];

  const editable = {
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [...questionData];
          data.splice(data.indexOf(oldData), 1);
          setQuestionData(data);
          handleDelete(oldData).then((res) => {
            if (res) {
              resolve();
              successMessage("Question deleted successfully");
            } else {
              reject();
              errorMessage("Error in deleting questions");
            }
          });
        }, 300);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...questionData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setQuestionData([...dataUpdate]);
          handleUpdate(newData).then((res) => {
            if (res) {
              resolve();
              successMessage("Question updated successfully");
            } else {
              reject();
              errorMessage("Error in updating notes");
            }
          });
        }, 1000);
      }),
  };

  const updateQuestion = async () => {
    let body = {
      question_id: selectedQuestion.id,
      question_text: selectedQuestion.text,
    };
    let result = await postData("quiz/updateQuestionText", body);
    if (!result) return errorMessage("Error in updating question text");
    await fetchQuestions();
    return successMessage("Question text updated successfully");
  };

  const handleUpdate = async (newData) => {
    let body = {
      question_id: newData.question_id,
      subject: newData.question_subject,
      mockName: newData.question_mockname,
      type: newData.question_type,
      difficulty: newData.question_difficulty,
      question: newData.question_text,
      answer: newData.question_correct_answer,
      optionArr: newData.options,
      answerIndex: newData.options.findIndex(
        (option) => newData.question_correct_answer == option
      ),
    };
    let result = await postData("quiz/updateQuestion", body);
    await fetchQuestions();
    return result;
  };

  const handleDelete = async (oldData) => {
    let body = { question_id: oldData.question_id };
    let result = await postData("quiz/deleteQuestion", body);
    return result;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 10,
          flexDirection: "column",
        }}
      >
        <QuestionEditModal
          open={openQuestion}
          onClose={() => setOpenQuestion(false)}
          question={selectedQuestion}
          setQuestion={(val) => setSelectedQuestion(val)}
          updateQuestion={updateQuestion}
        />
        <MTableComponent
          data={questionData}
          columns={columns}
          title={title}
          editable={editable}
        />
      </div>
    </Suspense>
  );
};

import { Switch, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { Rating } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import { errorMessage, successMessage } from "../../../helpers/checks";
import { getData, postData } from "../../../helpers/FetchApi";
import MTableComponent from "../../Table/mtable";
import { TooltipLight } from "../../Tooltip";

export const ApproveFeedbacks = (props) => {
  const [feedbackList, setFeedbackList] = React.useState([]);
  const [feedBackStatus, setFeedBackStatus] = React.useState(true);

  const title = (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Typography variant="h6" style={{ fontWeight: "bold", marginRight: 20 }}>
        User Feedbacks/Reviews
      </Typography>
    </div>
  );

  const fetchAllFeedbacks = async () => {
    let response = await getData("user/fetchAllFeedbacks");
    if (response.success) {
      setFeedbackList(response.data);
    }
  };

  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  const column = [
    { title: "Id", field: "id", editable: "never" },
    { title: "User Name", field: "username" },
    {
      title: "Rating",
      field: "rating",
      render: (rowData) => (
        <Rating
          name="read-only"
          value={rowData.rating}
          readOnly
          size="small"
          emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      ),
    },
    {
      title: "Feedback Text",
      field: "feedbacktext",
      cellStyle: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: 300,
        cursor: "pointer",
      },
        render: (rowData) => (
          <TooltipLight placement="left" title={rowData.feedbacktext}>
            <span>{rowData.feedbacktext}</span>
          </TooltipLight>
        ),
    },
    {
      title: "Subject Name",
      field: "subjectname",
    },
    {
      title: "Mock Name",
      field: "mockname",
    },
    {
      title: "Feedback Status",
      field: "review_status",
      render: (rowData) => (
        <Switch
          checked={rowData.review_status === 1}
          onChange={(e) => handleStatusUpdate(e, rowData)}
          name="checkedA"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      ),
    },
    {
      title: "Feedback Created On",
      field: "created_on",
      editable: "never",
      render: (rowData) => new Date(rowData.created_on).toLocaleString(),
    },
  ];

  const editable = {
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [...feedbackList];
          data.splice(data.indexOf(oldData), 1);
          setFeedbackList(data);
          handleDelete(oldData).then((res) => {
            if (res) {
              resolve();
              successMessage("Feedback deleted successfully");
            } else {
              reject();
              errorMessage("Error in deleting course");
            }
          });
        }, 300);
      }),
  };

  const handleStatusUpdate = async (e, rowData) => {
    let body = {
      id: rowData.id,
      review_status: e.target.checked == true ? 1 : 0,
    };
    let response = await postData("user/updateFeedbackStatus", body);
    if (response.success) {
      successMessage("Feedback status updated successfully");
      fetchAllFeedbacks();
    } else {
      errorMessage("Error in updating feedback status");
    }
  };

  const handleDelete = async (oldData) => {
    let body = { id: oldData.id };
    let result = await postData("user/deleteFeedback", body);
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
        <MTableComponent
          editable={editable}
          data={feedbackList}
          columns={column}
          title={title}
        />
      </div>
    </Suspense>
  );
};

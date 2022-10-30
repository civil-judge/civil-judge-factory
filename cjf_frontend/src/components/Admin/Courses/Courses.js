import {
  Button,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Typography } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../../../helpers/FetchApi";
import MTableComponent from "../../Table/mtable";
import { TooltipLight } from "../../Tooltip";
import { AddCourse } from "./AddCourse";
import { AddCourseContent } from "./AddCourseContent";

export const Courses = (props) => {
  const [courseList, setCourseList] = React.useState([]);
  const chosenImage = React.useRef(null);

  const title = (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Typography variant="h6" style={{ fontWeight: "bold", marginRight: 20 }}>
        Courses
      </Typography>
      <Button
        startIcon={<Add />}
        variant="contained"
        color="primary"
        onClick={() =>
          props.setComponent(<AddCourse setComponent={props.setComponent} />)
        }
      >
        Add Course
      </Button>
    </div>
  );

  const fetchCourses = async () => {
    let result = await getData("courses/fetchCourses");
    setCourseList(result.list);
    // setColumns(result.data.columns);
    // let changedCols = [];
    // result.columns.forEach((col) => {
    //   col = col.replace("_", " ");
    //   col = col[0].toUpperCase() + col.slice(1);
    //   if (col !== "Course created_on" && col !== "Course updated_on") {
    //     if (col === "Course status") {
    //       return changedCols.push({
    //         name: col,
    //         options: {
    //           filter: true,
    //           customBodyRender: (value, tableMeta, updateValue) => {
    //             return value === 1 ? "Active" : "Deactive";
    //           },
    //         },
    //       });
    //     }
    //     changedCols.push({ name: col });
    //   } else {
    //     changedCols.push({
    //       name: col,
    //       options: {
    //         filter: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //           return value.split("T")[0];
    //         },
    //       },
    //     });
    //   }
    // });
    // setColumns(changedCols);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const column = [
    {
      title: "Add Contents",
      field: "course_name",
      render: (rowData) => (
        <Button
          onClick={() =>
            props.setComponent(
              <AddCourseContent
                course={rowData}
                setComponent={props.setComponent}
              />
            )
          }
          style={{
            textTransform: "capitalize",
          }}
          variant="outlined"
          color="primary"
          startIcon={<Add />}
        >
          Add Contents
        </Button>
      ),
    },
    { title: "Course Id", field: "course_id", editable: "never" },
    { title: "Course Name", field: "course_name" },
    { title: "Course Code", field: "course_code" },
    {
      title: "Course Description",
      field: "course_description",
      cellStyle: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: 100,
      },
      render: (rowData) => (
        <TooltipLight placement="left" title={rowData.course_description}>
          <span>{rowData.course_description}</span>
        </TooltipLight>
      ),
    },
    {
      title: "Course Duration",
      field: "course_duration",
      render: (rowData) => rowData.course_duration + " months",
    },
    {
      title: "Course Price",
      field: "course_fee",
      render: (rowData) => <>&#8377; {rowData.course_fee}</>,
    },
    {
      title: "Course Offer Price",
      field: "course_offer_fee",
      render: (rowData) => <>&#8377; {rowData.course_offer_fee}</>,
    },
    {
      title: "Course Status",
      field: "course_status",
      lookup: { 0: "Deactive", 1: "Active" },
      render: (rowData) => (
        <span
          style={{
            backgroundColor: rowData.course_status === 1 ? "green" : "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          {rowData.course_status === 1 ? "Active" : "Deactive"}
        </span>
      ),
    },
    {
      title: "Course Picture",
      field: "picture",
      editComponent: (props) => (
        <>
          <img
            id="course_pic"
            alt={props.value}
            style={{ width: 50, height: 50, borderRadius: 10 }}
            src={`${ServerURL}/images/${props.value}`}
          />
          <input
            accept="image/*"
            // className={classes.input}
            ref={chosenImage}
            style={{ display: "none" }}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(event) => handlePictureUpdate(event)}
          />
          <label htmlFor="contained-button-file">
            <Button
              size="small"
              variant="outlined"
              color="primary"
              component="span"
            >
              Edit Picture
            </Button>
          </label>
        </>
      ),
      render: (rowData) => (
        <a href={`${ServerURL}/images/${rowData.picture}`} target="_blank">
          <img
            alt={rowData.picture}
            style={{ width: 50, height: 50, borderRadius: 10 }}
            src={`${ServerURL}/images/${rowData.picture}`}
          />
        </a>
      ),
    },
    {
      title: "Course Created On",
      field: "course_created_on",
      editable: "never",
      render: (rowData) => new Date(rowData.course_created_on).toLocaleString(),
    },
    {
      title: "Course Updated On",
      field: "course_updated_on",
      editable: "never",
      render: (rowData) => new Date(rowData.course_updated_on).toLocaleString(),
    },
  ];

  const editable = {
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [...courseList];
          data.splice(data.indexOf(oldData), 1);
          setCourseList(data);
          handleDelete(oldData).then((res) => {
            if (res) {
              resolve();
            } else {
              reject();
              alert("Error in deleting course");
            }
          });
        }, 300);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...courseList];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setCourseList([...dataUpdate]);
          handleUpdate(newData).then((res) => {
            if (res) {
              resolve();
            } else {
              reject();
              alert("Error in updating course");
            }
          });
        }, 1000);
      }),
  };

  const handlePictureUpdate = (event) => {
    var pic = document.getElementById("course_pic");
    pic.src = URL.createObjectURL(event.target.files[0]);
  };

  const handleUpdate = async (newData) => {
    if (chosenImage.current.files[0] !== undefined) {
      let formData = new FormData();
      formData.append("course_id", newData.course_id);
      formData.append("course_picture", chosenImage.current.files[0]);
      let result = postDataAndImage("courses/updateCoursePicture", formData);
      let body = newData;
      let result1 = await postData("courses/updateCourse", body);
      await fetchCourses();
      return result, result1;
    } else {
      let body = newData;
      let result = await postData("courses/updateCourse", body);
      await fetchCourses();
      return result;
    }
  };

  const handleDelete = async (oldData) => {
    let body = { course_id: oldData.course_id };
    let result = await postData("courses/deleteCourse", body);
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
        {/* <TableComponent data={data} columns={columns} title={title} /> */}
        <MTableComponent
          editable={editable}
          data={courseList}
          columns={column}
          title={title}
        />
      </div>
    </Suspense>
  );
};

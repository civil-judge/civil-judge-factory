import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Typography } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import { getData, postData, postDataAndImage, ServerURL } from "../../../helpers/FetchApi";
import MTableComponent from "../../Table/mtable";
import { AddNotes } from "./AddNotes";

export const NotesCategory = (props) => {
  const title = <div style={{display:'flex', flexDirection:'row'}}>
    <Typography variant="h6" style={{ fontWeight: "bold",marginRight:20 }}>
      Notes Category
    </Typography>
    <Button startIcon={<Add />} variant="contained" color="primary" onClick={() => props.setComponent(<AddNotes setComponent={props.setComponent}/>)}>
      Add Notes
    </Button>
  </div>;

  const [notesData, setNotesData] = React.useState([]);
  const chosenImage = React.useRef(null);

  const fetchNotesCategory = async () => {
    let result = await getData("notes/fetchNotesCategory");
    setNotesData(result.data);
  };

  useEffect(()=> {
    fetchNotesCategory();
  },[])

  const columns = [
    { title: "Notes Id", field: "notes_id", editable: "never" },
    { title: "Notes Name", field: "notes_name" },
    { title: "Notes Price", field: "notes_price",
    render: (rowData) => <>&#8377; {rowData.notes_price}</>, },
    { title: "Notes Status", field: "notes_status",
    lookup: { 0: "Deactive", 1: "Active" },
    render: (rowData) => <span style={{
      backgroundColor: rowData.notes_status === 1 ? "green" : "red",
      color: "white",
      padding: "5px 10px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "12px",
    }}>{rowData.notes_status === 1 ? "Active" : "Deactive"}</span>,
  },
    { title: "Notes Picture", field: "notes_picture",
    editComponent: (props) => (
      <>
        <img
          id="notes_pic"
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
      <a
        href={`${ServerURL}/images/${rowData.notes_picture}`}
        target="_blank"
      >
        <img
          alt={rowData.notes_picture}
          style={{ width: 50, height: 50, borderRadius: 10 }}
          src={`${ServerURL}/images/${rowData.notes_picture}`}
        />
      </a>
    ), },
    { title: "Created On", field: "created_on", 
    editable: "never",
    render: (rowData) => new Date(rowData.created_on).toLocaleString(), },
    { title: "Updated On", field: "updated_on",
    editable: "never", 
    render: (rowData) => new Date(rowData.updated_on).toLocaleString(), },
  ];


  const editable = {
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [...notesData];
          data.splice(data.indexOf(oldData), 1);
          setNotesData(data);
          handleDelete(oldData).then((res) => {
            if (res) {
              resolve();
            } else {
              reject();
              alert("Error in deleting notes");
            }
          });
        }, 300);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...notesData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setNotesData([...dataUpdate]);
          handleUpdate(newData).then((res) => {
            if (res) {
              resolve();
            } else {
              reject();
              alert("Error in updating notes");
            }
          });
        }, 1000);
      }),
  };

  const handlePictureUpdate = (event) => {
    var pic = document.getElementById("notes_pic");
    pic.src = URL.createObjectURL(event.target.files[0]);
  };

  const handleUpdate = async (newData) => {
    if (chosenImage.current.files[0] !== undefined) {
      let formData = new FormData();
      formData.append("notes_id", newData.notes_id);
      formData.append("notes_picture", chosenImage.current.files[0]);
      let result = postDataAndImage("notes/updateNotesCategoryPicture", formData);
      let body = newData;
      let result1 = await postData("notes/updateNotesCategory", body);
      await fetchNotesCategory();
      return result, result1;
    } else {
      let body = newData;
      let result = await postData("notes/updateNotesCategory", body);
      await fetchNotesCategory();
      return result;
    }
  };

  const handleDelete = async (oldData) => {
    let body = { notes_id: oldData.notes_id };
    let result = await postData("notes/deleteNotesCategory", body);
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
      <MTableComponent data={notesData} columns={columns} title={title} editable={editable}/>
    </div>
    </Suspense>
  );
};

import { Button, FormControlLabel, Switch, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Typography } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import {
  getData,
  postData,
  postDataAndImage,
  ServerURL,
} from "../../../helpers/FetchApi";
import MTableComponent from "../../Table/mtable";
import { AddMockTest } from "./AddMockTest";

export const MocksCategory = (props) => {
  const title = (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Typography variant="h6" style={{ fontWeight: "bold", marginRight: 20 }}>
        Mocks Test Category
      </Typography>
      <Button
        startIcon={<Add />}
        variant="contained"
        color="primary"
        onClick={() =>
          props.setComponent(<AddMockTest setComponent={props.setComponent} />)
        }
      >
        Add Mock Tests
      </Button>
    </div>
  );

  const [mocksData, setMocksData] = React.useState([]);
  const chosenImage = React.useRef(null);

  const fetchMocksCategory = async () => {
    let result = await getData("mocks/fetchAllMocksCategory");
    setMocksData(result.data);
  };

  useEffect(() => {
    fetchMocksCategory();
  }, []);

  const columns = [
    { title: "Mock Test Id", field: "mocktest_id", editable: "never" },
    { title: "Mock Test Name", field: "mocktest_name" },
    {
      title: "Mock Test Price",
      field: "mocktest_price",
      render: (rowData) => <>&#8377; {rowData.mocktest_price}</>,
    },
    {
      title: "Mock Test Offer Price",
      field: "mocktest_offer_price",
      render: (rowData) => <>&#8377; {rowData.mocktest_offer_price}</>,
    },
    {
      title: "Mock Test Status",
      field: "mocktest_status",
      lookup: { 0: "Deactive", 1: "Active" },
      render: (rowData) => (
        <span
          style={{
            backgroundColor: rowData.mocktest_status === 1 ? "green" : "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          {rowData.mocktest_status === 1 ? "Active" : "Deactive"}
        </span>
      ),
    },
    {
      title: "Mocks Picture",
      field: "picture",
      editComponent: (props) => (
        <>
          <img
            id="mocktest_pic"
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
      title: "Created On",
      field: "created_on",
      editable: "never",
      render: (rowData) => new Date(rowData.created_on).toLocaleString(),
    },
    {
      title: "Updated On",
      field: "updated_on",
      editable: "never",
      render: (rowData) => new Date(rowData.updated_on).toLocaleString(),
    },
  ];

  const editable = {
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [...mocksData];
          data.splice(data.indexOf(oldData), 1);
          setMocksData(data);
          handleDelete(oldData).then((res) => {
            if (res) {
              resolve();
            } else {
              reject();
              alert("Error in deleting mock test");
            }
          });
        }, 300);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...mocksData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setMocksData([...dataUpdate]);
          handleUpdate(newData).then((res) => {
            if (res) {
              resolve();
            } else {
              reject();
              alert("Error in updating mock test");
            }
          });
        }, 1000);
      }),
  };

  const handlePictureUpdate = (event) => {
    var pic = document.getElementById("mocktest_pic");
    pic.src = URL.createObjectURL(event.target.files[0]);
  };

  const handleUpdate = async (newData) => {
    if (chosenImage.current.files[0] !== undefined) {
      let formData = new FormData();
      formData.append("mocktest_id", newData.mocktest_id);
      formData.append("mocktest_picture", chosenImage.current.files[0]);
      let result = postDataAndImage(
        "mocks/updateMocksCategoryPicture",
        formData
      );
      let body = newData;
      let result1 = await postData("mocks/updateMocksCategory", body);
      await fetchMocksCategory();
      return result, result1;
    } else {
      let body = newData;
      let result = await postData("mocks/updateMocksCategory", body);
      await fetchMocksCategory();
      return result;
    }
  };

  const handleDelete = async (oldData) => {
    let body = { mocktest_id: oldData.mocktest_id };
    let result = await postData("mocks/deleteMocksCategory", body);
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
          data={mocksData}
          columns={columns}
          title={title}
          editable={editable}
        />
      </div>
    </Suspense>
  );
};

import React, { Suspense, useEffect } from 'react'
import { Button, Typography } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import { Quiz } from './Quiz';
import { useSelector } from 'react-redux';
import { getMocksData } from '../../../redux/reducers/mocks';
import { emitMockTest } from '../../../redux/actions/mocks';
import { useDispatch } from 'react-redux';
import MTableComponent from '../../Table/mtable';
import { getData, postData } from '../../../helpers/FetchApi';

export const DisplayQuiz = (props) => {

    const dispatch = useDispatch()
    const [mockTestData, setMockTestData] = React.useState([]);

    useEffect(() => {
        fetchMockQuiz()
    }, [])

    const fetchMockQuiz = async () => {
        let result = await getData("quiz/fetchAllMockQuiz")
        setMockTestData(result.data)
        dispatch(emitMockTest(result.data))
    }

    const editable = {
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const data = [...mockTestData];
              data.splice(data.indexOf(oldData), 1);
              setMockTestData(data);
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
              const dataUpdate = [...mockTestData];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setMockTestData([...dataUpdate]);
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

      const handleUpdate = async (newData) => {
          let body = newData;
          let result = await postData("quiz/updateMockQuiz", body);
        //   await fetchMocksCategory();
          return result;
      };
    
      const handleDelete = async (oldData) => {
        let body = { quiz_id: oldData.quiz_id };
        let result = await postData("quiz/deleteMockQuiz", body);
        return result;
      };

    const title = <div style={{display:'flex', flexDirection:'row'}}>
    <Typography variant="h6" style={{ fontWeight: "bold",marginRight:20 }}>
      Mocks Tests
    </Typography>
    <Button startIcon={<Add />} variant="contained" color="primary" onClick={() => props.setComponent(<Quiz setComponent={props.setComponent}/>)}>
      Add Mock Tests
    </Button>
  </div>;

  const columns = [
    { title: "Mock Test Id", field: "quiz_id", editable: "never" },
    { title: "Mock Test Name", field: "quiz_name" },
    { title: "Mock Test Subject", field: "quiz_category"},
    { title: "Mock Test Difficulty", field: "quiz_difficulty"},
    { title: "Mock Test Status", field: "quiz_status",
    lookup: { 0: "Deactive", 1: "Active" },
    render: (rowData) => <span style={{
      backgroundColor: rowData.quiz_status == 1 ? "green" : "red",
      color: "white",
      padding: "5px 10px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "12px",
    }}>{rowData.quiz_status == 1 ? "Active" : "Deactive"}</span>,
   },
    { title: "Mock Test Duration", field: "quiz_duration"},
    { title: "Mock Test Remarks", field: "quiz_remarks"},
    { title: "Created On", field: "quiz_created_on", 
    editable: "never",
    render: (rowData) => new Date(rowData.quiz_created_on).toLocaleString(), },
    { title: "Updated On", field: "quiz_updated_on",
    editable: "never", 
    render: (rowData) => new Date(rowData.quiz_updated_on).toLocaleString(), },
  ];

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
      <MTableComponent data={mockTestData} columns={columns} title={title} editable={editable}/>
    </div>
    </Suspense>
  );
}

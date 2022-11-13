import { Avatar, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@material-ui/core'
import { KeyboardBackspace } from '@material-ui/icons'
import React from 'react'
import { errorMessage, isDigits, isEmpty, successMessage } from '../../../helpers/checks'
import { postDataAndImage } from '../../../helpers/FetchApi'
import { NotesCategory } from './NotesCategory'

export const AddNotes = (props) => {

    const [notesName, setNotesName] = React.useState('')
    const [notesPrice, setNotesPrice] = React.useState('')
    const [notesStatus, setNotesStatus] = React.useState('active')
    const [picture,setPicture] = React.useState({filename:"",bytes:""})

    const handlePicture = (event)=>{
        setPicture({
          filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]
        })
      }

    const handleSubmit = async() => {
        let err = false;
        if(isEmpty(notesName)){
            err = true;
            errorMessage("Notes Name should not be empty");
        }
        if(isEmpty(notesPrice)){
            err = true;
            errorMessage("Notes Price should not be empty");
        }
        if(isEmpty(notesStatus)){
            err = true;
            errorMessage("Notes Status should not be empty");
        }
        if(isEmpty(picture.filename)){
            err = true;
            errorMessage("Please Add Course Picture..."); 
          }
        if(isDigits(notesPrice))
        {
            err = true;
            errorMessage("Invalid Notes Fee");
        }

        if(!err){
            var formData = new FormData();
            formData.append("notes_name",notesName);
            formData.append("notes_price",notesPrice);
            formData.append("notes_status",notesStatus);
            formData.append("notes_picture",picture.bytes);

            var result = await postDataAndImage("notes/insertNotesCategory", formData);
            if(result){
                successMessage("Notes Added Successfully");
                setNotesName('')
                setNotesPrice('')
                setNotesStatus('active')
                setPicture({filename:"",bytes:""})
            }
            else{
                errorMessage("Something went wrong");
            }
        }
    }

  return (
    <Container>
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <IconButton
          onClick={() =>
            props.setComponent(<NotesCategory setComponent={props.setComponent} />)
          }
        >
          <KeyboardBackspace />
        </IconButton>
        <h3>Add Notes</h3>
      </div>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <TextField value={notesName} onChange={(e)=>setNotesName(e.target.value)} fullWidth label="Notes Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField value={notesPrice} onChange={(e)=>setNotesPrice(e.target.value)} fullWidth label="Notes Price" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6} >
            <FormControl component="fieldset">
      <FormLabel component="legend">Notes Status</FormLabel>
      <RadioGroup row value={notesStatus} onChange={(e)=>setNotesStatus(e.target.value)}>
        <FormControlLabel value="active" control={<Radio />} label="Active" />
        <FormControlLabel value="deactive" control={<Radio />} label="Deactive" />
      </RadioGroup>
    </FormControl>
            </Grid>
        <Grid item xs={12} md={6} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <input
        accept="image/*"
        // className={classes.input}
        style={{display:'none'}}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>handlePicture(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="outlined" color="primary" component="span">
          Upload Notes Picture
        </Button>
      </label>
      <Avatar alt="notes picture" src={picture.filename} variant="rounded" style={{width:100,height:100}} />
        </Grid>
            <Grid item xs={12} md={6} />
        <Grid item xs={12} md={6}>
            <Button size="large"  variant="contained" color="primary" onClick={handleSubmit}>
                Add Notes
            </Button>
        </Grid>
        </Grid>
    </Container>
  )
}

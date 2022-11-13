import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useEffect } from "react";
import { Quill } from "../Quill/Quill";

export const QuestionEditModal = (props) => {
  return (
    <Dialog
      scroll="body"
      onClose={() => {
        props.onClose();
      }}
      open={props.open}
    >
      <DialogTitle>Edit Question</DialogTitle>
      <Quill
        placeholder="Enter the question text here"
        value={props.question.text}
        onChange={(value) =>
          props.setQuestion({ id: props.question.id, text: value })
        }
      />
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.updateQuestion();
            props.onClose();
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

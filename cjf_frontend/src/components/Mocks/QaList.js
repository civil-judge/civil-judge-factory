import { Avatar, Grid, Badge } from "@material-ui/core";
import { TurnedIn } from "@material-ui/icons";
import React from "react";
import "./qaList.css";

export default function QaList(props) {
  const { questions, attempt, marked, onCellClick, rem } = props;
  let cellClass = "";
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Avatar
            variant="square"
            style={{ backgroundColor: "green", width: 30, height: 30 }}
          >
            {attempt.length}
          </Avatar>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Attempted</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Avatar
            variant="square"
            style={{
              backgroundColor: "yellow",
              color: "#000",
              width: 30,
              height: 30,
            }}
          >
            {marked.length}
          </Avatar>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Marked</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Avatar
            variant="square"
            style={{
              backgroundColor: "white",
              color: "#000",
              width: 30,
              height: 30,
            }}
          >
            {rem}
          </Avatar>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Not Answered</span>
        </div>
      </div>
      {/* <QaList questions={questions} attempt={getAttemptedArray()} marked={marked} rem={questions.length-response.length} onCellClick={(index) => handleOnCellClick(index)} /> */}
      <hr />
      <Grid
        container
        item
        xs={12}
        style={{ paddingInline: 10, display: "flex", flexDirection: "column" }}
      >
        <span style={{ marginBottom: 10 }}>Questions:-</span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 15,
            flexWrap: "wrap",
            padding: 10,
            height: 150,
            overflow: "auto",
            marginBottom: 10,
          }}
        >
          {questions.map((value, index) => {
            if (attempt.includes(value.question_id)) {
              cellClass = "col-xs-3 cell attempted";
              if (marked.includes(value.question_id)) {
                return (
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <TurnedIn
                        fontSize="small"
                        style={{
                          color: "#2A5884",
                          position: "absolute",
                          right: -2,
                          top: -7,
                        }}
                      />
                    }
                  >
                    <div
                      className={cellClass}
                      onClick={(e) => {
                        onCellClick(index);
                      }}
                    >
                      {index + 1}
                    </div>
                  </Badge>
                );
              }
            } else if (marked.includes(value.question_id)) {
              cellClass = "col-xs-3 cell marked";
              return (
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <TurnedIn
                      fontSize="small"
                      style={{
                        color: "#2A5884",
                        position: "absolute",
                        right: -2,
                        top: -7,
                      }}
                    />
                  }
                >
                  <div
                    className={cellClass}
                    onClick={(e) => {
                      onCellClick(index);
                    }}
                  >
                    {index + 1}
                  </div>
                </Badge>
              );
            } else cellClass = "col-xs-3 cell";

            return (
              <div
                className={cellClass}
                onClick={(e) => {
                  onCellClick(index);
                }}
              >
                {/* {cellClass} */}
                {index + 1}
              </div>
            );
          })}
        </div>
      </Grid>
    </div>
  );
}

import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Courses } from "./Courses/Courses";
import { Quiz } from "./Quiz/Quiz";
import { Collapse } from "@material-ui/core";
import {
  ExpandMore,
  ExpandLess,
  Inbox as InboxIcon,
  MenuBook,
  FileCopy,
  AvTimer,
} from "@material-ui/icons";
import { NotesCategory } from "./NotesCategory/NotesCategory";
import { MocksCategory } from "./MockTests.js/Mocks";
import { DisplayQuiz } from "./Quiz/DisplayQuiz";
import { DisplayQuestions } from "./Questions/DisplayQuestions";
import { AddQuestions } from "./Questions/AddQuestions";
import { ConfigureSettings } from "./WebSettings/ConfigureSettings";
import { ApproveFeedbacks } from "./Feedbacks/ApproveFeedbacks";

export default function ListItems(props) {
  const [selected, setSelected] = React.useState(0);

  const handleClick = (v, index) => {
    setSelected(index);
    props.setComponent(v);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickMulti = (v, index) => {
    setSelected(index);
    props.setComponent(v);
    setOpen(true);
  };

  const selectedStyles = {
    backgroundColor: "#1976d2",
    color: "white",
    width: 230,
    marginLeft: 8,
    paddingLeft: 10,
    borderRadius: "5px 0px 0px 5px",
    boxShadow: "2px 3px 6px rgba(0, 0, 0, 0.3)",
  };

  const SingleChild = (item, index) => {
    return (
      <ListItemButton
        style={selected === index ? selectedStyles : {}}
        button
        onClick={() => handleClick(item.component, index)}
      >
        <ListItemIcon
          style={{
            color: selected === index ? "#FFF" : "",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    );
  };

  const MultiChild = (item, index) => {
    return (
      <>
        <ListItemButton
          style={selected === index ? selectedStyles : {}}
          onClick={() => {
            setOpen(!open);
            setSelected(index);
          }}
        >
          <ListItemIcon
            style={{
              color: selected === index ? "#FFF" : "",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {item.component.map((component, i) => {
            return (
              <ListItemButton
                onClick={() => handleClickMulti(component.page, index)}
              >
                <ListItemIcon>{/* {item.icon} */}</ListItemIcon>
                <ListItemText primary={component.name} />
              </ListItemButton>
            );
          })}
        </Collapse>
      </>
    );
  };

  return (
    <React.Fragment>
      {[
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          component: <></>,
          type: "single",
        },
        {
          name: "Courses",
          icon: <MenuBook />,
          component: <Courses setComponent={props.setComponent} />,
          type: "single",
        },
        {
          name: "Notes",
          icon: <FileCopy />,
          component: <NotesCategory setComponent={props.setComponent} />,
          type: "single",
        },
        {
          name: "Feedbacks/Reviews",
          icon: <FileCopy />,
          component: <ApproveFeedbacks setComponent={props.setComponent} />,
          type: "single",
        },
        {
          name: "Mock Tests Subjects",
          icon: <AvTimer />,
          component: <MocksCategory setComponent={props.setComponent} />,
          type: "single",
        },
        {
          name: "Mock Tests",
          icon: <PeopleIcon />,
          component: <DisplayQuiz setComponent={props.setComponent} />,
          type: "single",
        },
        {
          name: "Mock Questions",
          icon: <QuestionAnswerIcon />,
          component: <DisplayQuestions setComponent={props.setComponent} />,
          type: "single",
        },
        {
          name: "Web Settings",
          icon: <LayersIcon />,
          component: <ConfigureSettings />,
          type: "single",
        },
      ].map((item, index) => {
        return item.type === "single"
          ? SingleChild(item, index)
          : MultiChild(item, index);
      })}
    </React.Fragment>
  );
}

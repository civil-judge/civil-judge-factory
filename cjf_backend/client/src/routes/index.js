import React from "react";
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";
import { AboutUs } from "../components/AboutUs/AboutUs";
import AdminLogin from "../components/Admin/AdminLogin/AdminLogin";
import { Courses } from "../components/Admin/Courses/Courses";
import Dashboard from "../components/Admin/Dashboard";
import { Login } from "../components/Auth/Login";
import { SignUp } from "../components/Auth/SignUp";
import { ComingSoonPage } from "../components/Coming Soon/ComingSoonPage";
import CourseContent from "../components/CoursePage/CourseContent";
import { CoursePage } from "../components/CoursePage/Courses";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { MockResult } from "../components/MockResult/mockResult";
import { MockQuiz } from "../components/Mocks/MockQuiz";
import { MocksCategory } from "../components/Mocks/MocksCategory";
import Sample from "../components/Mocks/Sample";
import { PageNotFound } from "../components/PageNotFound/PageNotFound";
import { Mocks } from "../components/slider/mocks";
import { Store } from "../components/Store/Store";
import { StudyNotes } from "../components/StudyNotes/StudyNotes";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { VideoView } from "../components/videoComponent/VideoView";
import ScrollToTop from "../helpers/ScrollToTop";
import { PdfView } from "../pdfComponent/PdfView";

export const Router = (props) => {
  return (
    <BRouter>
      <ScrollToTop>
        <Header />
        <Switch>
          <Route exact path="/" component={Layout} history={props.history} />
          <Route
            exact
            path="/admin"
            component={AdminLogin}
            history={props.history}
          />
          <Route
            path="/dashboard"
            component={Dashboard}
            history={props.history}
          />
          <Route
            exact
            path="/mocks"
            component={MocksCategory}
            history={props.history}
          />
          <Route
            exact
            path="/mocklist"
            component={Mocks}
            history={props.history}
          />
          <Route
            exact
            path="/mocktest"
            component={MockQuiz}
            history={props.history}
          />
          <Route
            exact
            path="/sample"
            component={Sample}
            history={props.history}
          />
          <Route
            exact
            path="/courses"
            component={CoursePage}
            history={props.history}
          />
          <Route
            exact
            path="/courses/course-content/:id"
            component={CourseContent}
            history={props.history}
          />
          <Route
            exact
            path="/login"
            component={Login}
            history={props.history}
          />
          <Route
            exact
            path="/signup"
            component={SignUp}
            history={props.history}
          />
          <Route
            exact
            path="/mockresult"
            component={MockResult}
            history={props.history}
          />
          <Route
            exact
            path="/profile"
            component={UserProfile}
            history={props.history}
          />
          <Route
            exact
            path="/store"
            component={Store}
            history={props.history}
          />
          <Route
            exact
            path="/aboutus"
            component={AboutUs}
            history={props.history}
          />
          <Route
            exact
            path="/courses/pdf"
            component={PdfView}
            history={props.history}
          />
          <Route
            exact
            path="/courses/video"
            component={VideoView}
            history={props.history}
          />
          <Route
            exact
            path="/studynotes"
            component={StudyNotes}
            history={props.history}
          />
          <Route
            exact
            path="/comingsoon"
            component={ComingSoonPage}
            history={props.history}
          />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </ScrollToTop>
    </BRouter>
  );
};

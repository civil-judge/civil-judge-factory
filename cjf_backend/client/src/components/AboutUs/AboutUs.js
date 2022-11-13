import React, { Suspense } from "react";
import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="banner">
        <div className="banner-text">
          <span>About Us</span>
        </div>
      </div>
      <article className="content">
        <h2>Who we Are</h2>
        <p>
          We are one of the largest law education portals and a one-stop
          destination for all your legal needs. Our niche is creating
          personalised learning experiences for every learner. We provide
          students with a platform where they can learn engage and be excited
          about creating their own path to discover their endeavours.{" "}
        </p>

        <p>
          We provide world-class academic support and personal care to our
          students to help them to meet their careers, goals and objectives. Our
          highly qualified and experienced faculties are committed to our
          student’s success. We are empowering students and maximizing
          triumphant opportunities.
        </p>
        <h2>Our Vision</h2>
        <p>
          Our vision is to provide a cost-effective package to a certain but
          larger section of the student community who are unable to access such
          online resources due to financial or technical issues. We look forward
          to engaging with you in our vision to create a{" "}
          <b>one-stop online legal portal</b> where we would provide the
          students preparing for different competitive exams like Judiciary,
          CLAT, UGC NET etc with a variety of study resources like video
          lectures, mocks, books, study material, an online legal community and
          many more.
        </p>

        <p>
          If you are inspired and passionate about the law and where it can take
          you; come join us now. If you want to know more about the
          opportunities provided by our learning courses, explore them.
        </p>
      </article>
    </Suspense>
  );
};

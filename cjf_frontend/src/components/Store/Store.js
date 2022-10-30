import { Container } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { getData, ServerURL } from "../../helpers/FetchApi";

import { SliderComponent } from "./slider";

export const Store = (props) => {
  const sampleData = [
    {
      id: 1,
      image: "https://placem.at/things?w=480&h=240&txt=ADs&random=1",
      name: "Ad 1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: `₹ 499`,
      extraData: [],
    },
    {
      id: 2,
      image: "https://placem.at/things?w=480&h=240&txt=ADs&random=1",
      name: "Ad 2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: `₹ 499`,
      extraData: [],
    },
    {
      id: 3,
      image: "https://placem.at/things?w=480&h=240&txt=ADs&random=1",
      name: "Ad 3",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: `₹ 499`,
      extraData: [],
    },
    {
      id: 4,
      image: "https://placem.at/things?w=480&h=240&txt=ADs&random=1",
      name: "Ad 4",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: `₹ 499`,
      extraData: [],
    },
    {
      id: 5,
      image: "https://placem.at/things?w=480&h=240&txt=ADs&random=1",
      name: "Ad 5",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      price: `₹ 499`,
      extraData: [],
    },
  ];

  const [adData, setAdData] = useState(sampleData);
  const [adLoading, setAdLoading] = useState(false);

  const [mocksData, setMocksData] = useState([]);
  const [mocksLoading, setMocksLoading] = useState(true);

  const [notesData, setNotesData] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);

  const [courseData, setCourseData] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);

  const [booksData, setBooksData] = useState(sampleData);
  const [booksLoading, setBooksLoading] = useState(false);

  const [accessoriesData, setAccessoriesData] = useState(sampleData);
  const [accessoriesLoading, setAccessoriesLoading] = useState(false);

  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");
  const [banner3, setBanner3] = useState("");

  const fetchNotesCategory = async () => {
    let result = await getData("notes/fetchNotesCategory");
    let modifiedNotesData = result?.data?.map((item) => {
      return {
        ...item,
        name: item.notes_name,
        image: `${ServerURL}/images/${item.notes_picture}`,
        description: item.notes_description,
        price: item.notes_price == 0 ? "Free" : `₹ ${item.notes_price}`,
        extraData: [
          {
            count: 18,
            title: "topics",
          },
          {
            count: 45,
            title: "views",
          },
        ],
      };
    });
    setNotesData(modifiedNotesData);
    setNotesLoading(false);
  };

  const fetchMocksCategory = async () => {
    let result = await getData("mocks/fetchMocksCategory");
    let modifiedMockData = result?.data.map((item) => {
      return {
        ...item,
        image: `${ServerURL}/images/${item.picture}`,
        name: item.mocktest_name,
        description: item.mocktest_description,
        price: item.mocktest_price == 0 ? "Free" : `₹ ${item.mocktest_price}`,
        extraData: [
          {
            count: item.question_count,
            title: "questions",
          },
          {
            count: item.mocks_count,
            title: "mocks",
          },
          {
            count: item.attempts,
            title: "attempts",
          },
        ],
      };
    });
    setMocksData(modifiedMockData);
    setMocksLoading(false);
  };

  const fetchCourses = async () => {
    let result = await getData("courses/fetchActiveCourses");
    let modifiedCourseData = result?.data?.map((item) => {
      return {
        ...item,
        name: item.course_name,
        image: `${ServerURL}/images/${item.picture}`,
        description: item.course_description,
        price: item.course_price == 0 ? "Free" : `₹ ${item.course_fee}`,
        extraData: [
          {
            count: item.modulecount,
            title: "modules",
          },
          {
            count: item.pdfcount,
            title: "pdf",
          },
          {
            count: item.videocount,
            title: "videos",
          },
        ],
      };
    });
    setCourseData(modifiedCourseData);
    setCourseLoading(false);
  };

  const fetchBanners = async () => {
    var result = await getData("web/getSettings");
    if (result.success) {
      setBanner1(`${ServerURL}/images/${result.data[0].storebanner1}`);
      setBanner2(`${ServerURL}/images/${result.data[0].storebanner2}`);
      setBanner3(`${ServerURL}/images/${result.data[0].storebanner3}`);
    }
  };

  useEffect(() => {
    fetchBanners();
    fetchNotesCategory();
    fetchMocksCategory();
    fetchCourses();
  }, []);

  const bannerStyle = {
    height: "17rem",
    marginTop: "3rem",
    marginBottom: "3rem",
    width: "99.5vw",
    marginInlineStart: "50%",
    transform: "translateX(-50%)",
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container style={{ marginTop: 100 }}>
        <div>
          <SliderComponent
            data={adData}
            type="ads"
            loading={adLoading}
            show={adData.length > 0}
          />
        </div>
        <br />
        <div>
          <SliderComponent
            title="Study Notes"
            data={notesData}
            type="notes"
            loading={notesLoading}
            show={notesData.length > 0}
            isLocked={true}
          />
        </div>
        {banner1 == "" ? (
          <Skeleton
            style={bannerStyle}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <div style={bannerStyle}>
            <img src={banner1} width="100%" height="100%" />
          </div>
        )}
        <div>
          <SliderComponent
            title="Mocks"
            data={mocksData}
            type="mocks"
            loading={mocksLoading}
            show={mocksData.length > 0}
            isLocked={false}
          />
        </div>
        <div>
          <SliderComponent
            title="Courses"
            data={courseData}
            type="courses"
            loading={courseLoading}
            show={courseData.length > 0}
            isLocked={false}
          />
        </div>
        {banner2 == "" ? (
          <Skeleton
            style={bannerStyle}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <div style={bannerStyle}>
            <img src={banner2} width="100%" height="100%" />
          </div>
        )}
        <div>
          <SliderComponent
            title="Books & Materials"
            data={adData}
            type="books"
            loading={booksLoading}
            show={booksData.length > 0}
            isLocked={true}
          />
        </div>
        <div>
          <SliderComponent
            title="Accessories"
            data={adData}
            type="accessories"
            loading={accessoriesLoading}
            show={accessoriesData.length > 0}
            isLocked={true}
          />
        </div>
        {banner3 == "" ? (
          <Skeleton
            style={bannerStyle}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <div style={bannerStyle}>
            <img src={banner3} width="100%" height="100%" />
          </div>
        )}
      </Container>
    </Suspense>
  );
};

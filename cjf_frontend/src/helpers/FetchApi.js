const ServerURL = "http://localhost:5000";
// const ServerURL = "http://192.168.1.52:5000";
var axios = require("axios");

//api call
const apiCall = async (route, method, data) => {
  // eslint-disable-next-line no-undef
  const url = `${ServerURL}/${route}`;
  // const token = localStorage.getItem("token");
  let options = {
    method,
    headers: {
      // "x-access-token": `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return await fetch(url, options);
};

const getData = async (URL) => {
  // const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${ServerURL}/${URL}`
    // , {yt
    //   headers: {
    //     "x-access-token": `${token}`,
    //   },
    // }
    );
    // if (response.status == 401) {
    //   alert("Oops...Session is not Valid..");
    //   window.location.replace("/admin");
    // }
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("ERROR:", e);
    return null;
  }
};

const postDataAndImage = async (url, formData) => {
  var config = {
    headers: {
      "Content-Type": "multipart/form-data",
      // "x-access-token": localStorage.getItem("token"),
    },
  };
  try {
    const response = await axios.post(`${ServerURL}/${url}`, formData, config);
    // if (response.status == 401) {
    //   alert("Oops...Session is not Valid..");
    //   window.location.replace("/admin");
    // }
    const result = await response.data;
    return result;
  } catch (e) {
    console.log("Error:", e);
    alert(e);
    return null;
  }
};

const postData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    if (response.status == 401) {
      alert("Oops...Session is not Valid..");
      window.location.replace("/admin");
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error:", e);
    alert(e);
    return null;
  }
};

export { ServerURL, getData, postDataAndImage, postData, apiCall };

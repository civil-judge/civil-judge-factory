import axios, { CancelToken, isCancel } from "axios";
import { useRef, useState } from "react";
import { errorMessage, successMessage } from "./checks";
import { ServerURL } from "./FetchApi";


export const useProgress = (files, url, id) => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const cancelFileUpload = useRef(null);

  const uploadFile = async() => {
    const formData = new FormData();

    formData.append("courseId", id);
    files.forEach((file, i) => {
      formData.append("file" + (i + 1), file.file);
    });

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;

        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
      cancelToken: new CancelToken(
        (cancel) => (cancelFileUpload.current = cancel)
      ),
    };

    axios
      .post(`${ServerURL}/${url}`, formData, options)
      .then((res) => {
        setUploadPercentage(100);
        successMessage("Videos uploaded successfully");
        setTimeout(() => {
          setUploadPercentage(0);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);

        if (isCancel(err)) {
          errorMessage(err.message);
        }
        setUploadPercentage(0);
      });
  };

  const cancelUpload = () => {
    if (cancelFileUpload.current)
      cancelFileUpload.current("User has canceled the file upload.");
  };

  return { uploadFile, cancelUpload, uploadPercentage };
};

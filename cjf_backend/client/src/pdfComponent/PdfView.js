import React, { Suspense } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Viewer } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";

// import { Document, Page, pdfjs } from "react-pdf";
import { ServerURL } from "../helpers/FetchApi";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  grid1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
}));

export const PdfView = (props) => {
  const { pdf } = props.location.state;

  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={{ marginTop: 100 }}>
        <div
          className="rpv-core__viewer"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            display: "flex",
            height: "100vh",
          }}
        >
          <div
            style={{
              borderRight: "1px solid rgba(0, 0, 0, 0.3)",
              overflow: "auto",
              width: "30%",
            }}
          >
            <Thumbnails />
          </div>
          <div style={{ flex: 1 }}>
            <Viewer
              fileUrl={`${ServerURL}/pdf/${pdf.pdfname}`}
              plugins={[thumbnailPluginInstance]}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

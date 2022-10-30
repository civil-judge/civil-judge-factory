import React, { Suspense, useEffect } from "react";
import { ServerURL } from "../../helpers/FetchApi";
import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  PlaybackRateMenuButton,
  Player,
} from "video-react";
import "video-react/dist/video-react.css";

export const VideoView = (props) => {
  const { video } = props.location.state;

  const requestFullScreen = () => {
    var el = document.documentElement;
    // Supports most browsers and their versions.
    var requestMethod =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullScreen;
    if (requestMethod) {
      // Native full screen.
      requestMethod.call(el);
      // setFullScreen(!fullScreen);
    }
  };

  useEffect(() => {
    // requestFullScreen();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        style={{
          marginTop: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Player
          height={window.innerHeight - 100}
          width={window.innerWidth}
          aspectRatio="16:9"
          controls
          preload="auto"
          controlsList="nodownload"
          fluid={false}
          src={`${ServerURL}/videos/${video.videoname}`}
        >
          <BigPlayButton position="center" />
          <LoadingSpinner />
          <ControlBar>
            <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5, 0.1]} />
          </ControlBar>
          {/* <source
            src={`${ServerURL}/videos/${video.videoname}`}
            type="video/mp4"
          /> */}
        </Player>
      </div>
    </Suspense>
  );
};

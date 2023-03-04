import React, { useState, useRef } from "react";
import "./css/file.css";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import Control from "./Component/Control";
import screenfull from "screenfull";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

const App = () => {
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };
  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handlePlaybackRateChange = (rate) => {
    setState({
      ...state,
      playbackRate: rate,
    });
  };
  const ToggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };
  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };
  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };
  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };
  const handleChangeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };
  const handleMouseMove = () => {
    console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";

  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  // const elapsedTime = format(currentTime)

  const totalDuration = format(duration);

  return (
    <>
      {/* header */}
      <AppBar position="fixed" style={{ backgroundColor: "#000" }}>
        <Toolbar>
          <Typography variant="h6">React Video Player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="md">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
          ref={playerContainerRef}
          className="mt-3"
        >
          <ReactPlayer
            className="video"
            url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            volume={volume}
            muted={muted}
            playing={playing}
            ref={playerRef}
            playbackRate={playbackRate}
            onProgress={handleProgress}
          />
          {/* Controljs */}
          <Control
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            volume={volume}
            onMute={handleMute}
            muted={muted}
            onVolumechange={handleVolumeChange}
            onVolumeSeekUp={handleVolumeSeekUp}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRateChange}
            onToggleFullScreen={ToggleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onChangeDisplayFormat={handleChangeDisplayFormat}
          />
        </div>
      </Container>
    </>
  );
};

export default App;

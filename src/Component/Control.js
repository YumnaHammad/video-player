import React, { forwardRef } from "react";
import "../css/file.css";
import { Typography, Grid, Button, Popover } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "@mui/material/Button";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
const PrettoSlider = styled(Slider)({
  height: 5,
  width: 610,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
});

const Control = forwardRef(
  (
    {
      onPlayPause,
      playing,
      onRewind,
      onFastForward,
      onVolumechange,
      volume,
      onMute,
      muted,
      onVolumeSeekUp,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      played,
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      elapsedTime,
      totalDuration,
      onChangeDisplayFormat,
    },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;

    return (
      <>
        <div className="grid" ref={ref}>
          <Grid container direction="row" className="title">
            <Grid className="grid1">
              <h5 className="me">Video Title</h5>
            </Grid>
            <Grid className="grid2">
              <Button variant="contained" startIcon={<BookmarkIcon />}>
                Bookmark
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" className="grid3">
            <IconButton onClick={onRewind} aria-label="required">
              <FastRewindIcon className="icon" fontSize="large" />
            </IconButton>
            <IconButton onClick={onPlayPause} aria-label="required">
              {playing ? (
                <PauseIcon fontSize="large" className="icon" />
              ) : (
                <PlayArrowIcon className="icon" fontSize="large" />
              )}
            </IconButton>
            <IconButton onClick={onFastForward} aria-label="required">
              <FastForwardIcon className="icon" fontSize="large" />
            </IconButton>
          </Grid>

          <Grid>
            <PrettoSlider
              className="slider"
              value={played * 100}
              ValueLabelComponent={(props) => (
                <ValueLabelComponent {...props} value={elapsedTime} />
              )}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={onSeek}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onSeekMouseUp}
            />
            <Grid item>
              <Grid container direction="row">
                <IconButton onClick={onPlayPause} className="Bottomicon">
                  {playing ? (
                    <PauseIcon className="icon" />
                  ) : (
                    <PlayArrowIcon className="icon" />
                  )}
                </IconButton>

                <IconButton onClick={onMute} className="Bottomicon">
                  {muted ? (
                    <VolumeOffIcon className="icon2" />
                  ) : volume > 0.5 ? (
                    <VolumeUpIcon className="icon2" />
                  ) : (
                    <VolumeDownIcon className="icon2" />
                  )}
                </IconButton>

                <Slider
                  size="small"
                  Value={volume * 100}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  onChange={onVolumechange}
                  onChangeCommitted={onVolumeSeekUp}
                  min={0}
                  max={100}
                  style={{
                    width: "70px",
                    marginTop: "-6px",
                    marginLeft: "-18px",
                  }}
                />
                <Button
                  onClick={onChangeDisplayFormat}
                  variant="text"
                  style={{ color: "#fff", marginLeft: 10, marginTop: -10 }}
                >
                  <Typography>
                    {elapsedTime}/{totalDuration}
                  </Typography>
                </Button>

                <Grid className="bottomleft">
                  <Button
                    onClick={handlePopover}
                    variant="text"
                    style={{ marginLeft: 10, marginTop: -13 }}
                  >
                    <Typography className="icon">{playbackRate}X</Typography>
                  </Button>

                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                  >
                    <Grid container direction="column-reverse">
                      {[0.5, 1, 1.5, 2].map((rate) => (
                        <Button
                          onClick={() => onPlaybackRateChange(rate)}
                          variant="text"
                        >
                          <Typography
                            color={rate === playbackRate ? "grey" : "default"}
                          >
                            {rate}
                          </Typography>
                        </Button>
                      ))}
                    </Grid>
                  </Popover>

                  <IconButton
                    onClick={onToggleFullScreen}
                    className="Fullscreen"
                  >
                    <FullscreenIcon fontSize="large" className="icon3" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
);
export default Control;

import * as React from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { makeStyles } from "@material-ui/core/styles";
import img from "./Silverbackogo.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import "./Silverbackogo.png";
import h from "./hLogo.png";

export default function MediaControlCard() {
  const theme = useTheme();
  const song = useSelector((state) => state.mediaPlayer);
  const [play, setPlay] = useState(false);

  //   const theme = createTheme({
  //     palette: {
  //       primary: {
  //         light: "#63ccff",
  //         main: "#0a0001",
  //         dark: "#006db3",
  //       },
  //       secondary: {
  //         main: green[500],
  //       },
  //     },
  //   });

  const audioRef = React.useRef();

  const handlePlay = () => {
    audioRef.current.play();
    setPlay(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setPlay(false);
  };

  const handleSeek = (event) => {
    audioRef.current.currentTime = event.target.value;
  };

  useEffect(() => {
    setPlay(true);
    handlePlay();
  }, [song?.songUrl]);

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        bgcolor: "black",
        color: "whitesmoke",
        p: 0,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, height: 130 }}
        image={song?.album?.albumCover || h}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto", color: "whitesmoke" }}>
          <Typography component="div" variant="h5">
            {song?.title}
          </Typography>
          <Typography variant="subtitle1" color="whitesmoke" component="div">
            {song?.artist?.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="audio"
          src={song?.songUrl}
          title="Audio title"
          ref={audioRef}
        />
        <Box
          sx={{
            bgColor: "black",
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <IconButton aria-label="previous" sx={{ color: "whitesmoke" }}>
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause" sx={{ color: "whitesmoke" }}>
            {!play ? (
              <PlayArrowIcon
                onClick={handlePlay}
                sx={{ height: 38, width: 38 }}
              />
            ) : (
              <PauseIcon onClick={handlePause} sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          <IconButton aria-label="next" sx={{ color: "whitesmoke" }}>
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

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

export default function MediaControlCard() {
  const theme = useTheme();
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

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={
          "https://t3.ftcdn.net/jpg/05/49/28/50/360_F_549285030_CYY2EQbWguJqh8jsuZCDzfkp294bHAnz.jpg"
        }
        alt="Live from space album cover"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box
          sx={{
            bgColor: "black",
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
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

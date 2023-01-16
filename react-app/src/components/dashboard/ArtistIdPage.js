import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistSongsThunk } from "../../store/playlistSongs";
import { getplaylistsThunk } from "../../store/playlists";
import { useParams, Link } from "react-router-dom";
import { getSongsThunk } from "../../store/songs";
import Ellipsis from "./EditPlaylist";
import { Box, fontSize } from "@mui/system";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  ListSubheader,
  Card,
} from "@material-ui/core";
import {
  Avatar,
  Button,
  CardMedia,
  ListItemIcon,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import zIndex from "@mui/material/styles/zIndex";
import PlaylistSongsElipsis from "./PlaylistSongsElipsis";
import { getArtistThunk } from "../../store/artists";
// import { getAllreviews } from "../../store/reviews";

// const useStyles = makeStyles({
//   media: {
//     height: 0,
//     paddingTop: "56.25%", // 16:9
//   },
// });

export default function ArtistIdPage() {
  const { artistId } = useParams();

  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState(
    "data:image/jpeg;base64,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"
  );

  //   useEffect(() => {
  //     dispatch(getSongsThunk());
  //     // dispatch(getAllreviews());
  //   }, [dispatch]);
  //   const songs = useSelector((state) => state.songs[artistId]);
  //   console.log(songs);
  useEffect(() => {
    dispatch(getArtistThunk());
  }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(getPlaylistSongsThunk(playlistId));
  //     // dispatch(getAllreviews());
  //   }, [dispatch, playlistId]);
  //   const songId = useSelector((state) => Object.values(state.playlistSongs));
  //   let songsId = songId.map((song) => song.songId);

  //   useEffect(() => {
  //     dispatch(getSongsThunk());
  //     // dispatch(getAllreviews());
  //   }, [dispatch, playlistId]);
  //   const songs = useSelector((state) => Object.values(state.songs));
  //   let listOfSongs = songs.filter((song) => songsId.includes(song.id));

  const artist = useSelector((state) => state.artists[artistId]);

  return (
    <>
      {/* <Grid container spacing={3}>
        {listOfSongs.map((song, index) => (
          <Grid item xs={4} key={index}>
            <Card>
              <Typography variant="h5">{song.title}</Typography>
              <Typography variant="subtitle1">{song.artistId}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid> */}

      <Box>
        <CardMedia
          style={{
            position: "relative",
            paddingTop: "56.25%",
            borderRadius: "10px",
          }}
          image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQDw8QDxAQDg8QDxAQDw4PDg8OEA8PFREWFxUVFRUYHSggGBolGxUWIT4hJSkrMS4uGB80OTQtOCgtLisBCgoKDg0OGhAQGi0mHx8tLS8tMC0tLS0tLS0tLS0rLS0tLy0tLS0vLS0tLS0tKy0rKy0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUCBAYDB//EAEYQAAEDAQQFCAYHBwMFAQAAAAEAAgMRBAUSIRMxQVFxBhQiUmGBkaEyQnKxwdEjM1N0grPwFWJjkpPC4TRDgyRkc6LxFv/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBgX/xAA0EQACAQIEAwYFAwQDAAAAAAAAAQIDEQQSITETQVEFYXGRsfAygaHB0SLh8SMzQlIUFaL/2gAMAwEAAhEDEQA/AKtERcB4MIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAqb5tLmOaA2Y1BA0TnMGLKhy1nXkctSs4n6gT0sALmkjFTeQFmvBllpI6TE41HoZYQagk8cgr5k42fL3qdPFhOmoNWyrSy1b7/AGz3UOdRSSvL0nOzya7RjVrpU+8KIKO8titGEHeVS+VdOvvX5HqHV1IvOEZuO52FvAbfEkdy9EmkpNIrXhGE3GLul7/YIiUVTK6CJ+tSfrUhF11CJ+tSUQXXUIn61J+tSgXXUIn61JRSLrqESiILoIiISEREAREQBERAEREAREQBERAFUP5QxtcWmOUFpIOUWsGm9W6qnWpsEz43g0mlEsXRBAMlAQfxiverR8Lm9CMZXvG/zt4lpG8OAcMw4Ag9hFQvBlprK+OlKNqD1s6H3jzWpd9tax/NnVEjJHiPLIxZuZn7PuWV5jBJFKNhDHcNfuLlaMLyy9Vp9jalQTqOm18SeX1j52t8zfe2o3LzwFoAFTnU0q0k6/Be4RRGo1ZckY08ROCS0aTvZ7X99544tHHV3qsLnU2kZmneqg3uIIy+UmSaR2JkIOphGR/cbr/yt69pBhazeau7I2jNchaYi5znuFC41puGwdwoO5awp5o3fN/T+T6mBwfGpuU/8n87L0u9/A9rTfVomPRdoh1YqtP83pLx5tK7MueeLnH3rcu6IVV/FG2mxbKKWx9unQp01aEUjk+Yyb3eanmMm93iV12BvYmBvYpsaZUcjzGTe7xKcxk3u8112jb2L2bYnHVFIeETz8EdluRJRiry08Ti+Yyb3eJTmMm93iV2psD/ALGX+jJ8l5OhAyIodzhRQrPYiMoT+Fp+Dv8Ac4/mMm93iU5jJvd5rrsDexMDdwU2LZUcjzKTe7zUx2m0QnozS8HOxt8HVC60saqu8om0RpMrOlCatJXM7r5ShxDJwI3bJRlGfaHq8dXBX64E2epor3k9bXMIs8hyP1Ljs/h8N3huXNUpW1R8LH9nKEeJS2W6+6+50SIixPiBERAEREAREQBERAEREAQjy1diLwtNsbGcw40aXOLQ0hrRSpzOesZCpUqLk7JF6dOU5WgrvuPfCK1oK76Z0Xjb4ccbhtoSOIzWDrxYHsZWpkDC2lDUSEgGmumWtal+TuGFjSRibU0yxUqr04NyVtOZ0YahUlVglo9030X8G3dk2KJtdbfozxA+VF5W28xG7C1uIj0idQ7O1a/J5pAfuq3+ZbFruwSOxB2En0hStfMUWklCNVqWx0Sp0IYqaq/Dut+dnZ215+ZqMcZnlzhSoDANVGjM+dPFV98EDILKyTYH2gVJwyyMBO5riPgqy8ZqlbZly2PQ0Mkaay7cibNaMKsG3iud0itLiuyS1yYGdFraGSUirY2/EnYFDkkrstOvCnFzk7JFtZJnyvDIml7jsGwbydQHaV0lkuYNFbQ+p6kbhgHF5FT3UXtZIY7KzRQNp1pDm+R2952rze8nWarlnXk/h0PNYrtavWdqX6I/+n+PBa95uNtEceUbGjtDcJ8VgbwdsHmVposT5LpRk80tX1er82bYvB24L1FvBye3EN3pBVyJYcGn0NuewQS+gTE79ygHezV4YVz97WSaz9Jwxx/ax4nNb7Y9T9Zq2qtuz2wjou6TTkQc8u1aQqyj3o78N2hicPtLPHpJ6/J7r07ji/2ktW02yqteVPJvRtNosgrCM5YRmYhrLmfudmzhq5LSrrjNSV0emw2NpYiGeD8VzT6MtLE6rgrq87J9EJGZObRwO4jMFczZJMwuqForAR2Kx03TRaWSfSMY8euxrqbqjUs1oXA+tmj/AOQeErgt9cL3PFVY5Zyj0bXkwiIhmEREAREQBERASiIoICr7xuhs7muL3NpkWjMHhuPyVgilNrYvTqSpvNF2ZjoW1acLatFGmgq0bgdiiezteKPaHAZiusHsKzRLkKTTTT2IjjDRRoAA2BSiKCsnfVnHtH0tq+8T/mlVltOatG/WWr7xP+aVVWzWuxbI9fS/tR8ERYLG+eVkUYq95oNwG1x7AKlfSrNZWWWFsEOoZvk9aSXa89v+AqTkJYhHDLanDpyVii/8Q9Iji4U/AFbSy0Bc45CpJXNVld2XL1PPdpYh1q3DXwwfnL9tl337jJYqrfe/VYAN8jh7gtSS+Ttljb7EbviiozLw7LxMt428Wv5L9SuYdfO+aQ8A1vuCw/bI+1l/mVuA+qNf+nq/7R+v4OqULmWXzulePaY0/BbUV8O2Pifxa5p96h0ZFZdk11s0/n+bF4irY72HrseP3mlsrfn5LdgtLH+g4O7AakcRrCzcJR3RxVcNVpfHFr089vqb1jtJYezaFx3LO4RZ3ieEUs8xyaNUU2vB2NOZG6hG5dStkQNtMMtmk9GRtGnqyH0HjtBokZZXcpQxDw1Tirb/ACXVflbr9z5dZta6SI/RHgudbG6ORzHij2OdG4bnNND5hdDCfojwXcj2VPYs+Tv+mZxl/OcrFV3Jz/TR8ZfznKxXHLdnj8R/dn4v1YREVTEIiIAiIgCIiAIpRAQilEBCKVKAxRZIhDONH1lp+8T/AJpVXaqk0AqTqG8q0/3LV95n/NctKyNxWqzt3zwV4aQErrWiPXRnkoRk+Sv5I+giERRQwt1RxRt4kDM+K17VFjY5taVBAO47Ctid1XFeZXEeSptxs+e/zOMfctoLjUtpXXU5r1j5Nu9Z/hkugtNuaxxbRz3AVOjw0HEkrVfexHqsb7UtfIBbp1JbH3I1MdVinGOj56L1Zot5Nt2uce9Z/wD5xm8+JXo6+XdeAfgld/coF8u+0g/pyj+5Tw6nX6luD2h7aPB/Jtuxzh3rVl5PPHovrx+at2Xsf4TuEhb7wvdt5N9ZsjO2gc3xaotVRV/8+nq438n6XOYfZp4tjqb25pHeOfSGY9YdFwK7CN7JB0XMdvoQacRsWpbbnjk1toesMipjWa3L0u1WnlqL34M8bpvNznBpcHtNMz6YqaDir+B+FwPaqC6riEUmMuLqeiDqV2s6ji3+k+bjpUZ1P6Ssra9DmeWtnDLeXAUbPFHN2YicDh/6A96iH6o8Fu8uBXmb9wkjPiwj4rTi+qPBdFL4Efc7Kk5YWF/DybX2LXk5/pY+Mv5zlYqt5OuAsjCSAAZczl/vOWzDeDHvwNrnWj8gCQsMrk20tj4FWlOdSo4ptJu/dqbKLJQqHKQilEBCKUQEIpRASpRTRCLkIpolEFyEU0SiC5ChZUSigi5xX+7avvE/5pWpYn0tVnP/AHEPnIB8VtH621/eZ/zCqySQteHDW1wcOINQuxK8bd32PXRjnoRj1jb6H0Z2sqFDHhwDhmHAEHsIqpXEeUtbc5y+7qkfKXMd0Xawa5HatJnJ559J/gumtlqbHTFUl2oClT45BV8l8AbGN9p9T4ALaPEa0PsYepjKlNcNaLS+nqyvHJsbXO8R8kPJwdZ3iPkvd1+Hrwj/AIpT/cgvw9eL+lKP7lbJU6/U24WO3080aUnJ5w9F576H5LwdYbRHm014GnvV3HfAOyN3svwnwI+K2WW+M+lVnt0p/MKhP6kSeJjaWsoX8NfQ5gW9zSNI1wcPWFY3DgVcWG+TkCdI3tpjHzVjNYo5G6muB1EUIVYzk60PBDjhr6NfJOLGS/Ug8bh68bVo/n5Pc6FqzUNClYHwCg5XyZWZu2sp7gGD4rWjP0R4Lz5VT1tMbPs4c/acST5Bqlh+j7l10laCPU9mxy4aK8X5tszjd0GtaTgFcLSa0qa+NStptmkjDZSKBr2GhqHU16vLvTk50dHiz0jHYSRqdpXDI/h8wr60sBY8OIALCCTs7VadfK0ktPaZyYrHOlOMFHR79/6rNeafUyaQQCNRAI4FStK5pMUWE64zh/CACP12LC9LzELmM6ILml1XNcQSCAG5aq117FzOm87gj5EsLPjujHdN+/I3g4VIqKjWKio4hSvKzQtBdI2tZGAnpYmZjW0fFe9FV6OxjUSTsvb5/UxRZUUKClyEUqUFyaKaLLCsqKClzDClFlhU4UIuYUSizwqcKrcZjCiii9sKYVNyHI4B31tr+8z/AJpVVaNZVrJ9da/vNo/MKqrRrK7Vsj2lL+1DwR13Ja2Y4AwnpQ9D8HqHwy7lcr5/dFvMEof6p6LxvZv4jWu8hlDgCCCCAQRqI3rmqRtLxPg9oYd06mZbS1/K98jQvu7tMG0JaW1zG4//ABVcXJsesSe9dMQowqqlK1rmVPF1YRyp6FE3k/Hu/Xijrgj3e/5q+oool31J/wCZV/2OZl5PD1SRwPzWrJds0ebHEjdqXYYViWKyqSXM2p9o1Yvc42G8HxnMGN3Z0QeLdRXXWOTHGx51ujBXlLYGOObQe5bbG0AG5JzzciMZi410mo2fN+/uZBYySBoLnGjWgkk7ABUqSuZ5V3nloGHM0MpGxuxnfr4cVWKzOxy4ei61RQX8Io57QZZnyH13E03DUB3AAK3j+rPBUMRzCvYD9GeC7UeuppJWXI27FM0WazAV0rHveMsqaRxzPbkVb3s10kTHRguaaPIaMRDS00NNqqrouuSWONwMeFwIqXEFoDyzVTPJq6qKENa1o1NAA7gspzjHK4vVNnn8XiKVGUJU3eUZSb7rvVcufQqLjszmh7nAtDsgHAgmm2i37TY2SU0rI5MJqMTQ6nitnCucve3SMtBDHuAYGjDU4MqE1Gras1mrTb5nLT4uOrtxsna/PlZd7L7ClFU2O/2mglbhPXjrg7xrHmriJ7XAOaQ5p2tIIVJwlD4kc1bD1aLtONvTz2MaKKL0oowqpjcwopWVEQXPXCpwr0DVmGqlzHMeOBZYF6hiyDFXMVzniGKRGtgMWYjUZivENTRrIRLcES9BEq5yjqnyq09G0Wxp185n8DISPeqec5ldJy5sZhtrnDJloYJK7MQ6Dx5NP41y7yvpU5KUU0e6wdVVMPTkui/Bgrq4r5MREch+jJyP2Z+SpkVpRUlZm9WlGpFxktD6VDKHAEEGu7as1wV23q+HIdJn2ZOrgdi6mwX3HJQVo7qnJ3+e5cs4OJ5/E4CpSba1RaqFi2UHUVlVUOB6BKKVBeBrKAUQmi1LTeLGCpcAN5NFzl5coXOq2LIfaEe4fNWjFy2OqhhKlV6LQs77vsRAtZR0h1DWGdrvkuPe8kkuJJJJJOslQ4kkkkknMk5klYuXVCCirHoMPh40I5Y/NkseKq5htbAwipruoVUWF7WyAvFWmrXbwDtHaNa3ZYCH4QMR1tLQTiadRHZRapHS5ZdjqeTt+QQwwwyOka4Y8Rw1ibilcRU8CF1Wj2juK+aQ3XM/Jsbyd2VfA5rsOR9vLf8Aop8pIwdDiqCWNoDHntbn3eyuTEUcqcl8/wAnme1MDw06sOrcl4ve3QudGqC6YGzWi1ue0ObjeACKihkNPJgXWOjXAWyGWySnpPYa9F+bWyDjqeq4ZZ1KKdm0red/sYdlw46q04ySk0red338lt12LW38nAamJ2E9WSuH+bX41WHJSPoyO2GRo8BX4hW+ncbG6WRuF/NnyU9GpwmnDFke9avJZg5uaEEmRxcAcx0WgV3ZBWdSfCkpPZpeppLE1nhKsajvaUY/Vt689l5lhhWOFbBasS1c9z5WY8cKL0wopuTmMwswtfSLLSqjRRxZshZBaomUiZRYq4M3QVmCtETLITqriUdNm+1y9WuCq9P2pzntVHBlHRbPTlPdDLbZXRZNmYcdnkJy0gGp37pGXgdi+NWmN0b3MkaWPYS17HZFpGwr7AbfTaqLlHd1ntgxOOhmAo2ZoFabA8euPMb10Yeo4fpa09D7vZeOnh/6VRXh3LVflHzYFZLYt93SQE1Mcjdj4nYweI1jwWhp19Fa7HqoNVIqUHdHui19Mo0qmzL5GWkN4ys9F7qbnHEPNbTOUEo14D3EfFUOlUaVUdOL3RnLCwlq4o6B3KGbdH4O+a8Jb4md6wb7I+aptKp0yhUorkVjg6cdoo25Hlxq4lx3kklYrW0qnTK9jbIzYUOXhpl7wRPkNGNJPc0eJyCWIcbaswBXV3Td1oFlZaxG0iKUGAPBdpGUqQWkZxk9EcTTYV63DyahBElqkjlpQiGN2KOv8R232RlxXW26+YmRnSH6OmDABWoOWEALnniGpJQV+v4R8XF9ptTUKEc2uuj1XRd/fsWt0XjHaIGSxDA1wFWV9CQDpMPA/Aqh5XXUSRaoDgmjIcSNYIzD/IA9lNgXO3TfjYLS/BiFmlIxYssLvVkpsy1/4Cv+UN9SxxgwNY/HXGXtL2BgA2A54q+RWEaEqVZZNntfpzT99GfIjg6uFxi4KupbJ6Xi94v30e5a3JerbTC2QDC8dGZnUmGscNvArcd+s18zuW+XQTmQ5skylaN2wgb2/Peu+54CKg1BzBG0Ktahklps9jDH9n8Cr+n4Xt+Pl6HvbIRJG9h1OYQuL/ZdphlGja8Or0ZGBxZTtcPV404LrOdBY85CvRqypJpbPqaYLF1cKnGMU0+TWnT+VzNiqxJXlplGkWdjiUGj0qi8dIpU2LZTXRZJRaG1yKpVTRRRRYkxqlVNEopsDEuKxJWdFBCkm55FYOavUhY0UoumeRhG4eAWJszeqPAL3olELZma/NGdVn8oTmbOozwC2KLLCouTxH1NTmLOozwCcwj6jPBbWFTRLkcR9TU5hH1GeCjmDOozwW5RRRCeJLqavM2dRvgE5ozqM8AtqiUS44j6mrzZvVb4BToR1R4BbFEopGdnjohuXlabMHNIoXdhbiC26IpTa1RMasotNcjj/wBkyFxAa9o2Y2SHza2nu4Lo7NZHc3ZG89IClaGopWlDwot4LOivOq5JG9bHTqJaJWd9Cgj5ONqcRJGzCMPiPlRXcEOFrWDUxoaOAFF6AKaqkpuSszGtialVJTe3h9jHR9qyEfb5IpBVDnuyWim1TVQiEGShQpQGShSiFSFClEBClFCEkrErJYlAYELGi9CoopLpmNFNFICyohFzGiUUqVAuY0SilEIIolFKICKJRSiE3MaLGi9aLGikXMKJRZ0RCbkALKiBShFxRKIiECiUUqUBilFKlQQY0UqUQEoiIQFCIgChEQBCiISQsSiISSskRAEREAREQBERAEREAWKIgIKIiEmQRSiFWEREAREQglERAEREB//Z"
          title="header image"
        />
      </Box>

      <Box
        style={{
          display: "flex",
          color: "whitesmoke",
          zIndex: "99",
          height: "60px",
          width: "25%",
          fontSize: "25px",
          fontWeight: "bold",
          alignItems: "flex-end",
          textShadow: "1px 2px black",
        }}
      >
        {artist?.name}
      </Box>

      <div style={{ color: "whitesmoke", paddingTop: "10px" }}>
        To add ellipsis to overflow text in Material-UI, you can use the
        overflow and textOverflow CSS properties. You can set the overflow
        property to hidden and the text-overflow property to ellipsis to
        truncate the text and add an ellipsis to the end of it when it overflows
        the containing element. Here's an example of how you might use these CSS
        properties to add ellipsis to overflow text in a Typography component:
      </div>

      <Box
        style={{
          display: "flex",
          color: "whitesmoke",
          zIndex: "99",
          height: "60px",
          width: "25%",
          fontSize: "25px",
          fontWeight: "bold",
          alignItems: "flex-end",
          textShadow: "1px 2px black",
        }}
      >
        Reviews
      </Box>

      <Box
        style={{
          display: "flex",
          color: "whitesmoke",
          zIndex: "99",
          height: "60px",
          width: "25%",
          fontSize: "25px",
          fontWeight: "bold",
          alignItems: "flex-end",
          textShadow: "1px 2px black",
        }}
      >
        Albums
      </Box>

      {/*
      <List component="ol"> */}
      {/* <ListSubheader style={{ color: "whitesmoke" }}>
          {playlistName}
        </ListSubheader> */}

      {/* {artist.map((artist, index) => (
          <ListItem key={song.id}>
            <ListItemAvatar>
              <ListItemIcon>
                <Button
                  sx={{ "&:hover": { bgcolor: "#1DB954" } }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  <PlayArrowIcon />
                </Button>

              </ListItemIcon>
            </ListItemAvatar>

            <ListItemIcon>
              <Avatar
                sx={{ width: "2.5rem", height: "2.5rem", borderRadius: "0" }}
                src={song?.album?.albumCover}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "whitesmoke" }}
              secondaryTypographyProps={{ style: { color: "whitesmoke" } }}
              primary={song.title}
              secondary={song.artist.name}
            />

            <PlaylistSongsElipsis songId={song.id} />
          </ListItem>
        ))}
      </List> */}

      {/* <List>
        {listOfSongs.map((song) => (
          <Box sx={{ color: "whitesmoke" }} key={song.id}>
            {song.title}
          </Box>
        ))}
      </List> */}
    </>
  );
}

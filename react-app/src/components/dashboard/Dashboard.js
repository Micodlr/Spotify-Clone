import * as React from "react";
import { useState, useEffect } from "react";
import {
  getplaylistsThunk,
  getSuggestedPlaylistsThunk,
} from "../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { Box, CardActionArea, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { maxHeight } from "@mui/system";
import { useHistory } from "react-router-dom";
import Ellipsis from "./EditPlaylist";
import { getArtistThunk } from "../../store/artists";
import AllSongs from "./SongsPage";

export default function Dashboard() {
  const dispatch = useDispatch();
  //   const playlistsState = useSelector((state) => state.playlists);
  //   console.log(playlistsState);
  const artists = useSelector((state) => Object.values(state.artists));
  const playlists = useSelector((state) => Object.values(state.playlists));

  const history = useHistory();
  const onClick = (e, artistId) => {
    e.preventDefault();
    history.push(`/dashboard/artists/${artistId}`);
  };
  useEffect(() => {
    const myPlaylists = async () =>
      await dispatch(getSuggestedPlaylistsThunk());
    myPlaylists();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArtistThunk());
  }, [dispatch]);

  return (
    <>
      <h1 style={{ color: "whitesmoke" }}>Welcome to Potify</h1>
      <h2 style={{ color: "whitesmoke" }}>Artists</h2>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          paddingBottom: "30px",
        }}
      >
        {artists.map((artist) => (
          // <Card>
          //   <div id="playlist-container" key={playlist?.id}>
          //     <div id="playlist" key={playlist?.id}>
          //       {playlist?.name}
          //     </div>
          //   </div>
          // </Card>
          <Card
            key={artist?.id}
            sx={{
              width: 160,
              height: 260,
              p: "10px",
              bgcolor: "#121212",
              color: "white",
              "&:hover": { bgcolor: "#515151" },
            }}
          >
            <CardActionArea onClick={(e) => onClick(e, artist?.id)}>
              <CardMedia
                sx={{ height: 130, maxWidth: "100%", borderRadius: "10px" }}
                image={
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQDw8QDxAQDg8QDxAQDw4PDg8OEA8PFREWFxUVFRUYHSggGBolGxUWIT4hJSkrMS4uGB80OTQtOCgtLisBCgoKDg0OGhAQGi0mHx8tLS8tMC0tLS0tLS0tLS0rLS0tLy0tLS0vLS0tLS0tKy0rKy0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUCBAYDB//EAEYQAAEDAQQFCAYHBwMFAQAAAAEAAgMRBAUSIRMxQVFxBhQiUmGBkaEyQnKxwdEjM1N0grPwFWJjkpPC4TRDgyRkc6LxFv/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBgX/xAA0EQACAQIEAwYFAwQDAAAAAAAAAQIDEQQSITETQVEFYXGRsfAygaHB0SLh8SMzQlIUFaL/2gAMAwEAAhEDEQA/AKtERcB4MIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAqb5tLmOaA2Y1BA0TnMGLKhy1nXkctSs4n6gT0sALmkjFTeQFmvBllpI6TE41HoZYQagk8cgr5k42fL3qdPFhOmoNWyrSy1b7/AGz3UOdRSSvL0nOzya7RjVrpU+8KIKO8titGEHeVS+VdOvvX5HqHV1IvOEZuO52FvAbfEkdy9EmkpNIrXhGE3GLul7/YIiUVTK6CJ+tSfrUhF11CJ+tSUQXXUIn61J+tSgXXUIn61JRSLrqESiILoIiISEREAREQBERAEREAREQBERAFUP5QxtcWmOUFpIOUWsGm9W6qnWpsEz43g0mlEsXRBAMlAQfxiverR8Lm9CMZXvG/zt4lpG8OAcMw4Ag9hFQvBlprK+OlKNqD1s6H3jzWpd9tax/NnVEjJHiPLIxZuZn7PuWV5jBJFKNhDHcNfuLlaMLyy9Vp9jalQTqOm18SeX1j52t8zfe2o3LzwFoAFTnU0q0k6/Be4RRGo1ZckY08ROCS0aTvZ7X99544tHHV3qsLnU2kZmneqg3uIIy+UmSaR2JkIOphGR/cbr/yt69pBhazeau7I2jNchaYi5znuFC41puGwdwoO5awp5o3fN/T+T6mBwfGpuU/8n87L0u9/A9rTfVomPRdoh1YqtP83pLx5tK7MueeLnH3rcu6IVV/FG2mxbKKWx9unQp01aEUjk+Yyb3eanmMm93iV12BvYmBvYpsaZUcjzGTe7xKcxk3u8112jb2L2bYnHVFIeETz8EdluRJRiry08Ti+Yyb3eJTmMm93iV2psD/ALGX+jJ8l5OhAyIodzhRQrPYiMoT+Fp+Dv8Ac4/mMm93iU5jJvd5rrsDexMDdwU2LZUcjzKTe7zUx2m0QnozS8HOxt8HVC60saqu8om0RpMrOlCatJXM7r5ShxDJwI3bJRlGfaHq8dXBX64E2epor3k9bXMIs8hyP1Ljs/h8N3huXNUpW1R8LH9nKEeJS2W6+6+50SIixPiBERAEREAREQBERAEREAQjy1diLwtNsbGcw40aXOLQ0hrRSpzOesZCpUqLk7JF6dOU5WgrvuPfCK1oK76Z0Xjb4ccbhtoSOIzWDrxYHsZWpkDC2lDUSEgGmumWtal+TuGFjSRibU0yxUqr04NyVtOZ0YahUlVglo9030X8G3dk2KJtdbfozxA+VF5W28xG7C1uIj0idQ7O1a/J5pAfuq3+ZbFruwSOxB2En0hStfMUWklCNVqWx0Sp0IYqaq/Dut+dnZ215+ZqMcZnlzhSoDANVGjM+dPFV98EDILKyTYH2gVJwyyMBO5riPgqy8ZqlbZly2PQ0Mkaay7cibNaMKsG3iud0itLiuyS1yYGdFraGSUirY2/EnYFDkkrstOvCnFzk7JFtZJnyvDIml7jsGwbydQHaV0lkuYNFbQ+p6kbhgHF5FT3UXtZIY7KzRQNp1pDm+R2952rze8nWarlnXk/h0PNYrtavWdqX6I/+n+PBa95uNtEceUbGjtDcJ8VgbwdsHmVposT5LpRk80tX1er82bYvB24L1FvBye3EN3pBVyJYcGn0NuewQS+gTE79ygHezV4YVz97WSaz9Jwxx/ax4nNb7Y9T9Zq2qtuz2wjou6TTkQc8u1aQqyj3o78N2hicPtLPHpJ6/J7r07ji/2ktW02yqteVPJvRtNosgrCM5YRmYhrLmfudmzhq5LSrrjNSV0emw2NpYiGeD8VzT6MtLE6rgrq87J9EJGZObRwO4jMFczZJMwuqForAR2Kx03TRaWSfSMY8euxrqbqjUs1oXA+tmj/AOQeErgt9cL3PFVY5Zyj0bXkwiIhmEREAREQBERASiIoICr7xuhs7muL3NpkWjMHhuPyVgilNrYvTqSpvNF2ZjoW1acLatFGmgq0bgdiiezteKPaHAZiusHsKzRLkKTTTT2IjjDRRoAA2BSiKCsnfVnHtH0tq+8T/mlVltOatG/WWr7xP+aVVWzWuxbI9fS/tR8ERYLG+eVkUYq95oNwG1x7AKlfSrNZWWWFsEOoZvk9aSXa89v+AqTkJYhHDLanDpyVii/8Q9Iji4U/AFbSy0Bc45CpJXNVld2XL1PPdpYh1q3DXwwfnL9tl337jJYqrfe/VYAN8jh7gtSS+Ttljb7EbviiozLw7LxMt428Wv5L9SuYdfO+aQ8A1vuCw/bI+1l/mVuA+qNf+nq/7R+v4OqULmWXzulePaY0/BbUV8O2Pifxa5p96h0ZFZdk11s0/n+bF4irY72HrseP3mlsrfn5LdgtLH+g4O7AakcRrCzcJR3RxVcNVpfHFr089vqb1jtJYezaFx3LO4RZ3ieEUs8xyaNUU2vB2NOZG6hG5dStkQNtMMtmk9GRtGnqyH0HjtBokZZXcpQxDw1Tirb/ACXVflbr9z5dZta6SI/RHgudbG6ORzHij2OdG4bnNND5hdDCfojwXcj2VPYs+Tv+mZxl/OcrFV3Jz/TR8ZfznKxXHLdnj8R/dn4v1YREVTEIiIAiIgCIiAIpRAQilEBCKVKAxRZIhDONH1lp+8T/AJpVXaqk0AqTqG8q0/3LV95n/NctKyNxWqzt3zwV4aQErrWiPXRnkoRk+Sv5I+giERRQwt1RxRt4kDM+K17VFjY5taVBAO47Ctid1XFeZXEeSptxs+e/zOMfctoLjUtpXXU5r1j5Nu9Z/hkugtNuaxxbRz3AVOjw0HEkrVfexHqsb7UtfIBbp1JbH3I1MdVinGOj56L1Zot5Nt2uce9Z/wD5xm8+JXo6+XdeAfgld/coF8u+0g/pyj+5Tw6nX6luD2h7aPB/Jtuxzh3rVl5PPHovrx+at2Xsf4TuEhb7wvdt5N9ZsjO2gc3xaotVRV/8+nq438n6XOYfZp4tjqb25pHeOfSGY9YdFwK7CN7JB0XMdvoQacRsWpbbnjk1toesMipjWa3L0u1WnlqL34M8bpvNznBpcHtNMz6YqaDir+B+FwPaqC6riEUmMuLqeiDqV2s6ji3+k+bjpUZ1P6Ssra9DmeWtnDLeXAUbPFHN2YicDh/6A96iH6o8Fu8uBXmb9wkjPiwj4rTi+qPBdFL4Efc7Kk5YWF/DybX2LXk5/pY+Mv5zlYqt5OuAsjCSAAZczl/vOWzDeDHvwNrnWj8gCQsMrk20tj4FWlOdSo4ptJu/dqbKLJQqHKQilEBCKUQEIpRASpRTRCLkIpolEFyEU0SiC5ChZUSigi5xX+7avvE/5pWpYn0tVnP/AHEPnIB8VtH621/eZ/zCqySQteHDW1wcOINQuxK8bd32PXRjnoRj1jb6H0Z2sqFDHhwDhmHAEHsIqpXEeUtbc5y+7qkfKXMd0Xawa5HatJnJ559J/gumtlqbHTFUl2oClT45BV8l8AbGN9p9T4ALaPEa0PsYepjKlNcNaLS+nqyvHJsbXO8R8kPJwdZ3iPkvd1+Hrwj/AIpT/cgvw9eL+lKP7lbJU6/U24WO3080aUnJ5w9F576H5LwdYbRHm014GnvV3HfAOyN3svwnwI+K2WW+M+lVnt0p/MKhP6kSeJjaWsoX8NfQ5gW9zSNI1wcPWFY3DgVcWG+TkCdI3tpjHzVjNYo5G6muB1EUIVYzk60PBDjhr6NfJOLGS/Ug8bh68bVo/n5Pc6FqzUNClYHwCg5XyZWZu2sp7gGD4rWjP0R4Lz5VT1tMbPs4c/acST5Bqlh+j7l10laCPU9mxy4aK8X5tszjd0GtaTgFcLSa0qa+NStptmkjDZSKBr2GhqHU16vLvTk50dHiz0jHYSRqdpXDI/h8wr60sBY8OIALCCTs7VadfK0ktPaZyYrHOlOMFHR79/6rNeafUyaQQCNRAI4FStK5pMUWE64zh/CACP12LC9LzELmM6ILml1XNcQSCAG5aq117FzOm87gj5EsLPjujHdN+/I3g4VIqKjWKio4hSvKzQtBdI2tZGAnpYmZjW0fFe9FV6OxjUSTsvb5/UxRZUUKClyEUqUFyaKaLLCsqKClzDClFlhU4UIuYUSizwqcKrcZjCiii9sKYVNyHI4B31tr+8z/AJpVVaNZVrJ9da/vNo/MKqrRrK7Vsj2lL+1DwR13Ja2Y4AwnpQ9D8HqHwy7lcr5/dFvMEof6p6LxvZv4jWu8hlDgCCCCAQRqI3rmqRtLxPg9oYd06mZbS1/K98jQvu7tMG0JaW1zG4//ABVcXJsesSe9dMQowqqlK1rmVPF1YRyp6FE3k/Hu/Xijrgj3e/5q+oool31J/wCZV/2OZl5PD1SRwPzWrJds0ebHEjdqXYYViWKyqSXM2p9o1Yvc42G8HxnMGN3Z0QeLdRXXWOTHGx51ujBXlLYGOObQe5bbG0AG5JzzciMZi410mo2fN+/uZBYySBoLnGjWgkk7ABUqSuZ5V3nloGHM0MpGxuxnfr4cVWKzOxy4ei61RQX8Io57QZZnyH13E03DUB3AAK3j+rPBUMRzCvYD9GeC7UeuppJWXI27FM0WazAV0rHveMsqaRxzPbkVb3s10kTHRguaaPIaMRDS00NNqqrouuSWONwMeFwIqXEFoDyzVTPJq6qKENa1o1NAA7gspzjHK4vVNnn8XiKVGUJU3eUZSb7rvVcufQqLjszmh7nAtDsgHAgmm2i37TY2SU0rI5MJqMTQ6nitnCucve3SMtBDHuAYGjDU4MqE1Gras1mrTb5nLT4uOrtxsna/PlZd7L7ClFU2O/2mglbhPXjrg7xrHmriJ7XAOaQ5p2tIIVJwlD4kc1bD1aLtONvTz2MaKKL0oowqpjcwopWVEQXPXCpwr0DVmGqlzHMeOBZYF6hiyDFXMVzniGKRGtgMWYjUZivENTRrIRLcES9BEq5yjqnyq09G0Wxp185n8DISPeqec5ldJy5sZhtrnDJloYJK7MQ6Dx5NP41y7yvpU5KUU0e6wdVVMPTkui/Bgrq4r5MREch+jJyP2Z+SpkVpRUlZm9WlGpFxktD6VDKHAEEGu7as1wV23q+HIdJn2ZOrgdi6mwX3HJQVo7qnJ3+e5cs4OJ5/E4CpSba1RaqFi2UHUVlVUOB6BKKVBeBrKAUQmi1LTeLGCpcAN5NFzl5coXOq2LIfaEe4fNWjFy2OqhhKlV6LQs77vsRAtZR0h1DWGdrvkuPe8kkuJJJJJOslQ4kkkkknMk5klYuXVCCirHoMPh40I5Y/NkseKq5htbAwipruoVUWF7WyAvFWmrXbwDtHaNa3ZYCH4QMR1tLQTiadRHZRapHS5ZdjqeTt+QQwwwyOka4Y8Rw1ibilcRU8CF1Wj2juK+aQ3XM/Jsbyd2VfA5rsOR9vLf8Aop8pIwdDiqCWNoDHntbn3eyuTEUcqcl8/wAnme1MDw06sOrcl4ve3QudGqC6YGzWi1ue0ObjeACKihkNPJgXWOjXAWyGWySnpPYa9F+bWyDjqeq4ZZ1KKdm0red/sYdlw46q04ySk0red338lt12LW38nAamJ2E9WSuH+bX41WHJSPoyO2GRo8BX4hW+ncbG6WRuF/NnyU9GpwmnDFke9avJZg5uaEEmRxcAcx0WgV3ZBWdSfCkpPZpeppLE1nhKsajvaUY/Vt689l5lhhWOFbBasS1c9z5WY8cKL0wopuTmMwswtfSLLSqjRRxZshZBaomUiZRYq4M3QVmCtETLITqriUdNm+1y9WuCq9P2pzntVHBlHRbPTlPdDLbZXRZNmYcdnkJy0gGp37pGXgdi+NWmN0b3MkaWPYS17HZFpGwr7AbfTaqLlHd1ntgxOOhmAo2ZoFabA8euPMb10Yeo4fpa09D7vZeOnh/6VRXh3LVflHzYFZLYt93SQE1Mcjdj4nYweI1jwWhp19Fa7HqoNVIqUHdHui19Mo0qmzL5GWkN4ys9F7qbnHEPNbTOUEo14D3EfFUOlUaVUdOL3RnLCwlq4o6B3KGbdH4O+a8Jb4md6wb7I+aptKp0yhUorkVjg6cdoo25Hlxq4lx3kklYrW0qnTK9jbIzYUOXhpl7wRPkNGNJPc0eJyCWIcbaswBXV3Td1oFlZaxG0iKUGAPBdpGUqQWkZxk9EcTTYV63DyahBElqkjlpQiGN2KOv8R232RlxXW26+YmRnSH6OmDABWoOWEALnniGpJQV+v4R8XF9ptTUKEc2uuj1XRd/fsWt0XjHaIGSxDA1wFWV9CQDpMPA/Aqh5XXUSRaoDgmjIcSNYIzD/IA9lNgXO3TfjYLS/BiFmlIxYssLvVkpsy1/4Cv+UN9SxxgwNY/HXGXtL2BgA2A54q+RWEaEqVZZNntfpzT99GfIjg6uFxi4KupbJ6Xi94v30e5a3JerbTC2QDC8dGZnUmGscNvArcd+s18zuW+XQTmQ5skylaN2wgb2/Peu+54CKg1BzBG0Ktahklps9jDH9n8Cr+n4Xt+Pl6HvbIRJG9h1OYQuL/ZdphlGja8Or0ZGBxZTtcPV404LrOdBY85CvRqypJpbPqaYLF1cKnGMU0+TWnT+VzNiqxJXlplGkWdjiUGj0qi8dIpU2LZTXRZJRaG1yKpVTRRRRYkxqlVNEopsDEuKxJWdFBCkm55FYOavUhY0UoumeRhG4eAWJszeqPAL3olELZma/NGdVn8oTmbOozwC2KLLCouTxH1NTmLOozwCcwj6jPBbWFTRLkcR9TU5hH1GeCjmDOozwW5RRRCeJLqavM2dRvgE5ozqM8AtqiUS44j6mrzZvVb4BToR1R4BbFEopGdnjohuXlabMHNIoXdhbiC26IpTa1RMasotNcjj/wBkyFxAa9o2Y2SHza2nu4Lo7NZHc3ZG89IClaGopWlDwot4LOivOq5JG9bHTqJaJWd9Cgj5ONqcRJGzCMPiPlRXcEOFrWDUxoaOAFF6AKaqkpuSszGtialVJTe3h9jHR9qyEfb5IpBVDnuyWim1TVQiEGShQpQGShSiFSFClEBClFCEkrErJYlAYELGi9CoopLpmNFNFICyohFzGiUUqVAuY0SilEIIolFKICKJRSiE3MaLGi9aLGikXMKJRZ0RCbkALKiBShFxRKIiECiUUqUBilFKlQQY0UqUQEoiIQFCIgChEQBCiISQsSiISSskRAEREAREQBERAEREAWKIgIKIiEmQRSiFWEREAREQglERAEREB//Z"
                }
                title="playlist image"
              />
              <CardContent sx={{ width: 130 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                  component="div"
                  textOverflow={"ellipsis"}
                >
                  {artist?.name}
                </Typography>
                <Typography variant="body2" color="gray">
                  artist description/genre
                </Typography>
              </CardContent>
              {/* <CardActions>
          <Button size="small">Share</Button>
        </CardActions> */}
            </CardActionArea>
          </Card>
        ))}
      </Container>

      <Typography
        variant="h2"
        style={{ fontSize: "24px", fontWeight: "bold", paddingTop: "10px" }}
        textOverflow={"ellipsis"}
        color={"whitesmoke"}
      >
        Suggested Playlists
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        {playlists.map((playlist) => (
          //   <Card>
          //     <div id="playlist-container" key={playlist?.id}>
          //       <div id="playlist" key={playlist?.id}>
          //         {playlist?.name}
          //       </div>
          //     </div>
          //   </Card>
          <Card
            key={playlist.id}
            sx={{
              width: 190,
              height: 280,
              p: "10px",

              bgcolor: "#121212",
              color: "white",
              "&:hover": { bgcolor: "#515151" },
            }}
          >
            <CardActionArea onClick={(e) => onClick(e, playlist.id)}>
              <CardMedia
                sx={{ height: 150, width: 170 }}
                //   image={ playlist?.playlistImg}
                image={playlist?.playlistImg}
                title="playlist image"
              />
              <CardContent color="custom">
                <Typography
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    fontSize: "1.2em",
                    marginBottom: "2px",
                  }}
                  color="custom"
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {playlist.name}
                </Typography>
                <p
                  style={{
                    marginTop: "1px",
                    marginBottom: "5px",
                    paddingBottom: "5px",
                    color: "gray",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    fontFamily: "inherit",
                    fontSize: "14px",
                  }}
                >
                  playlist description asdczxcas asda sczcasdqw
                  asdaaasdasdasdasdasdasdasdads
                </p>
                {/* <Typography
                style={{
                  whiteSpace: "normal",
                  overflow: "auto",
                  textOverflow: "ellipsis",
                }}
                variant="body2"
                color="gray"
              >
                playlist descrption this is a great album, mix of funk, reggae,
                rock, hip-hop, r&b, soul, metal, rap, punk, pop!
              </Typography> */}
              </CardContent>
              {/* <CardActions>
          <Button size="small">Share</Button>
        </CardActions> */}
            </CardActionArea>
          </Card>
        ))}
      </Container>
      <Typography
        gutterTop
        variant="h2"
        style={{ fontSize: "24px", fontWeight: "bold" }}
        textOverflow={"ellipsis"}
        color={"whitesmoke"}
      >
        Songs
      </Typography>
      <AllSongs />
    </>
  );
}

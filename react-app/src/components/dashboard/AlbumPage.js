import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSongsThunk } from "../../store/songs";

import { Box } from "@mui/system";

import {
  Card,
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { getArtistThunk } from "../../store/artists";
import { getAlbumsThunk } from "../../store/albums";
import Reviews from "./Reviews";
import AddReviewModal from "./AddReviewModal";
import SongEllipsis from "./SongElipsis";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getSong } from "../../store/mediaPlayer";
import { getReviewsThunk } from "../../store/reviews";
import AudioContext from "./AudioContext";
import { getplaylistsThunk } from "../../store/playlists";
import FavoriteToggleButton from "./ToggleTest";

export default function AlbumPage() {
  const { albumId } = useParams();

  const dispatch = useDispatch();

  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  const audioRef = useContext(AudioContext);

  const handlePause = () => {
    if (currentSongIndex !== -1) {
      const newPlayStatus = [...playStatus];
      newPlayStatus[currentSongIndex] = false;
      setPlayStatus(newPlayStatus);
      setCurrentSongIndex(-1);
    }
    audioRef?.current?.pause();
  };

  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => Object.values(state.songs));
  const [playStatus, setPlayStatus] = useState(
    new Array(songs.length).fill(false)
  );

  //liked songs
  const playlists = useSelector((state) => Object.values(state.playlists));
  const likedSongsPlaylist = playlists.filter(
    (playlist) => playlist.name == "Liked Songs"
  );
  const likedSongsPlaylistId = likedSongsPlaylist[0]?.id;
  const likedSongsList = likedSongsPlaylist[0]?.playlistSongs;

  function resetPlayStatus() {
    setPlayStatus(new Array(songs.length).fill(false));
  }
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("pause", resetPlayStatus);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("pause", resetPlayStatus);
      }
    };
  }, [audioRef]);

  function handleTogglePlay(index) {
    const newPlayStatus = [...playStatus];
    newPlayStatus[index] = !newPlayStatus[index];
    setPlayStatus(newPlayStatus);
    audioRef.current.play();

    // stop currently playing song, if any
    if (currentSongIndex !== -1 && currentSongIndex !== index) {
      newPlayStatus[currentSongIndex] = false;
      setPlayStatus(newPlayStatus);
    }

    // update current song index
    setCurrentSongIndex(playStatus[index] ? -1 : index);
  }

  useEffect(() => {
    dispatch(getArtistThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getSongsThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getplaylistsThunk());
  }, [dispatch]);

  useEffect(() => {
    const myreviews = async () => await dispatch(getReviewsThunk(albumId));
    myreviews();
  }, [dispatch, albumId]);

  const album = useSelector((state) => state.albums[albumId]);

  let listOfSongs = songs.filter((song) => song.albumId == albumId);

  const onClick = (song) => {
    dispatch(getSong(song));
  };

  return (
    <Container style={{ paddingBottom: 100 }}>
      <Card style={{ width: "100%", height: "35vw" }}>
        <img
          src={album?.albumCover}
          style={{ width: "100%", height: "100%" }}
        ></img>
      </Card>

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
        {album?.title}
      </Box>
      <Box
        style={{
          display: "flex",
          color: "whitesmoke",
        }}
      >
        {album?.description}
      </Box>
      <List component="ol">
        {listOfSongs.map((song, index) => (
          <ListItem key={song.id}>
            <ListItemAvatar>
              <ListItemIcon>
                <IconButton
                  onClick={(e) => handleTogglePlay(index)}
                  sx={{
                    color: "whitesmoke",
                    "&:hover": { bgcolor: "#1DB954" },
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {playStatus[index] ? (
                    <PauseIcon
                      sx={{
                        bgcolor: "green",
                        borderRadius: "18px",
                        height: "1em",
                      }}
                      onClick={(e) => handlePause(song)}
                    />
                  ) : (
                    <PlayArrowIcon onClick={(e) => onClick(song)} />
                  )}
                </IconButton>
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
            <IconButton>
              <FavoriteToggleButton
                songId={song.id}
                playlist={likedSongsList}
                playlistId={likedSongsPlaylistId}
              />

              <SongEllipsis songId={song.id} />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <AddReviewModal />
      <Reviews />
    </Container>
  );
}

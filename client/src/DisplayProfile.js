import React, { useEffect, useState } from "react";
import {
  Avatar,
  ListItem,
  Typography,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  CardContent,
  Card,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

const DisplayProfile = ({ profile }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => {
    const sportsTemp = [];
    if (profile) {
      console.log(profile.sports);
      for (let sport of profile?.sports) {
        sportsTemp.push(sport?.name);
      }
      setSportsList(sportsTemp);
    }
  }, [profile]);

  return openProfile ? (
    <Card
      sx={{
        width: "50%",
        margin: "auto",
      }}
    >
      <CardMedia
        component="img"
        alt="profile image"
        height="200"
        image={profile?.profileImage?.url}
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Name : {profile.name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {" "}
          Date of Birth:{" "}
          {new Date(profile?.dob)?.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
        <Typography variant="body2" component="div">
          Gender : {profile?.gender}
        </Typography>
        <Typography variant="body2" component="div">
          Address : {profile?.formattedAddress}
        </Typography>
        <Typography variant="body2" component="div">
          Team : {profile?.team}
        </Typography>
        <Typography variant="body2" component="div">
          About : {profile?.about}
        </Typography>
        <Typography variant="body2" component="div">
          Sports : {sportsList.join(",")}
        </Typography>
        <Typography variant="body2" component="div">
          Interests : {profile?.interests}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setOpenProfile(false)}>
          Close
        </Button>
      </CardActions>
    </Card>
  ) : (
    <ListItem>
      <ListItemButton onClick={() => setOpenProfile(true)}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={profile?.profileImage?.url}
            sx={{ width: 70, height: 70, mx: 2 }}
          />
        </ListItemAvatar>
        <ListItemText id={profile.name} primary={profile.name} />
        <ListItemText
          sx={{ textAlign: "right" }}
          id={profile.team}
          primary={`Team : ${profile.team}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default DisplayProfile;

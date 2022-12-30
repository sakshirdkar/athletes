import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Skeleton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import DisplayProfile from "./DisplayProfile";
import ky from "ky";

const ListProfiles = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState([]);

  const fetchData = async () => {
    const response = await ky.get("http://localhost:4000/api/athletes").json();
    setProfileData(response);
    setLoading(false);
  };
  useEffect(() => {
    //call api and fetch data
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) return <Skeleton animation="wave" />;
  return (
    <List>
      {profileData.map((profile) => (
        <DisplayProfile key={profile?._id} profile={profile} />
      ))}
    </List>
  );
};

export default ListProfiles;

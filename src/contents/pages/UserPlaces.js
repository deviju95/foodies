import React from "react";
import { useParams } from "react-router";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    creator: "u1",
    id: "p1",
    title: "Chim Studio",
    description: "Chim's 2021 studio at Gangdong-Gu",
    imageUrl: require("../../assets/chim1.png").default,
    address: "Gangdong-gu, Seoul, South Korea",
    location: {
      lat: 37.5492942,
      lng: 127.111408,
    },
  },
  {
    creator: "u1",
    id: "p2",
    title: "bbyoe chicken",
    description: "뼈치킨이라는 개념을 사는거죠",
    imageUrl: require("../../assets/chim2.jpg").default,
    address: "Gangdong-gu, Seoul, South Korea",
    location: {
      lat: 37.5492942,
      lng: 127.111408,
    },
  },
  {
    creator: "u2",
    id: "p1",
    title: "K-Town Ttoekbokki",
    description: "낭만이 있는 떡볶이",
    imageUrl:
      "https://mblogthumb-phinf.pstatic.net/20141223_171/ribbonliz_1419289497073AXY3i_JPEG/20141203_181205.jpg?type=w2",

    address:
      "H Mart City Center, 3500 W 6th St Suite 100, Los Angeles, CA 90020",
    location: {
      lat: 34.047449,
      lng: -118.2999788,
    },
  },
];
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;

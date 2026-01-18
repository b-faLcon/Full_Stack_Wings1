import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import PlaceList from "../components/PlaceList";


const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Victoria Memorial Hall",
    description:
      "The Victoria Memorial is a large marble monument in the Maidan in Central Kolkata, having its entrance on the Queen's Way",
    imageURL:
      "https://kolkatatourism.travel/images/places-to-visit/headers/victoria-memorial-kolkata-entry-fee-timings-holidays-reviews-header.jpg",
    address: "Victoria Memorial Hall, 1, Queens Way, Maidan, Kolkata",
    location: {
      lat: 22.5448082,
      lng: 88.3425578,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Victoria Memorial Hall",
    description:
      "The Victoria Memorial is a large marble monument in the Maidan in Central Kolkata, having its entrance on the Queen's Way",
    imageURL:
      "https://kolkatatourism.travel/images/places-to-visit/headers/victoria-memorial-kolkata-entry-fee-timings-holidays-reviews-header.jpg",
    address: "Victoria Memorial Hall, 1, Queens Way, Maidan, Kolkata",
    location: {
      lat: 22.5448082,
      lng: 88.3425578,
    },
    creator: "u2",
  },
];
const UserPlaces = () => {
    const { userId } = useParams();
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
    return (<PlaceList items={loadedPlaces}/>);
}

export default UserPlaces;
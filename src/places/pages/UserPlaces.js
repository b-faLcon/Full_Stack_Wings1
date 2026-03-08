import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/components/Hooks/http-hook";
import PlaceList from "../components/PlaceList";



// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Victoria Memorial Hall",
//     description:
//       "The Victoria Memorial is a large marble monument in the Maidan in Central Kolkata, having its entrance on the Queen's Way",
//     imageURL:
//       "https://kolkatatourism.travel/images/places-to-visit/headers/victoria-memorial-kolkata-entry-fee-timings-holidays-reviews-header.jpg",
//     address: "Victoria Memorial Hall, 1, Queens Way, Maidan, Kolkata",
//     location: {
//       lat: 22.5448082,
//       lng: 88.3425578,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Victoria Fucking Memorial Hall",
//     description:
//       "The Victoria Memorial is a large marble monument in the Maidan in Central Kolkata, having its entrance on the Queen's Way",
//     imageURL:
//       "https://kolkatatourism.travel/images/places-to-visit/headers/victoria-memorial-kolkata-entry-fee-timings-holidays-reviews-header.jpg",
//     address: "Victoria Memorial Hall, 1, Queens Way, Maidan, Kolkata",
//     location: {
//       lat: 22.5448082,
//       lng: 88.3425578,
//     },
//     creator: "u2",
//   },
// ];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useParams();

  useEffect(() => {
    const fecthPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch (error) {

      }

    };
    fecthPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler  = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  };
  //const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return (<>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>
    )}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace = {placeDeleteHandler}/>}
  </>);
}

export default UserPlaces;
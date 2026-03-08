import "./PlaceForm.css";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/components/Util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/components/Hooks/form-hook";
import { useHttpClient } from "../../shared/components/Hooks/http-hook";
import Card from "../../shared/components/UIElements/Card/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/Context/auth-context";

// const DUMMY_PLACES = [
//     {
//         id: "p1",
//         title: "Victoria Memorial Hall",
//         description:
//             "The Victoria Memorial is a large marble monument in the Maidan in Central Kolkata, having its entrance on the Queen's Way",
//         imageURL:
//             "https://kolkatatourism.travel/images/places-to-visit/headers/victoria-memorial-kolkata-entry-fee-timings-holidays-reviews-header.jpg",
//         address: "Victoria Memorial Hall, 1, Queens Way, Maidan, Kolkata",
//         location: {
//             lat: 22.5448082,
//             lng: 88.3425578,
//         },
//         creator: "u1",
//     },
//     {
//         id: "p2",
//         title: "Victoria Fucking Memorial Hall",
//         description:
//             "The Victoria Memorial is a large marble monument in the Maidan in Central Kolkata, having its entrance on the Queen's Way",
//         imageURL:
//             "https://kolkatatourism.travel/images/places-to-visit/headers/victoria-memorial-kolkata-entry-fee-timings-holidays-reviews-header.jpg",
//         address: "Victoria Memorial Hall, 1, Queens Way, Maidan, Kolkata",
//         location: {
//             lat: 22.5448082,
//             lng: 88.3425578,
//         },
//         creator: "u2",
//     },
// ];

const UpdatePlace = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const history = useHistory();
    const auth = useContext(AuthContext);
    //const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId); In future we will use 
    //backend here to connect with database. Now for that we require promises and that is not 
    //quick as static data, it needs time to fetch the data. Now if we want to initialize the state
    // with dummy data we need to call the identifiedPlace after teh useForm.
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    //const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.description,
                            isValid: true
                        }
                    }, true
                );
            } catch (error) { }
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);
    // useEffect(() => {
    //     if (identifiedPlace) {
    //     }
    // }, [setFormData, identifiedPlace]);

    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push('/' + auth.userId + '/places');
        } catch (err) { }
    }

    if (isLoading) {
        return (<div className="center">
            {/* <h2>Loading...</h2> */}
            <LoadingSpinner />
        </div>);
    }

    if (!loadedPlace && !error) {
        return <div className="center">
            <Card><h2>Could not find place!</h2></Card>
        </div>
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid Title"
                    onInput={inputHandler}
                    initialValue={loadedPlace.title}
                    initialValid={true}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid Description (min. 5 characters)."
                    onInput={inputHandler}
                    initialValue={loadedPlace.description}
                    initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    UPDATE PLACE
                </Button>
            </form>
            }
        </>
    );
}

export default UpdatePlace;
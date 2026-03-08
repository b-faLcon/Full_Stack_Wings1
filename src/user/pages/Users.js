import UsersList from "../components/UsersList";
import { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/components/Hooks/http-hook";

export default function Users() {
    // const [ isLoading, setIsLoading ] = useState(false);
    // const [ error, setError ] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedUsers, setLoadedUsers ] = useState();
    // const USERS = [
    //     {
    //         id: 'u1',
    //         name: 'Sappy',
    //         image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    //         places: 3
    //     }
    // ];
    useEffect(() => {
        const fetchUsers = async () => {
            //setIsLoading(true);
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');
                // const responseData = await response.json();
                // if (!response.ok) {
                //     throw new Error(responseData.message);
                // }
                setLoadedUsers(responseData.users); 
            } catch (err) {
                //setError(err.message);
            }
            //setIsLoading(false);
        };
        fetchUsers();
    },[ sendRequest ]);

    // const errorHandler = () => {
    //     setError(null);
    // };

    return <>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
        {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>;
}
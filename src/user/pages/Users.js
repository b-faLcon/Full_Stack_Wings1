import UsersList from "../components/UsersList";

export default function Users() {
    const USERS = [
        {
            id: 'u1',
            name: 'Sappy',
            image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
            places: 3
        }
    ];

    return <UsersList items={USERS} />;
}
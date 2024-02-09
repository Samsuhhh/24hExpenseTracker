import { useCallback, useEffect, useMemo, useState } from 'react';
import '../styles/App.css';
import UserModal from './UserModal';
import PageSelector from './PageSelector';

function ManageUsers() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currUser, setCurrUser] = useState(false);

    const fetchUserData = useCallback(async () => {
        const url = `${import.meta.env.VITE_URL}/users/all`;
        const response = await fetch(url);
        const jsonData = await response.json();

        setUserData(jsonData);
    }, [setUserData])

    const openModalHandler = useCallback(() => {
        setShowModal(true);
        document.addEventListener('click', () => {
            setShowModal(false);
        });
    }, [setShowModal]);

    const handleCreateUser = useCallback(async () => {
        if (
            !firstName ||
            !lastName
        ) return window.alert('Name values missing.')

        const url = `${import.meta.env.VITE_URL}/users/new`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName })
        });

        if (response.ok) {
            await fetchUserData();
            setFirstName("");
            setLastName("");
        }

    }, [firstName, lastName])

    const handleDelete = useCallback( async(userId) => {
        const url = `${import.meta.env.VITE_URL}/users/delete`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                // Authorization: 'Bearer YOUR_ACCESS_TOKEN'
            },
            body: JSON.stringify({userId})
        })
        if (response.ok) {
            await fetchUserData();
            window.alert('User Deleted.')
        } else {
            console.error('Error')
        }
    }, [fetchUserData])

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData])

    const tableHeaders = useMemo(() => {
        return ['First Name', 'Last Name', 'Total Cost'];
    }, []);

    if (!userData || !userData.length) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <table className='manage-users-container'>
                <thead>
                    <tr>
                        {tableHeaders.map((col, i) => (
                            <th key={i}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, i) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>${user.totalExpense ?? 0}</td>
                            <td className='edit-delete'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrUser(user);
                                        openModalHandler();
                                    }}
                                >Edit
                                </button>
                            </td>
                            <td className='edit-delete'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(user.id);
                                    }}
                                >X</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td
                            colSpan={2}
                        >
                            <input
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </td>
                        <td
                            colSpan={2}
                        >
                            <input
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </td>
                        <td>
                            <button
                                onClick={() => {
                                    handleCreateUser();
                                }}
                            >Add</button></td>
                    </tr>
                </tbody>
            </table>
            {/* <PageSelector/> */}
            {showModal && (
                <UserModal
                    setShowModal={setShowModal}
                    currUser={currUser}
                    setCurrUser={setCurrUser}
                    setUserData={setUserData}
                />)}
        </>
    );
}

export default ManageUsers;

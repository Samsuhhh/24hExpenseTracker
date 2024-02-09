import { useCallback, useState, useEffect } from 'react';
import '../styles/App.css';

function UserModal(props) {

    const { setShowModal, setCurrUser, currUser, setUserData } = props;

    const fetchUserNames = useCallback(async () => { //TODO
        const url = `${import.meta.env.VITE_URL}/users/all`;
        const response = await fetch(url);
        const jsonData = await response.json();

        setUserData(jsonData);
    }, [setUserData])

    const handleSubmit = useCallback(async (e) => {
        const url = `${import.meta.env.VITE_URL}/users/edit`;
        e.preventDefault();
        if (!currUser.firstName ||
            !currUser.lastName
        ) return window.alert('Missing values for user.')

        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(currUser),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok) {
            await fetchUserNames();
            setShowModal(false)
        }

    }, [currUser])

    const handleEditUser = useCallback(async (key, value, user) => {
        const clone = { ...user };
        clone[key] = value;
        setCurrUser({ ...clone });
    }, [setCurrUser])


    return (
        <div className="modal-overlay">
            <form
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1>Edit User</h1>
                <div>
                    <input
                        required
                        value={currUser.firstName}
                        placeholder='First name.'
                        onChange={(e) => handleEditUser("firstName", e.target.value, currUser)}
                    />
                </div>
                <div>
                    <input
                        required
                        value={currUser.lastName}
                        placeholder='Last name.'
                        onChange={(e) => handleEditUser("lastName", e.target.value, currUser)}
                    />
                </div>

                <div
                    className='bottom-buttons'
                >
                    <button
                        style={{
                            marginRight: '15px'
                        }}
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserModal;

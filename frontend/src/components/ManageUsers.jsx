import { useCallback, useEffect, useMemo, useState } from 'react';
import '../styles/App.css';

function ManageUsers () {
    const [addFirst, setAddFirst] = useState('');
    const [addLast, setAddLast] = useState('');
    const [userData, setUserData] = useState([]);
    
    const fetchUserData = useCallback(async () => {
        const url = `${import.meta.env.VITE_URL}/users/all`;
        const response = await fetch(url);
        const jsonData = await response.json();

        setUserData(jsonData);
    }, [setUserData])
    
    useEffect(() => {
        fetchUserData();
    },[fetchUserData])

    // const sampleUsers = useMemo(() => {
    //     return [{
    //         firstName: 'Sam',
    //         lastName: 'Suh',
    //         totalCost: 1000
    //     },
    //     {
    //         firstName: 'Dylan',
    //         lastName: 'Luu',
    //         totalCost: 1000
    //     }]
    // }, []);

    const tableHeaders = useMemo(() => {
        return ['First Name', 'Last Name', 'Total Cost'];
    }, []);

    // if (!sampleUsers || !sampleUsers.length) {
    //     return null;
    // }

    return (
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
                    <tr key={`${i, user.firstName}`}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>${user.totalExpense ?? 0}</td>
                        <td className='edit-delete'><button>Edit</button></td>
                        <td className='edit-delete'><button>X</button></td>
                    </tr>
                ))}
                <tr>
                    <td
                        colSpan={2}
                    >
                        <input
                            placeholder='First Name'
                            value={addFirst}
                            onChange={(e) => setAddFirst(e.target.value)}
                        />
                    </td>
                    <td
                        colSpan={2}
                    >
                        <input
                            placeholder='Last Name'
                            value={addLast}
                            onChange={(e) => setAddLast(e.target.value)}
                        />
                    </td>
                    <td><button>Add</button></td>
                </tr>
            </tbody>
        </table>
    );
}

export default ManageUsers;

import { useMemo, useState } from 'react';
import '../styles/App.css';

function ManageUsers () {

    const [addFirst, setAddFirst] = useState('');

    const [addLast, setAddLast] = useState('');

    const sampleUsers = useMemo(() => {
        return [{
            firstName: 'Sam',
            lastName: 'Suh',
            totalCost: 1000
        },
        {
            firstName: 'Dylan',
            lastName: 'Luu',
            totalCost: 1000
        }]
    }, []);

    return (
        <table className='manage-users-container'>
            <thead>
                <tr>
                    {Object.keys(sampleUsers[0]).map((col, i) => (
                        <th key={i}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sampleUsers.map((user) => (
                    <tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>${user.totalCost}</td>
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

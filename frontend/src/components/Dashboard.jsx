import { useMemo } from 'react';
import '../styles/App.css';

function Dashboard () {

    const tableHeaders = useMemo(() => {
        return ['Category', 'Total Amount'];
    }, []);

    return (
        <table className='dashboard-container'>
            <thead>
                <tr>
                    {tableHeaders.map((col, i) => (
                        <th key={i}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Example 1</td>
                    <td>$999</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Dashboard;

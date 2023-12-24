import { useCallback, useEffect, useMemo, useState } from 'react';
import '../styles/App.css';

// import.meta.env.VITE_URL

function Dashboard () {
    const [dashboardData, setDashboardData] = useState([]);

    const fetchData = useCallback(async () => {
        const url = `${import.meta.env.VITE_URL}/expenses/categoryTotals`
        const response = await fetch(url);
        const jsonData = await response.json();

        setDashboardData(jsonData)

    }, [setDashboardData])

    useEffect(() => {
        fetchData();
    }, [fetchData])



    const tableHeaders = useMemo(() => {
        return ['Category', 'Total Amount'];
    }, []);

    if (!dashboardData.length) return <div>Loading...</div>

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
                {dashboardData.map((row, i) => (
                    <tr key={i}>
                        <td>{row.category}</td>
                        <td>${row.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Dashboard;

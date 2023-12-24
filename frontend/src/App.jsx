import './styles/App.css';
import LeftNavBar from "./components/LeftNavBar";
import { useMemo, useState } from "react";
import Dashboard from './components/Dashboard';
import ManageUsers from './components/ManageUsers';
import ManageExpenses from './components/ManageExpenses';

function App() {

    const [currPage, setCurrPage] = useState('Dashboard');

    const pageToRender = useMemo(() => {
        switch (currPage) {
            case 'Dashboard': {
                return (<Dashboard />);
            }
            case 'Manage Users': {
                return (<ManageUsers />);
            }
            case 'Manage Expenses': {
                return (<ManageExpenses />);
            }
            default: {
                break;
            }
        }
    }, [currPage]);

    return (
        <div className="main-container">
            <LeftNavBar
                currPage={currPage}
                setCurrPage={setCurrPage}
            />
            <div className='page-container'>
                <h1>{currPage}</h1>
                {pageToRender}
            </div>
        </div>
    );
}

export default App;

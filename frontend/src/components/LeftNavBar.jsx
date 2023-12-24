import { useMemo } from 'react';
import '../styles/App.css';

function LeftNavBar (props) {

    const { currPage, setCurrPage } = props;

    const pagesList = useMemo(() => {
        return ['Dashboard', 'Manage Users', 'Manage Expenses'];
    }, []);

    return (
        <div className='left-nav-container'>
            <div className='logo'>
                Glaze
            </div>
            <div className='pages-list'>
                {pagesList.map((page) => (
                    <span
                        onClick={() => setCurrPage(page)}
                        style={{
                            color: currPage === page ? 'green' : 'black'
                        }}
                    >
                        {page}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default LeftNavBar;

import { useMemo, useCallback } from "react";
import '../styles/App.css';

////### WIP WIP WIP WIP WIP WIP WIP WIP WIP 

const PageSelector = (props) => {
    const { totalResults, pageNum, setPageNum, handleSearch } = props;

    const pageNumbersArray = useMemo(() => {
        const array = [];
        const pageMax = Math.ceil(totalResults / 10); // how many total pages

        if (pageMax <= 8) {
            for (let i = 1; i <= pageMax; i++) {
                array.push(`${i}`);
            }
        } else {
            if (pageNum <= 4) {
                for (let i = 1; i < pageNum + (6 - (pageNum - 1)); i++) { // i < 7 vs (6- (pageNum - 1); i++)
                    array.push(`${i}`);
                }
                array.push('...');
                array.push(`${pageMax}`);
            } else if (pageNum >= (pageMax - 3)) {
                array.push('1');
                array.push('...');
                for (let i = pageNum - (2 + (pageNum - (pageMax - 3))); i <= pageMax; i++) { // i = pageMax - 5
                    array.push(`${i}`);
                }
            } else {
                array.push('1');
                array.push('...');
                for (let i = pageNum - 2; i < pageNum + 3; i++) {
                    array.push(`${i}`);
                }
                array.push('...');
                array.push(`${pageMax}`);
            }
        }

        return array;
    }, [totalResults, pageNum]);

    const previousPageButton = useCallback(async () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
            await handleSearch(pageNum - 1);
            console.log(pageNum, 'prev button clicked')
            // window.scrollTo(0, 0);
        }
    }, [pageNum, handleSearch, setPageNum]);

    const nextPageButton = useCallback(async () => {
        if (pageNum < (Math.ceil(totalResults / 10))) {
            console.log('next clicked')
            setPageNum(pageNum + 1);
            await handleSearch(pageNum + 1);
            // console.log(pageNum, 'next button clicked')
            // window.scrollTo(0, 0);
        }
    }, [pageNum, handleSearch, setPageNum, totalResults]);

    const pageNumberButton = useCallback(async (pageNumber) => {
        if (pageNumber !== '...') {
            setPageNum(Number(pageNumber));
            await handleSearch(pageNumber);
            // window.scrollTo(0, 0);
            // console.log(pageNum, 'pageNum button clicked')
        }
    }, [setPageNum, handleSearch]);

    return (
        <div className="page_number_container">
            <div className="page_number_inner_container">
                <span
                    className='page_number_selector_buttons'
                    onClick={previousPageButton}
                >◄</span>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    minWidth: '80%'
                }}>
                    {pageNumbersArray.map((page, index) => (
                        <span
                            className={page !== '...' ? 'page_number' : 'page_number_ellipses'}
                            id={Number(page) === pageNum ? 'page_number_selected' : page}
                            key={index}
                            onClick={() => pageNumberButton(page)}
                        >
                            {page}
                        </span>
                    ))}
                </div>
                <span
                    className='page_number_selector_buttons'
                    onClick={nextPageButton}
                >►</span>
            </div>
        </div>
    );
};

export default PageSelector;
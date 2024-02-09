import { useCallback, useMemo, useState, useEffect } from 'react';
import '../styles/App.css';
import ExpenseModal from './ExpenseModal';
import PageSelector from './PageSelector';

function ManageExpenses() {
    const [expenseData, setExpenseData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [totalItems, setTotalItems] = useState();
    const [totalPages, setTotalPages] = useState();
    // tR: expenseData, pageNum, 


    //props
    const [type, setType] = useState("edit");
    const [expense, setExpense] = useState({});


    const tableHeaders = useMemo(() => {
        return ['Id', 'Name', 'Category', 'Description', 'Cost'];
    }, []);

    const fetchExpensesData = useCallback(async () => {
        // specify pageNum in url for pagination => then use to get size, offset, and shit to CONNECT /all/page=3&size=10 whatever
        const url = `${import.meta.env.VITE_URL}/expenses/all?page=${pageNum}&size=${10}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        // console.log(jsonData.currPage, 'currpage')
        setPageNum(jsonData.currPage);
        setTotalItems(jsonData.totalItems);
        setTotalPages(jsonData.totalPages)

        setExpenseData(jsonData.expense); // .expense for pagination WIP backend data
    }, [setExpenseData, pageNum])


    const deleteExpense = useCallback(async (expenseId) => {
        const url = `${import.meta.env.VITE_URL}/expenses/delete`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                // Authorization: 'Bearer YOUR_ACCESS_TOKEN'
            },
            body: JSON.stringify({ expenseId })
        })
        if (response.ok) {
            await fetchExpensesData();
            window.alert('Expense Deleted.')
        } else {
            console.error('Error')
        }
    }, [fetchExpensesData])

    const openModalHandler = useCallback((type) => {
        setType(type);
        setShowModal(true);
        document.addEventListener('click', () => {
            setShowModal(false);
        });
    }, [setShowModal]);

    // Add functions to handle pagination
    const goToNextPage = () => {
        if (totalPages - 1 !== pageNum) {
            setPageNum(pageNum + 1);
        } else {
            window.alert("No more pages")
        }
    };

    const goToPreviousPage = () => {
        if (pageNum !== 0) {
            setPageNum(pageNum - 1);
        } else {
            window.alert("No more pages")
        }
    };


    useEffect(() => {
        fetchExpensesData();
    }, [fetchExpensesData, pageNum])

    if (!expenseData || !expenseData.length) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <table className='manage-expenses-container'>
                <thead>
                    <tr>
                        {tableHeaders.map((col, i) => (
                            <th key={i}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {expenseData.map((expense, i) => (
                        <tr key={expense.id}>
                            <td>{expense.id}</td>
                            <td>{expense.User.lastName}, {expense.User.firstName}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                            <td>${expense.cost}</td>
                            <td className='edit-delete'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpense(expense);
                                        openModalHandler("edit");
                                    }}
                                >Edit</button>
                            </td>
                            <td className='edit-delete'>
                                <button
                                    onClick={() => deleteExpense(expense.id)}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* const { totalResults, pageNum, setPageNum, handleSearch } = props; */}
            {/* <PageSelector
                totalResults={totalItems}
                pageNum={pageNum}
                setPageNum={setPageNum}
                handleSearch={fetchExpensesData}
            /> */}
            <div>
                {pageNum !== 0 && (
                    <button
                        onClick={() => goToPreviousPage()}
                    >Back
                    </button>
                )}
                {pageNum < totalPages - 1 && (
                    <button
                        onClick={() => goToNextPage()}
                    >Next
                    </button>
                )}

            </div>
            <div className='bottom-buttons'>
                <button onClick={(e) => {
                    e.stopPropagation();
                    setExpense({
                        id: "",
                        category: "",
                        cost: "",
                        description: "",
                        userId: ""
                    })
                    openModalHandler("create");
                }}>Add new</button>
            </div>
            {showModal && (
                <ExpenseModal
                    setShowModal={setShowModal}
                    type={type}
                    expense={expense}
                    setExpense={setExpense}
                    setExpenseData={setExpenseData}
                    setPageNum={setPageNum}
                />)}
        </>
    );
}

export default ManageExpenses;

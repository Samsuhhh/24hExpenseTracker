import { useCallback, useMemo, useState, useEffect } from 'react';
import '../styles/App.css';
import ExpenseModal from './ExpenseModal';

function ManageExpenses() {
    const [expenseData, setExpenseData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    //props
    const [type, setType] = useState("edit");
    const [expense, setExpense] = useState({});
    

    const tableHeaders = useMemo(() => {
        return ['Id', 'Name', 'Category', 'Description', 'Cost'];
    }, []);

    const fetchExpensesData = useCallback(async () => {
        const url = `${import.meta.env.VITE_URL}/expenses/all`;
        const response = await fetch(url);
        const jsonData = await response.json();

        setExpenseData(jsonData);
    }, [setExpenseData])


    const deleteExpense = useCallback(async (expenseId) => {
        const url = `${import.meta.env.VITE_URL}/expenses/delete`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                // Authorization: 'Bearer YOUR_ACCESS_TOKEN'
            },
            body: JSON.stringify({expenseId})
        })
        if (response.ok) {
            await fetchExpensesData();
            window.alert('Expense Deleted.')
        } else {
            console.error('Error')
        }
    },[fetchExpensesData])

    const openModalHandler = useCallback((type) => {
        setType(type);
        setShowModal(true);
        document.addEventListener('click', () => {
            setShowModal(false);
        });
    }, [setShowModal]);


    useEffect(() => {
        fetchExpensesData();
    }, [fetchExpensesData])

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
                        <tr key={`${expense.id, i}`}>
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
                />)}
        </>
    );
}

export default ManageExpenses;

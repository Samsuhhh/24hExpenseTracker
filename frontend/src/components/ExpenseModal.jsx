import { useCallback, useState, useEffect } from 'react';
import '../styles/App.css';

function ExpenseModal(props) {
    const { setShowModal, type, expense, setExpense, setExpenseData } = props;

    const [userNames, setUserNames] = useState([]);

    const fetchUserNames = useCallback(async () => { //TODO
        const url = `${import.meta.env.VITE_URL}/users/all`;
        const response = await fetch(url);
        const jsonData = await response.json();

        setUserNames(jsonData);
    }, [setUserNames])

    const fetchExpensesData = useCallback(async () => {
        const url = `${import.meta.env.VITE_URL}/expenses/all`;
        const response = await fetch(url);
        const jsonData = await response.json();

        setExpenseData(jsonData);
    }, [setExpenseData])

    const handleUpdateExpense = useCallback((key, value, expense) => {
        const clone = { ...expense };
        clone[key] = value;
        setExpense({ ...clone });
    }, [setExpense]);

    const submitForm = useCallback(async (e) => {
        const method = type === "edit" ? "PUT" : "POST";
        const url = `${import.meta.env.VITE_URL}/expenses/${type === "edit" ? "edit" : "new"}`;
        e.preventDefault()

        if (
            !expense.category ||
            !expense.description ||
            !expense.cost
        ) return window.alert("Missing values in expense form!");

        const response = await fetch(url, {
            method,
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok) {
            await fetchExpensesData();
            setShowModal(false);
        }

    }, [type, expense])

    useEffect(() => {
        fetchUserNames();
    }, [fetchUserNames])


    return (
        <div className="modal-overlay">
            <form
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => submitForm(e)}
            >
                <h1>{type === 'edit' ? 'Edit' : 'Add New'} Expense</h1>
                <div className='edit-expense-fields-container'>
                    {type === 'edit' && (
                        <>
                            <label htmlFor='id'>
                                ID:
                            </label>
                            <input
                                name='id'
                                value={expense.id}
                                disabled={true}
                                type='Number'
                            />
                        </>
                    )}
                    <select
                        required
                        onChange={(e) => handleUpdateExpense("category", e.target.value, expense)}
                        value={expense.category}
                    >
                        <option value="">Select Category</option>
                        <option value={"Meals"}>Meals</option>
                        <option value={"Travel"}>Travel</option>
                        <option value={"Software"}>Software</option>
                    </select>
                    <select
                        required
                        value={expense.userId}
                        onChange={(e) => handleUpdateExpense("userId", e.target.value, expense)}
                    >
                        <option
                            value=""
                        >Select User</option>
                        {userNames.map(user => (
                            <option value={user.id}>{`${user.lastName}, ${user.firstName}`}</option>
                        ))}
                    </select>
                    <textarea
                        required
                        placeholder='Enter the expense descrition.'
                        value={expense.description}
                        onChange={(e) => handleUpdateExpense("description", e.target.value, expense)}
                    />
                    <input
                        name='cost'
                        placeholder='Enter the expense cost.'
                        value={expense.cost}
                        type='Number'
                        onChange={(e) => handleUpdateExpense("cost", e.target.value, expense)}
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

export default ExpenseModal;

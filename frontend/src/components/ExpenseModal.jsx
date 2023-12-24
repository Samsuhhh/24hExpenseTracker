import '../styles/App.css';

function ExpenseModal(props) {

    const { setShowModal, type } = props;

    return (
        <div className="modal-overlay">
            <form
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h1>{type === 'edit' ? 'Edit' : 'Add New'} Expense</h1>
                <div className='edit-expense-fields-container'>
                    <label htmlFor='id'>
                        ID:
                    </label>
                    <input
                        name='id'
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
                    <button
                        type='submit'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ExpenseModal;

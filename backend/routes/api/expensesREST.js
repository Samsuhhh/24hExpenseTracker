const express = require('express')
const router = express.Router();
const { Sequelize } = require('sequelize');
const { User, Expense } = require('../../db/models');

// routes start with /expenses

router.get('/all', async (req, res) => {
    try {
        const allExpensesWithUserData = await Expense.findAll({
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName', 'id']
                }
            ],
            order: [['createdAt', 'DESC']] //TODO: check
        });

        res.json(allExpensesWithUserData);
    } catch(error) {
        return console.error(error);
    }
})

router.get('/categoryTotals', async (req, res) => {
    try{
        const expenseCategory = await Expense.findAll({
            attributes: [
                'category',
                [Sequelize.fn('SUM', Sequelize.col("cost")), 'total']
        ],
        group: ['category']
        })
        return res.json(expenseCategory);
    } catch(error) {
        return console.error(error);
    }
})

router.post('/new', async (req, res) => {
    const {userId, cost, description, category} = req.body;

    try {
        const newExpense = await Expense.create({
            userId,
            cost,
            description,
            category
        });
        return res.json(newExpense);
    } catch (error) {
        console.error(error)
        return res
            .status(400)
            .json({error: "Error with creating a new expense."})
    }
})

router.put('/edit', async (req, res) => {
    const {id, cost, description, category, userId} = req.body;
    const expense = await Expense.findByPk(id);

    try{
        await expense.update({
            cost,
            description,
            category,
            userId
        })
        return res.json(expense);
    } catch (error) {
        return console.error(error);
    }
})

router.delete('/delete', async (req, res) => {
    const {expenseId} = req.body;
    console.log(expenseId)
    const deleteExpense = await Expense.findByPk(expenseId);

    try{
        await deleteExpense.destroy();
        return res.json("Expense deleted.")
    } catch (error) {
        return console.error(error);
    }
})

module.exports = router;
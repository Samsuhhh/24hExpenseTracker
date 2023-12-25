const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const { User, Expense } = require('../../db/models');

// routes start with /users

// get all users with associated totalCost
router.get('/all', async (req, res) => {
    try {
        const users = await User.findAll({
          attributes: [
            'id',
            'firstName',
            'lastName',
            [Sequelize.fn('SUM', Sequelize.col("Expenses.cost")), 'totalExpense'],
          ],
          include: [
            {
              model: Expense,
              attributes: [],
            },
          ],
          group: ["User.id"], // Group by User.id to calculate sum per user
          order: [["createdAt", "ASC"]]
        });
    
        return res.json(users);
      } catch (error) {
        console.error('Error in fetching users with total expense:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
})

router.post('/new', async (req, res) => {
    const {firstName, lastName} = req.body;

    try {
        const newUser = await User.create({
            firstName,
            lastName
        });
        return res.json(newUser);
    } catch (error) {
        console.error(error)
        return res
            .status(400)
            .json({error: "Error with creating a new user."})
    }
})

router.put('/edit', async (req, res) => {
    const {firstName, lastName, id} = req.body;
    const user = await User.findByPk(id);

    try{
        await user.update({
            firstName,
            lastName
        })
        return res.json(user);
    } catch (error) {
        return console.error(error);
        
    }
})

router.delete('/delete', async (req, res) => {
    const {userId} = req.body;
    const deleteUser = await User.findByPk(userId);

    try{
        await deleteUser.destroy();
        return res.json("User Deleted");
    } catch (error) {
        return console.error(error);
        
    }
})



module.exports = router;
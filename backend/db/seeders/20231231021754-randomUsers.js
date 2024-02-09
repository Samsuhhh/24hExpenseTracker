'use strict';

const random = require('../../random');
const db = require('../models');

// Function to generate random user data as Sequelize instances
async function generateRandomUser() {
    const firstName = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Hannah'];
    const lastName = ['Kim', 'Suh', 'Park', 'Smith', 'Shaw']
    const randomFirst = firstName[Math.floor(Math.random() * firstName.length)];
    const randomLast = lastName[Math.floor(Math.random() * lastName.length)];
  
    try {
      const user = await db.User.create({
        firstName: randomFirst,
        lastName: randomLast, 
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
}

async function generateRandomExpenses(user) {
    const categories = ['Meals', 'Travel', 'Software'];
    const numExpenses = Math.floor(Math.random() * 5) + 3; // Random number of expenses between 3 and 7 for passed in user
  
    try {
      const expenses = [];
      for (let i = 0; i < numExpenses; i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const amount = Math.floor(Math.random() * 1000) + 100; // Random amount between 100 and 1100
        const newExpense = await db.Expense.create({
          userId: user.id,
          category: randomCategory,
          description: `Random ${randomCategory} expense`,
          cost: amount,
        });
        expenses.push(newExpense);
      }
      return expenses;
    } catch (error) {
      console.error('Error creating expenses:', error);
      throw error;
    }
}

// Generate random users and their corresponding expenses and save to the database
async function generateRandomData(numUsers) {
    try {
      const users = [];
      for (let i = 0; i < numUsers; i++) {
        const user = await generateRandomUser();
        const userExpenses = await generateRandomExpenses(user);
        users.push({
          user,
          expenses: userExpenses,
        });
      }
      return users;
    } catch (error) {
      console.error('Error generating random data:', error);
      throw error;
    }
}
  
let randomData;


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      randomData = await generateRandomData(5); // Change the number as per your desired count
      console.log('Random data seeding completed!');
      return randomData;
    } catch (error) {
      console.error('Error seeding data:', error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    try {
      // Ensure you have received the generated data as an argument in the down function
      if (!generatedData) {
        console.log('No generated data available to revert.');
        return;
      }

      for (const userData of randomData) {
        const user = userData.user;

        // Delete expenses associated with the user
        await db.Expense.destroy({ where: { userId: user.id } });

        // Delete the user
        await db.User.destroy({ where: { id: user.id } });
      }

      console.log('Seed data deleted successfully!');
    } catch (error) {
      console.error('Error deleting seed data:', error);
      throw error;
    }
  }
};

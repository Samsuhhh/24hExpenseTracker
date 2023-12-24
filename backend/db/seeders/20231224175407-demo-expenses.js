'use strict';

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
     * 
    */
    return queryInterface.bulkInsert('Expenses', [
      {
        category: 'Meals',
        description: 'This was a company lunch which was approved by Jason Kim.',
        cost: 29.50,
        userId: 1
      },
      {
        category: 'Travel',
        description: 'This was a work trip which was approved by Kelvin.',
        cost: 449.25,
        userId: 2
      },
      {
        category: 'Travel',
        description: 'I hope you do not notice this trip on the company card. ',
        cost: 769.75,
        userId: 2
      },
      {
        category: 'Software',
        description: 'Bought a new laptop for this but it was worth it',
        cost: 1000.95,
        userId: 1
      },
      {
        category: 'Meals',
        description: 'This was a company lunch which was really good.',
        cost: 19.50,
        userId: 3
      },
      {
        category: 'Software',
        description: 'We hired LeanData for their SaaS platform.',
        cost: 2039.50,
        userId: 3
      },
      {
        category: 'Meals',
        description: 'This was a company lunch which was really good.',
        cost: 39.50,
        userId: 4
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Expenses', null, {});
  }
};

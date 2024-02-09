

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Run the logic to generate random data and seed the database
    try {
      await generateRandomData(5); // Change the number as per your desired count
      console.log('Random data seeding completed!');
    } catch (error) {
      console.error('Error seeding data:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Logic for reverting the seed (if required)
    // This might involve deleting the seeded data
    // Be cautious about irreversible actions in the 'down' function
    // Example: await db.User.destroy({ where: {} });
  }
};
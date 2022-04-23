

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'ApplicationForms',
    [
      {
        universityName: 'Gujrat University',
        educationDetail: 'MSC IT',
        companyName: 'XYZ Technologies',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        universityName: 'kite',
        educationDetail: 'Janee',
        companyName: 'PQR Tech Lab',
        language: 'Hindi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ApplicationForms', null, {}),
};

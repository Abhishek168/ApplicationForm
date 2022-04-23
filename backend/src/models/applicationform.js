module.exports = (sequelize, DataTypes) => {
  const ApplicationForm = sequelize.define(
    'ApplicationForm',
    {
      universityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      educationDetail: {
        type: DataTypes.STRING,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
      },
    },
  );
  ApplicationForm.associate = function (models) {
    // associations can be defined here
  };
  return ApplicationForm;
};

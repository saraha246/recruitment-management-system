'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Interview.belongsTo(models.Application, { foreignKey: 'applicationId' });
    }
  }
  Interview.init({
    applicationId: DataTypes.INTEGER,
    round: DataTypes.INTEGER,
    scheduledAt: DataTypes.DATE,
    feedback: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Interview',
  });
  return Interview;
};
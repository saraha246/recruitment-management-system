'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       User.hasMany(models.Application, { foreignKey: 'candidateId', as: 'applications' });
    }
  }
  User.init({
    userType: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },

    password: DataTypes.STRING,

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    emailOtp: {
        type: DataTypes.STRING,
        allowNull: true
    },

    otpExpires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fcmToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true,
  });
  return User;
};
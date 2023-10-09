const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    role: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [['admin', 'editor', 'writer', 'user']] } },
  });

  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  User.prototype.comparePassword = async function (candidatePassword) {
    try {
      const match = await bcrypt.compare(candidatePassword, this.password);
      return match;
    } catch (error) {
      throw error;
    }
  };

  return User;
};

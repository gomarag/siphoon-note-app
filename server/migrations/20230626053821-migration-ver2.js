'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      refresh_token: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      gender: {
        allowNull: true,
        defaultValue: '응답 하지 않음',
        type: Sequelize.STRING(55)
      },
      birthday: {
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      },
      region: {
        allowNull: true,
        type: Sequelize.STRING(45)
      },
      profile_image: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('essays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      is_deleted: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.TINYINT
      },
      is_public: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tag_name: {
        allowNull: false,
        type: Sequelize.STRING(45)
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('essays');
    await queryInterface.dropTable('tags');
  }
};

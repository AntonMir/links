'use strict';

const { extendQueryInterface } = require('../helpers/migrations.helper');

const tableName = 'links';
const indexes = [];
const constraints = {};

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes, Op } = Sequelize;

    queryInterface = extendQueryInterface(queryInterface);

    let transaction;

    try {
      transaction = await queryInterface.sequelize.transaction();
      let params = { transaction };

      await queryInterface.createTable(
        tableName,
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
          },
          hash: {
            type: DataTypes.STRING,
          },
          ip: {
            type: DataTypes.BIGINT,
          },
          created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('clock_timestamp'),
            allowNull: false,
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },
        },
        params,
      );

      await queryInterface.createAdditionalMeta({
        tableName,
        indexes,
        constraints,
        params,
        Op,
      });

      await transaction.commit();
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }

      throw e;
    }
  },

  down: async (queryInterface) => {
    queryInterface = extendQueryInterface(queryInterface);

    let transaction;

    try {
      transaction = await queryInterface.sequelize.transaction();
      let params = { transaction };

      await queryInterface.dropAdditionalMeta({
        tableName,
        indexes,
        constraints,
        params,
      });

      await queryInterface.dropTable(tableName, params);

      await transaction.commit();
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }

      throw e;
    }
  },
};

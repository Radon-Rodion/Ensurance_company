import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'databaseForTests', // Название БД
  'postgres', // Пользователь
  'password', // ПАРОЛЬ
  {
    dialect: 'postgres',
    host: 'localhost',
    port: +'5432',
  },
);

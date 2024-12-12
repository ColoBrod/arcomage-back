/** @var {string} env "production" || "development" */
const env = process.env.NODE_ENV;
if (!env) throw new Error("Не настроена переменная окружения NODE_ENV");
console.log(`NODE_ENV: ${env}`);

const environmentConfig = env === "production"
  ? require('./config-prod')
  : require('./config-dev');

/**
 * @property {Number} port  - Порт, на котором работает сервер
 * @property {Array} cors   - Список доменов, с которых принимать HTTP-запросы
 * @property {Object} mysql - Данные для подключения к базе данных
 */
const defaultConfig = {
  port: 3010,
};

const config = Object.assign(defaultConfig, environmentConfig);

module.exports = config;
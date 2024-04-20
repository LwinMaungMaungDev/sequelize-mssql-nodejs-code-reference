const db = require('./configs/db_config');

(async () => {
  try {
    await db.sequelize.sync({ force: true });
  } catch (e) {
    console.log(e);
  }
})();

const db = require('../utils/db');

const table = "anh_san_pham"

module.exports = {
  add(anh) {
    return db(table).insert(anh);
  },
};

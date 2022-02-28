const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaEmployee = new Schema({
  
  Hoten:        { type: String  },
  Phongban:     { type: String  },
  Gioitinh:     { type: String  },
  Ngaysinh:     { type: String  },
  Cmnd:         { type: String  },
  Ngaycap:      { type: String  },
  Noicap:       { type: String  },
  Quequan:      { type: String  },
  Email:        { type: String  },
  Dienthoai:    { type: String  },
  Avatar:       { type: String  },
  Username:     { type: String, unique: true  },  
  Password:     { type: String, required: true},
  Start:        { type: Date, default:Date.now },

});

module.exports = mongoose.model('Employee', schemaEmployee);
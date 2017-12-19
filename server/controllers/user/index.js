var users = require('../../models/users');
var _service = require('../../service');

module.exports = {
  addUser: async (req, res, next) => {
    var body = { code: '01', result: '' };
    try {
      var username = req.body.username;
      var password = req.body.password;
      var userModel = {
        username,
        password
      };
      var result = await _service.create(users, userModel);
      body.result = result;
    } catch (e) {
      body.code = '02';
      body.result = e.message;
    } finally {
      res.json(body);
    }
  },
  findUser: async (req, res, next) => {
    var body = { code: '01', result: '' };
    try {
      var username = req.body.username;
      var password = req.body.password;
      var user = await _service.findOne(users, { username });
      if (user) {
        if (user.password === password) {
          body.result = user;
        } else {
          body.code = '02';
          body.result = '密码输入有误';
        }
      } else {
        body.code = '02';
        body.result = '用户不存在,请先注册';
      }
    } catch (e) {
      body.code = '02';
      body.result = e.message;
    } finally {
      req.json(body);
    }
  },
  getUsers: async (req, res, next) => {
    var body = { code: '01', result: '' };
    try {
      var current = req.body.current_page || 1;
      var page_size = req.body.page_size || 10;
      var options = {
        current,
        page_size,
        find_con: {}
      };
      var result = await _service.findAndCountAll(users, options);
      body.result = result;
    } catch (e) {
      body.code = '02';
      body.result = e.message;
    } finally {
      req.json(body);
    }
  },
  destoryUser: async (req, res, next) => {
    var body = { code: '01', result: '' };
    try {
      var username = req.body.username;
      var options = {
        username
      };
      var result = await _service.deleteAll(users, options);
      body.result = result;
    } catch (e) {
      body.code = '02';
      body.result = e.message;
    } finally {
      req.json(body);
    }
  }
};

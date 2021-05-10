const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        massage: 'user not found',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Incorrect username or password',
      });
    }
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    });
  }
};

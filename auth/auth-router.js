const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secret");
const Users = require("../users/user-model");
const { isValid } = require("../users/user-service");

router.post("/register", (req, res) => {
  const newUser = req.body;

  const rounds = process.env.BCRYPT_ROUNDS
    ? parseInt(process.env.BCRYPT_ROUNDS)
    : 10;
  const hash = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hash;

  Users.findBy({ username: newUser.username })
    .first()
    .then((e) => {
      if (e) {
        res.status(400).json({
          message: `Username of ${e.username} already exists, please register with a different username or login`,
        });
      } else {
        Users.findBy({ email: newUser.email })

          .first()
          .then((e) => {
            if (e) {
              res.status(400).json({
                message: `Email of ${e.email} already exists, please register with a different email or login`,
              });
            } else {
              if (isValid(newUser)) {
                Users.add(newUser)
                  .then((saved) => {
                    res.status(201).json(saved);
                  })
                  .catch((error) => {
                    res.status(500).json(error.message);
                  });
              } else {
                res
                  .status(400)
                  .json({ message: "Username, email, or password missing or are of invalid type" });
              }
            }
          });
      }
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (isValid(req.body)) {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      } else {
        res.status(400).json({ message: "Username or password are missing or invalid types" });
      }
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    lat: Date.now(),
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}
module.exports = router;

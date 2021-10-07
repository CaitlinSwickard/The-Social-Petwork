const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");
// const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

function genToken(user){
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
    }, 
    process.env.SECRET_KEY, 
    { expiresIn: "24h"}
  );
}

module.exports = {
  Mutation: {
    async register(
      _, 
      { 
        registerInput: { username, email, password, confirmPassword } 
      }
      ) {

        const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);

        if(!valid){
          throw new UserInputError("Errors", { errors });
        }

        const user = await User.findOne({ username });
        if (user){
          throw new UserInputError("Username is taken.", {
            errors: {
              username: "This username is taken."
            }
          })
        }

        password = await bcrypt.hash(password, 12);

        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString()
        });

        const res = await newUser.save();

        const token = genToken(res);

        return {
          ...res._doc,
          id: res._id,
          token
        }
    },
    
    async login(_, { username, password }){
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = genToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
  }
}
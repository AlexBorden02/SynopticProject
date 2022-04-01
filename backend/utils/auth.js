const jwt = require("jsonwebtoken");
exports.createJWT = (name, userId, duration) => {
   const payload = {
      name,
      userId,
      duration
   };
   return jwt.sign(payload, "vufB7CYWnVJUt6TQ2Me3RjnDuJPyR4ZRtX8bBD7YYqYFTTNvmjLtCCDr32BX", {
     expiresIn: duration,
   });
};
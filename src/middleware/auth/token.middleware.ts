import jwt from "jsonwebtoken";
import * as httpStatus from "http-status";
import AuthenticationError from "../../errors/AuthenticationError";

const secret = process.env.APP_SECRET_KEY;

const verifyToken = {
  verify(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AuthenticationError()
      }
  
      const authToken = token.split(" ")[1];
  
      jwt.verify(authToken, secret, (err, decoded) => {
        if (err) {
          throw new AuthenticationError()
        }
  
        req.id = decoded.id;
        req.role = decoded.role;
        return next();
      });
    } catch (err) {
      next(err)
    }
    
  },
};

export default verifyToken;

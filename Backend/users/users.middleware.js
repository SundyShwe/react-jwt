import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  try {
    let error = new Error();

    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const user = jwt.verify(token, "SUNDYMOONGOLD", (err, user) => {
          if (err) {
            error.message = "Invalid Token";
            error.status = 400;
            throw error;
          } else {
            req.user = user;
            next();
          }
        });
      } else {
        error.message = "No Token";
        error.status = 403;
        throw error;
      }
    } else {
      error.message = "No Authorization";
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

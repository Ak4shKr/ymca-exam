import jwt from "jsonwebtoken";

//middleware to check if the token is valid
export const authToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(403)
          .send({ success: false, message: "Failed to authenticate user." });
      } else {
        req.user = decoded;
        console.log(decoded);
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: "Please LogIN." });
  }
};

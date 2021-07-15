const isAuthenticated = (req, res, next) => {
  try {
    // Check if a token was sent
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");

      // Check if the token is the right one
      if (token === process.env.TOKEN) {
        return next();
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(400).json({ error: "No token was provided" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = isAuthenticated;

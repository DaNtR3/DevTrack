const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res) => {
  const token = req.cookies.token; // Get the token from the HTTP-only cookie

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    // Send the response including roleID
    res.json({
      success: true,
      user: {
        id: decoded.id,
        roleID: decoded.roleID, // Include roleID from the token payload
        iat: decoded.iat,
        exp: decoded.exp,
      },
    });
  } catch (err) {
    console.error("Token verification error:", err);
    res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
      });
  }
};

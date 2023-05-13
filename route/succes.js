import express from "express";
const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ msg: "successful", user: req.user });
  } else {
    res.send("no user");
  }
});

export default router;

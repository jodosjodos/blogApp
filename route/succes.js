import express from "express";
const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    const email = req.user.emails[0].value;
    const familyName = req.user.name.familyName;
    const password=process.env.DEFAULT_PASSWORD

 return   res.status(200).json({ msg: "successful", user:{email,familyName,password}});

  } else {
 return   res.send("no user");
  }
});

export default router;

import express from "express";
const router = express.Router();

function authChecker(req, res, next) {
  if (true) {
      next();
  } else {
      res.send("not valid");
  }
}

router.get("/dashboard", authChecker, function (req, res) {
  return res.json({secretInformation: "only authorized users should see"});
});

export default router;

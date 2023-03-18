const { Router } = require("express");
const router = Router();
const {
  renderUserLogout,
  getLogout,
  signup,
  failregister,
  loginForm,
  login,
  faillogin,
  checkSession,
  renderSignUpForm,
} = require("../controllers/authControllers.js");


router.get("/auth/signup", renderSignUpForm);
router.post("/auth/signup", signup);
router.get("/auth/register-error", failregister)
router.get("/auth/login", loginForm);
router.post("/auth/login", login);
router.get("/auth/login-error", faillogin)
router.post("/auth/logout", renderUserLogout);
router.get("/auth/logout", getLogout);
router.post("/auth/checkSession", checkSession);

module.exports = router;

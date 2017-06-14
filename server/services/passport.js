import passport from "passport";
import signinStrategy from "./signin";
import authStrategy from "./authentication";

passport.use("signinStrategy", signinStrategy);
passport.use("authStrategy", authStrategy);

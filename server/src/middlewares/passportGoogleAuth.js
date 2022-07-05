const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALL_BACK,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      //Check if user with same email or id exists in DB if not create one and save in DB
      //const token = generateToken()
      const userProfile = profile._json;

      const user = {
        email: userProfile.email,
        firstName: userProfile.name.split(" ")[0],
        lastName: userProfile.name.split(" ")[1],
        password: "qazwsx",
        profileId: profile.id,
      };
      // Now token and user are ready store them in DB
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  if (user) return done(null, user);
  else return done(null, false);
});

passport.deserializeUser((user, done) => {
  if (user) return done(null, user);
  else return done(null, false);
});

module.exports = passport;

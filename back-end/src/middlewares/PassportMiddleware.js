const passport = require('passport');
const User = require('../models/UserModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: '/auth/google/callback', // Change this callback URL accordingly
        },
        async (accessToken, refreshToken, profile, done) => {
            // Store user data in the session or database as needed
            // console.log("profile", profile)
            // console.log("accessToken", accessToken)
            // console.log("refreshToken", refreshToken)
            // if (profile?.id) {
            //     const user = await User.findOne({
            //         email: profile?.emails[0].value
            //     })
            //     console.log("user", user)
            //     if (!user) {
            //         const createUser = await User.create({
            //             googleId: profile.id,
            //             email: profile.emails[0].value,
            //             image: profile.photos[0].value,
            //         })
            //     }
            //     console.log("accessToken", accessToken)
            // }
            return done(null, profile);
        }
    )
);
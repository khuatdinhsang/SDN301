const express = require('express')
const router = express.Router()
// login with google 
const session = require('express-session');
const passport = require('passport');
const User = require('../models/UserModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AccountController = require('../controllers/AccountController')
const passportMiddleware = require('../middlewares/PassportMiddleware')

// Initialize session middleware
router.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialize Passport
router.use(passport.initialize());
router.use(passport.session());

// Configure Google OAuth2.0 Strategy
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
//             callbackURL: '/auth/google/callback', // Change this callback URL accordingly
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             // Store user data in the session or database as needed
//             // console.log("profile", profile)
//             // console.log("accessToken", accessToken)
//             // console.log("refreshToken", refreshToken)
//             // if (profile?.id) {
//             //     const user = await User.findOne({
//             //         email: profile?.emails[0].value
//             //     })
//             //     console.log("user", user)
//             //     if (!user) {
//             //         const createUser = await User.create({
//             //             googleId: profile.id,
//             //             email: profile.emails[0].value,
//             //             image: profile.photos[0].value,
//             //         })
//             //     }
//             //     console.log("accessToken", accessToken)
//             // }
//             return done(null, profile);
//         }
//     )
// );
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Create an authentication route
router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.post(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
    AccountController.loginGoogle
);
// Callback route after Google login
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/', // Redirect to profile page on successful login
        failureRedirect: '/404', // Redirect to home page on failure
    })
    // passport.authenticate('google', (req, res) => {
    //     return res.json({
    //         status: 'OK',
    //         message: 'SUCCESS'
    //     })
    // })
);
module.exports = router

const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const monthMap = {
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11
};

const test = (req, res) => {
    res.json('test is working');
}

// Registering user is divided to several steps, as is the UI.
// First step is to add a unique email, 
// and set a time limit for recieving the rest of the user information
const registerUser1 = async (req, res) => {
    try {
        console.log('register1 enters...');
        const { email } = req.body;

        // Check if email is valid
        const valid = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!valid) {
            return res.json({
                error: 'invalid email'
            });
        }

        const exists = await User.findOne({ email: email });
        if (exists) {
            return res.json({
                error: 'User already registered'
            });
        }

        const user = User.create({
            email: email
        })
        res.json('valid');

        console.log('register1 exits...');
        return new Promise((resolve) => {
            setTimeout(async () => {
                console.log('nooo1');
                const updatedUser = await User.findOne({ email: email });
                if (!updatedUser.verified) {
                    console.log('nooo2');
                    User.deleteOne({ email: email })
                        .then(result => {
                            if (result.deletedCount > 0) {
                                console.log('User deleted successfully');
                            } else {
                                console.log('User not found');
                            }
                            resolve("Action completed");
                        })
                        .catch(error => {
                            console.error('Error deleting user:', error);
                            resolve("Action completed");
                        });
                } else {
                    resolve("Action completed");
                }
            }, 100000);
        });
    } catch (error) {
        console.error('Error assigning email:', error);
    }
}

// Adding the first and last name of the User
const registerUser2 = async (req, res) => {
    try {
        console.log('register2 enters...');
        const { email, first_name, last_name } = req.body;

        if (!first_name || !last_name) {
            return res.json({
                error: 'All fields are necessary'
            });
        }

        const user = await User.findOne({ email: email });
        user.first_name = first_name;
        user.last_name = last_name;
        await user.save();
        res.json('valid');

        console.log('register2 exits...');
    } catch (error) {
        console.error('Error assigning name:', error);
    }
}

// Checking and adding the user's password
const registerUser3 = async (req, res) => {
    try {
        console.log('register3 enters...');
        const { email, password, confirm_password } = req.body;

        if (!password || !confirm_password) {
            return res.json({
                error: 'All fields are necessary'
            });
        } else if (password !== confirm_password) {
            return res.json({
                error: `Passwords don't match`
            });
        }

        const user = await User.findOne({ email: email });
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        await user.save();
        res.json('valid');

        console.log('register3 exits...');
    } catch (error) {
        console.error('Error assigning password:', error);
    }
}

// Adding the user's date of birth
const registerUser4 = async (req, res) => {
    try {
        console.log('register4 enters...');
        const { email, year, month, day } = req.body;

        const user = await User.findOne({ email: email });
        user.date_of_birth = new Date(year, monthMap[month], day);

        const min = 100000;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        user.verification_code = String(randomNumber);
        await user.save();
        res.json('valid');

        console.log('register4 exits...');
    } catch (error) {
        console.error('Error assigning birth date:', error);
    }
}

// Verifying the user using verification code
const registerUser5 = async (req, res) => {
    try {
        console.log('register5 enters...');
        const { email, verification_code } = req.body;

        const user = await User.findOne({ email: email });;
        if (verification_code !== user.verification_code) {
            return res.json({
                error: 'Wrong verification code!'
            })
        }
        user.verified = true;

        await user.save();
        res.json('valid');

        console.log('register5 exits...');
    } catch (error) {
        console.error('Error verifying user:', error);
    }
}

const signinUser = async (req, res) => {
    try {
        console.log("Signing in enters...");
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                error: 'Incorrect password or email'
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
                error: 'Incorrect password or email'
            });
        }

        user.logged_in = true;
        await user.save();
        jwt.sign({
            email: user.email, first_name: user.first_name,
            last_name: user.last_name, role: user.role
        }, process.env.JWT_SECRET, {},
            (err, token) => {
                if (err) throw err
                res.cookie('token', token).json(user);
            })
        console.log("Signing in exits...");
    } catch (error) {
        console.error('Error signing in the user:', error);
    }
}

const getProfile = (req, res) => {
    const { token } = req.cookies;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err
            res.json(user);
        })
    } else {
        res.json(null);
    }
}

const addUser = async (req, res) => {
    try {
        console.log('Add User enters...');
        const { first_name, last_name, email, password, year, month, day, verification_code,
        verified, role } = req.body;
        const hashedPassword = await hashPassword(password);
        date_of_birth = new Date(year, monthMap[month], day);

        const user = User.create({
            first_name, last_name, email, password: hashedPassword,
            date_of_birth, verification_code, verified, role
        });

        res.json('User added successfuly');
        console.log('Add User exits...');
    } catch (error) {
        console.error('Error adding employee:', error);
    }
}

module.exports = {
    test,
    registerUser1,
    registerUser2,
    registerUser3,
    registerUser4,
    registerUser5,
    signinUser,
    getProfile,
    addUser,
}
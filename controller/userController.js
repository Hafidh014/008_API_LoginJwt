const db = require('../models');
const bcrypt = require('bcrypt');

const user = db.User;

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password wajib di isi'
            });
        }

        const existingUser = await user.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email sudah terdaftar'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.User.create({
            email,
            password: hashedPassword
        });

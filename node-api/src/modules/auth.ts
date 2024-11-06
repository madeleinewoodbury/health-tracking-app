import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const createJWT = (user) => {
	// Create a JWT token
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	)
	return token
}

// Compare the password with the hashed password
export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash)
}

// Hash the password
export const hashPassword = (password) => {
	// Hash the password with a salt of 10
	return bcrypt.hash(password, 10)
}

interface AuthContextType {
	register: (formData: RegisterFormData) => void
	user: User | null
	isAuthenticated: boolean
}

export interface User {
	username: string
	email: string
	role: 'USER' | 'PROVIDER' | 'ADMIN'
	age: number
	gender: 'MALE' | 'FEMALE' | 'OTHER'
	nationality: {
		name: string
		code: string
	}
	createdAt: Date
	updatedAt: Date
}

export interface RegisterCredentials {
	username: string
	email: string
	password: string
	age: number
	gender: 'MALE' | 'FEMALE' | 'OTHER'
	nationality: string
}

export interface AuthResponse {
	token: string
	user: User
}

interface RegisterFormData {
	username: string
	email: string
	password: string
	// passwordConfirmation: string
	age: number
	gender: 'MALE' | 'FEMALE' | 'OTHER'
	nationality: string
}

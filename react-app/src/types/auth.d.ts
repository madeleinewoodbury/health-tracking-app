export interface AuthContextType {
	register: (formData: RegisterFormData) => void
	login: (formData: LoginFormData) => void
	logout: () => void
	user: User | null
	isAuthenticated: boolean
}
export interface User {
	username: string
	email: string
	role: 'USER' | 'PROVIDER' | 'ADMIN'
	age: number
	gender: 'MALE' | 'FEMALE' | 'OTHER'
	country: {
		name: string
		alpha2: string
	}
	createdAt: Date
	updatedAt: Date
}

export interface AuthResponse {
	token: string
	user: User
}
export interface RegisterFormData {
	username: string
	email: string
	password: string
	age: number
	gender: 'MALE' | 'FEMALE' | 'OTHER'
	nationality: string
}

export interface LoginFormData {
	identifier: string
	password: string
}

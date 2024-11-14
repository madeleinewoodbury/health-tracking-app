import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
	fullWidth?: boolean
	variant?: 'primary' | 'secondary' | 'danger' | 'success'
}

const Button: React.FC<ButtonProps> = ({
	children,
	className = '',
	fullWidth = false,
	variant = 'primary',
	...props
}) => {
	const baseClasses =
		'py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200'
	const variantClasses = {
		primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
		secondary:
			'text-neutral-100 bg-neutral-950 hover:bg-neutral-900 focus:ring-neutral-600',
		danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
		success: 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
	}

	return (
		<button
			className={clsx(
				baseClasses,
				variantClasses[variant],
				fullWidth && 'w-full',
				className
			)}
			{...props}>
			{children}
		</button>
	)
}

export default Button

interface FormInputProps {
	label?: string
	type: string
	value: string
	name?: string
	placeholder?: string
	required?: boolean
	textDark?: boolean
	textArea?: boolean
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput: React.FC<FormInputProps> = ({
	label = '',
	type,
	value,
	placeholder = '',
	required = false,
	textDark = false,
	onChange,
}) => {
	return (
		<div className='flex flex-col'>
			<label
				className={`block text-sm font-medium ${
					textDark ? 'text-gray-800' : 'text-gray-200'
				}`}>
				{label}
			</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				className='w-full px-3 py-2 bg-neutral-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
			/>
		</div>
	)
}
export default FormInput

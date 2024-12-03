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

/**
 * FormInput component is a reusable input field component
 * @param label - label for the input field
 * @param type - type of the input field
 * @param value - value of the input field
 * @param placeholder - placeholder for the input field
 * @param required - if the input field is required
 * @param textDark - if the text color is dark
 * @param onChange - function to handle the change event
 */
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

interface FormTextAreaProps {
	label: string
	value: string
	placeholder?: string
	required?: boolean
	textDark?: boolean
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
	label,
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
			<textarea
				className='mt-1 block w-full rounded-md bg-neutral-100 border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
				value={value}
				placeholder={placeholder}
				required={required}
				onChange={onChange}
				rows={4}
			/>
		</div>
	)
}
export default FormTextArea
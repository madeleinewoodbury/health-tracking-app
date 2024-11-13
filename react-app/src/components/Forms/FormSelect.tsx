interface FormSelectProps {
	label: string
	value: string
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
	options: { value: string; label: string }[]
}

const FormSelect: React.FC<FormSelectProps> = ({
	label,
	value,
	onChange,
	options,
}) => {
	return (
		<div className='space-y-1'>
			<label className='block text-sm font-medium text-gray-200'>{label}</label>
			<select
				value={value}
				onChange={onChange}
				required
				className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}
export default FormSelect

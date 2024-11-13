import React from 'react'

interface FormInputProps {
	label: string
	type: string
	value: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput: React.FC<FormInputProps> = ({
	label,
	type,
	value,
	onChange,
}) => {
	return (
		<div className='space-y-1'>
			<label className='block text-sm font-medium text-gray-200'>{label}</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				required
				className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
			/>
		</div>
	)
}
export default FormInput

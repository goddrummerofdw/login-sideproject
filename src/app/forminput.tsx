import React from 'react'
const inputStyle = "w-full h-14 text-black text-xl rounded-md pl-12 mt-8"
interface FormInputProps {
    type: string;
    placeholder: string;
    id: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<any>) => void;
}
const FormInput = ({ type, placeholder, id, name, value, onChange }: FormInputProps) => {
    return (
        <input className={inputStyle} type={type} placeholder={placeholder} onChange={onChange} id={id} name={name} value={value} required />
    )
}
export default FormInput
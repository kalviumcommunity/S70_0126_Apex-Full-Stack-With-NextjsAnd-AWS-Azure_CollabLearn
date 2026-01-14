import React from 'react'

type FormInputProps = {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  hint?: string
}

export function FormInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
  hint,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={disabled}
      />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  )
}

type ErrorAlertProps = {
  message: string
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-700 text-sm">{message}</p>
    </div>
  )
}

type SubmitButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
}

export function SubmitButton({ children, disabled, loading }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
    >
      {children}
    </button>
  )
}

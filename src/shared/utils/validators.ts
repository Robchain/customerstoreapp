export interface ValidationResult {
  isValid: boolean
  error?: string
}

export const validators = {
  email: (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return {
      isValid: emailRegex.test(email),
      error: emailRegex.test(email) ? undefined : 'El formato del email no es válido'
    }
  },

  password: (password: string): ValidationResult => {
    const isValid = password && password.length >= 6
    return {
      isValid,
      error: isValid ? undefined : 'La contraseña debe tener al menos 6 caracteres'
    }
  },

  required: (value: string): ValidationResult => {
    const isValid = value && value.toString().trim().length > 0
    return {
      isValid,
      error: isValid ? undefined : 'Este campo es requerido'
    }
  }
}
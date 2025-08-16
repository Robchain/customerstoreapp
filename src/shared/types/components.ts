import { ReactNode } from 'react'

export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

export interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  error?: string
  helpText?: string
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  size?: 'sm' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'lg' | 'xl'
}

export interface AlertProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  dismissible?: boolean
  onDismiss?: () => void
}

export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  actions?: ReactNode
}

export interface NavbarProps {
  brand?: string
  user?: {
    name: string
    email: string
    rol: string
  }
  onLogout?: () => void
}
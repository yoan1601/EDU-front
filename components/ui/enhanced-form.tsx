import React from 'react';
import { useForm, UseFormReturn, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { cn } from './utils';
import { Input, Label } from './input-modern';
import { Button } from './button-modern';

// Enhanced Form wrapper with React Hook Form
export interface EnhancedFormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  onSubmit: (data: T) => void | Promise<void>;
  children: (form: UseFormReturn<T>) => React.ReactNode;
  defaultValues?: Partial<T>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
}

function EnhancedForm<T extends FieldValues>({ 
  onSubmit, 
  children, 
  defaultValues,
  mode = 'onBlur',
  className,
  ...props 
}: EnhancedFormProps<T>) {
  const form = useForm<T>({
    defaultValues: defaultValues as any,
    mode,
  });

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form 
      onSubmit={form.handleSubmit(handleSubmit as any)} 
      className={cn('space-y-6', className)}
      {...props}
    >
      {children(form as any)}
    </form>
  );
}

// Controlled form field component
export interface ControlledFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  hint?: string;
  rules?: RegisterOptions<T>;
  children: (field: {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    error?: string;
  }) => React.ReactNode;
}

function ControlledField<T extends FieldValues>({ 
  form, 
  name, 
  label, 
  required, 
  hint,
  rules,
  children 
}: ControlledFieldProps<T>) {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = form;

  const value = watch(name);
  const error = errors[name]?.message as string | undefined;

  const field = {
    ...register(name, rules),
    value,
    onChange: (newValue: any) => {
      setValue(name, newValue, { shouldValidate: true });
    },
    onBlur: async () => {
      await trigger(name);
    },
    error,
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      
      {children(field)}
      
      {(error || hint) && (
        <div className="text-xs">
          {error ? (
            <span className="text-error-500 flex items-center gap-1">
              {error}
            </span>
          ) : (
            <span className="text-neutral-500">{hint}</span>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-built form components
export interface TextFieldProps<T extends FieldValues> extends Omit<ControlledFieldProps<T>, 'children'> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function TextField<T extends FieldValues>({ 
  type = 'text',
  placeholder,
  leftIcon,
  rightIcon,
  ...props 
}: TextFieldProps<T>) {
  return (
    <ControlledField {...props}>
      {({ value, onChange, onBlur, error }) => (
        <Input
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          error={!!error}
        />
      )}
    </ControlledField>
  );
}

export interface SelectFieldProps<T extends FieldValues> extends Omit<ControlledFieldProps<T>, 'children'> {
  placeholder?: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

function SelectField<T extends FieldValues>({ 
  placeholder = 'Sélectionner...',
  options,
  ...props 
}: SelectFieldProps<T>) {
  return (
    <ControlledField {...props}>
      {({ value, onChange, onBlur, error }) => (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={cn(
            'flex h-10 w-full border px-3 py-2 text-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'rounded-lg',
            error ? 'border-error-300 focus:border-error-500' : 'border-neutral-200 hover:border-neutral-300 focus:border-brand-500'
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}
    </ControlledField>
  );
}

export interface CheckboxFieldProps<T extends FieldValues> extends Omit<ControlledFieldProps<T>, 'children' | 'label'> {
  label: string;
  description?: string;
}

function CheckboxField<T extends FieldValues>({ 
  label,
  description,
  ...props 
}: CheckboxFieldProps<T>) {
  return (
    <ControlledField {...props}>
      {({ value, onChange, onBlur }) => (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            className="mt-1 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
          />
          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700">
              {label}
            </label>
            {description && (
              <p className="text-xs text-neutral-500">{description}</p>
            )}
          </div>
        </div>
      )}
    </ControlledField>
  );
}

// Form section for grouping fields
export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  description, 
  children,
  className 
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-neutral-600">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// Form actions (submit, cancel, etc.)
export interface FormActionsProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center' | 'between';
  className?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  children, 
  align = 'right',
  className 
}) => {
  const alignClasses = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
  };

  return (
    <div className={cn(
      'flex items-center gap-3 pt-6 border-t border-neutral-200',
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  );
};

// Submit button with form state
export interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  children, 
  isLoading,
  disabled,
  variant = 'primary',
  size = 'md'
}) => {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      isLoading={isLoading}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export { 
  EnhancedForm, 
  ControlledField, 
  TextField, 
  SelectField, 
  CheckboxField,
  FormSection,
  FormActions,
  SubmitButton 
};
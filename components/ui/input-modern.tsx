import React from 'react';
import { cn } from './utils';
import { designTokens, variants } from './design-tokens';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftIcon, rightIcon, ...props }, ref) => {
    const hasIcons = leftIcon || rightIcon;
    
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            'flex h-10 w-full border px-3 py-2 text-sm ring-offset-background',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            designTokens.radii.input,
            error ? variants.input.error : variants.input.default,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Label component
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium text-neutral-700 leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-error-500 ml-1">*</span>}
    </label>
  )
);

Label.displayName = 'Label';

// Form field wrapper
export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, required, error, hint, children }, ref) => {
    // Safely get the id from children if it's a React element
    const childId = React.isValidElement(children) && typeof children.props === 'object' && children.props !== null 
      ? (children.props as any)?.id 
      : undefined;

    return (
      <div ref={ref} className="space-y-2">
        {label && (
          <Label required={required} htmlFor={childId}>
            {label}
          </Label>
        )}
        
        {children}
        
        {(error || hint) && (
          <div className="text-xs">
            {error ? (
              <span className="text-error-500">{error}</span>
            ) : (
              <span className="text-neutral-500">{hint}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { Input, Label, FormField };
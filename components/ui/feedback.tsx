import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X, RefreshCw } from 'lucide-react';
import { cn } from './utils';
import { Button } from './button-modern';

export type AlertVariant = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const alertIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const alertStyles = {
  success: 'bg-success-50 border-success-200 text-success-800',
  warning: 'bg-warning-50 border-warning-200 text-warning-800',
  error: 'bg-error-50 border-error-200 text-error-800',
  info: 'bg-brand-50 border-brand-200 text-brand-800',
};

const iconStyles = {
  success: 'text-success-600',
  warning: 'text-warning-600',
  error: 'text-error-600',
  info: 'text-brand-600',
};

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  dismissible,
  onDismiss,
  action,
  className,
}) => {
  const Icon = alertIcons[variant];

  return (
    <div
      className={cn(
        'p-4 border rounded-lg flex items-start gap-3',
        alertStyles[variant],
        className
      )}
      role="alert"
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconStyles[variant])} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="font-medium text-sm mb-1">{title}</h3>
        )}
        <p className="text-sm">{message}</p>
        
        {action && (
          <div className="mt-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={action.onClick}
              className="p-0 h-auto text-current hover:bg-current/10"
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>

      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 hover:bg-current/10 rounded transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export interface EmptyStateProps {
  icon?: React.ComponentType<any>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-6 text-center',
      className
    )}>
      {Icon && (
        <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-neutral-400" />
        </div>
      )}
      
      <h3 className="text-lg font-medium text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 max-w-md mb-6">{description}</p>
      
      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Une erreur est survenue',
  message,
  onRetry,
  className,
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-6 text-center',
      className
    )}>
      <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6 text-error-600" />
      </div>
      
      <h3 className="text-lg font-medium text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 max-w-md mb-6">{message}</p>
      
      {onRetry && (
        <Button
          variant="secondary"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Réessayer
        </Button>
      )}
    </div>
  );
};

export interface NotificationProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

// This would typically be used with a toast system like react-hot-toast or similar
const NotificationContent: React.FC<NotificationProps> = ({
  variant,
  title,
  message,
  onClose,
}) => {
  const Icon = alertIcons[variant];

  return (
    <div
      className={cn(
        'p-4 border rounded-lg shadow-strong bg-white flex items-start gap-3 min-w-[320px]',
        'border-neutral-200'
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconStyles[variant])} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-medium text-sm text-neutral-900 mb-1">{title}</h4>
        )}
        <p className="text-sm text-neutral-600">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-neutral-100 rounded transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4 text-neutral-400" />
        </button>
      )}
    </div>
  );
};

export { Alert, EmptyState, ErrorState, NotificationContent };
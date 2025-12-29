import React from 'react';
import { cn } from './utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Chargement..."
    />
  );
};

export interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Chargement en cours...', 
  size = 'md',
  className 
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center gap-4 py-8',
      className
    )}>
      <LoadingSpinner size={size} className="text-brand-600" />
      <p className="text-sm text-neutral-600 animate-pulse">{message}</p>
    </div>
  );
};

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 4 
}) => {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-neutral-200 rounded animate-pulse" />
        ))}
      </div>
      
      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={rowIndex} 
          className="grid gap-4 py-3 border-t border-neutral-200" 
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div 
              key={colIndex} 
              className="h-4 bg-neutral-100 rounded animate-pulse" 
              style={{ 
                width: Math.random() > 0.5 ? '100%' : `${60 + Math.random() * 40}%` 
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export interface CardSkeletonProps {
  className?: string;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => {
  return (
    <div className={cn(
      'bg-white border border-neutral-200 rounded-xl p-6 shadow-soft animate-pulse',
      className
    )}>
      <div className="space-y-4">
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="h-8 bg-neutral-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-neutral-100 rounded" />
          <div className="h-3 bg-neutral-100 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
};

export { LoadingSpinner, LoadingState, TableSkeleton, CardSkeleton };
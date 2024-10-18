// components/ui/Spinner.tsx
import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium' }) => {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  }[size];

  return (
    <div className={`border-t-2 border-blue-500 ${sizeClass} border-solid rounded-full animate-spin`} />
  );
};

export default Spinner;

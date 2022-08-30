import React from 'react';

type PlayButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export default function CustomButton(props: PlayButtonProps) {
  const { children, className, ...rest } = props;
  return (
    <button type="button" className={`action-button tra-300 ${className || ''}`} {...rest}>
      {children}
    </button>
  );
}

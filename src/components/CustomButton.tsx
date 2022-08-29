import React from 'react';

type PlayButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export default function CustomButton(props: PlayButtonProps) {
  const { children, className, ...rest } = props;
  return (
    <button className={`action-button tra-300 ${className || ''}`} type="button" {...rest}>
      {children}
    </button>
  );
}

import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, isValid = true, ...props }, ref) {
  

	return (
		<input {...props} ref={ref} className={cn(className, styles['input'],{
			[styles['invalid']]: !isValid
		})}/>
	);
});

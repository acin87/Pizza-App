import { InputProps } from './Input.props';

function Input({...props}: InputProps){
	return (
		<input {...props} />
	);
	
}
export default Input;
interface CustomButtonProps {
	displayText: string;
	onClickHandler?: () => void;
}

const CustomButton = ({ displayText, onClickHandler }: CustomButtonProps) => {
	return (
		<button
			onClick={onClickHandler}
			className="min-w-28 bg-primary dark:bg-primaryDark text-light dark:text-dark text-lg font-bold p-2 rounded-2xl hover:scale-105"
		>
			{displayText}
		</button>
	);
};

export default CustomButton;

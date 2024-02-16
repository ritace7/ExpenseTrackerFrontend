import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface CustomLabelProps {
	title: string;
	icon: IconProp;
	amount: number;
	setAmount: Dispatch<SetStateAction<number>>;
	isEditable: boolean;
}

const CustomLabel = ({
	title,
	icon,
	amount,
	setAmount,
	isEditable,
}: CustomLabelProps) => {
	return (
		<div className="w-1/2 flex items-center justify-between text-lg font-bold py-2 px-4 rounded-full bg-dark/75 text-light dark:bg-light/75 dark:text-dark lg:w-2/3 md:w-full my-2">
			<div className="flex items-center justify-center gap-2">
				<FontAwesomeIcon icon={icon} />
				<h4>{title}</h4>
			</div>
			<div className="flex items-center justify-end">
				$
				{isEditable ? (
					<input
						type="number"
						className="w-1/5 text-right bg-transparent border border-solid border-light dark:border-dark mx-1 rounded-md"
						value={amount}
						onChange={(e) => setAmount(parseInt(e.target.value))}
					/>
				) : (
					<>{amount}</>
				)}
				/ {isEditable ? <>Day</> : <>Week</>}
			</div>
		</div>
	);
};

export default CustomLabel;

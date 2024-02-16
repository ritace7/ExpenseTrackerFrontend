"use client";

import {
	Average,
	ButtonComponent,
	CustomLabel,
	DateComponent,
} from "@/components";
import {
	faBurger,
	faCoffee,
	faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import { ExpenseInterfaceProps } from "@/types";
import { useState } from "react";

const ExpenseInterface = ({
	editMode,
	setEditMode,
	expenseForCoffee,
	setExpenseForCoffee,
	expenseForFood,
	setExpenseForFood,
	expenseForAlcohol,
	setExpenseForAlcohol,
}: ExpenseInterfaceProps) => {
	const [defaultWeek, setDefaultWeek] = useState("");
	const [defaultDate, setDefaultDate] = useState("");

	return (
		<>
			<DateComponent
				editMode={editMode}
				setExpenseForCoffee={setExpenseForCoffee}
				setExpenseForFood={setExpenseForFood}
				setExpenseForAlcohol={setExpenseForAlcohol}
				defaultDate={defaultDate}
				setDefaultDate={setDefaultDate}
				defaultWeek={defaultWeek}
				setDefaultWeek={setDefaultWeek}
			/>
			<CustomLabel
				title="Coffee"
				icon={faCoffee}
				amount={expenseForCoffee}
				setAmount={setExpenseForCoffee}
				isEditable={editMode}
			/>
			{!editMode && <Average type="coffee" amount={expenseForCoffee} />}
			<CustomLabel
				title="Food"
				icon={faBurger}
				amount={expenseForFood}
				setAmount={setExpenseForFood}
				isEditable={editMode}
			/>
			{!editMode && <Average type="food" amount={expenseForFood} />}
			<CustomLabel
				title="Alcohol"
				icon={faWineGlass}
				amount={expenseForAlcohol}
				setAmount={setExpenseForAlcohol}
				isEditable={editMode}
			/>
			{!editMode && <Average type="alcohol" amount={expenseForAlcohol} />}
			<ButtonComponent
				editMode={editMode}
				setEditMode={setEditMode}
				defaultDate={defaultDate}
				expenseForCoffee={expenseForCoffee}
				expenseForFood={expenseForFood}
				expenseForAlcohol={expenseForAlcohol}
			/>
		</>
	);
};

export default ExpenseInterface;

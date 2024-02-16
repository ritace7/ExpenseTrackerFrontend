import { Dispatch, SetStateAction } from "react";

export type UserDataProps = {
	params: { id: string };
};

export type UserDataType = {
	user_id: number;
	date: Date;
	expense_type: string;
	amount: number;
};

export type ExpenseInterfaceProps = {
	editMode: boolean;
	setEditMode: Dispatch<SetStateAction<boolean>>;
	expenseForCoffee: number;
	setExpenseForCoffee: Dispatch<SetStateAction<number>>;
	expenseForFood: number;
	setExpenseForFood: Dispatch<SetStateAction<number>>;
	expenseForAlcohol: number;
	setExpenseForAlcohol: Dispatch<SetStateAction<number>>;
};

export type DateComponentProps = {
	editMode: boolean;
	setExpenseForCoffee: Dispatch<SetStateAction<number>>;
	setExpenseForFood: Dispatch<SetStateAction<number>>;
	setExpenseForAlcohol: Dispatch<SetStateAction<number>>;
	defaultDate: string;
	setDefaultDate: Dispatch<SetStateAction<string>>;
	defaultWeek: string;
	setDefaultWeek: Dispatch<SetStateAction<string>>;
};

export type ButtonComponentProps = {
	editMode: boolean;
	setEditMode: Dispatch<SetStateAction<boolean>>;
	defaultDate: string;
	expenseForCoffee: number;
	expenseForFood: number;
	expenseForAlcohol: number;
};

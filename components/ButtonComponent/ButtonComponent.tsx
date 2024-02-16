"use client";

import { ButtonComponentProps } from "@/types";
import { useDataContext } from "@/components/Context/store";
import { useEffect, useState } from "react";
import { CustomButton } from "..";

const ButtonComponent = ({
	editMode,
	setEditMode,
	defaultDate,
	expenseForCoffee,
	expenseForFood,
	expenseForAlcohol,
}: ButtonComponentProps) => {
	const { data, setData } = useDataContext();
	const [isAddMode, setIsAddMode] = useState(false);
	const [error, setError] = useState("");

	//refetch the data after updating the database
	const refetchData = async () => {
		try {
			const updatedData = await fetch(
				`https://expense-tracker-server-udn6.onrender.com/userData/${data[0].user_id}`
			);
			const jsonData = await updatedData.json();
			if (jsonData.length > 0) {
				setData(jsonData);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSubmit = async () => {
		setError("");

		if (
			expenseForCoffee === 0 &&
			expenseForAlcohol === 0 &&
			expenseForFood === 0
		) {
			setError("At least one expense required");
			return;
		}

		if (
			expenseForCoffee > 100 ||
			expenseForFood > 100 ||
			expenseForAlcohol > 100
		) {
			setError("Values must be between 1 and 100");
			return;
		}

		const handled = [];

		for (const expense of data) {
			const currentDate = new Date(expense.date);
			if (
				currentDate
					.toLocaleString()
					.split(",")[0]
					.split("/")
					.reverse()
					.join("-") === defaultDate
			) {
				if (expense.expense_type === "coffee" && expenseForCoffee) {
					handleUpdate("coffee", expenseForCoffee);
					handled.push("coffee");
				}

				if (expense.expense_type === "alcohol" && expenseForAlcohol) {
					handleUpdate("alcohol", expenseForAlcohol);
					handled.push("alcohol");
				}

				if (expense.expense_type === "food" && expenseForFood) {
					handleUpdate("food", expenseForFood);
					handled.push("food");
				}
			}
		}

		if (!handled.includes("coffee")) handleAdd("coffee", expenseForCoffee);
		if (!handled.includes("food")) handleAdd("food", expenseForFood);
		if (!handled.includes("alcohol")) handleAdd("alcohol", expenseForAlcohol);

		setError("");
		setEditMode(false);
	};

	//add to the db
	const handleAdd = async (type: string, expenseAmount: number) => {
		const userId = data[0].user_id;

		try {
			if (expenseAmount != 0) {
				const add = await fetch(
					"https://expense-tracker-server-udn6.onrender.com/addExpense",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							user_id: userId, //  user ID
							date: defaultDate, //  date
							expense_type: type, //  expense type
							amount: expenseAmount, //  amount
						}),
					}
				);

				// Check if request was successful
				if (!add.ok) {
					throw new Error("Failed to add expense.");
				}
				refetchData();
			}
		} catch (error) {
			setError("Error adding expense. Please try again.");
		}
	};

	//update changes to the expense
	const handleUpdate = async (type: string, expenseAmount: number) => {
		const userId = data[0].user_id;
		try {
			// Fetch API endpoint for updating expense
			const update = await fetch(
				"https://expense-tracker-server-udn6.onrender.com/updateExpense",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user_id: userId, //  user ID
						date: defaultDate, //  date
						expense_type: type, //  expense type
						amount: expenseAmount, //  amount
					}),
				}
			);

			// Check if request was successful
			if (!update.ok) {
				throw new Error("Failed to update expense.");
			}
			refetchData();
		} catch (error) {
			setError("Error updating expense. Please try again.");
		}
	};

	useEffect(() => {
		setError("");
	}, [defaultDate]);

	useEffect(() => {
		setIsAddMode(
			expenseForCoffee === 0 && expenseForFood === 0 && expenseForAlcohol === 0
		);
	}, [expenseForCoffee, expenseForFood, expenseForAlcohol]);

	//delete expense
	const handleDelete = async () => {
		if (!expenseForCoffee && !expenseForFood && !expenseForAlcohol) {
			setError("Cannot delete an empty record");
			return;
		}

		try {
			// Fetch API endpoint for deleting expense
			const response = await fetch(
				`https://expense-tracker-server-udn6.onrender.com/deleteExpense/${data[0].user_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						date: defaultDate,
					}),
				}
			);

			// Check if request was successful
			if (!response.ok) {
				throw new Error("Failed to delete expense.");
			}

			//refetch data
			refetchData();
			setError("");
			setEditMode(false);
		} catch (error) {
			setError("Expense not found. Please try again.");
		}
	};

	return (
		<>
			{editMode ? (
				<div className="w-1/2 flex flex-col items-center justify-evenly xl:w-2/3 md:w-full">
					{error && <p className="text-lg font-bold text-red-700">{error}</p>}
					<div className="w-1/2 flex items-center justify-evenly lg:w-2/3 md:w-full">
						<CustomButton displayText="Save" onClickHandler={handleSubmit} />
						<CustomButton displayText="Delete" onClickHandler={handleDelete} />
					</div>
				</div>
			) : isAddMode ? (
				<CustomButton
					displayText="Add Expense"
					onClickHandler={() => setEditMode(true)}
				/>
			) : (
				<CustomButton
					displayText="Edit Expense"
					onClickHandler={() => setEditMode(true)}
				/>
			)}
		</>
	);
};

export default ButtonComponent;

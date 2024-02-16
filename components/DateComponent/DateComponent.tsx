"use client";

import { useEffect, useState } from "react";
import { useDataContext } from "@/components/Context/store";
import { DateComponentProps } from "@/types";

const DateComponent = ({
	editMode,
	setExpenseForCoffee,
	setExpenseForFood,
	setExpenseForAlcohol,
	defaultDate,
	setDefaultDate,
	defaultWeek,
	setDefaultWeek,
}: DateComponentProps) => {
	const { data } = useDataContext();

	//set default date and week initially
	useEffect(() => {
		let lastDay = new Date(data[0].date);
		for (const expense of data) {
			const currentDate = new Date(expense.date);

			if (currentDate > lastDay) {
				lastDay = currentDate;
			}
		}

		setDefaultDate(
			lastDay.toLocaleString().split(",")[0].split("/").reverse().join("-")
		);

		// Calculate the Sunday of the week ending on lastDay
		const sunday = new Date(lastDay);
		sunday.setDate(sunday.getDate() - sunday.getDay()); // Go back to the previous Sunday

		// Format the date as "YYYY-W##"
		const year = sunday.getFullYear();
		const weekNumber = Math.ceil(
			(sunday.getTime() - new Date(year, 0, 1).getTime()) /
				(7 * 24 * 60 * 60 * 1000)
		);
		const lastWeek = `${year}-W${weekNumber.toString().padStart(2, "0")}`;

		setDefaultWeek(lastWeek);
	}, []);

	//set expense values for the labels based on the dates selected
	useEffect(() => {
		//reset
		setExpenseForCoffee(0);
		setExpenseForFood(0);
		setExpenseForAlcohol(0);

		//defaultWeek is in the format "YYYY-W##"
		const [defaultYear, defaultWeekNumber] = defaultWeek
			.split("-W")
			.map(Number);

		// Get the start and end dates of the default week
		const defaultWeekStart = new Date(
			Date.UTC(defaultYear, 0, (defaultWeekNumber - 1) * 7)
		);

		const defaultWeekEnd = new Date(
			defaultWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000
		); // Adding 7 days to get to the end of the week

		// Loop through data array and check each date
		for (const expense of data) {
			//edit mode
			if (editMode) {
				const currentDate = new Date(expense.date);
				const fomattedDate = currentDate
					.toLocaleString()
					.split(",")[0]
					.split("/")
					.reverse()
					.join("-");

				if (fomattedDate === defaultDate) {
					switch (expense.expense_type.toLowerCase()) {
						case "coffee":
							setExpenseForCoffee(expense.amount);
							break;
						case "food":
							setExpenseForFood(expense.amount);
							break;
						case "alcohol":
							setExpenseForAlcohol(expense.amount);
							break;
						default:
							return;
					}
				}
			} else {
				//view only mode
				const currentDate = new Date(expense.date);
				if (currentDate >= defaultWeekStart && currentDate <= defaultWeekEnd) {
					switch (expense.expense_type.toLowerCase()) {
						case "coffee":
							setExpenseForCoffee((prev) => prev + expense.amount);
							break;
						case "food":
							setExpenseForFood((prev) => prev + expense.amount);
							break;
						case "alcohol":
							setExpenseForAlcohol((prev) => prev + expense.amount);
							break;
						default:
							return;
					}
				}
			}
		}
	}, [editMode, defaultDate, defaultWeek, data]);

	return (
		<>
			{editMode ? (
				<input
					type="date"
					value={defaultDate}
					onChange={(e) => setDefaultDate(e.target.value)}
					className="rounded-full flex items-center justify-center p-2 bg-dark/75 text-light dark:bg-light/75 dark:text-dark"
				/>
			) : (
				<input
					type="week"
					value={defaultWeek}
					onChange={(e) => setDefaultWeek(e.target.value)}
					className="rounded-full flex items-center justify-center p-2 bg-dark/75 text-light dark:bg-light/75 dark:text-dark"
				/>
			)}
		</>
	);
};

export default DateComponent;

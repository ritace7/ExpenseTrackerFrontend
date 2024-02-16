"use client";

import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDataContext } from "../Context/store";
import { UserDataType } from "@/types";
import { useEffect, useState } from "react";

const Average = ({ type, amount }: { type: string; amount: number }) => {
	const { data } = useDataContext();
	const dates = data.map((expense: UserDataType) =>
		new Date(expense.date).getTime()
	);
	const earliestDate = new Date(Math.min(...dates));
	const latestDate = new Date(Math.max(...dates));

	//Calculate the number of weeks between the earliest and latest dates
	const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
	const numberOfWeeks = Math.ceil(
		(latestDate.getTime() - earliestDate.getTime()) / millisecondsInWeek
	);

	//object to store total spend for each expense type
	const totalSpendByType: Record<string, number> = {};

	//Iterate through the data and sum up the amounts for each expense type
	data.forEach((expense) => {
		const { expense_type, amount } = expense;
		if (!totalSpendByType[expense_type]) {
			totalSpendByType[expense_type] = 0;
		}
		totalSpendByType[expense_type] += amount;
	});

	const averageSpendForCoffee = totalSpendByType["coffee"] / numberOfWeeks;
	const averageSpendForFood = totalSpendByType["food"] / numberOfWeeks;
	const averageSpendForAlcohol = totalSpendByType["alcohol"] / numberOfWeeks;

	const [difference, setDifference] = useState<number>();
	const [isAboveAverage, setIsAboveAverage] = useState<boolean>();

	const calc = (averageSpend: number) => {
		if (amount > averageSpend) {
			setIsAboveAverage(true);
			setDifference(((amount - averageSpend) / averageSpend) * 100);
		} else {
			setIsAboveAverage(false);
			setDifference(((averageSpend - amount) / averageSpend) * 100);
		}
	};

	useEffect(() => {
		switch (type) {
			case "coffee":
				calc(averageSpendForCoffee);
				break;
			case "food":
				calc(averageSpendForFood);
				break;
			case "alcohol":
				calc(averageSpendForAlcohol);
				break;
		}
	}, [amount]);

	return (
		<div className="w-1/2 flex items-center justify-end text-md px-2 lg:w-2/3 md:w-full -mt-2">
			{isAboveAverage ? (
				<>
					<FontAwesomeIcon icon={faArrowUp} className=" text-red-500" />
					<p className="ml-1 text-red-500 italic">
						{" "}
						{difference && Math.ceil(difference)} % Above Your Average Weekly
						Spend
					</p>
				</>
			) : (
				<>
					<FontAwesomeIcon icon={faArrowDown} className=" text-green-500" />
					<p className="ml-1 text-green-500 italic">
						{" "}
						{difference && Math.ceil(difference)} % Below Your Average Weekly
						Spend
					</p>
				</>
			)}
		</div>
	);
};

export default Average;

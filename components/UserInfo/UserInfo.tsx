"use client";

import { CustomButton, DoughnutChart, ExpenseInterface } from "@/components";
import { UserDataProps } from "@/types";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserInfo = ({ params }: UserDataProps) => {
	const router = useRouter();
	const [editMode, setEditMode] = useState<boolean>(false);
	const [expenseForCoffee, setExpenseForCoffee] = useState<number>(0);
	const [expenseForFood, setExpenseForFood] = useState<number>(0);
	const [expenseForAlcohol, setExpenseForAlcohol] = useState<number>(0);

	useEffect(() => {}, [editMode]);

	return (
		<div className="w-full my-6 min-h-[65vh]">
			<div className="w-full flex items-center justify-between">
				<h3 className="text-lg">
					<span className="mr-2 font-semibold">UserID:</span>
					{params.id}
				</h3>
				{editMode ? (
					<CustomButton
						displayText="Back"
						onClickHandler={() => setEditMode(false)}
					/>
				) : (
					<CustomButton
						displayText="Exit"
						onClickHandler={() => router.push("/")}
					/>
				)}
			</div>

			<div className="my-5 flex flex-col items-center justify-between gap-2">
				<h3 className="text-lg">My Expenses</h3>
				<ExpenseInterface
					editMode={editMode}
					setEditMode={setEditMode}
					expenseForCoffee={expenseForCoffee}
					setExpenseForCoffee={setExpenseForCoffee}
					expenseForFood={expenseForFood}
					setExpenseForFood={setExpenseForFood}
					expenseForAlcohol={expenseForAlcohol}
					setExpenseForAlcohol={setExpenseForAlcohol}
				/>
			</div>

			{!editMode && (
				<div className="flex flex-col items-center">
					<h3 className="text-lg">Stats</h3>
					<DoughnutChart
						data={[expenseForCoffee, expenseForFood, expenseForAlcohol]}
					/>
				</div>
			)}
		</div>
	);
};

export default UserInfo;

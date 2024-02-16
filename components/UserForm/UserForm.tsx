"use client";
import { FormEvent, useState } from "react";
import { CustomButton, Logo } from "..";
import { useRouter } from "next/navigation";
import { useDataContext } from "../Context/store";

const UserForm = () => {
	const router = useRouter();
	const [userID, setUserID] = useState<string>("");
	const [error, setError] = useState<string>("");
	const { setData } = useDataContext();

	const fetchData = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`https://expense-tracker-server-udn6.onrender.com/userData/${userID}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const jsonData = await response.json();

			if (jsonData.length > 0) {
				setError("");
				router.push(`/UserData/${userID}`);
				setData(jsonData);
			} else {
				setData([]);
				setError("Invalid ID");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			setError("Error fetching data. Please try again.");
		}
	};

	return (
		<div className="w-1/2 h-1/2 p-6 mx-auto bg-dark text-light text-center rounded-3xl shadow-2xl shadow-slate-950 flex flex-col items-center justify-center md:w-[90vw]">
			<p className="text-2xl">
				Enter your User ID below and start tracking your expenses!
			</p>

			<form
				onSubmit={fetchData}
				className="w-1/2 h-1/2 flex flex-col items-center justify-center gap-5 sm:w-[80%]"
			>
				<input
					type="number"
					value={userID}
					onChange={(e) => setUserID(e.target.value)}
					required
					placeholder="User ID"
					className="w-full h-9 rounded-2xl text-center text-dark"
				/>
				<div className="flex items-center justify-center flex-col gap-1">
					<CustomButton displayText="Get Started" />
					{error && (
						<p className="text-lg font-bold text-red-700">Invalid ID</p>
					)}
				</div>
			</form>
		</div>
	);
};

export default UserForm;

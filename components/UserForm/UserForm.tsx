"use client";
import { FormEvent, useEffect, useState } from "react";
import { CustomButton, Logo } from "..";
import { useRouter } from "next/navigation";
import { useDataContext } from "../Context/store";

const UserForm = () => {
	const router = useRouter();
	const [userID, setUserID] = useState<string>("");
	const [error, setError] = useState<string>("");
	const { data, setData } = useDataContext();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"https://expense-tracker-server-udn6.onrender.com/userId"
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const jsonData = await response.json();

			if (jsonData.length > 0) {
				setError("");
				setData(jsonData);
			} else {
				setData([]);
				setError("Something went wrong. Please try again.");
			}
		} catch (error) {
			setError("Error fetching data. Please try again.");
		}
	};

	const login = async (e: FormEvent<HTMLFormElement>) => {
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
			setError("Error logging in. Please try again.");
		}
	};

	return (
		<div className="w-1/2 h-1/2 p-6 mx-auto bg-dark text-light text-center rounded-3xl shadow-2xl shadow-slate-950 flex flex-col items-center justify-center md:w-[90vw]">
			<p className="text-2xl">
				Select your User ID below and start tracking your expenses!
			</p>

			<form
				onSubmit={login}
				className="w-1/2 h-1/2 flex flex-col items-center justify-center gap-5 sm:w-[80%]"
			>
				<select
					value={userID}
					onChange={(e) => setUserID(e.target.value)}
					className="w-1/2 lg:w-2/3 md:w-1/2 h-9 rounded-2xl text-center text-dark"
					required
				>
					<option value="" disabled>
						User ID
					</option>
					{data &&
						data.map((user) => (
							<option key={user.user_id}>{user.user_id}</option>
						))}
				</select>

				<div className="flex items-center justify-center flex-col gap-1">
					<CustomButton displayText="Get Started" />
					{error && <p className="text-lg font-bold text-red-700">{error}</p>}
				</div>
			</form>
		</div>
	);
};

export default UserForm;

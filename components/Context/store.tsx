"use client";

import { UserDataType } from "@/types";
import {
	useContext,
	createContext,
	Dispatch,
	SetStateAction,
	useState,
	useEffect,
} from "react";

interface ContextProps {
	data: UserDataType[];
	setData: Dispatch<SetStateAction<UserDataType[]>>;
}

const defaultUserData: UserDataType[] = [];

const DataContext = createContext<ContextProps>({
	data: defaultUserData,
	setData: () => {},
});

export const DataContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [data, setData] = useState<UserDataType[]>(() => {
		// Load data from localStorage if available, otherwise use default
		if (typeof window !== "undefined") {
			const savedData = localStorage.getItem("userData");
			return savedData ? JSON.parse(savedData) : defaultUserData;
		}
		return defaultUserData;
	});

	useEffect(() => {
		// Save data to localStorage whenever it changes
		if (typeof window !== "undefined") {
			localStorage.setItem("userData", JSON.stringify(data));
		}
	}, [data]);

	return (
		<DataContext.Provider value={{ data, setData }}>
			{children}
		</DataContext.Provider>
	);
};

export const useDataContext = () => useContext(DataContext);

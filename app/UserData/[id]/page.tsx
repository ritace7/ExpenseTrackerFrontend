import { Footer, Header, UserInfo } from "@/components";
import { UserDataProps } from "@/types";

const UserDataPage = ({ params }: UserDataProps) => {
	return (
		<div className="w-full h-full px-20 py-4 md:px-8">
			<Header />
			<UserInfo params={params} />
			<Footer />
		</div>
	);
};

export default UserDataPage;

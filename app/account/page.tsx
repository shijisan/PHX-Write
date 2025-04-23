"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaUser, FaCog, FaPowerOff, FaBars } from "react-icons/fa";

export default function Account() {
	const router = useRouter();
	const { data: session } = useSession();
	const [tab, setTab] = useState<string>("info");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleTabChange = (newTab: string) => {
		setTab(newTab);
		setMobileMenuOpen(false);
	};

	const handleSignOut = async () => {
		await signOut({ redirect: false });
		router.push("/auth");
	};

	return (
		<>
			<main className="bg-neutral-950 w-full min-h-screen">
				<div className="min-h-screen w-screen hero-bg-3 flex justify-center items-center">
					<div className="flex flex-col md:flex-row max-w-6xl w-full gap-4 md:gap-8 min-h-96 z-10 relative p-4 md:p-0">
						{/* Mobile menu button */}
						<div className="md:hidden w-full bg-neutral-700 rounded-md p-4 flex justify-between items-center">
							<h2 className="text-xl font-bold">User {tab}</h2>
							<button 
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="p-2 bg-neutral-600 rounded-md"
							>
								<FaBars />
							</button>
						</div>

						{/* Sidebar */}
						<aside className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col bg-neutral-700 rounded-md py-4 md:py-8 md:w-3/12 w-full`}>
							<ul className="flex flex-col w-full">
								<li className="w-full">
									<button 
										onClick={() => handleTabChange("info")} 
										className={`px-6 py-3 w-full text-left ${tab === "info" ? "bg-neutral-600" : ""} hover:bg-neutral-600 transition-colors`}
									>
										<FaUser className="me-2 inline-flex" />
										Your Info
									</button>
								</li>
								<li className="w-full">
									<button 
										onClick={() => handleTabChange("options")} 
										className={`px-6 py-3 w-full text-left ${tab === "options" ? "bg-neutral-600" : ""} hover:bg-neutral-600 transition-colors`}
									>
										<FaCog className="me-2 inline-flex" />
										Account Options
									</button>
								</li>
								<li className="w-full">
									<button 
										onClick={handleSignOut} 
										className="px-6 py-3 w-full text-left hover:bg-neutral-600 transition-colors text-red-400"
									>
										<FaPowerOff className="me-2 inline-flex" />
										Log Out
									</button>
								</li>
							</ul>
						</aside>

						{/* Content area */}
						{tab === "info" ? (
							<section className="md:w-9/12 bg-neutral-700 rounded-md grow">
								<div>
									<h1 className="text-3xl poppins md:px-8 px-4 md:pt-8 pt-4">Your Account</h1>
								</div>
								<div className="flex flex-col space-y-4 md:px-8 px-4 py-4">
									<div>
										<h3 className="poppins text-sm mb-1">User Id</h3>
										<p className="ps-4 bg-foreground text-background py-2 rounded-sm">{session?.user.id}</p>
									</div>
									<div>
										<h3 className="poppins text-sm mb-1">Email</h3>
										<p className="ps-4 bg-foreground text-background py-2 rounded-sm">{session?.user.email}</p>
									</div>
									<div>
										<h3 className="poppins text-sm mb-1">Username</h3>
										<p className="ps-4 bg-foreground text-background py-2 rounded-sm">{session?.user.username}</p>
									</div>
									<div className="mt-4">
										<button className="bg-orange-500 w-full py-3 rounded-md hover:bg-orange-600 transition-colors" onClick={handleSignOut}>
											<FaPowerOff className="me-2 inline-flex" />
											Log Out
										</button>
									</div>
								</div>
							</section>
						) : tab === "options" ? (
							<section className="md:w-9/12 bg-neutral-700 rounded-md grow">
								<div className="md:p-8 p-4">
									<h1 className="text-3xl poppins mb-4">Account Options</h1>
									<p>You can delete your account here</p>
								</div>
							</section>
						) : (
							<section className="md:w-9/12 bg-neutral-700 rounded-md grow">
								<div className="md:p-8 p-4">
									<p>Select a tab to view...</p>
								</div>
							</section>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
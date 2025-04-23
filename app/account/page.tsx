"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaUser, FaCog, FaPowerOff } from "react-icons/fa";

export default function Account() {

	const router = useRouter();

	const { data: session } = useSession();

	const [tab, setTab] = useState<string>("info");

	return (
		<>
			<main className="bg-neutral-950 w-full min-h-screen">
				<div className="min-h-screen w-screen hero-bg-3 flex justify-center items-center">
					<div className="flex max-w-6xl w-full gap-8 min-h-96 z-10 relative">
						<aside className="md:w-3/12 bg-neutral-700 rounded-md md:py-8 py-4 grow">
							<ul className="flex flex-col items justify-center w-full">
								<li className="w-full">
									<button onClick={() => setTab("info")} className="px-0 w-full">
										<FaUser className="me-2 inline-flex" />
										Your Info
									</button>
								</li>
								<li className="w-full">
									<button onClick={() => setTab("options")} className="px-0 w-full">
										<FaCog className="me-2 inline-flex" />
										Account Options
									</button>
								</li>
								<li className="w-full">
									<button onClick={async () => { await signOut({ redirect: false }); router.push("/auth"); }} className="px-0 w-full">
										<FaPowerOff className="me-2 inline-flex" />
										Log Out
									</button>
								</li>
							</ul>
						</aside>
						{tab === "info" ?
							(
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
											<button className="bg-orange-500 w-full" onClick={async () => { await signOut({ redirect: false }); router.push("/auth"); }}>
												<FaPowerOff className="me-2 inline-flex" />
												Log Out
											</button>
										</div>
									</div>
								</section>
							)

							:

							tab === "options" ?

								(
									<section className="md:w-4/5 bg-neutral-700 rounded-md grow">
										<div className="md:p-8 p-4">
											<p>You can delete your account here</p>
										</div>
									</section>
								)

								:

								(
									<section className="md:w-4/5 bg-neutral-700 rounded-md grow">
										<div className="md:p-8 p-4">
											<p>Select a tab to view...</p>
										</div>
									</section>
								)



						}
					</div>
				</div>

			</main>
		</>
	)
}
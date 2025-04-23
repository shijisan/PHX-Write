"use client"

import { useRouter } from "next/navigation";

import { FaGithub } from "react-icons/fa";

export default function Home() {


	const router = useRouter();

	return (
		<>
			<main className="bg-indigo-1000 h-full">
				<header className="w-full  pt-[8vh] flex flex-col min-h-screen">
					<div className="hero-bg md:h-[60vh]">
						<div className="relative py-[8vh] text-foreground text-center flex flex-col space-y-8 justify-center items-center h-full z-10">
							<h1 className="md:text-7xl poppins font-medium">Soar With Security</h1>
							<p className="md:text-xl max-w-2xl mx-auto">
								Your notes are protected using <span className="font-semibold text-orange-500">End-to-End Encryption</span>, ensuring that only you hold the keys to your data.
								Whether you're journaling, brainstorming, or storing sensitive info, your <span className="font-semibold text-orange-500">privacy</span> stays yours—fully locked down, yet always within reach.
							</p>

							<div className="flex items-center md:gap-8 gap-4">
								<button onClick={() => router.push("/notes")} className="bg-orange-500 px-16 text-base">Create Notes</button>
								<button className="inset-ring-1 text-base px-16">
									<FaGithub className="inline-flex me-1" />
									View on Github
								</button>
							</div>
						</div>

					</div>
					<div className="bg-indigo-1000 z-10 relative px-[10vw] grow py-[8vh]">
						<div className="grid md:grid-cols-2 gap-2 items-center w-full">
							<div className="border-foreground/50 border md:p-8 p-4 rounded-md bg-indigo-500/50 h-full">
								<h3 className="font-semibold text-lg mb-2">🔐 End-to-End Encryption</h3>
								<p>Your notes stay private — even we can't read them. All data is encrypted before it leaves your device.</p>
							</div>

							<div className="border-foreground/50 border md:p-8 p-4 rounded-md bg-indigo-500/50 h-full">
								<h3 className="font-semibold text-lg mb-2">📦 Offline Mode (Local Storage)</h3>
								<p>Take notes even without internet. Everything is saved locally until you’re ready to sync or migrate.</p>
							</div>

							<div className="border-foreground/50 border md:p-8 p-4 rounded-md bg-indigo-500/50 h-full">
								<h3 className="font-semibold text-lg mb-2">🚀 Seamless Note Migration</h3>
								<p>Easily move local notes to your cloud account in one click. Perfect for switching between offline and online!</p>
							</div>

							<div className="border-foreground/50 border md:p-8 p-4 rounded-md bg-indigo-500/50 h-full">
								<h3 className="font-semibold text-lg mb-2">🌍 100% Open Source</h3>
								<p>No secrets here. Fork it, tweak it, or help improve it — powered by the dev community.</p>
							</div>
						</div>

					</div>
				</header>
				<footer className="text-center bg-orange-500 border-t border-t-foreground/50 py-4">
					<a className="hover:text-underline" href="https://shijisan-portfolio.vercel.app">shijisan</a>
				</footer>
			</main>
		</>
	)
}
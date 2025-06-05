"use client"

import { useRouter } from "next/navigation";

import { FaLock, FaBox, FaRocket, FaGlobe, FaGithub } from "react-icons/fa";

import Image from "next/image";

export default function Home() {


	const router = useRouter();

	return (
		<>
			<main className="h-full">
				<header className="w-full  pt-[8vh] flex flex-col min-h-screen">
					<div className="hero-bg md:h-[60vh]">
						<div className="relative py-[8vh] text-foreground text-center flex flex-col space-y-8 justify-center items-center h-full z-10">
							<h1 className="md:text-7xl text-3xl poppins font-medium">Soar With Security</h1>
							<p className="md:text-xl max-w-2xl mx-auto">
								Your notes are protected with <span className="font-semibold text-orange-500">End-to-End Encryption</span>, ensuring only you have access. Whether journaling or storing sensitive info, your <span className="font-semibold text-orange-500">privacy</span> stays secure and always within reach.
							</p>

							<div className="flex items-center md:gap-8 gap-4">
								<button onClick={() => router.push("/notes")} className="bg-orange-500 md:px-16 text-base">Create Notes</button>
								<button onClick={() => router.push("https://github.com/shijisan/PHX-Write")} className="inset-ring-1 text-base md:px-16">
									<FaGithub className="inline-flex me-1" />
									View on Github
								</button>
							</div>
						</div>

					</div>
					<div className="bg-neutral-800 z-10 relative px-[10vw] grow py-[8vh]">
						<div className="grid md:grid-cols-2 md:gap-2 gap-8 items-center w-full">
							<div className="border-foreground/50 border md:p-8 p-4 rounded-md bg-neutral-700 h-full flex md:flex-row flex-col items-center md:gap-8 gap-4">
								<div>
									<FaLock className="inline mr-2 text-orange-500 size-16" />
								</div>
								<div>
									<h3 className="font-semibold text-xl poppins mb-2">
										End-to-End Encryption
									</h3>
									<p>Your notes stay private — even we can&apos;t read them. All data is encrypted before it leaves your device.</p>
								</div>
							</div>

							<div className="border-foreground/50 border md:p-8 p-4 rounded-md bg-neutral-700 h-full flex md:flex-row flex-col items-center md:gap-8 gap-4">
								<div>
									<FaBox className="inline mr-2 text-orange-500 size-16" />
								</div>
								<div>
									<h3 className="font-semibold text-xl poppins mb-2">
										Offline Mode (Local Storage)
									</h3>
									<p>Take notes even without internet. Everything is saved locally until you&apos;re ready to sync or migrate.</p>
								</div>
							</div>

							<div className="border-foreground/50 border md:p-8 p-4 rounded-md bg-neutral-700 h-full flex md:flex-row flex-col items-center md:gap-8 gap-4">
								<div>
									<FaRocket className="inline mr-2 text-orange-500 size-16" />
								</div>
								<div>
									<h3 className="font-semibold text-xl poppins mb-2">
										Seamless Note Migration
									</h3>
									<p>Easily move local notes to your cloud account in one click. Perfect for switching between offline and online!</p>
								</div>
							</div>

							<div className="border-foreground/50 border md:p-8 p-4 rounded-md bg-neutral-700 h-full flex md:flex-row flex-col items-center md:gap-8 gap-4">
								<div>
									<FaGlobe className="inline mr-2 text-orange-500 size-16" />
								</div>
								<div>
									<h3 className="font-semibold text-xl poppins mb-2">
										100% Open Source
									</h3>
									<p>No secrets here. Fork it, tweak it, or help improve it — powered by the dev community.</p>
								</div>
							</div>
						</div>
					</div>

				</header>

				<section className="bg-neutral-950 text-foreground md:px-[10vw] py-[8vh] px-4">
					<div className="grid md:grid-cols-2 md:gap-8 gap-4">
						<div className="flex flex-col md:p-8 p-4 md:rounded-lg rounded-md bg-neutral-800 space-y-4">
							<Image className="w-full" height={336} width={600} src="/demo-1.webp" alt="demo image 1" />
							<div>
								<h1 className="text-2xl poppins font-medium mb-4">Text Editor</h1>
								<p>Made with <span className="font-semibold text-orange-500">react-quill-new</span>. It is lightweight and does the job well. The main feature is the ability to write notes locally and be able to migrate them to an account with end-to-end encryption technology.</p>
							</div>
						</div>
						<div className="flex flex-col md:p-8 p-4 md:rounded-lg rounded-md bg-neutral-800 space-y-4">
							<Image className="w-full" height={336} width={600} src="/demo-2.webp" alt="demo image 2" />
							<div>
								<h1 className="text-2xl poppins font-medium mb-4">Account Auth</h1>
								<p>Powered by <span className="font-semibold text-orange-500">Next Auth</span>, I created custom credentials and Google Provider authentication logic in combination of Next Auth Prisma Adapter to handle live data changes to your account and data, resulting in a wonderful user and development experience.</p>
							</div>
						</div>
					</div>
				</section>

				<footer className="text-center bg-neutral-900 border-t border-t-foreground/50 py-4">
					<a className="hover:text-underline" href="https://shijisan-portfolio.vercel.app">shijisan</a>
				</footer>
			</main>
		</>
	)
}
"use client";

import Link from "next/link";

export default function About() {
    return(
        <>
        <main className="p-8">
            <h1 className="text-3xl">What's left to implement:</h1>

            <ul className="list-inside list-disc ps-4 mt-4">
                <li>Encrypted documents</li>
                <li>Import/Export of documents</li>
                <li>Better UI</li>
                <li>Animations</li>
                <li>PWA/full offline access</li>
                <li>Account Deletion</li>
            </ul>

            <p className="mt-4">If you want to contribute to the repository - please go ahead and fork and request a pull request!</p>
            <Link className="text-blue-500 underline hover:text-blue-400 transition-all" href="https://github.com/shijisan/PHX-Write">Find the repository here</Link>
        </main>
        </>
    )
}
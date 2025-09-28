import Head from "next/head";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>Gas Huffer</title>
                <meta name="description" content="Gas Huffer - A 2D haunted house exploration game built with Next.js and Phaser" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={inter.className}>
                <AppWithoutSSR />
            </main>
        </>
    );
}

import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState } from "react";
import axios from "axios";
import SelectedInfo from "../components/SelectedInfo";

const inter = Inter({ subsets: ["latin"] });

const sections = [
    "monsters",
    "armor",
    "weapons",
    "magicitems",
    "spells",
    "races",
    "classes",
];

interface IApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<any>;
}

export default function Home() {
    const [chosenSection, setChosenSection] = useState("");
    const [resultsPerPage, setResultsPerPage] = useState(20);
    const [data, setData] = useState<IApiResponse>();
    const [selected, setSelected] = useState<any>({});
    const [pages, setPages] = useState(0);

    const handleClick = (sectionName: string) => {
        setChosenSection(sectionName);

        fetchData(
            `https://api.open5e.com/${sectionName}/?limit=${resultsPerPage}`
        );
    };

    const fetchData = (url: string) => {
        axios.get(`${url}`).then((response) => {
            console.log(response.data);
            setPages(Math.ceil(response.data.count / resultsPerPage));
            setData(response.data);
        });
    };

    return (
        <>
            <Head>
                <title>Open5e Lookup</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex">
                {/* Sidenav */}
                <nav className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-400 to-rose-400 w-[300px] h-screen">
                    <ul className="flex flex-col gap-3 p-3">
                        {sections.map((section, index) => {
                            return (
                                <li
                                    className="capitalize text-3xl text-white border-2 border-white border-opacity-30 p-3 rounded-lg shadow-lg cursor-pointer hover:border-opacity-100 transition-all"
                                    key={index}
                                    onClick={() => handleClick(section)}
                                >
                                    {section === "magicitems"
                                        ? "Magic Items"
                                        : section}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                {/* Main Section */}
                <main className={`${inter.className} p-3 flex flex-1`}>
                    <section className="flex-1">
                        {data ? (
                            <>
                                <h1 className="text-5xl capitalize h-[7vh]">
                                    {chosenSection === "magicitems"
                                        ? "Magic Items"
                                        : chosenSection}
                                </h1>
                                <ul className="max-h-[85vh] overflow-y-scroll shadow-lg">
                                    {data.results.map((result, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`cursor-pointer ${
                                                    selected &&
                                                    selected.name ===
                                                        result.name
                                                        ? "bg-orange-400" // selected
                                                        : "bg-neutral-100 hover:bg-white" // not selected
                                                } p-5 border-t-2 transition-colors`}
                                                onClick={() =>
                                                    setSelected((prev: any) => {
                                                        return prev.name ===
                                                            result.name
                                                            ? {}
                                                            : result;
                                                    })
                                                }
                                            >
                                                {result.name}
                                            </div>
                                        );
                                    })}
                                </ul>
                                <div className="mx-auto flex h-[7vh] items-center justify-between">
                                    {data.previous && (
                                        <button
                                            className="bg-red-400 hover:bg-red-300 transition-colors p-2 flex-1"
                                            onClick={() => {
                                                if (!data.previous) return;
                                                fetchData(data.previous);
                                            }}
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {data.next && (
                                        <button
                                            className="bg-orange-400 hover:bg-orange-300 transition-colors p-2 flex-1"
                                            onClick={() => {
                                                if (!data.next) return;
                                                fetchData(data.next);
                                            }}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="text-5xl mb-3">
                                    Open5e Practice
                                </h1>
                                <h2 className="text-2xl">
                                    Click an item to begin...
                                </h2>
                            </>
                        )}
                    </section>
                    <section
                        className={`${
                            selected.name ? "flex-1" : "width-[0px]" // if selected, slide in
                        } transition-all duration-500`}
                    >
                        <SelectedInfo selection={selected} />
                    </section>
                </main>
            </div>
        </>
    );
}

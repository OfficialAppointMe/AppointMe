import Image from "next/image";
import Link from "next/link";
import NextTopLoader from "nextjs-toploader";

export default async function Home() {
    return (
        <>
            <NextTopLoader
                crawlSpeed={100}
                speed={200}
            />
            <div className="flex justify-center absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
                <div className="invert absolute z-0 top-24 left-16 opacity-10 rotate-45 animate-pulse">
                    <Image src={"/calender.png"} alt="calender" width={150} height={150} />
                </div>
                <div className="absolute z-0 top-2/3 left-[20%] opacity-10 rotate-12 animate-pulse">
                    <Image src={"/stethoscope.png"} alt="stethoscope" width={150} height={150} />
                </div>
                <div className="invert absolute z-0 top-[10%] left-[80%] opacity-10 -rotate-12 animate-pulse">
                    <Image src={"/clipboard.jpg"} alt="clipboard" width={150} height={150} />
                </div>
                <div className="invert absolute z-0 top-[10%] left-[50%] opacity-10 -rotate-12 animate-pulse">
                    <Image src={"/group.png"} alt="group" width={150} height={150} />
                </div>
                <div className="invert absolute z-0 top-[45%] left-[60%] opacity-10 animate-pulse">
                    <Image src={"/handshake.png"} alt="handshake" width={150} height={150} />
                </div>
                <div className="invert absolute z-0 top-[30%] left-[25%] opacity-10 -rotate-45 animate-pulse">
                    <Image src={"/analytics.png"} alt="analytics" width={150} height={150} />
                </div>
                <div className="invert absolute z-0 top-[70%] left-[80%] opacity-10 rotate-45 animate-pulse">
                    <Image src={"/work.png"} alt="work" width={150} height={150} />
                </div>
                <div className="flex justify-center z-50 items-center h-screen w-[60vw] flex-col gap-6">
                    <h1 className="text-white font-bold text-5xl">AppointMe</h1>
                    <p className="text-center font-bold text-slate-300">
                        Simplify your scheduling with our intuitive SaaS solution. Manage appointments, send automated reminders, sync calendars. Try AppointMe and enhance your productivity today!
                    </p>
                    <Link href="/register" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-12 w-40 flex justify-center items-center cursor-pointer">Give it a Shot</Link>
                    <lord-icon
                        src="https://cdn.lordicon.com/xcrjfuzb.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={{ "width": "55px", "height": "55px" }}>
                    </lord-icon>
                </div>
            </div>
        </>
    );
}

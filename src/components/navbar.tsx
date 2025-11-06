import { ModeToggle } from "./mode-toggle"

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4 shadow shadow-foreground">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/vite.svg" alt="logo" width={40} height={40} />
                    <span className="text-2xl font-bold text-foreground px-2">SmartMail AI</span>
                </div>
                <h1 className="">
                    <ModeToggle />
                </h1>
            </div>
        </div>
    )
}

export default Navbar
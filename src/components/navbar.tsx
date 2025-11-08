import { Link } from "react-router"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4 shadow shadow-foreground">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/vite.svg" alt="logo" width={40} height={40} />
                    <span className="text-2xl font-bold text-foreground px-2">SmartMail AI</span>
                </div>
                <h1 className="flex items-center gap-2">
                    <ModeToggle />
                    <Link to={"/login"}>
                        <Button variant={"outline"}>Login</Button>
                    </Link>
                </h1>
            </div>
        </div>
    )
}

export default Navbar
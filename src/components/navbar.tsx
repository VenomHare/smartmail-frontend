import { Link } from "react-router"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.userdata);

    return (
        <div className="absolute top-0 right-0 flex justify-between items-center p-4 ">
            <div className="w-full mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* <img src="/vite.svg" alt="logo" width={40} height={40} />
                    <span className="text-2xl font-bold text-foreground px-2">SmartMail AI</span> */}
                </div>
                <h1 className="flex items-center gap-2">
                    <ModeToggle />
                    {
                        user == undefined &&
                            <Link to={"/login"}>
                                <Button variant={"outline"}>Login</Button>
                            </Link>
                    }
                </h1>
            </div>
        </div>
    )
}

export default Navbar
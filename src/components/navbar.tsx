import { Link } from "react-router"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Menu } from "lucide-react"
import { setSidebar } from "@/store/sidebar"
import { DraftPilotLogo } from "./ui/draft-mail-icon"

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.userdata);
    const dispatch = useDispatch();

    return (
        <div className="shadow flex justify-between items-center p-4 ">
            <div className="w-full mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">

                    <Button variant="ghost" size="icon" onClick={() => { dispatch(setSidebar(true)) }} className="h-8 w-8 md:hidden shrink-0 mx-auto my-2">
                        <Menu className="h-4 w-4" />
                    </Button>
                    <Link to="/" className="flex items-center gap-3 md:hidden">
                        <DraftPilotLogo className="h-8 w-8 shrink-0" />
                        <span className="text-lg font-semibold text-sidebar-foreground truncate">Draft Pilot</span>
                    </Link>
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
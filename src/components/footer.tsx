import { Link } from "react-router"

const Footer = () => {
    return (
        <>
            <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
                <div className="flex items-center justify-center gap-4">
                    <Link to="/terms" className="hover:text-foreground transition-colors">
                        Terms
                    </Link>
                    <Link to="/privacy" className="hover:text-foreground transition-colors">
                        Privacy
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer
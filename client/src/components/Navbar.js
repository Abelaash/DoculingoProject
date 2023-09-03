import { Link } from "react-router-dom"

export default function Navbar() {

    return (
        <nav className="nav">
            <Link to="/" className="site-name">
                DocuLingo
            </Link>
            <ul>
                <li>
                    <Link to="/translate">Translate</Link>
                </li>
                {/* <li>
                    <Link to="/login">Login</Link>
                </li> */}
            </ul>    
        </nav>
    )
}
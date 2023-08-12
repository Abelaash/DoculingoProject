import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="page">
            <h1 className="headline">
                Translation, made easy
            </h1>
            <p className="caption">Read documents in any language.</p>
            <div className="button-container">
                <Link to="/translate">
                    <button className="get-started-button">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};
import { Link } from "react-router-dom";
function Home() {
    return (
        <div className="container c-flex-column column-center">
            <div className="c-flex-row">
                <h1>Rubik's Race</h1>
            </div>
            <div className="c-flex-row">
                <Link to="/singleplayer">
                    <button>1 joueur</button>
                </Link>

                <Link to="/twoplayer">
                    <button>2 joueurs</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;

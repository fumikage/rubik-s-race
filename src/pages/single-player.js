import "./single-player.css";
import { useState, useEffect } from "react";
import Tile from "../components/tile";
import SoluceTile from "../components/solucetile";
import Timer from "../components/timer";

function SinglePlayer() {
    let [gridPlace, setGridplace] = useState();
    let [empty, setEmpty] = useState();
    let [gameStatus, setGameStatus] = useState("pause");
    const [timerActive, setTimerActive] = useState(false);
    const [timerPaused, setTimerPaused] = useState(true);
    const [time, setTime] = useState(0);
    let [soluce, setSoluce] = useState([
        "r",
        "r",
        "r",
        "r",
        "b",
        "b",
        "b",
        "b",
        "y",
        "y",
        "y",
        "y",
        "g",
        "g",
        "g",
        "g",
        "o",
        "o",
        "o",
        "o",
        "p",
        "p",
        "p",
        "p",
    ]);
    let [tileColor, setTileColor] = useState([
        "r1",
        "r2",
        "r3",
        "r4",
        "b1",
        "b2",
        "b3",
        "b4",
        "g1",
        "g2",
        "g3",
        "g4",
        "y1",
        "y2",
        "y3",
        "y4",
        "o1",
        "o2",
        "o3",
        "o4",
        "p1",
        "p2",
        "p3",
        "p4",
        "empty",
    ]);

    useEffect(() => {
        let colorShuffle = randomize(tileColor);
        let colorFinale = [];

        for (let [index, color] of colorShuffle.entries()) {
            let colorX = index;
            let colorY = 0;
            if (index > 19) {
                colorY = 4;
                colorX = index - 20;
            } else if (index > 14) {
                colorY = 3;
                colorX = index - 15;
            } else if (index > 9) {
                colorY = 2;
                colorX = index - 10;
            } else if (index > 4) {
                colorY = 1;
                colorX = index - 5;
            }

            if (color === "empty") {
                setEmpty({ x: colorX, y: colorY });
            }

            colorFinale.push({ color: color, x: colorX, y: colorY });
        }

        setTileColor(colorFinale);

        let grid = document.getElementById("grid");
        let y = grid.offsetTop;
        let x = grid.offsetLeft;

        setGridplace([
            [
                { y: y, x: x },
                { y: y, x: x + 100 },
                { y: y, x: x + 200 },
                { y: y, x: x + 300 },
                { y: y, x: x + 400 },
            ],
            [
                { y: y + 100, x: x },
                { y: y + 100, x: x + 100 },
                { y: y + 100, x: x + 200 },
                { y: y + 100, x: x + 300 },
                { y: y + 100, x: x + 400 },
            ],
            [
                { y: y + 200, x: x },
                { y: y + 200, x: x + 100 },
                { y: y + 200, x: x + 200 },
                { y: y + 200, x: x + 300 },
                { y: y + 200, x: x + 400 },
            ],
            [
                { y: y + 300, x: x },
                { y: y + 300, x: x + 100 },
                { y: y + 300, x: x + 200 },
                { y: y + 300, x: x + 300 },
                { y: y + 300, x: x + 400 },
            ],
            [
                { y: y + 400, x: x },
                { y: y + 400, x: x + 100 },
                { y: y + 400, x: x + 200 },
                { y: y + 400, x: x + 300 },
                { y: y + 400, x: x + 400 },
            ],
        ]);
    }, []);

    function randomize(tab) {
        let i, j, tmp;
        for (i = tab.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = tab[i];
            tab[i] = tab[j];
            tab[j] = tmp;
        }
        return tab;
    }

    function moveOnClick(data) {
        if (data.x === empty.x || data.y === empty.y) {
            setEmpty({ x: data.x, y: data.y });
            let finalValue = tileColor;

            if (data.x === empty.x) {
                let delta = empty.y - data.y;
                if (delta > 0) {
                    for (let i = 1; i <= delta; i++) {
                        for (let element of finalValue) {
                            if (
                                element.x === data.x &&
                                element.y === empty.y - i
                            ) {
                                element.y = element.y + 1;
                            }
                        }
                    }
                } else {
                    for (let i = -1; i >= delta; i--) {
                        for (let element of finalValue) {
                            if (
                                element.x === data.x &&
                                element.y === empty.y - i
                            ) {
                                element.y = element.y - 1;
                            }
                        }
                    }
                }
            } else {
                let delta = empty.x - data.x;
                if (delta > 0) {
                    for (let i = 1; i <= delta; i++) {
                        for (let element of finalValue) {
                            if (
                                element.y === data.y &&
                                element.x === empty.x - i
                            ) {
                                element.x = element.x + 1;
                            }
                        }
                    }
                } else {
                    for (let i = -1; i >= delta; i--) {
                        for (let element of finalValue) {
                            if (
                                element.y === data.y &&
                                element.x === empty.x - i
                            ) {
                                element.x = element.x - 1;
                            }
                        }
                    }
                }
            }
            for (let element of finalValue) {
                if (element.color === "empty") {
                    element = { x: data.x, y: data.y, color: "empty" };
                }
            }
            setTileColor(finalValue);
        }
    }

    function startGame() {
        let soluceShuffle = randomize(soluce);

        for (let i = 0; i < 15; i++) {
            let random = Math.floor(Math.random() * 24 - i);
            soluceShuffle.splice(random, 1);
        }
        let grid = document.getElementById("grid-ex");
        let y = grid.offsetTop;
        let x = grid.offsetLeft;

        let soluceTab = [];

        for (let [index, color] of soluceShuffle.entries()) {
            let colorX = index;
            let colorY = 0;

            if (index > 5) {
                colorY = 2;
                colorX = index - 6;
            } else if (index > 2) {
                colorY = 1;
                colorX = index - 3;
            }

            soluceTab.push({
                color: color,
                x: x + colorX * 100,
                y: y + colorY * 100,
            });
        }

        setSoluce(soluceTab);
        setTimerActive(true);
        setTimerPaused(false);
    }
    function restartGame() {
        let soluceShuffle = randomize([
            "r",
            "r",
            "r",
            "r",
            "b",
            "b",
            "b",
            "b",
            "y",
            "y",
            "y",
            "y",
            "g",
            "g",
            "g",
            "g",
            "o",
            "o",
            "o",
            "o",
            "p",
            "p",
            "p",
            "p",
        ]);

        for (let i = 0; i < 15; i++) {
            let random = Math.floor(Math.random() * 24 - i);
            soluceShuffle.splice(random, 1);
        }
        let grid = document.getElementById("grid-ex");
        let y = grid.offsetTop;
        let x = grid.offsetLeft;

        let soluceTab = [];

        for (let [index, color] of soluceShuffle.entries()) {
            let colorX = index;
            let colorY = 0;

            if (index > 5) {
                colorY = 2;
                colorX = index - 6;
            } else if (index > 2) {
                colorY = 1;
                colorX = index - 3;
            }

            soluceTab.push({
                color: color,
                x: x + colorX * 100,
                y: y + colorY * 100,
            });
        }

        setSoluce(soluceTab);
        setTime(0);
        setTimerPaused(false);
    }

    useEffect(() => {
        let soluceMap = [
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 3, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: 3 },
        ];

        if (tileColor && soluce) {
            let flag = 0;
            for (let [index, element] of soluceMap.entries()) {
                for (let tile of tileColor) {
                    if (tile.x === element.x && tile.y === element.y) {
                        if (
                            tile.color.substr(0, 1) === soluce[index].color &&
                            tile.color.substr(0, 1) !== "e"
                        ) {
                            flag++;
                        }
                    }
                }
            }
            if (flag === 9) {
                setGameStatus("finish");
                setTimerPaused(!timerPaused);
            }
        }
    }, [empty]);

    useEffect(() => {
        let interval = null;

        if (timerActive && timerPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timerActive, timerPaused]);

    return (
        <div className="c-flex-column">
            <h1>
                Partie 1 joueur {gameStatus === "finish" && <span>FINI</span>}
            </h1>
            <div className="c-flex-row">
                <div className="c-flex-column left">
                    <div className="c-flex-row">
                        <Timer time={time} />
                    </div>
                    <div className="c-flex-row">
                        <div id="grid" className="grid-container c-flex-column">
                            <div className="c-flex-row">
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                            </div>
                            <div className="c-flex-row">
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                            </div>
                            <div className="c-flex-row">
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                            </div>
                            <div className="c-flex-row">
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                            </div>
                            <div className="c-flex-row">
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                                <div className="case"></div>
                            </div>

                            {tileColor.map((tile) => (
                                <Tile
                                    key={tile.color}
                                    data={tile}
                                    gridPlace={gridPlace}
                                    empty={empty}
                                    moveOnClick={moveOnClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="c-flex-column right">
                    <div className="c-flex-row">
                        <div id="grid-ex" className="grid-container-ex">
                            <div className="c-flex-row">
                                <div className="case-ex"></div>
                                <div className="case-ex"></div>
                                <div className="case-ex"></div>
                            </div>
                            <div className="c-flex-row">
                                <div className="case-ex"></div>
                                <div className="case-ex"></div>
                                <div className="case-ex"></div>
                            </div>
                            <div className="c-flex-row">
                                <div className="case-ex"></div>
                                <div className="case-ex"></div>
                                <div className="case-ex"></div>
                            </div>
                            {soluce.map((tile) => (
                                <SoluceTile
                                    key={`${tile.color}${tile.x}${tile.y}`}
                                    data={tile}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="c-flex-row">
                        {gameStatus === "pause" && (
                            <button onClick={startGame}>Lancer</button>
                        )}
                        {gameStatus === "finish" && (
                            <button onClick={restartGame}>Relancer</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePlayer;

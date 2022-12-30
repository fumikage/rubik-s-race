import { useEffect, useState } from "react";

function Tile(props) {
    let [tilePosition, setPosition] = useState({ x: 0, y: 0 });
    let [classCustom, setClass] = useState("");

    useEffect(() => {
        let colorMap = {
            r: "red",
            o: "orange",
            b: "blue",
            p: "purple",
            y: "yellow",
            g: "green",
        };

        if (props.gridPlace) {
            let x = props.data.x;
            let y = props.data.y;

            setPosition({
                x: props.gridPlace[y][x].x,
                y: props.gridPlace[y][x].y,
                color: colorMap[props.data.color.substr(0, 1)],
            });

            if (x === props.empty.x || y === props.empty.y) {
                setClass("activeHover");
            }
        }
    }, [props.empty]);

    function moveOnClick() {
        props.moveOnClick(props.data);
    }

    return (
        <div>
            {props.data.color !== "empty" && (
                <div
                    onClick={moveOnClick}
                    className={`tile ${classCustom}`}
                    style={{
                        top: `${tilePosition.y}px`,
                        left: `${tilePosition.x}px`,
                        background: tilePosition.color,
                    }}
                ></div>
            )}
        </div>
    );
}

export default Tile;

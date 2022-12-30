import { useEffect, useState } from "react";

function Tile(props) {
    let [color, setColor] = useState();

    useEffect(() => {
        let colorMap = {
            r: "red",
            o: "orange",
            b: "blue",
            p: "purple",
            y: "yellow",
            g: "green",
        };
        setColor(colorMap[props.data.color]);
    }, [props.data]);

    function moveOnClick() {
        props.moveOnClick(props.data);
    }

    return (
        <div>
            {props.data.color !== "e" && (
                <div
                    className="tile-ex"
                    onClick={moveOnClick}
                    style={{
                        top: `${props.data.y}px`,
                        left: `${props.data.x}px`,
                        background: color,
                    }}
                ></div>
            )}
        </div>
    );
}

export default Tile;

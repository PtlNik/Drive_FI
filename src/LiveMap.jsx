import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";


function MoveMap({ position }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position, 15);
    }, [position]);

    return null;
}

function LiveMap() {

    const [position, setPosition] = useState([60.1699, 24.9384]);
    const [message, setMessage] = useState("Finding your location...");

    useEffect(() => {
        if (!navigator.geolocation) {
            setMessage("Location is not supported in this browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
                setMessage("");
            },
            () => {
                setMessage("Location blocked, showing Helsinki");
            }
        );
    }, []);

    return (
        <>
            <MapContainer
                center={position}
                zoom={13}
                style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
            >
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CircleMarker
                    center={position}
                    radius={10}
                    pathOptions={{ color: "white", weight: 3, fillColor: "#111", fillOpacity: 1 }}
                />
                <MoveMap position={position} />
            </MapContainer>

            {message && <div className="map-message">{message}</div>}
        </>
    );
}

export default LiveMap;
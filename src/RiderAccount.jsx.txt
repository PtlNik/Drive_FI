import React, { useRef, useState } from "react";
import RiderProfile from "./RiderProfile.jsx";

const HISTORY_KEY = "drivefi.demo.rider.history";

function readHistory() {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (!saved) return [];

    const rides = JSON.parse(saved);
    if (!Array.isArray(rides)) {
        throw new Error("Invalid ride history");
    }
    return rides;
}

export function saveCompletedRide(ride) {
    const rides = readHistory();
    localStorage.setItem(HISTORY_KEY, JSON.stringify([ride, ...rides]));
}

export default function RiderAccount({ onLogout }) {
    const dialog = useRef(null);
    const [tab, setTab] = useState("history");
    const [rides, setRides] = useState([]);
    const [historyError, setHistoryError] = useState("");

    function openAccount() {
        setTab("history");
        setHistoryError("");

        try {
            setRides(readHistory());
        } catch {
            setRides([]);
            setHistoryError("Could not load ride history in this browser.");
        }

        dialog.current.showModal();
    }

    return (
        <>
            <button
                type="button"
                className="menu"
                aria-label="Open rider menu"
                onClick={openAccount}
            >
                ☰
            </button>

            <dialog
                ref={dialog}
                className="df-account"
                aria-labelledby="account-title"
            >
                <header className="df-account-header">
                    <h2 id="account-title">Rider account</h2>
                    <button type="button" onClick={() => dialog.current.close()}>
                        Close
                    </button>
                </header>

                <nav className="df-account-nav" aria-label="Rider account sections">
                    <button
                        type="button"
                        aria-pressed={tab === "history"}
                        onClick={() => setTab("history")}
                    >
                        Ride history
                    </button>

                    <button
                        type="button"
                        aria-pressed={tab === "profile"}
                        onClick={() => setTab("profile")}
                    >
                        Profile
                    </button>
                </nav>

                {tab === "history" ? (
                    <section aria-label="Ride history">
                        {historyError && <p role="alert">{historyError}</p>}

                        {!historyError && rides.length === 0 && (
                            <p>No completed rides yet.</p>
                        )}

                        {rides.map((ride) => (
                            <article key={ride.id} className="df-history-item">
                                <strong>To {ride.destination}</strong>
                                <p>{new Date(ride.date).toLocaleString()}</p>
                                <p>{ride.driver} · {ride.car}</p>
                                <p>
                                    €{ride.fare.toFixed(2)} · Cash ·{" "}
                                    {ride.rating ? `${ride.rating}/5 stars` : "Unrated"}
                                </p>
                            </article>
                        ))}
                    </section>
                ) : (
                    <RiderProfile rideCount={rides.length} onLogout={onLogout} />
                )}
            </dialog>
        </>
    );
}
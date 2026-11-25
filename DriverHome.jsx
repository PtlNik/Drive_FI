import React, { useState } from "react";
import LiveMap from "./LiveMap.jsx";
import DriverRequests, { demoRequests } from "./DriverRequests.jsx";
import "./DriverHome.css";

export default function DriverHome({ onLogout }) {
    const [online, setOnline] = useState(false);
    const [view, setView] = useState("home");
    const [requestIndex, setRequestIndex] = useState(0);
    const [acceptedRide, setAcceptedRide] = useState(null);

    function acceptRide(request) {
        setAcceptedRide(request);
        setRequestIndex((index) => index + 1);
        setView("home");
    }

    function cancelPickup() {
        setAcceptedRide(null);
    }

    if (view === "requests") {
        return (
            <DriverRequests
                request={demoRequests[requestIndex]}
                onAccept={acceptRide}
                onSkip={() => setRequestIndex((index) => index + 1)}
                onBack={() => setView("home")}
            />
        );
    }

    return (
        <main className="dh-page">
            <header className="dh-header">
                <div className="dh-brand">DriveFI<span>.</span></div>
                <span className="dh-role">Driver</span>

                <button type="button" className="dh-logout" onClick={onLogout}>
                    Log out
                </button>
            </header>

            <section className="dh-map" aria-label="Driver location map">
                <LiveMap searchText={acceptedRide?.pickup || ""} />
            </section>

            <section className="dh-panel" aria-live="polite">
                {acceptedRide ? (
                    <>
                        <div className="dh-status">
                            <span className="dh-dot dh-dot-online" aria-hidden="true" />
                            <h1>Pick up {acceptedRide.rider}</h1>
                        </div>

                        <p><strong>Pickup:</strong> {acceptedRide.pickup}</p>
                        <p><strong>Drop-off:</strong> {acceptedRide.destination}</p>
                        <p><strong>Agreed fare:</strong> €{acceptedRide.fare.toFixed(2)} · Cash</p>

                        <button
                            type="button"
                            className="dr-secondary"
                            onClick={cancelPickup}
                        >
                            Cancel pickup
                        </button>
                    </>
                ) : (
                    <>
                        <div className="dh-status">
              <span
                  className={`dh-dot${online ? " dh-dot-online" : ""}`}
                  aria-hidden="true"
              />
                            <h1>{online ? "You’re online" : "You’re offline"}</h1>
                        </div>

                        <p>
                            {online
                                ? "Check available rides and choose one to accept."
                                : "Go online when you’re ready to drive."}
                        </p>

                        {online && (
                            <button
                                type="button"
                                className="dh-toggle"
                                onClick={() => setView("requests")}
                            >
                                View ride requests
                            </button>
                        )}

                        <button
                            type="button"
                            className={online ? "dr-secondary" : "dh-toggle"}
                            onClick={() => setOnline((current) => !current)}
                        >
                            {online ? "Go offline" : "Go online"}
                        </button>
                    </>
                )}
            </section>
        </main>
    );
}
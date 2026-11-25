import React, { useState } from "react";

export const demoRequests = [
    {
        id: "ride-1",
        rider: "Pratik",
        pickup: "Metropolia Karamalmi, Espoo",
        destination: "Sello, Leppävaara",
        fare: 12,
    },
    {
        id: "ride-2",
        rider: "Aino",
        pickup: "Aalto University Metro Station, Espoo",
        destination: "Tapiola Metro Station, Espoo",
        fare: 15.5,
    },
];

const euro = new Intl.NumberFormat("en-FI", {
    style: "currency",
    currency: "EUR",
});

export default function DriverRequests({ request, onAccept, onSkip, onBack }) {
    return (
        <main className="dr-page">
            <header className="dh-header">
                <div className="dh-brand">DriveFI<span>.</span></div>
                <span className="dh-role">Driver</span>

                <button type="button" className="dh-logout" onClick={onBack}>
                    Back to map
                </button>
            </header>

            {request ? (
                <RequestCard
                    key={request.id}
                    request={request}
                    onAccept={onAccept}
                    onSkip={onSkip}
                />
            ) : (
                <section className="dr-card">
                    <h1>No more ride requests</h1>

                    <button type="button" className="dh-toggle" onClick={onBack}>
                        Return to map
                    </button>
                </section>
            )}
        </main>
    );
}

function RequestCard({ request, onAccept, onSkip }) {
    const [stage, setStage] = useState("view");
    const [amount, setAmount] = useState("");
    const [counterFare, setCounterFare] = useState(null);
    const [message, setMessage] = useState("");

    function startCounterOffer() {
        setAmount(request.fare.toFixed(2));
        setMessage("");
        setStage("edit");
    }

    function sendCounterOffer(event) {
        event.preventDefault();

        const value = amount.trim().replace(",", ".");
        const fare = Number(value);

        if (!/^\d+(?:\.\d{1,2})?$/.test(value) || !Number.isFinite(fare) || fare <= 0) {
            setMessage("Enter a positive fare with up to two decimal places.");
            return;
        }

        if (fare === request.fare) {
            setMessage("Enter a different fare, or go back and accept the rider’s offer.");
            return;
        }

        setCounterFare(fare);
        setMessage("");
        setStage("pending");
    }

    function declineCounterOffer() {
        setMessage(
            `${request.rider} declined ${euro.format(counterFare)}. ` +
            `The original offer of ${euro.format(request.fare)} is still available.`
        );
        setCounterFare(null);
        setStage("view");
    }

    return (
        <section className="dr-card">
            <p className="dr-label">Ride request</p>
            <h1>{request.rider} needs a ride</h1>

            <dl className="dr-details">
                <div>
                    <dt>Pickup</dt>
                    <dd>{request.pickup}</dd>
                </div>

                <div>
                    <dt>Destination</dt>
                    <dd>{request.destination}</dd>
                </div>

                <div>
                    <dt>Rider’s offer · Cash</dt>
                    <dd className="dr-fare">{euro.format(request.fare)}</dd>
                </div>
            </dl>

            {stage === "view" && (
                <>
                    <button
                        type="button"
                        className="dh-toggle"
                        onClick={() => onAccept(request)}
                    >
                        Accept ride · {euro.format(request.fare)}
                    </button>

                    <button
                        type="button"
                        className="dr-secondary"
                        onClick={startCounterOffer}
                    >
                        Counter offer
                    </button>

                    <button type="button" className="dr-secondary" onClick={onSkip}>
                        Skip
                    </button>
                </>
            )}

            {stage === "edit" && (
                <form onSubmit={sendCounterOffer}>
                    <label className="dr-counter-field">
                        Your proposed fare (€)
                        <input
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            onChange={(event) => {
                                setAmount(event.target.value);
                                setMessage("");
                            }}
                            autoFocus
                            required
                        />
                    </label>

                    <button type="submit" className="dh-toggle">
                        Send counter offer
                    </button>

                    <button
                        type="button"
                        className="dr-secondary"
                        onClick={() => {
                            setMessage("");
                            setStage("view");
                        }}
                    >
                        Cancel
                    </button>
                </form>
            )}

            {stage === "pending" && (
                <div className="dr-counter-pending">
                    <h2>Counter offer: {euro.format(counterFare)}</h2>
                    <p>Choose the rider’s response.</p>

                    <button
                        type="button"
                        className="dh-toggle"
                        onClick={() => onAccept({ ...request, fare: counterFare })}
                    >
                        Rider accepts {euro.format(counterFare)}
                    </button>

                    <button
                        type="button"
                        className="dr-secondary"
                        onClick={declineCounterOffer}
                    >
                        Rider declines
                    </button>
                </div>
            )}

            {message && <p role="status">{message}</p>}
        </section>
    );
}
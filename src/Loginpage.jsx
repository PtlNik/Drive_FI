import React, { useState } from "react";
import App from "./App.jsx";

export default function LoginPage() {
    const [role, setRole] = useState("rider");
    const [signedInAs, setSignedInAs] = useState(null);
    const [error, setError] = useState("");

    function handleLogin(event) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const email = form.get("email").trim().toLowerCase();
        const password = form.get("password");

        if (email !== "demo@drivefi.test" || password !== "drivefi123") {
            setError("Use the demo email and password shown below.");
            return;
        }

        setError("");
        setSignedInAs(role);
    }


    if (signedInAs === "rider") {
        return <App />;
    }

    if (signedInAs === "driver") {
        return (
            <main className="df-login">
                <section className="df-login-card">
                    <div className="df-login-brand">Drive<span>FI</span></div>
                    <h1>Driver dashboard</h1>
                    <p>You’re signed in as a demo driver.</p>
                    <button
                        className="df-login-submit"
                        onClick={() => setSignedInAs(null)}
                    >
                        Sign out
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main className="df-login">
            <section className="df-login-card">
                <div className="df-login-brand">Drive<span>FI</span></div>
                <h1>Sign in</h1>

                <form onSubmit={handleLogin}>
                    <fieldset className="df-login-roles">
                        <legend>Choose your role</legend>
                        {["rider", "driver"].map((option) => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name="role"
                                    value={option}
                                    checked={role === option}
                                    onChange={() => setRole(option)}
                                />
                                {option === "rider" ? "Rider" : "Driver"}
                            </label>
                        ))}
                    </fieldset>

                    <label className="df-login-field">
                        Email
                        <input name="email" type="email" placeholder="demo@drivefi.test" required />
                    </label>

                    <label className="df-login-field">
                        Password
                        <input name="password" type="password" required />
                    </label>

                    {error && <p className="df-login-error" role="alert">{error}</p>}

                    <button className="df-login-submit" type="submit">
                        Sign in as {role}
                    </button>

                    <p className="df-login-hint">
                        Demo email: <strong>demo@drivefi.test</strong><br />
                        Demo password: <strong>drivefi123</strong>
                    </p>
                </form>
            </section>
        </main>
    );
}
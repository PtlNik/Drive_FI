import React, { useState } from "react";
import "./RiderProfile.css";

const PROFILE_KEY = "drivefi.demo.rider.profile";

const demoProfile = {
    name: "Muath othman",
    phone: "+358 40 123 4567",
    email: "Mr_cool_professor@gmail.com",
    home: "Earth",
};

const fields = [
    { key: "name", label: "Name", type: "text" },
    { key: "phone", label: "Phone", type: "tel" },
    { key: "email", label: "Email", type: "email" },
    { key: "home", label: "Home", type: "text" },
];

function loadProfile() {
    try {
        const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");

        return {
            ...demoProfile,

            name: localStorage.getItem("drivefi.demo.rider.name") || demoProfile.name,
            ...saved,
        };
    } catch {
        return { ...demoProfile };
    }
}

export default function RiderProfile({ rideCount, onLogout }) {
    const [profile, setProfile] = useState(loadProfile);
    const [draft, setDraft] = useState(profile);
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");

    function startEditing() {
        setDraft({ ...profile });
        setMessage("");
        setEditing(true);
    }

    function saveProfile(event) {
        event.preventDefault();

        const updated = Object.fromEntries(
            fields.map(({ key }) => [key, draft[key].trim()])
        );

        if (fields.some(({ key }) => !updated[key])) {
            setMessage("Please fill in each field.");
            return;
        }

        try {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
            setProfile(updated);
            setEditing(false);
            setMessage("Profile saved.");
        } catch {
            setMessage("Could not save your changes in this browser.");
        }
    }

    return (
        <section className="rp">
            <header className="rp-header">
                <div className="rp-avatar" aria-hidden="true">
                    {profile.name.charAt(0).toUpperCase()}
                </div>
                <h2>{profile.name}</h2>
                <p>
                    ★ 4.9 · {rideCount} {rideCount === 1 ? "ride" : "rides"}
                </p>
            </header>

            {editing ? (
                <form className="rp-stack" onSubmit={saveProfile}>
                    {fields.map(({ key, label, type }) => (
                        <label className="rp-edit-field" key={key}>
                            {label}
                            <input
                                type={type}
                                value={draft[key]}
                                onChange={(event) =>
                                    setDraft({ ...draft, [key]: event.target.value })
                                }
                                required
                            />
                        </label>
                    ))}

                    <button className="rp-button rp-dark" type="submit">
                        Save changes
                    </button>
                    <button
                        className="rp-button"
                        type="button"
                        onClick={() => {
                            setEditing(false);
                            setMessage("");
                        }}
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <div className="rp-stack">
                    {fields.slice(1).map(({ key, label }) => (
                        <div className="rp-detail" key={key}>
                            <span className={`rp-dot rp-dot-${key}`} aria-hidden="true" />
                            <div>
                                <span className="rp-label">{label}</span>
                                <span className="rp-value">{profile[key]}</span>
                            </div>
                        </div>
                    ))}

                    <button className="rp-button" onClick={startEditing}>
                        Edit profile
                    </button>
                    <button className="rp-button rp-dark" onClick={onLogout}>
                        Log out
                    </button>
                </div>
            )}

            {message && <p className="rp-message" role="status">{message}</p>}
        </section>
    );
}
import { useState } from "react";
import LiveMap from "./LiveMap.jsx";
import "./FarePage.css";

function App() {
  const [destination, setDestination] = useState("");
  const [page, setPage] = useState("home");
  const [fare, setFare] = useState(12);

  function plus() {
    setFare(fare + 1);
  }

  function minus() {
    if (fare > 1) {
      setFare(fare - 1);
    }
  }
  return (
    <div className="page">

      <div className="header">
        <div className="logo">
          <h2>DriveFI<span className="green">.</span></h2>
        </div>

        <div className="steps">
         <div className={"step" + (page === "home" ? " active" : "")}><span className="num">01</span> Your route</div>
            <div className={"step" + (page === "fare" ? " active" : "")}><span className="num">02</span> Your fare</div>
          <div className="step"><span className="num">03</span> Your driver</div>
          <div className="step"><span className="num">04</span> Your ride</div>
        </div>
      </div>
      

             <LiveMap />
        <button className="menu">☰</button>
        
{page === "home" ? (
            <div className="card">
              <h1>Where to?</h1>

              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />

              <div className="place">
                <span className="place-dot lime"></span>
                <div>
                  <p className="label">Home</p>
                  <p className="address">karamalmi</p>
                </div>
              </div>

              <button className="offer" onClick={() => setPage("fare")}>Offer your fare</button>
            </div>
          ) : (
            <div className="card">
              <h1>Offer your fare</h1>

              <div className="fare-box">
                <span className="fare-dot fare-lime"></span>
                <div>
                  <p className="fare-label">Pickup</p>
                  <p className="fare-value">Current location</p>
                </div>
              </div>

              <div className="fare-box">
                <span className="fare-dot fare-black"></span>
                <div>
                  <p className="fare-label">Destination</p>
                  <p className="fare-value">{destination || "Not selected"}</p>
                </div>
              </div>

              <div className="fare-box fare-money-box">
                <button className="fare-round fare-minus" onClick={minus}>-</button>
                <div className="fare-middle">
                  <p className="fare-price">€ {fare.toFixed(2)}</p>
                </div>
                <button className="fare-round fare-plus" onClick={plus}>+</button>
              </div>

              <div className="fare-box">
                <span className="fare-dot fare-grey"></span>
                <div>
                  <p className="fare-label">Payment</p>
                  <p className="fare-value">Cash</p>
                </div>
              </div>

              <button className="fare-find">Find a driver</button>
              <button className="offer" style={{ marginTop: "10px", background: "#f2f2f5" }} onClick={() => setPage("home")}>Back</button>
            </div>
          )}
    </div>
  );
}

export default App;

import { useState } from "react";
import LiveMap from "./LiveMap.jsx";
import "./FarePage.css";

function App() {
  const [destination, setDestination] = useState("");
  const [page, setPage] = useState("home");

if (page === "fare") {
  return <FarePage />;
}
  return (
    <div className="page">

      <div className="header">
        <div className="logo">
          <h2>DriveFI<span className="green">.</span></h2>
        </div>

        <div className="steps">
          <div className="step active"><span className="num">01</span> Your route</div>
          <div className="step"><span className="num">02</span> Your fare</div>
          <div className="step"><span className="num">03</span> Your driver</div>
          <div className="step"><span className="num">04</span> Your ride</div>
        </div>
      </div>
      

             <LiveMap />
        <button className="menu">☰</button>
        
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
      </div>
    </div>
  );
}

export default App;

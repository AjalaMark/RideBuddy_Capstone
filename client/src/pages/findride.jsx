import "../assets/PostRide.css";
import "../assets/Home.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";


const findride = () => {
return (
    
    <div>
        <header className="text-white">
        <Navbar textColor="text-white" />
        <SearchBar />
      </header>
      <main className="main-container">
        <h1>Find a Ride</h1>
        <div className="rides-container">
          {rides.map(ride => (
            <div className="ride-card" key={ride.id}>
              <img src={ride.image} alt={ride.driver} />
              <div className="ride-details">
                <h2>{ride.driver}</h2>
                <p>{ride.route}</p>
                <p>Leaving: {ride.departure}</p>
                <p>Returning: {ride.return}</p>
                <p>Pickup: {ride.pickup}</p>
                <p>Dropoff: {ride.dropoff}</p>
              </div>
              <div className="ride-price-container">
                <div className="ride-price">${ride.price}</div>
                <div className="seats-left">{ride.seats} seats left</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
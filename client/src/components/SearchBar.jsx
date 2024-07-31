import "../assets/SearchBar.css"
const SearchBar = () => {
  return (
    <div>
      <section id="header" className="bg-light p-4">
        <div className="main-container">
          <div className="row">
            <div className="col-md-2 f-element">
              {/* <label>From</label> */}
              <input
                type="text"
                className="bkg"
                placeholder="From"
                id="input-from"
              />
            </div>
            <div className="col-md-2 m-element">
              {/* <label>To</label> */}
              <input
                type="text"
                className="bkg"
                placeholder="To"
                id="input-to"
              />
            </div>
            <div className="col-md-2 m-element">
              {/* <label>Date</label> */}
              <input type="date" className="bkg" placeholder="Date" id="input-date" />
            </div>
            <div className="col-md-2 m-element">
              {/* <label>Passenger</label> */}
              <input
                type="text"
                className="bkg "
                placeholder="Passenger" 
                id="input-passenger"
              />
            </div>
            <div className="col-md-2 l-element">
              <button id="click-btn" className="btn btn-warning w-100 " >Search</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;

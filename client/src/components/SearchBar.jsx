const SearchBar = () => {
  return (
    <div>
      <section id="header" className="bg-light p-4">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-2">
              <label>From <input
                type="text"
                className="form-control"
                placeholder="Enter origin"
              /></label>
              
            </div>
            <div className="col-md-2">
              <label>To <input
                type="text"
                className="form-control"
                placeholder="Enter destination"
              /></label>
              
            </div>
            <div className="col-md-2">
              <label htmlFor="search-date-input">Date</label>
              <input type="date" className="form-control" id="search-date-input"/>
            </div>
            <div className="col-md-2">
              <label>Passenger <input
                type="text"
                className="form-control"
                placeholder="Passenger"
              /></label>
              
            </div>
            <div className="col-md-2">
              <button className="btn btn-warning w-100 mt-3">Search</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;

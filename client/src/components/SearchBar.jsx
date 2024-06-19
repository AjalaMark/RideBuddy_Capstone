const SearchBar = () => {
  return (
    <div>
      <section id="header" className="bg-light p-4">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-2">
              <label>From</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter origin"
              />
            </div>
            <div className="col-md-2">
              <label>To</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter destination"
              />
            </div>
            <div className="col-md-2">
              <label>Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-2">
              <label>Passenger</label>
              <input
                type="text"
                className="form-control"
                placeholder="Passenger"
              />
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

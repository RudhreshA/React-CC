import React, { useState, useEffect } from "react";
import './Home.css';

function Home() {
  const [donors, setDonors] = useState([]);
  const [searchBloodType, setSearchBloodType] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [formError, setFormError] = useState("");
  
  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donorData = {
      id: Date.now().toString(),
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      bloodType: e.target["blood-type"].value,
      donationDate: e.target["donation-date"].value,
    };

    // Basic validation
    if (!donorData.name || !donorData.email || !donorData.phone || !donorData.bloodType || !donorData.donationDate) {
      setFormError("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
      });

      if (!response.ok) throw new Error('Failed to add donor');

      alert("Donor data submitted successfully!");
      fetchDonors(); // Reload donors after adding a new one
      e.target.reset(); // Clear form
      setFormError("");
    } catch (error) {
      console.error("Error adding donor:", error);
      alert("There was an error submitting donor data. Please try again.");
    }
  };

  const fetchDonors = async () => {
    try {
      const response = await fetch('http://localhost:3000/donors');
      if (!response.ok) throw new Error('Failed to fetch donors');
      const data = await response.json();
      setDonors(data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  const handleSearch = () => {
    if (!searchBloodType) {
      setFilteredDonors([]);
      return;
    }
    const result = donors.filter(donor => donor.bloodType === searchBloodType);
    setFilteredDonors(result);
  };

  return (
    <div className="home-container">
      <div className="blood-donation-container" id="bl">
        <h1>Blood Donation Application</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />

          <label htmlFor="blood-type">Blood Type:</label>
          <select id="blood-type" name="blood-type" required>
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <label htmlFor="donation-date">Donation Date:</label>
          <input type="date" id="donation-date" name="donation-date" required />
          
          {formError && <p className="error">{formError}</p>}
          
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="search-container">
        <h2>Find a Donor</h2>
        <label htmlFor="search-blood-type">Blood Type:</label>
        <select
          id="search-blood-type"
          onChange={(e) => setSearchBloodType(e.target.value)}
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <button onClick={handleSearch}>Search</button>

        <div className="donor-results">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor, index) => (
              <div key={index} className="donor-card">
                <p><strong>Name:</strong> {donor.name}</p>
                <p><strong>Blood Type:</strong> {donor.bloodType}</p>
                <p><strong>Donation Date:</strong> {donor.donationDate}</p>
                <p><strong>Phone No:</strong> {donor.phone}</p>
              </div>
            ))
          ) : (
            <p>No donors found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

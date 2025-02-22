import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AdminDashboard = () => {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/brands`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands", error);
    }
  };

  const addBrand = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/brands`,
        { name: newBrand },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewBrand("");
      fetchBrands();
    } catch (error) {
      console.error("Error adding brand", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Admin Dashboard</h1>
      <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          placeholder="Enter brand name"
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
        <button onClick={addBrand} style={{ backgroundColor: "#007bff", color: "white", padding: "10px", border: "none", borderRadius: "5px" }}>
          Add Brand
        </button>
      </div>
      <h2 style={{ fontSize: "18px" }}>Existing Brands</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand._id}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

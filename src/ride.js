// RideComponent.js
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from './contexts/authcontext'; // Adjust the path as necessary
import { callApi } from './api/api'; // Adjust the path as necessary

const RideComponent = () => {
  const { accessToken } = useContext(AuthContext);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [rideInfo, setRideInfo] = useState(null);

  // 'fetchRideData' function is now accessible within 'useEffect' and 'onClick' handler
  const fetchRideData = async () => {
    try {
      if (accessToken) {
        const endpoint = `${API_BASE_URL}/ride`;
        const method = "POST";
        const body = {
          PickupLocation: {
            Latitude: 47.6174755835663,
            Longitude: -122.28837066650185
          }
        };
        console.log(accessToken)
        const rideData = await callApi(endpoint, accessToken, method, body);
        console.log('Ride data:', rideData);
        setRideInfo(rideData);
      }
    } catch (error) {
      console.error('Failed to fetch ride data:', error);
      // Handle error here
    }
  };

  return (
    <div>
      <button onClick={fetchRideData}>Get a Ride</button>
      {rideInfo && (
        <div>
          {/* Render your ride information here */}
          <p>Ride Details: {JSON.stringify(rideInfo)}</p>
        </div>
      )}
    </div>
  );
};

export default RideComponent;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const categorizeByPriceRange = (Events) => {
  const ranges = [
    { name: '1000-5000', min: 1000, max: 5000, count: 0 },
    { name: '5001-10000', min: 5001, max: 10000, count: 0 },
    { name: '10001-15000', min: 10001, max: 15000, count: 0 },
    { name: '15001-20000', min: 15001, max: 20000, count: 0 },
    { name: '20001-25000', min: 20001, max: 25000, count: 0 },
    { name: '25001+', min: 25001, max: Infinity, count: 0 },
  ];

  Events.forEach(product => {
    for (let range of ranges) {
      if (product.price >= range.min && product.price <= range.max) {
        range.count += 1;
        break;
      }
    }
  });

  return ranges;
};

const PriceBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/Events`);
        const categorizedData = categorizeByPriceRange(response.data);
        setData(categorizedData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceBarChart;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import CardComponent from './cardComponent.js';
//import logo from "../routes/images/GettyImages-1066324992_0.webp";

const HomePage = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/getAll');
      const cards = await Promise.all(response.data.map(async (card) => {
      const photoResponse = await axios.get(`http://localhost:8080/user/getPhoto/${card.id}`, {
          responseType: 'blob', // Set the responseType to 'blob'
        });
        const blobUrl = URL.createObjectURL(photoResponse.data);
        return { ...card, blobUrl };
      }));
      setCardsData(cards);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    // <div style={{ backgroundImage: `url(${logo})` , backgroundSize: 'cover' }}>
<Grid container spacing={2} style={{ paddingTop: '20px'} }>
     {cardsData.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
        <CardComponent
          key={card.id}
          title={card.title}
          //imageId={card.imageId}
          summary={card.interest}
          firstName={card.firstName}
          lastName={card.lastName}
          infosysEmail={card.infosysEmail}
          employeeID={card.employeeID}
          blobUrl={card.blobUrl} 
          resumeId={card.id}
          />
            </Grid>
          ))}
      </Grid>
    // </div>
  );
};

export default HomePage;
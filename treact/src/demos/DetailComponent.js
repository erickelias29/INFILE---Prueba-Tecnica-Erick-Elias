import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/FullWidthWithImage.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Blog from "components/blogs/GridWithFeaturedPost.js";

export default function Page() {
  const location = useLocation();
  const [noticia, setNoticia] = useState(null);
  const [error, setError] = useState(null);

  // Parse the query string
  const queryParams = queryString.parse(location.search);
  const noticiaId = queryParams.id;

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await axios.get(`http://localhost:3900/api/getNoticiaById/${noticiaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setNoticia(response.data);
      } catch (error) {
        console.error("Failed to fetch noticia:", error);
        setError(error);
      }
    };

    if (noticiaId) {
      fetchNoticia();
    }
  }, [noticiaId]);

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (!noticia) {
    return <div>Loading...</div>;
  }

  return (
    <AnimationRevealPage>
      <Hero />
      {/* Asegúrate de que noticia no es null antes de intentar acceder a sus propiedades */}
      <MainFeature textOnLeft={true} data={noticia} />
      <Blog data={noticia}/>
    </AnimationRevealPage>
  );
}
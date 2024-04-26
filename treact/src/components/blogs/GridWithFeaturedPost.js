import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/FullWidthWithImage.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Blog from "components/blogs/GridWithFeaturedPost.js";
import { SectionHeading } from "components/misc/Headings.js";
import tw from "twin.macro";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { useNavigate } from 'react-router-dom';

const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const PopularPostsContainer = tw.div`lg:w-full`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)(props => [
  `background-image: url("${props.$imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = styled.p`
  ${tw`mt-2 font-medium text-secondary-100 leading-loose text-sm`}
  text-align: justify;
`;
const AuthorInfo = tw.div`mt-6 flex items-center`;
const AuthorImage = tw.img`w-12 h-12 rounded-full`;
const AuthorNameAndProfession = tw.div`ml-4`;
const AuthorName = tw.h6`font-semibold text-lg`;
const AuthorProfile = tw.p`text-secondary-100 text-sm`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``

export default function Page() {
  const location = useLocation();
  const [noticia, setNoticia] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 3;

  const queryParams = queryString.parse(location.search);
  const noticiaId = queryParams.id;

  const navigate = useNavigate(); 

  const handlePostClick = (postId) => {
    // Redirige a la página de detalles con el ID del post
    navigate(`/components/landingPages/NewsDetailLandingPage?id=${postId}`);
  };

  

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await axios.get(`http://localhost:3900/api/getNoticiasRecomendadas/${noticiaId}`, {
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

  if (!noticia || !noticia.noticiasRecomendadas) {
    return <div>Loading...</div>;
  }

  const indexOfLastnews = currentPage * newsPerPage;
  const indexOfFirstnews = indexOfLastnews - newsPerPage;
  const currentNews = noticia.noticiasRecomendadas.slice(indexOfFirstnews, indexOfLastnews);
  const pageCount = Math.ceil(noticia.noticiasRecomendadas.length / newsPerPage);


  return (
    <Container>
      <Content>
        <PopularPostsContainer>
          <Heading>Noticias Recomendadas</Heading>
          <PostsContainer>
            {currentNews.map((post, index) => (
              <Post key={index} onClick={() => handlePostClick(post._id)} initial="rest" whileHover="hover" animate="rest">
                <Image $imageSrc={post.imagen} />
                <Title>{post.titulo}</Title>
                <Description>{post.descripcion}</Description>
              </Post>
            ))}
          </PostsContainer>
        </PopularPostsContainer>
      </Content>
    </Container>
  );
}
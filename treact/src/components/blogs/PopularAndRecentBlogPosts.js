import React, { useState, useEffect } from 'react';
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
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
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const isLoggedIn = localStorage.getItem("token");

export default () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 3;
  // This setting is for animating the post background image on hover
  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%"
    },
    hover: {
      backgroundSize: "110%"
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    const url = 'http://localhost:3900/api/getNoticias';
    const jwt = localStorage.getItem('token'); 

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}` 
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setPopularPosts(data.noticias);
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
      // Aquí puedes manejar cómo mostrar el error al usuario
    });
  }, []);

  const indexOfLastnews = currentPage * newsPerPage;
  const indexOfFirstnews = indexOfLastnews - newsPerPage;
  // const categoria = props.categoria
  // const tempPopularPosts = prompt.categoria ? popularPosts.map(element => element.categoria.includes(categoria)) : popularPosts
  // const currentnews = tempPopularPosts.slice(indexOfFirstnews, indexOfLastnews);
  const currentnews = popularPosts.slice(indexOfFirstnews, indexOfLastnews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageCount = Math.ceil(popularPosts.length / newsPerPage);

  const navigate = useNavigate(); 
  
  

  const handlePostClick = (postId) => {
    // Redirige a la página de detalles con el ID del post
    if(!isLoggedIn){navigate(`/components/innerPages/LoginPage`);}else{navigate(`/components/landingPages/NewsDetailLandingPage?id=${postId}`);}
    
  };

  return (
    <Container>
      <Content>
        <PopularPostsContainer>
          <Heading>Noticias Populares</Heading>
          <PostsContainer>
            {currentnews.map((post, index) => (
              <Post key={index} onClick={() => handlePostClick(post._id)} initial="rest" whileHover="hover" animate="rest">
                <Image
                  transition={{ duration: 0.3 }}
                  variants={postBackgroundSizeAnimation}
                  $imageSrc={post.imagen}
                />
                <Title>{post.titulo}</Title>
                <Description>{post.descripcion}</Description>
                {/* Agrega aquí más información si la tienes */}
              </Post>
            ))}
          </PostsContainer>
          <div tw="flex justify-center mt-8">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              tw="mx-2 px-4 py-2 text-sm font-semibold border rounded hover:bg-gray-100"
            >
              Anterior
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                tw="mx-2 px-4 py-2 text-sm font-semibold border rounded hover:bg-gray-100"
                style={{ backgroundColor: currentPage === i + 1 ? '#4299e1' : '', color: currentPage === i + 1 ? 'white' : '' }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              tw="mx-2 px-4 py-2 text-sm font-semibold border rounded hover:bg-gray-100"
            >
              Siguiente
            </button>
          </div>
        </PopularPostsContainer>
      </Content>
    </Container>
  );
};

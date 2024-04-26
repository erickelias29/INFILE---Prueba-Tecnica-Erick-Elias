import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 lg:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0`,
  props.textOnLeft ? tw`md:mr-8 lg:mr-16 md:order-first` : tw`md:ml-8 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-cover bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8`;

const Heading = tw(SectionHeading)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = styled.p`
  ${tw`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`}
  text-align: justify;
`;

const ButtonContainer = tw.div`flex justify-end items-end w-full px-8 md:px-0`;

const CategoryContainer = tw.div`mt-4 flex flex-wrap items-center justify-center`;
const Category = tw.span`text-sm font-medium text-gray-700 bg-gray-200 rounded-full px-3 py-1 m-1`;
const DatePublished = tw.span`text-sm font-medium text-gray-700 mt-4`;

const ReturnButton = styled(PrimaryButtonBase)`
  ${tw`tracking-wide font-semibold bg-primary-500 text-gray-100 py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  width: fit-content;
`;

export default function ComponentWithReturn({ textOnLeft = false, data }) {
  const navigate = useNavigate();  // Utiliza el hook useNavigate

  const goBack = () => {
    navigate('/');  // Navegar a la página de inicio
  };

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={data.noticias.imagen} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{data.noticias.titulo}</Heading>
            <Description>{data.noticias.cuerpo}</Description>
            <CategoryContainer>
              {data.noticias.categoria.map((category, index) => (
                <Category key={index}>{category}</Category>
              ))}
            </CategoryContainer>
            <div tw="mt-10" />
            <Description>{data.noticias.fecha_publicacion}</Description>
            <Description>{data.noticias.autor}</Description>
          </TextContent>
        </TextColumn>
      </TwoColumn>
      <ButtonContainer>
        <ReturnButton onClick={goBack}>
          Regresar
        </ReturnButton>
      </ButtonContainer>
    </Container>
  );
}
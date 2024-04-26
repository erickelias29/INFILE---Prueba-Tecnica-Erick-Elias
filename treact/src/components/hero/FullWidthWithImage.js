import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Dropdown, DropdownItem } from "./DropDown.js";
import Header, { LogoLink, NavLinks as NavLinksBase, NavLink as NavLinkBase } from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-sm sm:mx-6
`;

const NavLinks = tw(NavLinksBase)`
  block md:flex md:flex-row md:items-center md:justify-between
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;

export default () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      const jwt = localStorage.getItem('token');
      const response = await fetch('http://localhost:3900/api/getCategorias', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`  // Include the JWT in the Authorization header
        }
      });
      if (response.ok) {
        const data = await response.json();
        if(data.status === 'success' && Array.isArray(data.categorias)) {
          setCategorias(data.categorias);  // Now setting the correct part of the response
        } else {
          console.error("Invalid data structure:", data);
          // Handle situation where data does not have the expected structure
        }
      } else {
        console.error("Failed to fetch categories:", response.status);
      }
    };

    fetchCategorias();
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="/">Home</NavLink>
      <Dropdown label="Categorias">
        {categorias.map((categoria) => (
          <DropdownItem key={categoria._id} href="#">
            {categoria.nombre}
          </DropdownItem>
        ))}
      </Dropdown>
      {isLoggedIn && <NavLink href="#" onClick={handleLogout}>Log Out</NavLink>}
      {!isLoggedIn && <NavLink href="/components/innerPages/LoginPage">Login</NavLink>}
    </NavLinks>
  ];

  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
        </LeftColumn>
        <RightColumn />
      </TwoColumn>
    </Container>
  );
};
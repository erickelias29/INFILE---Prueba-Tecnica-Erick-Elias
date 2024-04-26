import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const DropdownContainer = styled.div`
  ${tw`relative`}
`;

const DropdownButton = styled.button`
  ${tw`text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded inline-flex items-center`}
`;

const DropdownContent = styled.div`
  ${tw`absolute right-0 w-48 bg-white shadow-lg mt-2 z-10`}
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.a`
  ${tw`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
`;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    return (
      <DropdownContainer>
        <DropdownButton onClick={this.toggleDropdown}>
          {this.props.label}
        </DropdownButton>
        <DropdownContent isOpen={this.state.isOpen}>
          {this.props.children}
        </DropdownContent>
      </DropdownContainer>
    );
  }
}

export { Dropdown, DropdownItem };
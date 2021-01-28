import React from 'react';
import {Header, Body, Title} from 'native-base';

export default function HeaderNoLeft({title}) {
  return (
    <Header noLeft>
      <Body>
        <Title>{title}</Title>
      </Body>
    </Header>
  );
}

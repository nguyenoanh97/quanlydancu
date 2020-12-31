import React, {Fragment} from 'react';
import {
  Button,
  Header,
  Left,
  Icon,
  Body,
  Title,
  Item,
  Input,
  Text,
} from 'native-base';

export default function HeaderBase({
  onPressLeft,
  title,
  type,
  onBlur,
  onChangeText,
}) {
  return (
    <Fragment>
      {type === 'search' ? (
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Nhập mã cư dân..."
              autoFocus={true}
              onBlur={onBlur}
              onChangeText={onChangeText}
              keyboardType="numeric"
            />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      ) : (
        <Header>
          <Left>
            <Button transparent onPress={onPressLeft}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
        </Header>
      )}
    </Fragment>
  );
}

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
  Right,
} from 'native-base';

export default function HeaderBase({
  onPressLeft,
  title,
  type,
  onBlur,
  onChangeText,
  rightTitle,
  onPressRight,
  placeholder,
  nameIcon,
}) {
  return (
    <Fragment>
      {type === 'search' ? (
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder={placeholder}
              autoFocus={true}
              onBlur={onBlur}
              onChangeText={onChangeText}
              keyboardType="numeric"
            />
            <Icon name={nameIcon} />
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
          {rightTitle && (
            <Right>
              <Button hasText transparent onPress={onPressRight}>
                <Icon name="ios-pencil" />
              </Button>
            </Right>
          )}
        </Header>
      )}
    </Fragment>
  );
}

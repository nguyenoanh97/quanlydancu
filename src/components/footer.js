import React, {Fragment} from 'react';
import {Button, FooterTab, Text, Footer} from 'native-base';
import {StyleSheet} from 'react-native';

export default function FooterBase({
  type,
  onPressCenter,
  title,
  disabled,
  onPressLeft,
  onPressRight,
}) {
  return (
    <Footer>
      <FooterTab>
        {type === 'oneButton' ? (
          <Button primary onPress={onPressCenter} disabled={disabled}>
            <Text style={styles.textButton}>{title}</Text>
          </Button>
        ) : (
          <Fragment>
            <Button light onPress={onPressLeft}>
              <Text style={styles.buttonDivide}>{'Quay lại'}</Text>
            </Button>
            <Button primary onPress={onPressRight}>
              <Text style={styles.buttonDivide}>Lọc theo phường, xã</Text>
            </Button>
          </Fragment>
        )}
      </FooterTab>
    </Footer>
  );
}

const styles = StyleSheet.create({
  textButton: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  buttonDivide: {
    fontSize: 12,
    color: '#fff',
  },
});

import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {Spinner} from 'native-base';
const Loading = ({data}) => {
  return (
    <Modal
      transparent
      visible={data?.visible}
      animated="slide"
      onRequestClose={() => {}}
      statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.card}>
          <Spinner color="blue" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;

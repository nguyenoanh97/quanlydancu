import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {home, homeActived, profile, profileActive} from '../../assets/images';

const primaryColor = '#FC8A1B';

const TabItem = ({index, icon, active, onPress}) => (
  <View style={styles.menuItem}>
    <TouchableOpacity
      onPress={() => onPress(index)}
      style={[styles.item, active ? styles.active : {}]}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  </View>
);

const TabBar = ({state, navigation}) => {
  const background = {backgroundColor: '#fff'};
  const {index} = state;
  const iconHome = index === 0 ? homeActived : home;
  const iconProfile = index === 1 ? profileActive : profile;

  const renderPadding = () => {
    if (Dimensions.get('window').height >= 812) {
      return 30;
    } else {
      return 0;
    }
  };

  const renderHeight = () => {
    if (Dimensions.get('window').height >= 812) {
      return 84;
    } else {
      return 54;
    }
  };

  const onPress = (key) => {
    navigation.navigate(state.routeNames[key]);
  };

  return (
    <View style={[background]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={[
          styles.tabbar,
          background,
          {paddingBottom: renderPadding(), height: renderHeight()},
        ]}>
        <TabItem
          index={0}
          icon={iconHome}
          active={index === 0}
          onPress={onPress}
        />
        <TabItem
          index={1}
          icon={iconProfile}
          active={index === 1}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  menuItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: '100%',
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    borderTopColor: primaryColor,
    borderTopWidth: 2,
  },
  icon: {
    width: 22,
    height: 22,
  },
});

export default TabBar;

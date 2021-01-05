import React, {useState, useEffect, Fragment} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Root} from 'native-base';
import {
  ADD_HOUSEHOLD,
  ADD_RESIDENT,
  DETAIL_PROFILE,
  HOME,
  LOGIN,
  MANAGEMENT,
  PROFILE,
  SEARCH,
  STACK_TAB,
} from './src/core/utils/screen_names';
import Login from './src/screens/login/login';
import Home from './src/screens/home/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from './src/core/utils/async_key';
import TabBar from './src/components/TabBar';
import Profile from './src/screens/profile/profile';
import AddResident from './src/screens/add_resident/add_resident';
import {ModalWrapper} from './src/components/modal/modal';
import Search from './src/screens/search/search';
import DetailProfile from './src/screens/detail_profile/detail_profile';
import AddHousehold from './src/screens/add_household/add_household';
import Management from './src/screens/management/management';
import moment from 'moment';
import 'moment/locale/vi';
import SplashScreen from 'react-native-splash-screen';
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

let initScreen = LOGIN;

function App() {
  const [auth, setAuth] = useState(false);
  const getUser = async () => await AsyncStorage.getItem(USER);

  useEffect(() => {
    moment().locale('vi');
    getUser().then((value) => {
      if (value !== null) {
        initScreen = STACK_TAB;
      }
      setAuth(true);
      SplashScreen.hide();
      global.user = JSON.parse(value);
      console.log('value', value);
    });
  }, []);

  const screenOptions = {headerShown: false};

  console.log('auth', auth, initScreen);

  const StackTab = () => (
    <Tabs.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name={HOME} component={Home} />
      <Tabs.Screen name={PROFILE} component={Profile} />
    </Tabs.Navigator>
  );

  return (
    <Fragment>
      {auth ? (
        <Root>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={screenOptions}
              initialRouteName={initScreen}>
              <Stack.Screen name={STACK_TAB} component={StackTab} />
              <Stack.Screen name={LOGIN} component={Login} />
              <Stack.Screen name={ADD_RESIDENT} component={AddResident} />
              <Stack.Screen name={SEARCH} component={Search} />
              <Stack.Screen name={DETAIL_PROFILE} component={DetailProfile} />
              <Stack.Screen name={ADD_HOUSEHOLD} component={AddHousehold} />
              <Stack.Screen name={MANAGEMENT} component={Management} />
            </Stack.Navigator>
          </NavigationContainer>
          <ModalWrapper />
        </Root>
      ) : (
        <View />
      )}
    </Fragment>
  );
}

export default App;

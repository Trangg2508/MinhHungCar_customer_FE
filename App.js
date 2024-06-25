import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import OTPScreen from './screens/OTPScreen'
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import { Image } from 'react-native';
import FavoriteScreen from './screens/FavoriteScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingScreen from './screens/SettingScreen';
import ListProductScreen from './screens/ListProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import DrivingLicenseScreen from './screens/DrivingLicenseScreen';
import PaymentInformationScreen from './screens/PaymentInformationScreen';
import NotificationScreen from './screens/NotificationScreen';
import AuthConTextProvider, { AuthConText } from './store/auth-context';
import ContractScreen from './screens/ContractScreen';

const Stack = createNativeStackNavigator();
const Bottoms = createBottomTabNavigator();

const GlobalStyles = {
  colors: {
    backgroundColorActive: '#773BFF',
    backgroundColorInactive: '#6C6C6C',
  },
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login" component={SignInScreen} />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="Register"
        component={SignUpScreen}
      />
      <Stack.Screen
        name='OTP'
        options={{
          headerShown: false
        }}
        component={OTPScreen}
      />
    </Stack.Navigator>
  );
}

const BottomTabs = () => {
  return (
    <Bottoms.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: GlobalStyles.colors.backgroundColorActive,
        tabBarInactiveTintColor: GlobalStyles.colors.backgroundColorInactive,
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarIcon: ({ focused }) => {
          let iconActive;
          let iconInactive;

          if (route.name === 'Home') {
            iconActive = require('./assets/home_active.png');
            iconInactive = require('./assets/home.png');
          } else if (route.name === 'Chat') {
            iconActive = require('./assets/chat_active.png');
            iconInactive = require('./assets/chat.png');
          } else if (route.name === 'Noti') {
            iconActive = require('./assets/bell_active.png');
            iconInactive = require('./assets/bell_bottom.png');
          } else if (route.name === 'History') {
            iconActive = require('./assets/car_active.png');
            iconInactive = require('./assets/car.png');
          } else if (route.name === 'Setting') {
            iconActive = require('./assets/account_active.png');
            iconInactive = require('./assets/account.png');
          }
          return (
            <Image
              source={focused ? iconActive : iconInactive}
              style={{ width: 24, height: 24 }}
            />
          );
        },
      })}
    >
      <Bottoms.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          headerShown: false,
        }}
      />
      <Bottoms.Screen
        name='Noti'
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          title: 'Thông báo'
        }}
      />
      <Bottoms.Screen
        name='History'
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Chuyến',
          title: 'Lịch sử'
          // headerShown: false,
        }}
      />
      <Bottoms.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <Bottoms.Screen
        name='Setting'
        component={SettingScreen}
        options={{
          tabBarLabel: 'Tôi',
          title: 'Tài khoản của tôi'
        }}
      />
    </Bottoms.Navigator>
  );
};

const AuthenticatedStack = () => {
  const navigate = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='BottomTabs'
        component={BottomTabs}
        options={{
          headerShown: false,
          title: ''
        }}
      />
      <Stack.Screen
        name='Detail'
        component={DetailScreen}
        options={{
          title: 'Chi tiết sản phẩm',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutScreen}
        options={{
          headerBackTitleVisible: false,
          title: 'Xác nhận đặt xe',
        }}
      />
      <Stack.Screen
        name='List'
        component={ListProductScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: false
        }}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerBackTitleVisible: false,
          title: 'Tài khoản của tôi',
        }}
      />
      <Stack.Screen
        name='Driving'
        component={DrivingLicenseScreen}
        options={{
          headerBackTitleVisible: false,
          title: 'Giấy phép lái xe',
        }}
      />
      <Stack.Screen
        name='PayInfo'
        component={PaymentInformationScreen}
        options={{
          headerBackTitleVisible: false,
          title: 'Thông tin thanh toán',
        }}
      />
      <Stack.Screen
        name='Contract'
        component={ContractScreen}
        options={{
          headerBackTitleVisible: false,
          title: 'Hợp đồng',
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthConText)
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const authCtx = useContext(AuthConText)

  useEffect(() => {
    async function prepare() {
      const fetchToken = async () => {
        const storedToken = await AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('id')
        if (storedToken) {
          authCtx.authenticate(storedToken)
        }
        setAppIsReady(false)
      }
      try {
        fetchToken()
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null
  }
  return <Navigation onLayout={onLayoutRootView} />
}

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <AuthConTextProvider>
        <Root />
      </AuthConTextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

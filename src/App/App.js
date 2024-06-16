import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import StackNavigator from "./navigators/StackNavigator";
import TabNavigator from "./navigators/TabNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log("userTokenAppJs:", userToken);
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          AsyncStorage.removeItem("userToken"); // Remove o token expirado
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // Ou algum componente de carregamento => ver depois
  }

  if (isLoggedIn) {
    return <TabNavigator />;
  } else {
    return <StackNavigator />;
  }
}

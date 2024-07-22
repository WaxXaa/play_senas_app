import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (correo, contra) => {
   setIsLoading(true);
 
   try {
     const response = await fetch('http://172.20.10.5:8080/users/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ email: correo, contra }), 
     });
 
     if (response.ok) {
       const data = await response.json(); 
       console.log("Response data:", data);
 
         const userInfo = { id: data.id, correo, nombre: data.nombre, apellido: data.apellido, contra: contra,tipo: data.tipo,exp: data.exp, fotoPerfil: data.fotoPerfil};
         setUserInfo(userInfo);
         setUserToken(data.id); 
         await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
         await AsyncStorage.setItem('userToken', data.id.toString());
     } else {
       const errorData = await response.json();
       alert(errorData.message || "Correo o contraseña incorrectos");
     }
   } catch (e) {
     console.log(`login error ${e}`);
     alert("Correo o contraseña incorrectos");
   } finally {
     setIsLoading(false);
   }
 };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async() => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');

      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo, setUserInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
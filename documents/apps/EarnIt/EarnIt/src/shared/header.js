import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import {
  Right,
  Button,
  
} from "native-base";
import { signOutUser, getCurrentUser } from "../functions/FireAuthHelper";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { globalStyles } from '../styles/global';

export const Header = ({ navigation, title }) => {
  //
  const openMenu = () => {
    navigation.openDrawer();
  };

    const [user, setUser] = useState(null);
  
    const signOut = () => {
      signOutUser()
        .then(() => {
          alert("User Signed out");
          navigation.navigate("LoginLanding");
        })
        .catch((error) => {
          alert(error);
        });
    };
  
    useEffect(() => {
      getCurrentUser()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          setUser(null);
          console.log(error);
        });
    }, []);

    if(getCurrentUser != false)

  return (
    <View style={styles.header}>
  
  <View style={styles.headerIcon}>
    <Icon name="bars" size={28} color="#fff" onPress={openMenu} style={styles.menuIcon} />
      </View> 
      <View style={styles.headerTitle}>
        <Image source={require('../assets/logo.png')} style={styles.headerLogo} />
        <Text style={styles.headerText}>{title}</Text>
  
      </View>
      <View style={styles.rubyContainer}>   
        <Text style={styles.rubyText}>Ruby's: 0</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
  },
  headerIcon: {
    width: '20%',
    paddingHorizontal: 5,
  },
  menuIcon: {
    paddingLeft: 20,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '55%',
   

  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
    paddingTop:15,
    paddingLeft:1
    
  },
  rubyContainer: {
    paddingRight:4,

  },
  rubyText: {
    fontSize:15,
    color: '#fff',
   
  },
});




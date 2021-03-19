import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import { useNavigation } from '@react-navigation/native';

import {AdsId, interstitial, reward} from '../functions/admob';
import { signOutUser, getCurrentUser } from "../service/FireAuthHelper";




const {OS} = Platform;
const Home = (props) => {
  



  const [intLoaded, setIntLoaded] = useState(false);
  const [rewardLoaded, setRewardLoaded] = useState(false);
  const [point, setPoint] = useState(0);
  const navigation = useNavigation();


  useEffect(() => {
    const IntEventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        setIntLoaded(true);
      }
      if (type === AdEventType.CLOSED) {
        setIntLoaded(false);
      }
    });

    return () => {
      IntEventListener();
    };
  }, []);

  useEffect(() => {
    const RewardEventListener = reward.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setRewardLoaded(true);
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        setRewardLoaded(false);
      }
    });

    return () => RewardEventListener();
  }, []);



  useEffect(() => {
    !intLoaded && interstitial.load();
    !rewardLoaded && reward.load();
  }, [rewardLoaded, intLoaded]);

 
  const handleAds = useCallback(
    (type) => {
      switch (type) {
        case 'int':
          if (intLoaded) {
            const show = async () => {
              await interstitial.show();
              setPoint(point + 1);
            };
            show();
          } else {
            Toast.show(
              "Sorry, we didn't load the interstital ad yet, please try again.",
              Toast.SHORT,
            );
          }
          break;
        case 'reward':
          if (rewardLoaded) {
            const show = async () => {
              await reward.show();
              setPoint(point + 10);
             
  
            };
            show();
          } else {
            Toast.show(
              "Sorry, we didn't load the reward ad yet, Please try again.",
              Toast.SHORT,
            );
          }
          break;
        default:
          break;
      }
    },
    [intLoaded, point, rewardLoaded],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome, name</Text>
        <Text style={styles.point}>My Ruby's: {point}</Text>
        <TouchableOpacity onPress={() => handleAds('int')}
           style={styles.grey}>
           <View style={styles.boxImage}>
                   <Image source={require('../assets/tictactoe.png')} style={styles.iconButton} />
            </View>
          <Text style={styles.label}>TICTACTOE</Text>
       
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAds('int')}
           style={styles.green}>
           <View style={styles.boxImage}>
                   <Image source={require('../assets/jigsaw.png')} style={styles.iconButton} />
            </View>
          <Text style={styles.label}>JIGSAW</Text>
          
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAds('int')} 
          style={styles.red}>
            <View style={styles.boxImage}>
                   <Image source={require('../assets/fortune-wheel.png')} style={styles.iconButton} />
            </View>
            <Text style={styles.label}>SPIN WHEEL</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAds('reward')}
          style={styles.orange}>
          <View style={styles.boxImage}>
                   <Image source={require('../assets/play.png')} style={styles.iconButton} />
            </View>
          <Text style={styles.label}>WATCH AD</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
        onPress={() => navigation.navigate('Scratch')}    
       style={styles.blue}>
       <View style={styles.boxImage}>
                   <Image source={require('../assets/card.png')} style={styles.iconButton} />
            </View>
          <Text style={styles.label}>SCRATCH</Text>
        </TouchableOpacity>
      
      </View>
     
      <BannerAd
        unitId={OS === 'ios' ? AdsId.ios.banner : AdsId.android.banner}
        size={BannerAdSize.SMART_BANNER}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  iconButton: {
    width: 30,
    height: 30,
  },
  boxImage: {
    paddingRight:7,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },
  title: {
    fontSize: 20,
    color: '#000',
    marginBottom: '5%',
  },
  point: {
    fontSize: 16,
    marginBottom: '3%',
  },
  grey:{
    backgroundColor: '#474747',
    paddingVertical: '3%',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: '3%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft:110
  },
  green:{
    backgroundColor: '#019e19',
    paddingVertical: '3%',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: '3%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft:125
  },
  orange:{
    backgroundColor: '#ed6b21',
    paddingVertical: '3%',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: '3%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft:110
  },
  red:{
    backgroundColor: '#ea2020',
    paddingVertical: '3%',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: '3%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft:107
  },
  blue:{
    backgroundColor: '#0e5dcc',
    paddingVertical: '3%',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: '3%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft:119
  },
 
  label: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});


export default Home;

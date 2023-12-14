import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {navigateAndSimpleReset} from '../navigation/NavigationRoutes';
import {useDispatch} from 'react-redux';
import {fetchAppList} from '../services/PostAPI';

const SplashScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppList());
    setTimeout(() => {
      // Navigate the app's main screen  after the splash screen duration
      navigateAndSimpleReset('homescreen');
    }, 3000); // Simulating a 3-second splash screen duration
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/coding.png')}
        style={styles.logo}
      />
      <Text style={styles.task}>Assignment</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  task: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
});

import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const APP_COLOR = '#2eb56f';

const HomeScreen = () => {
  const {data, loading, error} = useSelector((state: any) => state.app); //reading the redux state
  const [activeTab, setActiveTab] = useState('Applications');
  const [appList, setAPPList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // for removing only the second index item in array as per attached screenshot
  // const updatedArray = data.filter((item: any, index: any) => index !== 1);

  useEffect(() => {
    setAPPList(data);
  }, []);
  // for handle tab state change
  const handleTabChange = (tabName: any) => {
    setActiveTab(tabName);
  };
  // for handle search
  const handleSearch = (text: any) => {
    setSearchQuery(text);
    setAPPList((prevData: any) =>
      prevData.map((item: any) => {
        if (item?.app_name?.toLowerCase().includes(text.toLowerCase())) {
          return {...item, isHide: false};
        } else {
          return {...item, isHide: true};
        }
      }),
    );
  };
  // for handle toggle switch
  const toggleSwitch = (appId: any) => {
    setAPPList((prevData: any) =>
      prevData.map((item: any) =>
        item.app_id === appId
          ? {
              ...item,
              status: item.status === 'Active' ? 'Inactive' : 'Active',
            }
          : item,
      ),
    );
  };

  //   Flatlist render function
  const renderItem = ({item}: any) => {
    let isActive =
      item.status.trim().charAt(0).toUpperCase() + item.status.trim().slice(1);
    if (!item.isHide) {
      return (
        <View style={styles.item}>
          <View style={styles.renderContainer}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: item?.app_icon}}
              resizeMode={'cover'}></Image>
          </View>
          <Text style={styles.appName}>{item.app_name}</Text>
          <Switch
            trackColor={{false: '#D3D3D3', true: '#abf7b1'}}
            thumbColor={isActive === 'Active' ? APP_COLOR : 'white'}
            value={isActive === 'Active'}
            onValueChange={() => {
              toggleSwitch(item?.app_id);
            }}
            style={styles.toggleButton}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: APP_COLOR}}>
        <Pressable style={styles.headerBack} onPress={() => {}}>
          <MaterialIcons name="arrow-back-ios" color={'white'} size={20} />
        </Pressable>
        <View style={styles.imageContainer}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../assets/images/male.png')}
            resizeMode={'cover'}></Image>
        </View>
        <Text style={styles.profileName}>Sujovit</Text>
        <View style={styles.textContainer}>
          <Text style={styles.connectedText}>Connected</Text>
          <MaterialIcons
            style={{alignSelf: 'center'}}
            name="check-circle"
            color={APP_COLOR}
            size={20}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                borderBottomWidth: 5,
                borderBottomColor:
                  activeTab === 'Applications' ? 'white' : APP_COLOR,
              },
            ]}
            onPress={() => handleTabChange('Applications')}>
            <Text style={styles.tabText}>Applications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                borderBottomWidth: 5,
                borderBottomColor:
                  activeTab === 'Settings' ? 'white' : APP_COLOR,
              },
            ]}
            onPress={() => handleTabChange('Settings')}>
            <Text style={styles.tabText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Based on tabs */}
      {activeTab === 'Applications' ? (
        <View style={{flex: 1}}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.trim() === '' ? (
              <MaterialIcons
                style={{alignSelf: 'center', paddingHorizontal: 10}}
                name="search"
                color={'black'}
                size={25}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  handleSearch('');
                }}>
                <MaterialIcons
                  style={{alignSelf: 'center', paddingHorizontal: 10}}
                  name="cancel"
                  color={'black'}
                  size={25}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginTop: 10}}>
            {appList?.length ? (
              <FlatList
                data={appList}
                renderItem={renderItem}
                // keyExtractor={item => item.app_id.toString()}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text style={styles.noDataFound}>No Data Found</Text>
            )}
          </View>
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            Settings Tab
          </Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 5,
    borderBottomColor: 'white',
  },
  headerBack: {
    top: 25,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  item: {
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  noDataFound: {
    alignSelf: 'center',
    color: 'black',
    marginTop: screenHeight / 5.5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 20,
  },
  connectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  textContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: 'white',
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: 10,
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  appName: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
    paddingHorizontal: 10,
    maxWidth: '70%',
    fontWeight: '600',
  },
  renderContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

import { View, Text, StatusBar, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { Divider } from 'react-native-paper';

const CustomText = ({ children }) => {
  let colorStyle;
  let fontWeightStyle;

  switch (children) {
    case 'Hoàn thành':
      colorStyle = { color: '#15891A' };
      fontWeightStyle = { fontWeight: 'bold' };
      break;
    case 'Đang thuê':
      colorStyle = { color: '#24D02B' };
      fontWeightStyle = { fontWeight: 'bold' };
      break;
    case 'Đã hủy':
      colorStyle = { color: '#F11B1B' };
      fontWeightStyle = { fontWeight: 'bold' };
      break;
    case 'Đã đặt':
      colorStyle = { color: '#EE933E' };
      fontWeightStyle = { fontWeight: 'bold' };
      break;
    case 'Chờ duyệt':
      colorStyle = { color: '#985314' };
      fontWeightStyle = { fontWeight: 'bold' };
      break;
    default:
      colorStyle = {};
      fontWeightStyle = {};
  }

  return <Text style={[colorStyle, fontWeightStyle]}>{children}</Text>;
};


export default function HistoryScreen() {

  const [activeTab, setActiveTab] = useState('Hoàn thành');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView >
          <View style={styles.container}>

            {/* Tab */}
            <View style={styles.tabContainer}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
    <TouchableOpacity onPress={() => handleTabPress('Hoàn thành')} style={[styles.tabItem, activeTab === 'Hoàn thành' && styles.activeTabItem]}>
      <Text style={[styles.tabText, activeTab === 'Hoàn thành' && { color: '#773BFF', fontWeight: '600' }]}>Hoàn thành</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTabPress('Đang thuê')} style={[styles.tabItem, activeTab === 'Đang thuê' && styles.activeTabItem]}>
      <Text style={[styles.tabText, activeTab === 'Đang thuê' && { color: '#773BFF', fontWeight: '600' }]}>Đang thuê</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTabPress('Chờ duyệt')} style={[styles.tabItem, activeTab === 'Chờ duyệt' && styles.activeTabItem]}>
      <Text style={[styles.tabText, activeTab === 'Chờ duyệt' && { color: '#773BFF', fontWeight: '600' }]}>Chờ duyệt</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTabPress('Đã hủy')} style={[styles.tabItem, activeTab === 'Đã hủy' && styles.activeTabItem]}>
      <Text style={[styles.tabText, activeTab === 'Đã hủy' && { color: '#773BFF', fontWeight: '600' }]}>Đã hủy</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTabPress('Đã đặt')} style={[styles.tabItem, activeTab === 'Đã đặt' && styles.activeTabItem]}>
      <Text style={[styles.tabText, activeTab === 'Đã đặt' && { color: '#773BFF', fontWeight: '600' }]}>Đã đặt</Text>
    </TouchableOpacity>
  </ScrollView>
</View>


            {/* Card */}
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#773BFF', fontWeight: '600' }}>#209876527</Text>
                  <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>|</Text>
                  <Text style={{ fontWeight: '600' }}>09/05/2024</Text>
                </View>
                <CustomText>Hoàn thành</CustomText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
                  style={styles.cardImg}
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTag}>Biển số xe: K38BIG</Text>
                  <Text style={styles.cardTitle}>Tesla Model S</Text>
                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <Image
                        source={require('../assets/star.png')}
                        style={styles.cardRowItemImg}
                      />
                      <Text style={styles.cardRowItemText}>5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ color: '#808080' }}>1 sản phẩm</Text>
                <Text>Thành tiền: {' '}
                  <Text style={{ fontWeight: 'bold' }}>750.000 đ</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => {

                }}>
                  <View style={{ width: 106, height: 35, borderColor: '#773BFF', borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#773BFF', fontWeight: 'bold' }}>Đánh giá</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#773BFF', fontWeight: '600' }}>#209876527</Text>
                  <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>|</Text>
                  <Text style={{ fontWeight: '600' }}>09/05/2024</Text>
                </View>
                <CustomText>Đang thuê</CustomText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
                  style={styles.cardImg}
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTag}>Biển số xe: K38BIG</Text>
                  <Text style={styles.cardTitle}>Tesla Model S</Text>
                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <Image
                        source={require('../assets/star.png')}
                        style={styles.cardRowItemImg}
                      />
                      <Text style={styles.cardRowItemText}>5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>

                <Text style={{ color: '#808080' }}>1 sản phẩm</Text>
                <Text>Thành tiền: {' '}
                  <Text style={{ fontWeight: 'bold' }}>750.000 đ</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => {

                }}>
                  <View style={{ width: 115, height: 35, borderColor: '#5FB8DE', borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                    <Text style={{ color: '#5FB8DE', fontWeight: 'bold' }}>Chat với admin</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {

                }}>
                  <View style={{ width: 106, height: 35, backgroundColor: '#FF3B47', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Hủy chuyến</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#773BFF', fontWeight: '600' }}>#209876527</Text>
                  <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>|</Text>
                  <Text style={{ fontWeight: '600' }}>09/05/2024</Text>
                </View>
                <CustomText>Đã đặt</CustomText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
                  style={styles.cardImg}
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTag}>Biển số xe: K38BIG</Text>
                  <Text style={styles.cardTitle}>Tesla Model S</Text>
                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <Image
                        source={require('../assets/star.png')}
                        style={styles.cardRowItemImg}
                      />
                      <Text style={styles.cardRowItemText}>5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ color: '#808080' }}>1 sản phẩm</Text>
                <Text>Thành tiền: {' '}
                  <Text style={{ fontWeight: 'bold' }}>750.000 đ</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => {

                }}>
                  <View style={{ width: 106, height: 35, backgroundColor: '#FF3B47', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Hủy chuyến</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#773BFF', fontWeight: '600' }}>#209876527</Text>
                  <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>|</Text>
                  <Text style={{ fontWeight: '600' }}>09/05/2024</Text>
                </View>
                <CustomText>Chờ duyệt</CustomText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
                  style={styles.cardImg}
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTag}>Biển số xe: K38BIG</Text>
                  <Text style={styles.cardTitle}>Tesla Model S</Text>
                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <Image
                        source={require('../assets/star.png')}
                        style={styles.cardRowItemImg}
                      />
                      <Text style={styles.cardRowItemText}>5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ color: '#808080' }}>1 sản phẩm</Text>
                <Text>Thành tiền: {' '}
                  <Text style={{ fontWeight: 'bold' }}>750.000 đ</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => {

                }}>
                  <View style={{ width: 106, height: 35, borderColor: '#773BFF', borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                    <Text style={{ color: '#773BFF', fontWeight: 'bold' }}>Thanh toán</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {

                }}>
                  <View style={{ width: 106, height: 35, backgroundColor: '#FF3B47', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Hủy chuyến</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#773BFF', fontWeight: '600' }}>#209876527</Text>
                  <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>|</Text>
                  <Text style={{ fontWeight: '600' }}>09/05/2024</Text>
                </View>
                <CustomText>Đã hủy</CustomText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
                  style={styles.cardImg}
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTag}>Biển số xe: K38BIG</Text>
                  <Text style={styles.cardTitle}>Tesla Model S</Text>
                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <Image
                        source={require('../assets/star.png')}
                        style={styles.cardRowItemImg}
                      />
                      <Text style={styles.cardRowItemText}>5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ color: '#808080' }}>1 sản phẩm</Text>
                <Text>Thành tiền: {' '}
                  <Text style={{ fontWeight: 'bold' }}>750.000 đ</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 25,
    height: 290
  },
  cardImg: {
    width: 160,
    height: 100,
    borderRadius: 12,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  cardTag: {
    fontSize: 13,
    color: '#939393',
    marginBottom: 9,
    textTransform: 'capitalize',
  },
  cardTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
    fontWeight: 'bold'
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRowItemImg: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    marginRight: 6,
  },
  cardRowItemText: {
    fontSize: 13,
    color: '#000',
  },
  tabContainer: {
    height: 60,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 25,
  },
  tabItem: {
    height: 60,
    justifyContent: 'center',
    marginRight: 25,
  },
  activeTabItem: {
    borderBottomColor: '#773BFF',
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
})
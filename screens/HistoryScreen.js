import { View, Text, StatusBar, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Divider } from 'react-native-paper';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthConText } from '../store/auth-context';
import axios from 'axios';

const getStatusStyles = (status) => {
  switch (status) {
    case 'no_filter':
      return { borderColor: '#F89F36', color: '#F89F36' };
    case 'waiting_contract_payment':
      return { borderColor: '#56AEFF', color: '#56AEFF' };
    case 'waiting_for_agreement':
      return { borderColor: 'gray', color: 'gray' };
    case 'ordered':
      return { borderColor: '#F4BB4C', color: '#F4BB4C' };
    case 'renting':
      return { borderColor: '#24D02B', color: '#24D02B' };
    case 'completed':
      return { borderColor: '#15891A', color: '#15891A' };
    case 'canceled':
      return { borderColor: 'red', color: 'red' };



  }
};




const statusConvert = {
  no_filter: 'Tất cả',
  waiting_for_agreement: 'Chờ chấp thuận',
  waiting_contract_payment: 'Chờ thanh toán',
  ordered: 'Đã đặt',
  renting: 'Đang thuê',
  completed: 'Hoàn thành',
  canceled: 'Đã hủy',



};


export default function HistoryScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthConText);
  const token = authCtx.access_token;

  const [activeTab, setActiveTab] = useState('no_filter');

  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState([])
  const [page, setPage] = useState(1);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAllContract()
  }, [activeTab, page, isFocused])

  useFocusEffect(
    useCallback(() => {
      getAllContract();
    }, [activeTab, page, isFocused])
  );

  console.log(isFocused);

  const getAllContract = async () => {
    let status = [activeTab];

    try {
      const response = await axios.get(`https://minhhungcar.xyz/customer/contracts?offset=${(page - 1) * 2}&limit=100&contract_status=${status.join(',')}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contracts = response.data;
      setTrip(contracts)
    } catch (error) {
      console.log('Fail to get all contract: ', error)
    }
  }

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  //get last payment detail
  const getLastPaymentDetail = async (contractID) => {
    try {
      const response = await axios.get(`https://minhhungcar.xyz/customer/last_payment_detail?customer_contract_id=${contractID}&payment_type=pre_pay`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payment_url = response.data.customer_payment_document.payment_url;
      const qr_code_image = response.data.document.url;
      navigation.navigate('PayMethod', { payment_url, qr_code_image })
    } catch (error) {
      console.log("Fail to get last payment detail: ", error)
    }
  }

  const navigateToScreen = (trip) => {
    if (trip && trip.status === 'waiting_for_agreement') {
      navigation.navigate('Contract', { contractID: trip.id });
    } else if (trip && trip.status === 'waiting_contract_payment') {
      getLastPaymentDetail(trip.id)
    } else if (trip) {
      navigation.navigate('DetailTrip');
    }
  };

  const renderItem = ({ item }) => {
    const formattedStartDate = formatDate(item.start_date);
    const formattedEndDate = formatDate(item.end_date);

    return (
      <TouchableOpacity onPress={() => navigateToScreen(item)}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 }}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ fontWeight: '600' }}>{formattedStartDate}</Text>
              <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>→</Text>
              <Text style={{ fontWeight: '600' }}>{formattedEndDate}</Text>
            </View>
            <View style={[styles.statusContainer, getStatusStyles(item.status)]}>
              <Text style={{ color: getStatusStyles(item.status).color, fontWeight: 'bold' }}>
                {statusConvert[item.status]}
              </Text>
            </View>
          </View>
          <Divider style={{ marginBottom: 10, marginTop: -5 }} />
          <View style={{}}>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.car.car_model.brand} {item.car.car_model.model} {item.car.car_model.year}</Text>
              <Text style={styles.cardTag}>Biển số xe: {item.car.license_plate}</Text>
            </View>
            <Text style={{ fontWeight: '700', color: 'red', textAlign: 'right' }}>Thành tiền: {item.rent_price.toLocaleString()} VNĐ </Text>
            <View>
              {(item.status === 'waiting_contract_payment' || item.status === 'ordered' || item.status === 'renting' || item.status === 'completed') && (
                <TouchableOpacity
                  onPress={() => { navigation.navigate('Contract', { contractID: item.id }) }}
                  style={[styles.button, { alignSelf: 'flex-end', marginTop: 10 }]}
                >
                  <Text style={{ color: 'white', fontSize: 14 }}>Xem hợp đồng</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };



  const renderFooter = () => {

    return isLoading ?
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View> : <></>
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          {/* Tab */}
          <View style={styles.tabContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
              {Object.keys(statusConvert).map((statusKey) => (
                <TouchableOpacity
                  key={statusKey}
                  style={[styles.tabItem, activeTab === statusKey && styles.activeTabItem]}
                  onPress={() => handleTabPress(statusKey)}
                >
                  <Text style={[styles.tabText, activeTab === statusKey && styles.activeTabText]}>
                    {statusConvert[statusKey]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>


          {/* Card */}

          {trip.length > 0 ?
            <FlatList
              data={trip}
              renderItem={renderItem}
              keyExtractor={(item) => {
                return item.id.toString()
              }}
            // ListFooterComponent={renderFooter}
            // onEndReached={!isLoading && loadMoreItem}
            // onEndReachedThreshold={0}
            // contentContainerStyle={styles.listContainer}
            />
            :
            <View >
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ fontSize: 16, color: '#686D76', marginBottom: 20 }}>Chưa có chuyến nào {statusConvert[activeTab]}</Text>

              </View>
            </View>
          }
        </View>
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
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25,
    height: 'auto',
  },
  cardBody: {
    flex: 1,
    marginBottom: 12
  },
  cardTag: {
    fontSize: 13,
    color: '#939393',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardRow: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 5
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
  statusContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  button: {
    width: 150,
    height: 30,
    backgroundColor: '#773BFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
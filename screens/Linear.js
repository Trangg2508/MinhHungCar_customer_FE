import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Linear = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#5457FB', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.09, 0.84]}
        style={styles.gradient}
      >
        {/* Other components go here */}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    height: 180,
  },
});

export default Linear;

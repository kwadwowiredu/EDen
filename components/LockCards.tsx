import { router } from 'expo-router';
import { DoorClosed } from 'lucide-react-native';
import React from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const { width, height } = Dimensions.get('window');

type LockItem = {
  id: string;
  name: string;
  status: string;
};

const dummyLocksData: LockItem[] = [
  { id: '1', name: 'Main Door', status: 'Locked' },
  { id: '2', name: 'Bedroom 1', status: 'Unlocked' },
  { id: '3', name: 'Bedroom 2', status: 'Unlocked' },
  { id: '4', name: 'Backdoor', status: 'Unlocked' },
  { id: '5', name: 'Garage', status: 'Unlocked' },
  { id: '6', name: 'Office', status: 'Locked' },
];

const LockCards = () => {
  const renderLockCard = ({ item }: { item: LockItem }) => {
    const isLocked = item.status === 'Locked';

    return (
    <ScrollView>
      <View style={styles.card}>
        <DoorClosed size={24} color="#000000ff" />
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => router.push('/LockControl')}
          style={[
            styles.statusBadge,
            { backgroundColor: isLocked ? 'green' : 'red' },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    );
  };

  return (
    <FlatList
      data={dummyLocksData}
      renderItem={renderLockCard}
      keyExtractor={(item) => item.id}
      numColumns={3}
      columnWrapperStyle={styles.row}
      contentContainerStyle={{ paddingVertical: 10 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LockCards;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.28,
    marginHorizontal: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 2,
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.005,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
});

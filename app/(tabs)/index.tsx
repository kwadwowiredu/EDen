import { Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router'

const { width, height } = Dimensions.get('window');

type LockItem = {
  id: string;
  name: string;
  status: string;
};

// const goNextLockScreen = () => {
//   router.push('./app/OnboardingScreen.tsx')
// }

const locksData: LockItem[] = [
  { id: '1', name: 'Main Door', status: 'Locked' },
  { id: '2', name: 'Bedroom 1', status: 'Unlocked' },
  { id: '3', name: 'Bedroom 2', status: 'Unlocked' }, 
  { id: '4', name: 'Backdoor', status: 'Unlocked' },
  { id: '5', name: 'Garage', status: 'Unlocked' },
  { id: '6', name: 'Office', status: 'Locked' },
  { id: '7', name: 'Guest Room', status: 'Locked' },
];

const renderLockCard = ({ item }: { item: LockItem }) => {
  const isLocked = item.status === 'Locked';

  return (
    <View style={styles.card}>
      <FontAwesome5
        name="door-closed"
        size={30}
        color="#000"
        style={{ marginBottom: 5 }}
      />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => {router.push('/LockControl')}}
        style={[
          styles.statusBadge,
          { backgroundColor: isLocked ? "green" : "red" },
        ]}
      >
        <Text style={styles.statusText}>{item.status}</Text>
      </TouchableOpacity>
    </View>
  );
}

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileCircle}>
          <Text style={styles.initials}>KY</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.welcomeText}>Welcome Home,</Text>
          <Text style={styles.username}>Kwadwo</Text>
        </View>

        <TouchableOpacity style={styles.right}>
          <FontAwesome name='building-o' size={30} color='#979EF6' style={{marginRight: 5}} />
          <FontAwesome name='angle-down' size={20} color='#979EF6'/>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>My Devices</Text>

      <View style={styles.locksHeader}>
        <FontAwesome5 name='door-closed' size={20} color='#979EF6' style={{marginRight: 10}} />
        <Text style={styles.locksText}>Locks</Text>
      </View>

        <FlatList
        data={locksData}
        renderItem={renderLockCard}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      />     
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    width: '90%',
    height: 100,
    marginBottom: 30,
    alignItems: 'center',
  },

  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d4d4d4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.06,
  },

  initials: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  welcomeText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
  },

  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#979EF6',
  },

  right: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  locksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },

  locksText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.28,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },

  statusBadge: {
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.005,
    borderRadius: 20,
  },

  statusText: {
     color: "#fff",
     fontWeight: "bold",
     fontSize: 12,
  }
});
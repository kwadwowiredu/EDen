import { router } from 'expo-router';
import { DoorClosed } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

type LockItem = {
  id: string;
  name: string;
  status: 'Locked' | 'Unlocked';
};

const dummyLocksData: LockItem[] = [
  { id: '1', name: 'Main Door',   status: 'Locked'   },
  { id: '2', name: 'Bedroom 1',   status: 'Unlocked' },
  { id: '3', name: 'Bedroom 2',   status: 'Unlocked' },
  { id: '4', name: 'Backdoor',    status: 'Unlocked' },
  { id: '5', name: 'Garage',      status: 'Unlocked' },
  { id: '6', name: 'Office',      status: 'Locked'   },
];

const LockCards = () => {
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selected, setSelected] = useState<LockItem | null>(null);

  const openStatusModal = (item: LockItem) => {
    setSelected(item);
    setStatusModalVisible(true);
  };
  const closeStatusModal = () => setStatusModalVisible(false);

  const renderLockCard = ({ item }: { item: LockItem }) => {
    const isLocked = item.status === 'Locked';

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: '/LockControl', // update if your file lives in a route group e.g. '/(tabs)/LockControl'
            params: { id: item.id, name: item.name, status: item.status },
          })
        }
        onLongPress={() => openStatusModal(item)}
        delayLongPress={250}
      >
        <DoorClosed size={24} color="#000000ff" />
        <Text style={styles.cardTitle}>{item.name}</Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: isLocked ? '#22c55e' : '#ef4444' },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // precompute colors for modal
  const modalBadgeStyles = useMemo(() => {
    const locked = selected?.status === 'Locked';
    return {
      bg: locked ? '#22c55e' : '#ef4444',
      label: locked ? 'Locked' : 'Unlocked',
    };
  }, [selected]);

  return (
    <>
      <FlatList
        data={dummyLocksData}
        renderItem={renderLockCard}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      />

      {/* Status Modal (opens on long-press) */}
      <Modal
        isVisible={statusModalVisible}
        onBackdropPress={closeStatusModal}
        onBackButtonPress={closeStatusModal}
        useNativeDriver
        style={styles.centerModal}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{selected?.name}</Text>

          <View style={[styles.modalBadge, { backgroundColor: modalBadgeStyles.bg }]}>
            <Text style={styles.modalBadgeText}>{modalBadgeStyles.label}</Text>
          </View>

          <TouchableOpacity style={styles.modalCloseBtn} onPress={closeStatusModal}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default LockCards;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
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
    marginBottom: 6,
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

  // Modal
  centerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalCard: {
    width: width * 0.78,
    paddingVertical: 22,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 14,
  },
  modalBadge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 18,
  },
  modalBadgeText: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
  },
  modalCloseBtn: {
    backgroundColor: '#181F70',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  modalCloseText: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
  },
});

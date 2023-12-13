import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './notification.style';
import { mockNotification } from './mock-data';
import { type notificationType } from './notification.type';
import Loader from '../../components/generall/loader/loader';

const Notification = () => {
  const [notifications, setNotifications] = useState<notificationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNotifications(mockNotification);
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }: { item: notificationType }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Loader appear={loading}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item: notificationType) => item.id}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      </Loader>
    </View>
  );
};

export default Notification;

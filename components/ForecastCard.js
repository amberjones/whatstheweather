import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Card, Divider} from 'react-native-elements';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(56, 172, 236, 1)',
    borderWidth: 0,
    borderRadius: 20,
  },
});
//We're not using any state in this component, it'll just render props that we pass to it
export function ForecastCard(props) {
  return (
    <Card containerStyle={styles.card}>

    </Card>
  );
}

import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({item, index}) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  )
}

export const FocusHistory = ({ focusHistory, clearHistory }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        <Text style={{ fontSize: fontSizes.lg, color: 'white' }}>
          Things we've focused on
        </Text>
        {!!focusHistory.length && (
          <FlatList
            style={{ width: '100%', height: '100%', paddingTop: 16 }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
        )}
        {!focusHistory.length && (
          <Text style={{ color: 'white' }}>Nothing yet</Text>
        )}
      </SafeAreaView>
      <View style={styles.clearContainer}>
        <RoundedButton size={75} title="Clear" onPress={clearHistory} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 0 ? 'green' : 'red',
    fontSize: fontSizes.md,
  }),
  clearContainer: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
});

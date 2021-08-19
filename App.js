import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/timer';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 0,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([])
  };

  // function for saving focus history in storage
  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  // function for loading focus history out of storage
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e)
    }
  }

  // load focus history the first time the app loads
  useEffect(() => {
    loadFocusHistory();
  },[]);

  // update persistent storage of focus history whever it changes
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE),
              setFocusSubject(null);
          }}
          onCancel={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED),
              setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex:1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} clearHistory={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});

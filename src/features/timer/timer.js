import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Countdown } from '../../components/Countdown';
import { Timing } from './timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, onCancel }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const changeTime = (time) => {
    setMinutes(time);
    setProgress(1);
    setIsStarted(false);
    console.log(time);
  };

  const onEnd = () => {
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    vibrate();
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar
          color="#5E84E2"
          style={{ height: 15 }}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            onPress={() => setIsStarted(false)}
            style={styles.controlButton}
          />
        ) : (
          <RoundedButton
            title="start"
            onPress={() => setIsStarted(true)}
            style={styles.controlButton}
          />
        )}
      </View>
      <View>
        <RoundedButton
          title="-"
          size={50}
          style={styles.clearSubject}
          onPress={onCancel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.xxl,
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    flexDirection: 'row',
  },
  controlButton: {
    margin: spacing.md,
    padding: spacing.sm,
  },
  clearSubject: {
    padding: spacing.md,
    margin: spacing.md,
  },
});

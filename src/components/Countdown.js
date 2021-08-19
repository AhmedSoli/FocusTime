import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { spacing, fontSizes } from '../utils/sizes';
import { colors } from '../utils/colors';

// function for converting minutes to millis
const minutesToMillis = (min) => min * 1000 * 60;
// function to format time consistently
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);
  const countDown = () => {
    // a function inside a setState gets access to the last set variable
    // i.o.w. time is always equal to the val of millis at beg of the func
    setMillis((time) => {
      if (time == 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  const [millis, setMillis] = useState(minutesToMillis(minutes));

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / millis);
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
    textAlign: 'center',
  },
});

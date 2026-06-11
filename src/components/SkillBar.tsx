import React from 'react';
import { View, Text, Animated } from 'react-native';
import { Colors, Radius, Spacing, Fonts } from '../theme';
import { styles } from './SkillBar.styles';

interface SkillBarProps {
  name: string;
  level: number;
  category: string;
  index: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Mobile: Colors.primary,
  Language: '#F7B731',
  Web: '#43E97B',
  Backend: '#FF6584',
  API: '#A29BFE',
  Cloud: '#74B9FF',
  DevOps: '#FD79A8',
  Database: '#55EFC4',
};

export default function SkillBar({ name, level, category, index }: SkillBarProps) {
  const color = CATEGORY_COLORS[category] || Colors.primary;
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateX = React.useRef(new Animated.Value(-30)).current;
  const barWidth = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const delay = index * 80;
    Animated.parallel([
      Animated.spring(opacity, {
        toValue: 1,
        delay,
        damping: 18,
        stiffness: 150,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        delay,
        damping: 18,
        stiffness: 150,
        useNativeDriver: true,
      }),
      Animated.timing(barWidth, {
        toValue: level,
        duration: 900,
        delay: delay + 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ translateX }] }]}>
      <View style={styles.header}>
        <View style={styles.nameRow}>
          <View style={[styles.categoryDot, { backgroundColor: color }]} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={[styles.level, { color }]}>{level}%</Text>
      </View>

      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              backgroundColor: color,
              width: barWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

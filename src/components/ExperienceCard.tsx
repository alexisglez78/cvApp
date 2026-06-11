import React from 'react';
import { View, Text, Animated } from 'react-native';
import { Colors, Radius, Spacing, Fonts } from '../theme';
import { styles } from './ExperienceCard.styles';

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  current: boolean;
  index: number;
}

export default function ExperienceCard({
  company,
  role,
  period,
  location,
  description,
  tags,
  current,
  index,
}: ExperienceCardProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      delay: index * 100,
      damping: 18,
      stiffness: 130,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateY, {
      toValue: 0,
      delay: index * 100,
      damping: 18,
      stiffness: 130,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      {/* Timeline dot */}
      <View style={styles.timeline}>
        <View style={[styles.dot, current && styles.dotActive]} />
        {current && <View style={styles.dotGlow} />}
      </View>

      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.company}>{company}</Text>
            {current && (
              <View style={styles.currentBadge}>
                <Text style={styles.currentText}>Actual</Text>
              </View>
            )}
          </View>
          <Text style={styles.period}>{period}</Text>
        </View>

        <Text style={styles.role}>{role}</Text>
        <Text style={styles.location}>📍 {location}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.tags}>
          {tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

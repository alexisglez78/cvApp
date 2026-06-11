import React from 'react';
import { View, Text, Animated } from 'react-native';
import { Colors, Radius, Spacing, Fonts } from '../theme';
import { styles } from './ProjectCard.styles';

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  category: string;
  year: string;
  highlights: string[];
  color: string;
  index: number;
}

export default function ProjectCard({
  name,
  description,
  tech,
  category,
  year,
  highlights,
  color,
  index,
}: ProjectCardProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.93)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(opacity, {
        toValue: 1,
        delay: index * 100,
        damping: 16,
        stiffness: 140,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay: index * 100,
        damping: 16,
        stiffness: 140,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.card, { borderColor: color + '40', opacity, transform: [{ scale }] }]}>
      {/* Color accent bar */}
      <View style={[styles.accentBar, { backgroundColor: color }]} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={[styles.category, { color }]}>{category} · {year}</Text>
          </View>
        </View>

        <Text style={styles.description}>{description}</Text>

        {/* Highlights */}
        <View style={styles.highlights}>
          {highlights.map(h => (
            <View key={h} style={[styles.highlight, { backgroundColor: color + '15' }]}>
              <Text style={[styles.highlightText, { color }]}>✦ {h}</Text>
            </View>
          ))}
        </View>

        {/* Tech stack */}
        <View style={styles.techRow}>
          {tech.map(t => (
            <View key={t} style={styles.techBadge}>
              <Text style={styles.techText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

import React from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import SkillBar from '../components/SkillBar';
import { Colors, Spacing, Fonts, Radius } from '../theme';
import { styles } from './SkillsScreen.styles';
import { cvData } from '../data/cvData';

const CATEGORIES = ['Mobile', 'Language', 'Web', 'Backend', 'API', 'Cloud', 'DevOps', 'Database'];

const CATEGORY_ICONS: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  Mobile: 'phone-portrait-outline',
  Language: 'code-slash-outline',
  Web: 'globe-outline',
  Backend: 'server-outline',
  API: 'swap-horizontal-outline',
  Cloud: 'cloud-outline',
  DevOps: 'git-branch-outline',
  Database: 'cylinders-outline',
};

export default function SkillsScreen() {
  const insets = useSafeAreaInsets();
  const skillsByCategory = CATEGORIES.reduce<Record<string, typeof cvData.skills>>((acc, cat) => {
    const filtered = cvData.skills.filter(s => s.category === cat);
    if (filtered.length) acc[cat] = filtered;
    return acc;
  }, {});

  const headerOpacity = React.useRef(new Animated.Value(0)).current;
  const headerY = React.useRef(new Animated.Value(-15)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(headerOpacity, { toValue: 1, damping: 18, stiffness: 150, useNativeDriver: true }),
      Animated.spring(headerY, { toValue: 0, damping: 18, stiffness: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  let globalIndex = 0;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerY }] }]}>
        <View style={styles.headerIcon}>
          <Ionicons name="flash" size={22} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Skills</Text>
          <Text style={styles.headerSub}>{cvData.skills.length} tecnologías</Text>
        </View>
      </Animated.View>

      {Object.entries(skillsByCategory).map(([category, skills], catIdx) => (
        <View
          key={category}
          style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name={CATEGORY_ICONS[category] ?? 'code-outline'}
              size={16}
              color={Colors.textMuted}
            />
            <Text style={styles.sectionTitle}>{category}</Text>
          </View>
          {skills.map(skill => {
            const idx = globalIndex++;
            return <SkillBar key={skill.id} {...skill} index={idx} />;
          })}
        </View>
      ))}
    </ScrollView>
  );
}

import React from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProjectCard from '../components/ProjectCard';
import { Colors, Spacing, Fonts, Radius } from '../theme';
import { styles } from './ProjectsScreen.styles';
import { cvData } from '../data/cvData';

export default function ProjectsScreen() {
  const insets = useSafeAreaInsets();
  const headerOpacity = React.useRef(new Animated.Value(0)).current;
  const headerY = React.useRef(new Animated.Value(-15)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(headerOpacity, { toValue: 1, damping: 18, stiffness: 150, useNativeDriver: true }),
      Animated.spring(headerY, { toValue: 0, damping: 18, stiffness: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerY }] }]}>
        <View style={styles.headerIcon}>
          <Ionicons name="rocket" size={22} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Proyectos</Text>
          <Text style={styles.headerSub}>{cvData.projects.length} proyectos destacados</Text>
        </View>
      </Animated.View>

      {cvData.projects.map((project, i) => (
        <ProjectCard key={project.id} {...project} index={i} />
      ))}
      </ScrollView>
    </View>
  );
}

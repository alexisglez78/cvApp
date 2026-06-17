import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Linking,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Colors, Spacing, Radius, Fonts } from '../theme';
import { styles } from './HomeScreen.styles';
import { cvData } from '../data/cvData';

const { width } = Dimensions.get('window');
const { personal } = cvData;

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const InfoItem = ({
  icon,
  text,
  index,
  color,
}: {
  icon: IoniconName;
  text: string;
  index: number;
  color: string;
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateX = React.useRef(new Animated.Value(-20)).current;

  React.useEffect(() => {
    const delay = 600 + index * 80;
    Animated.parallel([
      Animated.spring(opacity, { toValue: 1, delay, damping: 18, useNativeDriver: true, stiffness: 150 }),
      Animated.spring(translateX, { toValue: 0, delay, damping: 18, stiffness: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.infoItem, { opacity, transform: [{ translateX }], borderLeftColor: color }]}>
      <Ionicons name={icon} size={18} color={color} style={styles.infoIcon} />
      <Text style={styles.infoText}>{text}</Text>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Animated values
  const avatarOpacity = React.useRef(new Animated.Value(0)).current;
  const avatarScale = React.useRef(new Animated.Value(0.5)).current;
  const nameOpacity = React.useRef(new Animated.Value(0)).current;
  const nameY = React.useRef(new Animated.Value(20)).current;
  const badgeOpacity = React.useRef(new Animated.Value(0)).current;
  const badgeScale = React.useRef(new Animated.Value(0.8)).current;
  const bioOpacity = React.useRef(new Animated.Value(0)).current;
  const bioY = React.useRef(new Animated.Value(15)).current;
  const statsOpacity = React.useRef(new Animated.Value(0)).current;
  const statsY = React.useRef(new Animated.Value(20)).current;

  // Online dot pulse
  const dotScale = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(avatarOpacity, { toValue: 1, damping: 14, stiffness: 120, useNativeDriver: true }),
      Animated.spring(avatarScale, { toValue: 1, damping: 14, stiffness: 120, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.spring(nameOpacity, { toValue: 1, delay: 200, damping: 18, stiffness: 150, useNativeDriver: true }),
      Animated.spring(nameY, { toValue: 0, delay: 200, damping: 18, stiffness: 150, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.spring(badgeOpacity, { toValue: 1, delay: 400, damping: 18, stiffness: 150, useNativeDriver: true }),
      Animated.spring(badgeScale, { toValue: 1, delay: 400, damping: 18, stiffness: 150, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(bioOpacity, { toValue: 1, delay: 500, duration: 500, useNativeDriver: true }),
      Animated.timing(bioY, { toValue: 0, delay: 500, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.spring(statsOpacity, { toValue: 1, delay: 900, damping: 18, stiffness: 150, useNativeDriver: true }),
      Animated.spring(statsY, { toValue: 0, delay: 900, damping: 18, stiffness: 150, useNativeDriver: true }),
    ]).start();

    // Pulse loop for online dot
    const pulse = () => {
      Animated.sequence([
        Animated.timing(dotScale, { toValue: 1.2, duration: 700, useNativeDriver: true }),
        Animated.timing(dotScale, { toValue: 0.8, duration: 700, useNativeDriver: true }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
      {/* Avatar */}
      <Animated.View
        style={[styles.avatarContainer, { opacity: avatarOpacity, transform: [{ scale: avatarScale }] }]}>
        <View style={styles.avatarGlow} />
        <View style={styles.avatar}>
          {personal.avatar ? (
            <Image source={personal.avatar} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarInitials}>
              {personal.name.split(' ').map((n: string) => n[0]).join('')}
            </Text>
          )}
        </View>
        {/* Online indicator */}
        <Animated.View style={[styles.onlineDot, { transform: [{ scale: dotScale }] }]} />
      </Animated.View>

      {/* Name & Title */}
      <Animated.View style={{ opacity: nameOpacity, transform: [{ translateY: nameY }] }}>
        <Text style={styles.name}>{personal.name}</Text>
        <Text style={styles.title}>{personal.title}</Text>
        <Text style={styles.subtitle}>{personal.subtitle}</Text>
      </Animated.View>

      {/* Availability badge */}
      <Animated.View
        style={[styles.badge, { opacity: badgeOpacity, transform: [{ scale: badgeScale }] }]}>
        <View style={styles.badgeDot} />
        <Text style={styles.badgeText}>{personal.title}</Text>
      </Animated.View>

      {/* Bio */}
      <Animated.View
        style={[styles.bioCard, { opacity: bioOpacity, transform: [{ translateY: bioY }] }]}>
        <Text style={styles.bioText}>{personal.bio}</Text>
      </Animated.View>

      {/* Info items */}
      <View style={styles.infoList}>
        <InfoItem icon="mail-outline"     text={personal.email}    index={0} color={Colors.primary} />
        <InfoItem icon="call-outline"     text={personal.phone}    index={1} color={Colors.accentGreen} />
        <InfoItem icon="location-outline" text={personal.location} index={2} color={Colors.accent} />
        <InfoItem icon="logo-linkedin"    text={personal.linkedin} index={3} color="#0A66C2" />
        <InfoItem icon="logo-github"      text={personal.github}   index={4} color={Colors.textSecondary} />
      </View>

      {/* Stats row */}
      <Animated.View
        style={[styles.statsRow, { opacity: statsOpacity, transform: [{ translateY: statsY }] }]}>
        {[
          { value: '8+', label: 'Años exp.', color: Colors.primary },
          { value: '20+', label: 'Proyectos', color: Colors.accentGreen },
          { value: '2M+', label: 'Usuarios', color: Colors.accent },
        ].map((stat, i) => (
          <View key={i} style={[styles.stat, { borderTopColor: stat.color }]}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </Animated.View>
      </ScrollView>
    </View>
  );
}

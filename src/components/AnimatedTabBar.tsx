import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Colors, Spacing, Radius } from '../theme';
import { styles } from './AnimatedTabBar.styles';

const { width } = Dimensions.get('window');

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  Home:       { active: 'person',          inactive: 'person-outline' },
  Experience: { active: 'briefcase',       inactive: 'briefcase-outline' },
  Skills:     { active: 'flash',           inactive: 'flash-outline' },
  Projects:   { active: 'rocket',          inactive: 'rocket-outline' },
  Contact:    { active: 'mail',            inactive: 'mail-outline' },
};

const TAB_LABELS: Record<string, string> = {
  Home: 'Perfil',
  Experience: 'Exp.',
  Skills: 'Skills',
  Projects: 'Proyectos',
  Contact: 'Contacto',
};

const TabItem = ({
  route,
  isFocused,
  onPress,
}: {
  route: any;
  isFocused: boolean;
  onPress: () => void;
}) => {
  const scale = React.useRef(new Animated.Value(isFocused ? 1 : 0.85)).current;
  const opacity = React.useRef(new Animated.Value(isFocused ? 1 : 0.5)).current;
  const bgOpacity = React.useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const labelOpacity = React.useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const labelTranslateY = React.useRef(new Animated.Value(isFocused ? 0 : 6)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: isFocused ? 1 : 0.85, damping: 15, stiffness: 200, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: isFocused ? 1 : 0.5, duration: 200, useNativeDriver: true }),
      Animated.timing(bgOpacity, { toValue: isFocused ? 1 : 0, duration: 200, useNativeDriver: true }),
      Animated.timing(labelOpacity, { toValue: isFocused ? 1 : 0, duration: 150, useNativeDriver: true }),
      Animated.spring(labelTranslateY, { toValue: isFocused ? 0 : 6, damping: 15, stiffness: 200, useNativeDriver: true }),
    ]).start();
  }, [isFocused]);

  const icons = TAB_ICONS[route.name];
  const iconName = isFocused ? icons?.active : icons?.inactive;
  const iconColor = isFocused ? Colors.primary : Colors.textMuted;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.tabItem}>
      <Animated.View style={[styles.tabItemInner, { transform: [{ scale }], opacity }]}>
        <Animated.View style={[styles.tabBg, { opacity: bgOpacity }]} />
        {iconName && <Ionicons name={iconName} size={24} color={iconColor} />}
        <Animated.Text style={[styles.tabLabel, { opacity: labelOpacity, transform: [{ translateY: labelTranslateY }] }]}>
          {TAB_LABELS[route.name]}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function AnimatedTabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const TAB_WIDTH = width / state.routes.length;
  const indicatorX = React.useRef(
    new Animated.Value(state.index * TAB_WIDTH + TAB_WIDTH / 2 - 16),
  ).current;

  React.useEffect(() => {
    Animated.spring(indicatorX, {
      toValue: state.index * TAB_WIDTH + TAB_WIDTH / 2 - 16,
      damping: 20,
      stiffness: 180,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      <View style={styles.indicatorTrack}>
        <Animated.View style={[styles.indicator, { transform: [{ translateX: indicatorX }] }]} />
      </View>
      <View style={styles.tabRow}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          return (
            <TabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

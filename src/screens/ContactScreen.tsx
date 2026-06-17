import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Colors, Spacing, Fonts, Radius } from '../theme';
import { styles } from './ContactScreen.styles';
import { cvData } from '../data/cvData';

const openURL = async (url: string, fallbackText?: string) => {
  try {
    await Linking.openURL(url);
  } catch {
    Share.share({ message: fallbackText || url });
  }
};

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface ContactItemProps {
  icon: IoniconName;
  label: string;
  value: string;
  color: string;
  action?: () => void;
  index: number;
}

function ContactItem({ icon, label, value, color, action, index }: ContactItemProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateX = React.useRef(new Animated.Value(-25)).current;
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(opacity, { toValue: 1, delay: 300 + index * 100, damping: 18, stiffness: 150, useNativeDriver: true }),
      Animated.spring(translateX, { toValue: 0, delay: 300 + index * 100, damping: 18, stiffness: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.96, damping: 12, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, damping: 12, useNativeDriver: true }),
    ]).start();
    action?.();
  };

  return (
    <Animated.View style={{ opacity, transform: [{ translateX }] }}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={styles.contactItem}>
        <Animated.View style={{ transform: [{ scale }], flexDirection: 'row', alignItems: 'center', flex: 1, gap: Spacing.md }}>
          <View style={[styles.contactIconWrap, { backgroundColor: color + '18', borderColor: color + '40' }]}>
            <Ionicons name={icon} size={20} color={color} />
          </View>
          <View style={styles.contactText}>
            <Text style={styles.contactLabel}>{label}</Text>
            <Text style={styles.contactValue}>{value}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const { contact } = cvData;

  const headerOpacity = React.useRef(new Animated.Value(0)).current;
  const headerY = React.useRef(new Animated.Value(-15)).current;
  const cardOpacity = React.useRef(new Animated.Value(0)).current;
  const cardScale = React.useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(headerOpacity, { toValue: 1, damping: 18, stiffness: 150, useNativeDriver: true }),
      Animated.spring(headerY, { toValue: 0, damping: 18, stiffness: 150, useNativeDriver: true }),
    ]).start();
    Animated.parallel([
      Animated.spring(cardOpacity, { toValue: 1, delay: 150, damping: 16, stiffness: 150, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, delay: 150, damping: 16, stiffness: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  const contactItems: ContactItemProps[] = [
    { icon: 'mail', label: 'Email', value: contact.email, color: Colors.primary, action: () => openURL(`mailto:${contact.email}`, contact.email), index: 0 },
    { icon: 'call', label: 'Teléfono', value: contact.phone, color: Colors.accentGreen, action: () => openURL(`tel:${contact.phone}`, contact.phone), index: 1 },
    { icon: 'location', label: 'Ubicación', value: contact.location, color: Colors.accent, action: () => openURL(`maps:?q=${encodeURIComponent(contact.location)}`, contact.location), index: 2 },
    { icon: 'logo-linkedin', label: 'LinkedIn', value: cvData.personal.linkedin, color: '#0A66C2', action: () => openURL(cvData.personal.linkedin), index: 3 },
    { icon: 'logo-github', label: 'GitHub', value: cvData.personal.github, color: Colors.text, action: () => openURL(cvData.personal.github), index: 4 },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
      <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerY }] }]}>
        <View style={styles.headerIcon}>
          <Ionicons name="mail" size={22} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Contacto</Text>
          <Text style={styles.headerSub}>Hablemos</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.availCard, { opacity: cardOpacity, transform: [{ scale: cardScale }] }]}>
        <View style={styles.availDot} />
        <View>
          <Text style={styles.availTitle}>{contact.availability}</Text>
          <Text style={styles.availSub}>{contact.responseTime}</Text>
        </View>
      </Animated.View>

      <View style={styles.list}>
        {contactItems.map(item => (
          <ContactItem key={item.label} {...item} />
        ))}
      </View>
      </ScrollView>
    </View>
  );
}

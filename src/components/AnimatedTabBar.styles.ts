import { StyleSheet } from 'react-native';
import { Colors, Radius } from '../theme';

export const styles = StyleSheet.create({
  container: { backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border },
  indicatorTrack: { height: 3, backgroundColor: 'transparent', overflow: 'hidden' },
  indicator: { position: 'absolute', top: 0, width: 32, height: 3, borderRadius: Radius.full, backgroundColor: Colors.primary, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 8 },
  tabRow: { flexDirection: 'row', paddingTop: 8 },
  tabItem: { flex: 1, alignItems: 'center' },
  tabItemInner: { alignItems: 'center', justifyContent: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: Radius.lg, minHeight: 52, position: 'relative' },
  tabBg: { ...StyleSheet.absoluteFill, backgroundColor: Colors.primary + '18', borderRadius: Radius.lg },
  tabLabel: { fontSize: 10, fontWeight: '600', color: Colors.primary, marginTop: 2, letterSpacing: 0.3 },
});

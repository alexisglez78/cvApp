import { StyleSheet } from 'react-native';
import { Colors, Radius } from '../theme';

export const styles = StyleSheet.create({
  container: { backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.primary + '30' },
  indicatorTrack: { height: 3, backgroundColor: 'transparent', overflow: 'hidden' },
  indicator: { position: 'absolute', top: 0, width: 32, height: 3, borderRadius: Radius.full, backgroundColor: Colors.primary, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 10 },
  tabRow: { flexDirection: 'row', paddingTop: 8 },
  tabItem: { flex: 1, alignItems: 'center' },
  tabItemInner: { alignItems: 'center', justifyContent: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: Radius.lg, minHeight: 52, position: 'relative' },
  tabBg: { ...StyleSheet.absoluteFill, backgroundColor: Colors.primary + '20', borderRadius: Radius.lg },
  tabLabel: { fontSize: 10, fontWeight: '700', color: Colors.primary, marginTop: 2, letterSpacing: 0.3 },
});

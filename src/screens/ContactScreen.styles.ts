import { StyleSheet } from 'react-native';
import { Colors, Spacing, Fonts, Radius } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.lg, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginVertical: Spacing.xl },
  headerIcon: { width: 48, height: 48, borderRadius: Radius.md, backgroundColor: Colors.primary + '20', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.primary + '40' },
  headerTitle: { fontSize: Fonts.sizes.xxl, fontWeight: '800', color: Colors.text },
  headerSub: { fontSize: Fonts.sizes.sm, color: Colors.textMuted, marginTop: 2 },
  availCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.accentGreen + '12', borderWidth: 1, borderColor: Colors.accentGreen + '35', borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.xl },
  availDot: { width: 12, height: 12, borderRadius: Radius.full, backgroundColor: Colors.accentGreen },
  availTitle: { color: Colors.accentGreen, fontSize: Fonts.sizes.md, fontWeight: '700' },
  availSub: { color: Colors.textMuted, fontSize: Fonts.sizes.xs, marginTop: 2 },
  list: { gap: Spacing.sm },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  contactIconWrap: { width: 44, height: 44, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  contactText: { flex: 1 },
  contactLabel: { color: Colors.textMuted, fontSize: Fonts.sizes.xs, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  contactValue: { color: Colors.text, fontSize: Fonts.sizes.sm, fontWeight: '500' },
});

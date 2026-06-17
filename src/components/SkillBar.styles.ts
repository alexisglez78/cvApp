import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Fonts } from '../theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    color: Colors.text,
    fontSize: Fonts.sizes.md,
    fontWeight: '600',
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  level: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '800',
  },
  track: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});

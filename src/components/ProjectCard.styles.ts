import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Fonts } from '../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    color: Colors.text,
    fontSize: Fonts.sizes.lg,
    fontWeight: '700',
  },
  category: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Fonts.sizes.sm,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  highlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  highlight: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  highlightText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  techBadge: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  techText: {
    color: Colors.textMuted,
    fontSize: Fonts.sizes.xs,
  },
});

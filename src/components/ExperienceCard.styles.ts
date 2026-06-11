import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Fonts } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  timeline: {
    width: 24,
    alignItems: 'center',
    paddingTop: 4,
    position: 'relative',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: Radius.full,
    backgroundColor: Colors.border,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    zIndex: 1,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dotGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 20,
    height: 20,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary + '30',
  },
  card: {
    flex: 1,
    marginLeft: Spacing.sm,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  company: {
    color: Colors.text,
    fontSize: Fonts.sizes.md,
    fontWeight: '700',
  },
  currentBadge: {
    backgroundColor: Colors.primary + '25',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primary + '50',
  },
  currentText: {
    color: Colors.primary,
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
  },
  period: {
    color: Colors.textMuted,
    fontSize: Fonts.sizes.xs,
    marginLeft: 8,
  },
  role: {
    color: Colors.primaryLight,
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    color: Colors.textMuted,
    fontSize: Fonts.sizes.xs,
    marginBottom: 8,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Fonts.sizes.sm,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    color: Colors.textSecondary,
    fontSize: Fonts.sizes.xs,
    fontWeight: '500',
  },
});

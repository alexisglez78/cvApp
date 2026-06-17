import { StyleSheet } from 'react-native';
import { Colors, Spacing, Fonts, Radius } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginVertical: Spacing.xl,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary + '30',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary + '60',
  },
  headerTitle: {
    fontSize: Fonts.sizes.xxl,
    fontWeight: '800',
    color: Colors.text,
  },
  headerSub: {
    fontSize: Fonts.sizes.sm,
    color: Colors.primaryLight,
    marginTop: 2,
    fontWeight: '600',
  },
});

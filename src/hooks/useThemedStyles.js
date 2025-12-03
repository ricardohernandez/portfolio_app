import { useTheme } from '../context/ThemeContext';

export const useThemedStyles = (stylesFn) => {
  const { colors } = useTheme();
  return stylesFn(colors);
};

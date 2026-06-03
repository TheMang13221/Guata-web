import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "./themed-text";

interface CycleViewProps {
  onMenuPress: () => void;
}

export function CycleView({ onMenuPress }: CycleViewProps) {
  const { width } = useWindowDimensions();
  const colors = Colors.dark;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>GUATÁ</ThemedText>
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/g.png")}
          style={[styles.logo, { width: Math.min(width * 0.8, 400) }]}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginLeft: 28,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  logo: {
    height: undefined,
    aspectRatio: 1,
    marginBottom: 10,
  },
});

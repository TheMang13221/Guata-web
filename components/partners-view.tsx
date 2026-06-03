import { PARTNERS_DATA } from "@/constants/guata-data";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function PartnersView() {
  const { width } = useWindowDimensions();
  const colors = Colors.dark;
  const partnerImageWidth = Math.min(width * 0.65, 300);
  const partnerImageHeight = partnerImageWidth * 1.25;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          QUEM VAI CAMINHAR AO SEU LADO
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {PARTNERS_DATA.map((partner, index) => (
          <View key={partner.id} style={styles.card}>
            <View style={styles.imageWrapper}>
              <View
                style={[
                  styles.decorationTopRight,
                  {
                    width: partnerImageWidth * 0.8,
                    height: partnerImageWidth * 0.8,
                    backgroundColor: colors.card,
                    borderColor: "#333",
                  },
                ]}
              />
              <View
                style={[
                  styles.decorationBottomLeft,
                  {
                    width: partnerImageWidth * 0.5,
                    height: partnerImageWidth * 0.5,
                    backgroundColor: "rgba(77, 182, 172, 0.15)",
                  },
                ]}
              />
              <Image
                source={partner.image}
                style={[
                  styles.image,
                  {
                    width: partnerImageWidth,
                    height: partnerImageHeight,
                    backgroundColor: "#333",
                  },
                ]}
                resizeMode="cover"
              />
            </View>

            <Text style={[styles.name, { color: colors.text }]}>
              {partner.name}
            </Text>
            <Text style={[styles.role, { color: colors.accent }]}>
              {partner.role}
            </Text>
            <Text style={[styles.description, { color: "#AAAAAA" }]}>
              {partner.description}
            </Text>

            <TouchableOpacity style={styles.contactBtn} activeOpacity={0.8}>
              <MaterialCommunityIcons name="whatsapp" size={22} color="white" />
              <Text style={styles.contactBtnText}>Entrar em contato</Text>
            </TouchableOpacity>

            {index < PARTNERS_DATA.length - 1 && (
              <View style={[styles.divider, { backgroundColor: "#333" }]} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 30,
    alignItems: "center",
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    position: "relative",
  },
  decorationTopRight: {
    position: "absolute",
    top: -15,
    right: -15,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 30,
    borderWidth: 1,
  },
  decorationBottomLeft: {
    position: "absolute",
    bottom: -20,
    left: -15,
    borderBottomLeftRadius: 60,
    borderTopRightRadius: 20,
  },
  image: {
    borderRadius: 20,
    borderTopRightRadius: 120,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  role: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  contactBtn: {
    flexDirection: "row",
    backgroundColor: "#25D366",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
  },
  contactBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  divider: {
    width: "70%",
    height: 1,
    marginTop: 40,
  },
});

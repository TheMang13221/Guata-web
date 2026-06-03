import { CONTENT_DATA } from "@/constants/guata-data";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function ContentView() {
  const { width } = useWindowDimensions();
  const colors = Colors.dark;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
        <Ionicons name="search" size={20} color="#888" />
        <Text style={styles.searchText}>
          Busque artigos ou faça uma pergunta
        </Text>
      </View>

      {CONTENT_DATA.map((section, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.accent }]}>
                Ver tudo {">"}
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={section.data}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View
                style={[styles.card, { width: Math.min(width * 0.4, 200) }]}
              >
                <Image
                  source={item.image}
                  style={[styles.cardImage, { backgroundColor: colors.card }]}
                  resizeMode="cover"
                />
                <Text style={[styles.cardText, { color: colors.text }]}>
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  searchText: {
    color: "#888",
    marginLeft: 10,
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
  },
  card: {
    marginRight: 15,
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
  },
});

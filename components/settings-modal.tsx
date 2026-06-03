import { SETTINGS_DATA } from "@/constants/guata-data";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const colors = Colors.dark;

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={[styles.userHeader, { borderBottomColor: colors.card }]}>
          <Text style={[styles.userName, { color: colors.text }]}>Usuário</Text>
          <Text style={[styles.userEmail, { color: "#aaa" }]}>
            usuario@gmail.com
          </Text>
        </View>

        <FlatList
          data={SETTINGS_DATA}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#888" }]}>
                {item.title}
              </Text>
              {item.data.map((subItem, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.settingsItem,
                    { borderBottomColor: colors.card },
                  ]}
                >
                  <Text style={[styles.itemText, { color: colors.text }]}>
                    {subItem}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeBtn: {
    padding: 4,
  },
  userHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  settingsItem: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
  },
  itemText: {
    fontSize: 16,
  },
});

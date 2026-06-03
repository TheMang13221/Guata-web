import { CALENDAR_STRIP, TRACKING_CATEGORIES } from "@/constants/guata-data";
import { Colors } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface TrackingModalProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: number;
  setSelectedDate: (date: number) => void;
  selectedSymptoms: string[];
  toggleSymptom: (id: string) => void;
}

export function TrackingModal({
  visible,
  onClose,
  selectedDate,
  setSelectedDate,
  selectedSymptoms,
  toggleSymptom,
}: TrackingModalProps) {
  const colors = Colors.dark;

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="chevron-down" size={28} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.saveBtn, { color: colors.accent }]}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.dateStripContainer,
            { borderBottomColor: colors.card },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {CALENDAR_STRIP.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(item.date)}
                style={[
                  styles.dateBox,
                  selectedDate === item.date && {
                    borderBottomColor: colors.accent,
                  },
                ]}
              >
                <Text style={[styles.dayText, { color: "#888" }]}>
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === item.date && { color: colors.accent },
                    { color: colors.text },
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.customizeContainer}>
          <TouchableOpacity
            style={[
              styles.customizeBtn,
              { backgroundColor: "rgba(77, 182, 172, 0.15)" },
            ]}
          >
            <Text style={[styles.customizeText, { color: colors.accent }]}>
              Customize ⇌
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {TRACKING_CATEGORIES.map((category, catIndex) => (
            <View key={catIndex} style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <Text style={[styles.categoryTitle, { color: colors.text }]}>
                  {category.title}
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.learnMore, { color: colors.accent }]}>
                    Learn more {">"}
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                scrollEnabled={false}
              >
                {category.items.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <TouchableOpacity
                      key={symptom.id}
                      style={styles.symptomItem}
                      onPress={() => toggleSymptom(symptom.id)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.iconBox,
                          { borderColor: category.color },
                          isSelected && { backgroundColor: category.color },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={symptom.icon}
                          size={40}
                          color={isSelected ? "#121212" : category.color}
                        />
                      </View>
                      <Text
                        style={[styles.symptomLabel, { color: colors.text }]}
                      >
                        {symptom.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  saveBtn: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateStripContainer: {
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  dateBox: {
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  dayText: {
    fontSize: 12,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  customizeContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  customizeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  customizeText: {
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  learnMore: {
    fontSize: 12,
    marginTop: 4,
  },
  symptomItem: {
    alignItems: "center",
    marginRight: 20,
  },
  iconBox: {
    width: 85,
    height: 85,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  symptomLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
});

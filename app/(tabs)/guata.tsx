import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CalendarView } from "@/components/calendar-view";
import { ContentView } from "@/components/content-view";
import { CycleView } from "@/components/cycle-view";
import { PartnersView } from "@/components/partners-view";
import { SettingsModal } from "@/components/settings-modal";
import { TrackingModal } from "@/components/tracking-modal";
import { Colors } from "@/constants/theme";

export default function HomeScreen() {
  const colors = Colors.dark;
  const [currentView, setCurrentView] = useState("cycle");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [trackingVisible, setTrackingVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(20);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const renderMainView = () => {
    switch (currentView) {
      case "cycle":
        return <CycleView onMenuPress={() => setSettingsVisible(true)} />;
      case "calendar":
        return <CalendarView />;
      case "partners":
        return <PartnersView />;
      case "content":
        return <ContentView />;
      default:
        return <CycleView onMenuPress={() => setSettingsVisible(true)} />;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={{ flex: 1 }}>{renderMainView()}</View>

      {/* Tab Bar */}
      <View style={[styles.tabBar, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setCurrentView("cycle")}
        >
          <Ionicons
            name="home"
            size={24}
            color={
              currentView === "cycle" ? colors.accent : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.label,
              currentView === "cycle" && { color: colors.accent },
            ]}
          >
            Ciclo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setCurrentView("calendar")}
        >
          <Ionicons
            name="calendar"
            size={24}
            color={
              currentView === "calendar" ? colors.accent : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.label,
              currentView === "calendar" && { color: colors.accent },
            ]}
          >
            Calendário
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setTrackingVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={32} color="#121212" />
          <Text style={[styles.plusLabel, { color: "#121212" }]}>
            Registrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setCurrentView("partners")}
        >
          <MaterialCommunityIcons
            name="handshake-outline"
            size={24}
            color={
              currentView === "partners" ? colors.accent : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.label,
              currentView === "partners" && { color: colors.accent },
            ]}
          >
            Parceiros
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setCurrentView("content")}
        >
          <Ionicons
            name="book-outline"
            size={24}
            color={
              currentView === "content" ? colors.accent : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.label,
              currentView === "content" && { color: colors.accent },
            ]}
          >
            Conteúdo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
      <TrackingModal
        visible={trackingVisible}
        onClose={() => setTrackingVisible(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedSymptoms={selectedSymptoms}
        toggleSymptom={toggleSymptom}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? 85 : 70,
    borderTopWidth: 1,
    borderTopColor: "#333",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 15 : 0,
  },
  tabItem: {
    alignItems: "center",
    minWidth: 60,
    flex: 1,
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    color: "#888",
  },
  plusButton: {
    backgroundColor: "#81D4FA",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  plusLabel: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: "bold",
  },
});

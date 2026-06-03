import { Colors } from "@/constants/theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function CalendarView() {
  const colors = Colors.dark;

  const renderCalendarMonth = (
    monthName: string,
    year: number,
    daysCount: number,
  ) => {
    const days = Array.from({ length: daysCount }, (_, i) => i + 1);
    return (
      <View style={styles.monthContainer}>
        <Text style={[styles.monthTitle, { color: colors.text }]}>
          {monthName} <Text style={{ color: "#666" }}>{year}</Text>
        </Text>
        <View style={styles.daysGrid}>
          {days.map((day) => (
            <View
              key={day}
              style={[
                styles.dayBox,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.background,
                },
              ]}
            >
              <Text style={[styles.dayText, { color: colors.text }]}>
                {day}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.card }]}>
        <View style={styles.headerLeft}>
          <Feather name="sliders" size={20} color={colors.accent} />
          <Text style={[styles.headerText, { color: colors.accent }]}>
            {" "}
            Filtrar
          </Text>
        </View>
        <MaterialCommunityIcons
          name="calendar-check"
          size={24}
          color={colors.accent}
        />
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {renderCalendarMonth("Janeiro", 2026, 31)}
        {renderCalendarMonth("Fevereiro", 2026, 28)}
        {renderCalendarMonth("Março", 2026, 31)}
        {renderCalendarMonth("Abril", 2026, 30)}
        {renderCalendarMonth("Maio", 2026, 31)}
        {renderCalendarMonth("Junho", 2026, 30)}
        {renderCalendarMonth("Julho", 2026, 31)}
        {renderCalendarMonth("Agosto", 2026, 30)}
        {renderCalendarMonth("Setembro", 2026, 31)}
        {renderCalendarMonth("Outubro", 2026, 30)}
        {renderCalendarMonth("Novembro", 2026, 31)}
        {renderCalendarMonth("Dezembro", 2026, 30)}
      </ScrollView>
    </View>
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
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  monthContainer: {
    padding: 10,
  },
  monthTitle: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 15,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayBox: {
    width: "14.28%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  dayText: {
    fontSize: 14,
  },
});

import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="guata"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

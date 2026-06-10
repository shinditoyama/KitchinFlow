import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Text,
} from "react-native";
import { Colors, Spacing } from "@/constants/theme";

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            Sujeito<Text>Pizzaria</Text>
          </Text>
        </View>

        {/*<View style={{}}>
          <Text>Email</Text>
          <TextInput placeholder="Digite seu email..." secureTextEntry={true} />
        </View>*/}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    justifyContent: "center",
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  logoText: {
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  formContainer: {},
});

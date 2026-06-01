import { useAuthActions } from "@convex-dev/auth/react";
import { Stack } from "expo-router";
import * as React from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

export default function Login() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = React.useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [pending, setPending] = React.useState(false);

  const handleSubmit = async () => {
    setPending(true);
    setError("");
    try {
      await signIn("password", { email, password, flow });
    } catch (e) {
      setError((e as Error).message ?? "Could not sign in");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: flow === "signIn" ? "Sign In" : "Sign Up" }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center gap-6 bg-background p-6">
          <Text variant="h2">{flow === "signIn" ? "Welcome back" : "Create account"}</Text>

          <View className="w-full gap-4">
            <View className="gap-1.5">
              <Text nativeID="email-label" variant="small">
                Email
              </Text>
              <Input
                placeholder="email@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                aria-labelledby="email-label"
              />
            </View>

            <View className="gap-1.5">
              <Text nativeID="password-label" variant="small">
                Password
              </Text>
              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onSubmitEditing={handleSubmit}
                aria-labelledby="password-label"
              />
            </View>

            {error ? (
              <Text variant="muted" className="text-destructive">
                {error}
              </Text>
            ) : null}

            <Button onPress={handleSubmit} disabled={pending || !email || !password}>
              <Text>{flow === "signIn" ? "Sign In" : "Sign Up"}</Text>
            </Button>
          </View>

          <Pressable onPress={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}>
            <Text variant="muted" className="text-primary">
              {flow === "signIn"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

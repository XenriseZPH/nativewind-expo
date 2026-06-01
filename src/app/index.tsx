import { useAuthActions } from "@convex-dev/auth/react";
import { router, Stack } from "expo-router";
import { Heart, Info, ListTodo, LogOut, Mail, Rocket, Star } from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text variant="large">{title}</Text>
      {children}
    </View>
  );
}

export default function Index() {
  const [notifications, setNotifications] = React.useState(true);
  const [agreed, setAgreed] = React.useState(false);
  const [name, setName] = React.useState("");
  const [progress, setProgress] = React.useState(40);

  const { signOut } = useAuthActions();

  return (
    <>
      <Stack.Screen options={{ title: "Components" }} />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="gap-8 p-6 pb-16"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 gap-2">
            <Text variant="h2">Welcome to NativeWind</Text>
            <Text variant="muted">A shadcn/ui-flavored design system for Expo.</Text>
          </View>
          <Button variant="ghost" size="icon" onPress={() => signOut()}>
            <Icon as={LogOut} className="size-5 text-muted-foreground" />
          </Button>
        </View>

        <Button onPress={() => router.push("/todos")} size="lg" className="w-full">
          <Icon as={ListTodo} className="size-4" color="white" />
          <Text>Go to Todos</Text>
        </Button>

        <Section title="Typography">
          <Text variant="h3">Heading</Text>
          <Text variant="p">
            Body copy uses the themed Text component so it always picks up the correct foreground
            color in light and dark mode.
          </Text>
          <Text variant="muted">Muted supporting text.</Text>
        </Section>

        <Section title="Buttons">
          <View className="flex-row flex-wrap gap-3">
            <Button>
              <Text>Default</Text>
            </Button>
            <Button variant="secondary">
              <Text>Secondary</Text>
            </Button>
            <Button variant="destructive">
              <Text>Destructive</Text>
            </Button>
            <Button variant="outline">
              <Text>Outline</Text>
            </Button>
            <Button variant="ghost">
              <Text>Ghost</Text>
            </Button>
            <Button variant="link">
              <Text>Link</Text>
            </Button>
          </View>
          <View className="flex-row flex-wrap items-center gap-3">
            <Button>
              <Icon as={Rocket} className="size-4" color={"white"} />
              <Text>With icon</Text>
            </Button>
            <Button size="sm" variant="outline">
              <Text>Small</Text>
            </Button>
            <Button size="lg">
              <Text>Large</Text>
            </Button>
            <Button size="icon" variant="secondary">
              <Icon as={Heart} className="size-4" />
            </Button>
          </View>
        </Section>

        <Section title="Badges">
          <View className="flex-row flex-wrap gap-2">
            <Badge>
              <Text>Default</Text>
            </Badge>
            <Badge variant="secondary">
              <Text>Secondary</Text>
            </Badge>
            <Badge variant="destructive">
              <Text>Destructive</Text>
            </Badge>
            <Badge variant="outline">
              <Text>Outline</Text>
            </Badge>
          </View>
        </Section>

        <Section title="Card">
          <Card>
            <CardHeader>
              <CardTitle>Project</CardTitle>
              <CardDescription>Deploy your new app in one click.</CardDescription>
            </CardHeader>
            <CardContent className="gap-1.5">
              <Label nativeID="project-name">Name</Label>
              <Input
                placeholder="My awesome app"
                value={name}
                onChangeText={setName}
                aria-labelledby="project-name"
              />
            </CardContent>
            <CardFooter className="justify-between gap-3">
              <Button variant="outline" className="flex-1">
                <Text>Cancel</Text>
              </Button>
              <Button className="flex-1">
                <Text>Deploy</Text>
              </Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Form controls">
          <View className="flex-row items-center justify-between">
            <Label onPress={() => setNotifications((value) => !value)}>Push notifications</Label>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </View>
          <Separator />
          <View className="flex-row items-center gap-3">
            <Checkbox checked={agreed} onCheckedChange={setAgreed} />
            <Label onPress={() => setAgreed((value) => !value)}>I agree to the terms</Label>
          </View>
        </Section>

        <Section title="Progress">
          <Progress value={progress} />
          <View className="flex-row gap-3">
            <Button
              size="sm"
              variant="outline"
              onPress={() => setProgress((value) => Math.max(0, value - 10))}
            >
              <Text>-10%</Text>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setProgress((value) => Math.min(100, value + 10))}
            >
              <Text>+10%</Text>
            </Button>
          </View>
        </Section>

        <Section title="Avatar">
          <View className="flex-row items-center gap-3">
            <Avatar alt="Shadcn avatar">
              <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
              <AvatarFallback>
                <Text>CN</Text>
              </AvatarFallback>
            </Avatar>
            <Avatar alt="Fallback avatar">
              <AvatarFallback>
                <Text>EX</Text>
              </AvatarFallback>
            </Avatar>
          </View>
        </Section>

        <Section title="Dialog">
          <View className="flex-row flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Text>Show dialog</Text>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">
                      <Text>Cancel</Text>
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="destructive">
                      <Text>Delete</Text>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Text>Edit profile</Text>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Tap save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <View className="gap-1.5">
                  <Label nativeID="dialog-name">Name</Label>
                  <Input
                    placeholder="Pedro Duarte"
                    value={name}
                    onChangeText={setName}
                    aria-labelledby="dialog-name"
                  />
                </View>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>
                      <Text>Save changes</Text>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </View>
        </Section>

        <Section title="Alerts">
          <Alert icon={Info}>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>These components are theme-aware out of the box.</AlertDescription>
          </Alert>
          <Alert icon={Star} variant="destructive">
            <AlertTitle>Something needs attention</AlertTitle>
            <AlertDescription>
              Destructive variant uses the themed destructive color.
            </AlertDescription>
          </Alert>
        </Section>

        <Button variant="link" onPress={() => setName("")}>
          <Icon as={Mail} className="size-4" />
          <Text>Reset form</Text>
        </Button>
      </ScrollView>
    </>
  );
}

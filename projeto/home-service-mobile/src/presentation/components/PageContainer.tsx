import React, { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface PageContainerProps extends PropsWithChildren {
  scroll?: boolean;
}

export function PageContainer({ children, scroll = true }: PageContainerProps) {
  if (!scroll) {
    return <View style={styles.container}>{children}</View>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 14
  }
});

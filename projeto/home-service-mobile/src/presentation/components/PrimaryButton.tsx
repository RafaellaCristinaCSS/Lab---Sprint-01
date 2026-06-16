import React from "react";
import { Button } from "react-native-paper";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function PrimaryButton({ label, onPress, loading, disabled }: PrimaryButtonProps) {
  return (
    <Button mode="contained" onPress={onPress} loading={loading} disabled={disabled}>
      {label}
    </Button>
  );
}

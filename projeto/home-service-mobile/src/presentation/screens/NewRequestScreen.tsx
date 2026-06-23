import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card, HelperText, Menu, Snackbar, Text } from "react-native-paper";
import { AppHeader } from "../components/AppHeader";
import { ErrorState } from "../components/ErrorState";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { PageContainer } from "../components/PageContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextField } from "../components/TextField";
import { useCreateServiceRequest } from "../hooks/useCreateServiceRequest";
import { useLookups } from "../hooks/useLookups";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "NewRequest">;

function defaultScheduledDate() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
}

export function NewRequestScreen({ navigation }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState(defaultScheduledDate());
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [clientMenuVisible, setClientMenuVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const { usersQuery, categoriesQuery } = useLookups();
  const createMutation = useCreateServiceRequest();

  const clients = useMemo(
    () => (usersQuery.data ?? []).filter((user) => user.userType === "CLIENT"),
    [usersQuery.data]
  );
  const categories = categoriesQuery.data ?? [];

  const selectedClient = clients.find((item) => item.id === selectedClientId) ?? null;
  const selectedCategory = categories.find((item) => item.id === selectedCategoryId) ?? null;

  const lookupsPending = usersQuery.isPending || categoriesQuery.isPending;
  const lookupsError = usersQuery.isError || categoriesQuery.isError;

  async function handleSubmit() {
    if (title.trim().length < 5) {
      setFeedback("Titulo deve ter no minimo 5 caracteres.");
      return;
    }

    if (description.trim().length < 10) {
      setFeedback("Descricao deve ter no minimo 10 caracteres.");
      return;
    }

    if (!selectedClientId || !selectedCategoryId) {
      setFeedback("Selecione um cliente e uma categoria.");
      return;
    }

    const parsedPrice = estimatedPrice.trim() ? Number(estimatedPrice) : undefined;
    if (parsedPrice !== undefined && Number.isNaN(parsedPrice)) {
      setFeedback("Preco estimado invalido.");
      return;
    }

    try {
      await createMutation.mutateAsync({
        clientId: selectedClientId,
        categoryId: selectedCategoryId,
        title: title.trim(),
        description: description.trim(),
        scheduledDate,
        estimatedPrice: parsedPrice
      });

      setFeedback("Solicitacao criada com sucesso.");
      setTitle("");
      setDescription("");
      setEstimatedPrice("");
      setScheduledDate(defaultScheduledDate());

      setTimeout(() => {
        navigation.navigate("RequestsList");
      }, 600);
    } catch {
      setFeedback("Falha ao criar solicitacao. Verifique API e dados de cadastro.");
    }
  }

  return (
    <PageContainer>
      <AppHeader
        title="Nova solicitacao"
        subtitle="Formulario com os campos reais do endpoint POST /service-requests."
      />
      <PrimaryButton label="Voltar para lista" onPress={() => navigation.navigate("RequestsList")} />

      {lookupsPending ? <LoadingIndicator message="Carregando clientes e categorias..." /> : null}

      {lookupsError ? (
        <ErrorState
          message="Nao foi possivel carregar clientes e categorias da API."
          onRetry={() => {
            usersQuery.refetch();
            categoriesQuery.refetch();
          }}
        />
      ) : null}

      {!lookupsPending && !lookupsError ? (
        <Card mode="elevated">
          <Card.Content style={styles.form}>
            <TextField
              label="Titulo"
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Conserto de vazamento"
            />
            <TextField
              label="Descricao"
              value={description}
              onChangeText={setDescription}
              placeholder="Descreva o servico"
              multiline
            />
            <TextField
              label="Data agendada (ISO)"
              value={scheduledDate}
              onChangeText={setScheduledDate}
              placeholder="2026-05-20T10:00:00.000Z"
            />
            <TextField
              label="Preco estimado (opcional)"
              value={estimatedPrice}
              onChangeText={setEstimatedPrice}
              placeholder="200"
              keyboardType="numeric"
            />

            <View style={styles.selectRow}>
              <Text variant="bodyMedium">Cliente *</Text>
              <Menu
                visible={clientMenuVisible}
                onDismiss={() => setClientMenuVisible(false)}
                anchor={
                  <PrimaryButton
                    label={selectedClient ? selectedClient.name : "Selecionar cliente"}
                    onPress={() => setClientMenuVisible(true)}
                  />
                }
              >
                {clients.map((client) => (
                  <Menu.Item
                    key={client.id}
                    onPress={() => {
                      setSelectedClientId(client.id);
                      setClientMenuVisible(false);
                    }}
                    title={client.name}
                  />
                ))}
              </Menu>
            </View>

            <View style={styles.selectRow}>
              <Text variant="bodyMedium">Categoria *</Text>
              <Menu
                visible={categoryMenuVisible}
                onDismiss={() => setCategoryMenuVisible(false)}
                anchor={
                  <PrimaryButton
                    label={selectedCategory ? selectedCategory.name : "Selecionar categoria"}
                    onPress={() => setCategoryMenuVisible(true)}
                  />
                }
              >
                {categories.map((category) => (
                  <Menu.Item
                    key={category.id}
                    onPress={() => {
                      setSelectedCategoryId(category.id);
                      setCategoryMenuVisible(false);
                    }}
                    title={category.name}
                  />
                ))}
              </Menu>
            </View>

            <HelperText type="info">
              O backend exige cliente e categoria existentes. Cadastre-os previamente se necessario.
            </HelperText>

            <PrimaryButton
              label={createMutation.isPending ? "Criando..." : "Salvar solicitacao"}
              onPress={handleSubmit}
              disabled={createMutation.isPending}
              loading={createMutation.isPending}
            />
          </Card.Content>
        </Card>
      ) : null}

      <Snackbar visible={Boolean(feedback)} onDismiss={() => setFeedback(null)} duration={2500}>
        {feedback}
      </Snackbar>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12
  },
  selectRow: {
    gap: 8
  }
});

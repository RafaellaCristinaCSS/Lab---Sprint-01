import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../infrastructure/services/lookupApiService";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ErrorMessage } from "../components/ErrorMessage";
import { Input } from "../components/Input";
import { PageHeader } from "../components/PageHeader";

export function CreateUserPage() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState<"CLIENT" | "PROVIDER">("CLIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (state.trim().length !== 2) {
      setFormError("Estado deve ter exatamente 2 letras (ex: SP, RJ).");
      return;
    }

    setLoading(true);
    try {
      await createUser({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        userType,
        address: address.trim(),
        city: city.trim(),
        state: state.trim().toUpperCase(),
      });

      setSuccessMessage(
        `${userType === "CLIENT" ? "Cliente" : "Prestador de servico"} cadastrado com sucesso!`
      );
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setState("");

      setTimeout(() => navigate("/"), 1200);
    } catch {
      setFormError("Falha ao cadastrar. Verifique se os dados estao corretos e a API esta no ar.");
    } finally {
      setLoading(false);
    }
  }

  const typeLabel = userType === "CLIENT" ? "Cliente" : "Prestador de Servico";

  return (
    <div>
      <PageHeader
        title={`Cadastrar ${typeLabel}`}
        subtitle="Preencha os dados para criar um novo usuario no sistema."
      />

      <Card>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <label className="field">
            <span className="field__label">Tipo de usuario</span>
            <select
              className="field__input"
              value={userType}
              onChange={(e) => setUserType(e.target.value as "CLIENT" | "PROVIDER")}
            >
              <option value="CLIENT">Cliente</option>
              <option value="PROVIDER">Prestador de Servico</option>
            </select>
          </label>

          <Input
            label="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />

          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Telefone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            minLength={10}
            placeholder="11999999999"
          />

          <Input
            label="Endereco"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Rua Exemplo, 123"
          />

          <Input
            label="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <Input
            label="Estado (UF)"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            maxLength={2}
            placeholder="SP"
          />

          {formError && <ErrorMessage message={formError} />}
          {successMessage && (
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                background: "#d1fae5",
                color: "#065f46",
                fontSize: "0.875rem",
              }}
            >
              {successMessage}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : `Cadastrar ${typeLabel}`}
          </Button>
        </form>
      </Card>
    </div>
  );
}

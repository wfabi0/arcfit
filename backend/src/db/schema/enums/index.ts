import { pgEnum } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", [
  "admin",
  "cliente",
  "instrutor",
]);
export const userStatusEnum = pgEnum("user_status", ["ativo", "inativo"]);
export const genderEnum = pgEnum("gender", ["masculino", "feminino", "outro"]);

export const planTypeEnum = pgEnum("plan_type", [
  "mensal",
  "trimestral",
  "semestral",
  "anual",
]);
export const planModalityEnum = pgEnum("plan_modality", [
  "musculacao",
  "cardio",
  "completo",
  "premium",
]);
export const planStatusEnum = pgEnum("plan_status", ["ativo", "inativo"]);

export const membershipStatusEnum = pgEnum("membership_status", [
  "ativa",
  "suspensa",
  "cancelada",
  "bloqueada",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pendente",
  "pago",
  "atrasado",
  "cancelado",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "dinheiro",
  "cartao_credito",
  "cartao_debito",
  "pix",
  "boleto",
  "transferencia",
]);

export const equipmentCategoryEnum = pgEnum("equipment_category", [
  "cardio",
  "musculacao",
  "funcional",
]);
export const equipmentStatusEnum = pgEnum("equipment_status", [
  "disponivel",
  "manutencao",
  "defeito",
  "desativado",
]);

export const maintenanceTypeEnum = pgEnum("maintenance_type", [
  "preventiva",
  "corretiva",
]);
export const maintenanceStatusEnum = pgEnum("maintenance_status", [
  "agendada",
  "em_andamento",
  "concluida",
  "cancelada",
]);

export const accessTypeEnum = pgEnum("access_type", ["entrada", "saida"]);
export const accessMethodEnum = pgEnum("access_method", [
  "digital",
  "cartao",
  "facial",
]);

export const turnstileTypeEnum = pgEnum("turnstile_type", [
  "entrada",
  "saida",
  "bidirecional",
]);
export const turnstileStatusEnum = pgEnum("turnstile_status", [
  "online",
  "offline",
  "manutencao",
]);

export const periodEnum = pgEnum("period", ["manha", "tarde", "noite"]);
export const dayOfWeekEnum = pgEnum("day_of_week", [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
]);

export const workoutTypeEnum = pgEnum("workout_type", ["A", "B", "C", "D"]);
export const workoutStatusEnum = pgEnum("workout_status", ["ativo", "inativo"]);

export const feedbackTypeEnum = pgEnum("feedback_type", [
  "elogio",
  "sugestao",
  "reclamacao",
]);
export const feedbackCategoryEnum = pgEnum("feedback_category", [
  "equipamento",
  "atendimento",
  "limpeza",
  "instrutor",
]);
export const feedbackStatusEnum = pgEnum("feedback_status", [
  "novo",
  "em_analise",
  "respondido",
  "resolvido",
]);

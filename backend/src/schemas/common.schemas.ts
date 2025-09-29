export const errorResponseSchema = {
  type: "object",
  properties: {
    sucesso: { type: "boolean", default: false },
    erro: { type: "string" },
    mensagem: { type: "string" },
    detalhes: { type: "array" },
  },
};

export const successResponseSchema = {
  type: "object",
  properties: {
    sucesso: { type: "boolean", default: true },
    mensagem: { type: "string" },
    dados: { type: "object" },
  },
};

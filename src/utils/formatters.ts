export const currencyFormatter = (
  money: number,
  locale: string = "pt-BR",
  currency: string = "BRL"
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(money);

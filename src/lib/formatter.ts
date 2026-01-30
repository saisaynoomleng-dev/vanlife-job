export const formatTitle = (text: string) => {
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
};

export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'usd',
  }).format(price);
};

export const formatUppercase = (text: string) => {
  return text.toUpperCase();
};

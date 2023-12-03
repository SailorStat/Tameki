const { format } = new Intl.NumberFormat("ru", { currency: "RUB", maximumFractionDigits: 0, style: "currency" });

const formatPrice = (price: number) => format(price);

export default formatPrice;

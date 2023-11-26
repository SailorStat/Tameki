const { format } = new Intl.NumberFormat("ru", { currency: "RUB", style: "currency" });

const formatPrice = (price: number) => format(price);

export default formatPrice;

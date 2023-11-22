const { format } = new Intl.NumberFormat();

const formatPrice = (price: number) => format(price);

export default formatPrice;

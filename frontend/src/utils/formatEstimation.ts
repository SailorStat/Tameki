const formatEstimation = (estimation: number | undefined) =>
  estimation ? (Math.round(estimation / 2) / 10).toFixed(1) : undefined;

export default formatEstimation;

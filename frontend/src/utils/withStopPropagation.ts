const withStopPropagation = (handler: (event: any) => void) => (event: any) => {
  event.stopPropagation();
  handler(event);
};

export default withStopPropagation;

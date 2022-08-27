export const getErrorMessage = (error: any, customMessage?: String) => {
  const defaultMessage = customMessage ?? "There was an error";
  return typeof error === "string" ? error : defaultMessage;
};

import type { CurrencyData } from "../components/homepage/Home";

export interface ValidationError {
  isValid: false;
  message: string;
}

export interface ValidationSuccess {
  isValid: true;
}

export type ValidationResult = ValidationError | ValidationSuccess;

export const validateCurrencySelection = (
  sendCurrency: CurrencyData | null,
  receiveCurrency: CurrencyData | null
): ValidationResult => {
  if (!sendCurrency || !receiveCurrency) {
    return {
      isValid: false,
      message: "Please select both currencies before confirming.",
    };
  }

  if (sendCurrency.currency === receiveCurrency.currency) {
    return {
      isValid: false,
      message: "Please select different currencies for conversion.",
    };
  }

  return { isValid: true };
};

export const validateAmounts = (
  sendAmount: number,
  receiveAmount: number
): ValidationResult => {
  if (sendAmount <= 0 || receiveAmount <= 0) {
    return {
      isValid: false,
      message: "Please enter valid amounts for both currencies.",
    };
  }

  if (isNaN(sendAmount) || isNaN(receiveAmount)) {
    return {
      isValid: false,
      message: "Please enter valid numeric amounts.",
    };
  }

  return { isValid: true };
};

export const validateSwap = (
  sendCurrency: CurrencyData | null,
  receiveCurrency: CurrencyData | null,
  sendAmount: number,
  receiveAmount: number
): ValidationResult => {
  const currencyValidation = validateCurrencySelection(sendCurrency, receiveCurrency);
  if (!currencyValidation.isValid) {
    return currencyValidation;
  }

  const amountValidation = validateAmounts(sendAmount, receiveAmount);
  if (!amountValidation.isValid) {
    return amountValidation;
  }

  return { isValid: true };
};
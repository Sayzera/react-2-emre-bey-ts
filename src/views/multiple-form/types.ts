export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type PaymentInfo = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

export type FormData = {
  personalInfo: PersonalInfo;
  paymentInfo: PaymentInfo;
};

export type FormErros = {
  personalInfo?: Partial<PersonalInfo>;
  paymentInfo?: Partial<PaymentInfo>;
};

export type State = {
  currentStep: number;
  formData: FormData;
  errors: FormErros;
  completedSteps: number[];
};

export type Action =
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "UPDATE_PAYMENT_INFO"; payload: Partial<PaymentInfo> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_ERRORS"; payload: FormErros }
  | { type: "RESET_FORM"}

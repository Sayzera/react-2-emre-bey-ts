import { useReducer, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

// Form verileri için tip tanımlamaları
type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PaymentInfo = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

type FormData = {
  personalInfo: PersonalInfo;
  paymentInfo: PaymentInfo;
};

type FormErrors = {
  personalInfo?: Partial<PersonalInfo>;
  paymentInfo?: Partial<PaymentInfo>;
};

type State = {
  currentStep: number;
  formData: FormData;
  errors: FormErrors;
  completedSteps: number[];
};

type Action =
  | { type: "SET_STEP"; payload: number }
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "UPDATE_PAYMENT_INFO"; payload: Partial<PaymentInfo> }
  | { type: "SET_ERRORS"; payload: FormErrors }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET_FORM" }
  | { type: "MARK_STEP_COMPLETE"; payload: number };

const TOTAL_STEPS = 2;

const initialState: State = {
  currentStep: 1,
  formData: {
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    paymentInfo: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
  },
  errors: {},
  completedSteps: [],
};

// Validasyon fonksiyonları
const validatePersonalInfo = (data: PersonalInfo): Partial<PersonalInfo> => {
  const errors: Partial<PersonalInfo> = {};
  if (!data.firstName.trim()) errors.firstName = "Ad gereklidir";
  if (!data.lastName.trim()) errors.lastName = "Soyad gereklidir";
  if (!data.email.trim()) {
    errors.email = "E-posta gereklidir";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Geçerli bir e-posta adresi giriniz";
  }
  if (!data.phone.trim()) {
    errors.phone = "Telefon gereklidir";
  } else if (!/^[0-9]{10,11}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Geçerli bir telefon numarası giriniz";
  }
  return errors;
};

const validatePaymentInfo = (data: PaymentInfo): Partial<PaymentInfo> => {
  const errors: Partial<PaymentInfo> = {};
  if (!data.cardNumber.trim()) {
    errors.cardNumber = "Kart numarası gereklidir";
  } else if (!/^[0-9]{16}$/.test(data.cardNumber.replace(/\s/g, ""))) {
    errors.cardNumber = "Kart numarası 16 haneli olmalıdır";
  }
  if (!data.cardHolder.trim()) errors.cardHolder = "Kart sahibi adı gereklidir";
  if (!data.expiryDate.trim()) {
    errors.expiryDate = "Son kullanma tarihi gereklidir";
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
    errors.expiryDate = "Format: MM/YY";
  }
  if (!data.cvv.trim()) {
    errors.cvv = "CVV gereklidir";
  } else if (!/^[0-9]{3}$/.test(data.cvv)) {
    errors.cvv = "CVV 3 haneli olmalıdır";
  }
  return errors;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_STEP": {
      return {
        ...state,
        currentStep: action.payload,
      };
    }

    case "UPDATE_PERSONAL_INFO": {
      return {
        ...state,
        formData: {
          ...state.formData,
          personalInfo: {
            ...state.formData.personalInfo,
            ...action.payload,
          },
        },
        errors: {
          ...state.errors,
          personalInfo: undefined,
        },
      };
    }

    case "UPDATE_PAYMENT_INFO": {
      return {
        ...state,
        formData: {
          ...state.formData,
          paymentInfo: {
            ...state.formData.paymentInfo,
            ...action.payload,
          },
        },
        errors: {
          ...state.errors,
          paymentInfo: undefined,
        },
      };
    }

    case "SET_ERRORS": {
      return {
        ...state,
        errors: action.payload,
      };
    }

    case "NEXT_STEP": {
      const errors: FormErrors = {};
      let isValid = true;

      // Mevcut adımı doğrula
      if (state.currentStep === 1) {
        // İlk adım: Kişisel bilgiler
        errors.personalInfo = validatePersonalInfo(state.formData.personalInfo);
        isValid = Object.keys(errors.personalInfo).length === 0;
      } else if (state.currentStep === 2) {
        // İkinci adım: Ödeme bilgileri
        errors.paymentInfo = validatePaymentInfo(state.formData.paymentInfo);
        isValid = Object.keys(errors.paymentInfo).length === 0;
      }

      if (!isValid) {
        return {
          ...state,
          errors,
        };
      }

      // Adımı tamamlandı olarak işaretle
      const completedSteps = state.completedSteps.includes(state.currentStep)
        ? state.completedSteps
        : [...state.completedSteps, state.currentStep];

      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
        errors: {},
        completedSteps,
      };
    }

    case "PREV_STEP": {
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
        errors: {},
      };
    }

    case "MARK_STEP_COMPLETE": {
      return {
        ...state,
        completedSteps: state.completedSteps.includes(action.payload)
          ? state.completedSteps
          : [...state.completedSteps, action.payload],
      };
    }

    case "RESET_FORM": {
      return initialState;
    }

    default:
      return state;
  }
}

// Adım başlıkları
const stepTitles = [
  "Kişisel Bilgiler",
  "Ödeme Bilgileri ve Özet",
];

// Props tipleri
type StepComponentProps = {
  formData: FormData;
  errors: FormErrors;
  dispatch: React.Dispatch<Action>;
};

// Adım 1: Kişisel Bilgiler
const PersonalInfoStep = memo(({ formData, errors, dispatch }: StepComponentProps) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">Ad *</Label>
        <Input
          id="firstName"
          value={formData.personalInfo.firstName}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { firstName: e.target.value },
            })
          }
          aria-invalid={!!errors.personalInfo?.firstName}
        />
        {errors.personalInfo?.firstName && (
          <p className="text-sm text-destructive">
            {errors.personalInfo.firstName}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Soyad *</Label>
        <Input
          id="lastName"
          value={formData.personalInfo.lastName}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { lastName: e.target.value },
            })
          }
          aria-invalid={!!errors.personalInfo?.lastName}
        />
        {errors.personalInfo?.lastName && (
          <p className="text-sm text-destructive">
            {errors.personalInfo.lastName}
          </p>
        )}
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">E-posta *</Label>
      <Input
        id="email"
        type="email"
        value={formData.personalInfo.email}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_PERSONAL_INFO",
            payload: { email: e.target.value },
          })
        }
        aria-invalid={!!errors.personalInfo?.email}
      />
      {errors.personalInfo?.email && (
        <p className="text-sm text-destructive">
          {errors.personalInfo.email}
        </p>
      )}
    </div>
    <div className="space-y-2">
      <Label htmlFor="phone">Telefon *</Label>
      <Input
        id="phone"
        type="tel"
        value={formData.personalInfo.phone}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_PERSONAL_INFO",
            payload: { phone: e.target.value },
          })
        }
        placeholder="05XX XXX XX XX"
        aria-invalid={!!errors.personalInfo?.phone}
      />
      {errors.personalInfo?.phone && (
        <p className="text-sm text-destructive">
          {errors.personalInfo.phone}
        </p>
      )}
    </div>
  </div>
));

PersonalInfoStep.displayName = "PersonalInfoStep";

// Adım 2: Ödeme Bilgileri ve Özet
const PaymentAndSummaryStep = memo(({ formData, errors, dispatch }: StepComponentProps) => (
  <div className="space-y-6">
    {/* Ödeme Bilgileri */}
    <div>
      <h3 className="font-semibold mb-4 text-lg">Ödeme Bilgileri</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Kart Numarası *</Label>
          <Input
            id="cardNumber"
            value={formData.paymentInfo.cardNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PAYMENT_INFO",
                payload: {
                  cardNumber: e.target.value.replace(/\s/g, "").slice(0, 16),
                },
              })
            }
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            aria-invalid={!!errors.paymentInfo?.cardNumber}
          />
          {errors.paymentInfo?.cardNumber && (
            <p className="text-sm text-destructive">
              {errors.paymentInfo.cardNumber}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardHolder">Kart Sahibi Adı *</Label>
          <Input
            id="cardHolder"
            value={formData.paymentInfo.cardHolder}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PAYMENT_INFO",
                payload: { cardHolder: e.target.value },
              })
            }
            placeholder="AD SOYAD"
            aria-invalid={!!errors.paymentInfo?.cardHolder}
          />
          {errors.paymentInfo?.cardHolder && (
            <p className="text-sm text-destructive">
              {errors.paymentInfo.cardHolder}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Son Kullanma Tarihi *</Label>
            <Input
              id="expiryDate"
              value={formData.paymentInfo.expiryDate}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length >= 2) {
                  value = value.slice(0, 2) + "/" + value.slice(2, 4);
                }
                dispatch({
                  type: "UPDATE_PAYMENT_INFO",
                  payload: { expiryDate: value },
                });
              }}
              placeholder="MM/YY"
              maxLength={5}
              aria-invalid={!!errors.paymentInfo?.expiryDate}
            />
            {errors.paymentInfo?.expiryDate && (
              <p className="text-sm text-destructive">
                {errors.paymentInfo.expiryDate}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              value={formData.paymentInfo.cvv}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_PAYMENT_INFO",
                  payload: {
                    cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                  },
                })
              }
              placeholder="123"
              maxLength={3}
              aria-invalid={!!errors.paymentInfo?.cvv}
            />
            {errors.paymentInfo?.cvv && (
              <p className="text-sm text-destructive">
                {errors.paymentInfo.cvv}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Özet */}
    <div>
      <h3 className="font-semibold mb-4 text-lg">Bilgilerinizin Özeti</h3>
      <div>
        <h4 className="font-medium mb-2 text-sm">Kişisel Bilgiler</h4>
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <p>
            <span className="font-medium">Ad Soyad:</span>{" "}
            {formData.personalInfo.firstName}{" "}
            {formData.personalInfo.lastName}
          </p>
          <p>
            <span className="font-medium">E-posta:</span>{" "}
            {formData.personalInfo.email}
          </p>
          <p>
            <span className="font-medium">Telefon:</span>{" "}
            {formData.personalInfo.phone}
          </p>
        </div>
      </div>
    </div>
  </div>
));

PaymentAndSummaryStep.displayName = "PaymentAndSummaryStep";

// Adım göstergesi
type StepIndicatorProps = {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
};

const StepIndicator = memo(({ currentStep, completedSteps, onStepClick }: StepIndicatorProps) => (
  <div className="flex items-center justify-between mb-8">
    {stepTitles.map((title, index) => {
      const stepNumber = index + 1;
      const isCompleted = completedSteps.includes(stepNumber);
      const isCurrent = currentStep === stepNumber;
      const isAccessible =
        stepNumber < currentStep ||
        completedSteps.includes(stepNumber - 1) ||
        stepNumber === currentStep;

      return (
        <div
          key={stepNumber}
          className="flex items-center flex-1"
          onClick={() => isAccessible && onStepClick(stepNumber)}
        >
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all cursor-pointer ${
                isCurrent
                  ? "bg-primary text-primary-foreground scale-110"
                  : isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              } ${isAccessible ? "hover:scale-105" : "cursor-not-allowed"}`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                stepNumber
              )}
            </div>
            <span
              className={`mt-2 text-xs text-center ${
                isCurrent ? "font-semibold text-primary" : "text-muted-foreground"
              }`}
            >
              {title}
            </span>
          </div>
          {stepNumber < TOTAL_STEPS && (
            <div
              className={`h-1 flex-1 mx-2 transition-colors ${
                isCompleted ? "bg-green-500" : "bg-muted"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
));

StepIndicator.displayName = "StepIndicator";

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handlePrev = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleStepClick = (step: number) => {
    // Sadece tamamlanmış adımlara veya bir sonraki adıma geçilebilir
    if (
      state.completedSteps.includes(step - 1) ||
      step === state.currentStep ||
      step < state.currentStep
    ) {
      dispatch({ type: "SET_STEP", payload: step });
    }
  };

  const handleSubmit = () => {
    // Son adımda tüm validasyonları kontrol et
    const personalErrors = validatePersonalInfo(state.formData.personalInfo);
    const paymentErrors = validatePaymentInfo(state.formData.paymentInfo);

    const hasErrors =
      Object.keys(personalErrors).length > 0 ||
      Object.keys(paymentErrors).length > 0;

    if (hasErrors) {
      dispatch({
        type: "SET_ERRORS",
        payload: {
          personalInfo: personalErrors,
          paymentInfo: paymentErrors,
        },
      });
      return;
    }

    // Form gönderildi
    alert("Form başarıyla gönderildi! 🎉\n\n" + JSON.stringify(state.formData, null, 2));
    dispatch({ type: "RESET_FORM" });
  };

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={state.formData}
            errors={state.errors}
            dispatch={dispatch}
          />
        );
      case 2:
        return (
          <PaymentAndSummaryStep
            formData={state.formData}
            errors={state.errors}
            dispatch={dispatch}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Çok Adımlı Form</h1>
          <p className="text-muted-foreground">
            Reducer ile yönetilen form adımları
          </p>
        </div>

        <StepIndicator
          currentStep={state.currentStep}
          completedSteps={state.completedSteps}
          onStepClick={handleStepClick}
        />

        <Card>
          <CardHeader>
            <CardTitle>{stepTitles[state.currentStep - 1]}</CardTitle>
            <CardDescription>
              Adım {state.currentStep} / {TOTAL_STEPS}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={state.currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Önceki
            </Button>
            {state.currentStep < TOTAL_STEPS ? (
              <Button onClick={handleNext}>
                Sonraki
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Formu Gönder</Button>
            )}
          </CardFooter>
        </Card>

        {/* Debug bilgisi (geliştirme için) */}
        <div className="mt-4 p-4 bg-muted rounded-lg text-xs">
          <p className="font-semibold mb-2">Reducer State:</p>
          <pre className="overflow-auto">
            {JSON.stringify(
              {
                currentStep: state.currentStep,
                completedSteps: state.completedSteps,
                hasErrors: Object.keys(state.errors).length > 0,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;


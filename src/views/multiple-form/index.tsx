import {
  useEffect,
  useReducer,
  type ActionDispatch,
  type ChangeEvent,
} from "react";
import type { Action, FormData, FormErros, State } from "./types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { validatePaymentInfo, validatePersonalInfo } from "./utils";
import { config } from "./constants";
import { StepIndicator } from "./components/step-indicator";
import { PersonelInfoStep } from "./components/personal-info-step";
import { toast } from "sonner";

/**
 * Eklenen formları bir listede tutalım aynı zamanda localStorage yazalım 
 * aşağıda shadcnden aldığın table ile bu listeyi ayrı komponent olarak tasarlayalım ve her eklenen eleman bu listeye yansıtılsın
 * formu gönder dediğimde yukarıda ifade edilen listeye göndersin ve listeden geri gel dediğimde ise beni tekrardan forma götürsün
 * table içerisinde ... nokta ile işlemler olacak shadcn içerisinde dropdown menüyü kolonun en sonuna işlemler olarak ekleyeceksiniz
 * 
 * https://ui.shadcn.com/docs/components/table [Table]
 * https://ui.shadcn.com/docs/components/dropdown-menu [İşlemler dropdownu için]
 */

interface PaymentAndSummaryStepProps {
  dispatch: ActionDispatch<[action: Action]>;
  formData: FormData;
  errors: FormErros;
}
// TODO: Component olacak
const PaymentAndSummaryStep = ({
  dispatch,
  formData,
  errors,
}: PaymentAndSummaryStepProps) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({
      type: "UPDATE_PAYMENT_INFO",
      payload: {
        [name]: value,
      },
    });
  };

  const fullName = `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`;
  const email = formData.personalInfo.email;
  const phone = formData.personalInfo.phone;

  return (
    <div className="space-y-6">
      {/* Ödeme Bilgileri */}
      <div>
        <h3 className="font-semibold mb-4 text-lg">Ödeme Bilgileri</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Kart Numarası *</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.paymentInfo.cardNumber}
              onChange={handleChangeInput}
              placeholder="1234 5678 9012 3456"
              maxLength={16}
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
              name="cardHolder"
              value={formData.paymentInfo.cardHolder}
              onChange={handleChangeInput}
              placeholder="AD SOYAD"
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
                name="expiryDate"
                value={formData.paymentInfo.expiryDate}
                onChange={handleChangeInput}
                placeholder="MM/YY"
                maxLength={5}
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
                placeholder="123"
                name="cvv"
                value={formData.paymentInfo.cvv}
                onChange={handleChangeInput}
                maxLength={3}
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
              <span className="font-medium">Ad Soyad: {fullName}</span>{" "}
            </p>
            <p>
              <span className="font-medium">E-posta: {email}</span>{" "}
            </p>
            <p>
              <span className="font-medium">Telefon: {phone}</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const stepTitles = ["Kişisel Bilgiler", "Ödeme Bilgileri ve özet"];

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

function reducer(state: State, action: Action): State {
  switch (action.type) {
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

    case "NEXT_STEP": {
      const errors: FormErros = {};
      let isValid = true;
      // Hangi adımdayım

      if (state.currentStep === 1) {
        errors.personalInfo = validatePersonalInfo(state.formData.personalInfo);

        isValid = Object.keys(errors.personalInfo).length === 0;
      }

      if (!isValid) {
        return {
          ...state,
          errors,
        };
      }

      // Adımı tamamlandı olrak işartle
      const completedSteps = state.completedSteps.includes(state.currentStep)
        ? state.completedSteps
        : [...state.completedSteps, state.currentStep];

      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, config.TOTAL_STEPS),
        errors,
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

    case "SET_ERRORS": {
      return {
        ...state,
        errors: action.payload,
      };
    }

    case "RESET_FORM": {
      return initialState;
    }

    default:
      return state;
  }
}

function MultipleForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    const personalErrors = validatePersonalInfo(state.formData.personalInfo);
    const paymentErros = validatePaymentInfo(state.formData.paymentInfo);

    const hasError =
      Object.keys(personalErrors).length > 0 ||
      Object.keys(paymentErros).length > 0;

    if (hasError) {
      dispatch({
        type: "SET_ERRORS",
        payload: {
          personalInfo: personalErrors,
          paymentInfo: paymentErros,
        },
      });
      return;
    }

    dispatch({ type: "RESET_FORM" });
    toast("Başarı", {
      description: "Form başarıyla gönderildi",
      // action: {
      //   label: "Undo",
      //   onClick: () => console.log("Undo"),
      // },
    });
  };

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const prevStep = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const renderStepContent = (stepCount = 1) => {
    switch (stepCount) {
      case 1:
        return (
          <PersonelInfoStep
            dispatch={dispatch}
            formData={state.formData}
            errors={state.errors}
          />
        );
      case 2:
        return (
          <PaymentAndSummaryStep
            dispatch={dispatch}
            formData={state.formData}
            errors={state.errors}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className=" max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Çok Adımlı Form</h1>
          <p className="text-muted-foreground">
            Reducer ile yönetilen form adımları
          </p>
        </div>

        {/* Komponente dönüşecek */}
        <StepIndicator
          completedSteps={state.completedSteps}
          currentStep={state.currentStep}
          stepTitles={stepTitles}
        />

        {/* TODO: Form Footer Komponent olacak  */}
        <Card>
          <CardHeader>
            <CardTitle>1</CardTitle>
            <CardDescription>Adım1 / TOTAL STEPS</CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent(state.currentStep)}</CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={state.currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Önceki
            </Button>
            <Button
              onClick={nextStep}
              disabled={state.currentStep >= config.TOTAL_STEPS}
            >
              Sonraki
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              disabled={state.currentStep !== config.TOTAL_STEPS}
              onClick={handleSubmit}
            >
              Formu Gönder
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default MultipleForm;

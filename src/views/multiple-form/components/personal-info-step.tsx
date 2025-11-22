import type { ActionDispatch, ChangeEvent } from "react";
import type { Action, FormData, FormErros } from "../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PersonalInfoStep {
  dispatch: ActionDispatch<[action: Action]>;
  formData: FormData;
  errors: FormErros;
}
// TODO: Component olacak
const PersonelInfoStep = ({ dispatch, formData, errors }: PersonalInfoStep) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: {
        [name]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Ad *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.personalInfo.firstName}
            onChange={handleChangeInput}
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
            name="lastName"
            value={formData.personalInfo.lastName}
            onChange={handleChangeInput}
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
          name="email"
          value={formData.personalInfo.email}
          onChange={handleChangeInput}
          type="email"
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
          name="phone"
          value={formData.personalInfo.phone}
          onChange={handleChangeInput}
          type="tel"
          placeholder="05XX XXX XX XX"
        />
        {errors.personalInfo?.phone && (
          <p className="text-sm text-destructive">
            {errors.personalInfo.phone}
          </p>
        )}
      </div>
    </div>
  );
};

export {
    PersonelInfoStep
}
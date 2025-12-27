import { ErrorType, } from "@/context/error-context";
import { useError } from "@/hooks/use-error";

interface ErrorThrowerProps {
  shouldThrow?:boolean
}


export function ErrorThrower({ shouldThrow = true, }: ErrorThrowerProps) {
  const {error} = useError()


  if (shouldThrow && Object.keys(error || {}).length > 0) {
    throw Object.assign(
      new Error(error?.message || "Bilinmeyen bir hata oluştu" ),
      {
       type: error?.type || ErrorType.UNKNOWN,
       message: error?.message || 'Bilinmeyen bir hata oluştu',
       code: error?.code || ErrorType.UNKNOWN,
       details: error?.details || {},
       timestam: new Date()
      }
    );
  }

  return null;
}

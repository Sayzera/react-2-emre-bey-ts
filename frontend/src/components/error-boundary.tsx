import { Component, type ReactNode, type ErrorInfo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { AppError } from "@/context/error-context";


interface ErrorBoundaryProps {
    children: ReactNode,
    fallback?: ReactNode
    onError?: (error:Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error & Partial<AppError> | null
    errorInfo: ErrorInfo | null
}



export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error:null,
            errorInfo: null
        }
    }


    /**
     * Hata oluştuğunda state'i güncelle
     */
    static getDerivedStateFromError(error:Error): Partial<ErrorBoundaryState> {
        return {
            hasError: true,
            error
        }
    }

    /**
     * Hata bilgilerini logla ve opsiyonel callback çağır
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary yakaldı: ',error, errorInfo)

        this.setState({
            errorInfo
        })

        if(this.props.onError) {
            this.props.onError(error, errorInfo)
        }
        
    }


    handleReset = () => {
        this.setState({
            hasError: false,
            error:null,
            errorInfo: null
        })
    }


    render() {

        if(this.state.hasError) {
            if(this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-5 w-5" />
                      Bir Hata Oluştu
                    </CardTitle>
                    <CardDescription>
                      Uygulamada beklenmeyen bir hata meydana geldi.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Hata Detayları</AlertTitle>
                      <AlertDescription className="mt-2">
                        <div className="space-y-2">
                       
                          <p>
                            <strong>Mesaj:</strong> {this.state.error?.message || "Bilinmeyen hata"}
                          </p>
                          {this.state.error?.name && (
                            <p>
                              <strong>Tip:</strong> {this.state.error.code}
                            </p>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                    {import.meta.env.VITE_PROJECT_NAME  }
      
                    {import.meta.env.DEV && this.state.errorInfo && (
                      <div className="mt-4">
                        <details className="bg-muted p-4 rounded-md text-sm">
                          <summary className="cursor-pointer font-semibold mb-2">
                            Stack Trace (Sadece Development)
                          </summary>
                          <pre className="overflow-auto max-h-64 text-xs">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </details>
                      </div>
                    )}
      
                    <div className="flex gap-2">
                      <Button onClick={this.handleReset} variant="default">
                        Tekrar Dene
                      </Button>
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                      >
                        Sayfayı Yenile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
        }


        return this.props.children
       
    }
    


}
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
import LoginForm from "app/auth/components/LoginForm"
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"

// Component is a BlitzPage component, eg pages/index.tsx
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
        {getLayout(<Component {...pageProps} />)}
      </ThirdwebProvider>
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}

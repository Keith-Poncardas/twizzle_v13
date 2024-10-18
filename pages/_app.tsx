import type { AppProps } from 'next/app' // Importing the AppProps type from Next.js for type checking
import { Toaster } from 'react-hot-toast'; // Importing the Toaster component for displaying notifications
import { SessionProvider } from 'next-auth/react'; // Importing the SessionProvider for managing user sessions

import Layout from '@/components/Layout' // Importing the main layout component for the application
import LoginModal from '@/components/modals/LoginModal' // Importing the LoginModal component
import RegisterModal from '@/components/modals/RegisterModal' // Importing the RegisterModal component
import '@/styles/globals.css' // Importing global CSS styles
import EditModal from '@/components/modals/EditModal'; // Importing the EditModal component

// Main App component
export default function App({ Component, pageProps }: AppProps) {
  return (
    // Providing session context to the entire application using SessionProvider
    <SessionProvider session={pageProps.session}>
      <Toaster /> {/* Notification container for displaying toast notifications */}
      <RegisterModal /> {/* Modal for user registration */}
      <LoginModal /> {/* Modal for user login */}
      <EditModal /> {/* Modal for editing content */}
      <Layout>
        {/* Rendering the page component with its respective props */}
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

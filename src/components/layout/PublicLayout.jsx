import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFAB from '../ui/WhatsAppFAB'
import CartDrawer from '../cart/CartDrawer'

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0a', color: '#f5f5f5' }}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
      <CartDrawer />
    </div>
  )
}

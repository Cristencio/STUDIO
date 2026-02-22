import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, CreditCard, Check, ArrowLeft, Shield, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const beat = location.state?.beat || {
    id: 1,
    title: 'Midnight Dreams',
    producer: 'Quality Studio',
    price: 29.99,
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop'
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    email: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Pagamento realizado com sucesso!', {
      description: 'O beat foi adicionado à sua biblioteca.'
    });
    
    navigate('/cliente');
    setIsProcessing(false);
  };

  const paymentMethods = [
    { id: 'card', name: 'Cartão de Crédito', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Shield },
    { id: 'mpesa', name: 'M-Pesa', icon: Shield },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20" data-testid="checkout-page">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          data-testid="back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">Finalizar Compra</h1>
              <p className="text-muted-foreground">Complete seu pagamento de forma segura</p>
            </div>

            {/* Payment Method Selection */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Método de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          isSelected 
                            ? 'bg-primary/10 border-primary' 
                            : 'bg-secondary border-transparent hover:border-border'
                        }`}
                        data-testid={`payment-${method.id}`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {method.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Dados do Cartão</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        className="bg-secondary border-0"
                        required
                        data-testid="checkout-email"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Número do Cartão</label>
                      <Input 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="bg-secondary border-0"
                        required
                        data-testid="checkout-card-number"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Nome no Cartão</label>
                      <Input 
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="NOME COMPLETO"
                        className="bg-secondary border-0"
                        required
                        data-testid="checkout-card-name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Validade</label>
                        <Input 
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          className="bg-secondary border-0"
                          required
                          data-testid="checkout-expiry"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">CVV</label>
                        <Input 
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="bg-secondary border-0"
                          required
                          data-testid="checkout-cvv"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* M-Pesa / PayPal placeholder */}
            {paymentMethod !== 'card' && (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Você será redirecionado para {paymentMethod === 'paypal' ? 'PayPal' : 'M-Pesa'} para completar o pagamento.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Beat Item */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={beat.cover}
                      alt={beat.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{beat.title}</h3>
                    <p className="text-muted-foreground text-sm">{beat.producer}</p>
                    <p className="font-mono font-bold text-primary mt-1">${beat.price}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${beat.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de processamento</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="font-mono text-primary">${beat.price}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full rounded-full gap-2 btn-glow"
                  disabled={isProcessing}
                  data-testid="confirm-payment"
                >
                  {isProcessing ? (
                    <>Processando...</>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pagar ${beat.price}
                    </>
                  )}
                </Button>

                <p className="text-muted-foreground text-xs text-center flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Pagamento seguro com criptografia SSL
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

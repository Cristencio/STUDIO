import React, { useState } from 'react';
import { Calendar, Clock, Mic2, Sliders, Speaker, Music, Check, ArrowRight, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const serviceTypes = [
  { id: 'gravacao', title: 'Gravação', icon: Mic2, price: 50, unit: 'hora' },
  { id: 'mixagem', title: 'Mixagem', icon: Sliders, price: 100, unit: 'faixa' },
  { id: 'masterizacao', title: 'Masterização', icon: Speaker, price: 50, unit: 'faixa' },
  { id: 'producao', title: 'Produção', icon: Music, price: 200, unit: 'projeto' },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const durations = [
  { value: '1', label: '1 hora' },
  { value: '2', label: '2 horas' },
  { value: '3', label: '3 horas' },
  { value: '4', label: '4 horas' },
  { value: '8', label: '8 horas (dia inteiro)' },
];

const SessionsPage = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getServicePrice = () => {
    const service = serviceTypes.find(s => s.id === selectedService);
    if (!service || !selectedDuration) return 0;
    return service.price * parseInt(selectedDuration);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Sessão agendada com sucesso!', {
      description: 'Você receberá um email de confirmação em breve.'
    });
    // Reset form
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedService('');
    setSelectedDuration('');
    setFormData({ name: '', email: '', phone: '', notes: '' });
  };

  const canProceedToStep2 = selectedService && selectedDuration;
  const canProceedToStep3 = selectedDate && selectedTime;
  const canSubmit = formData.name && formData.email && formData.phone;

  return (
    <div className="min-h-screen pt-24 pb-20" data-testid="sessions-page">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
            Agendamento
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            AGENDE SUA SESSÃO
          </h1>
          <p className="text-muted-foreground text-lg">
            Reserve seu horário no estúdio em poucos passos. Escolha o serviço, data e horário que melhor se adequam à sua agenda.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12" data-testid="progress-steps">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                  step >= s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-12 md:w-24 h-1 rounded-full transition-colors ${
                  step > s ? 'bg-primary' : 'bg-secondary'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-8" data-testid="step-1">
              <h2 className="font-heading text-2xl font-semibold text-center">Escolha o Serviço</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceTypes.map((service) => {
                  const Icon = service.icon;
                  const isSelected = selectedService === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-6 rounded-2xl border text-left transition-all ${
                        isSelected 
                          ? 'bg-primary/10 border-primary' 
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                      data-testid={`service-option-${service.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-primary/20' : 'bg-secondary'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <p className="text-muted-foreground text-sm">A partir de ${service.price}/{service.unit}</p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedService && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Duração da Sessão</h3>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="bg-card" data-testid="duration-select">
                      <SelectValue placeholder="Selecione a duração" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((d) => (
                        <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!canProceedToStep2}
                  className="rounded-full gap-2"
                  data-testid="next-step-1"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-8" data-testid="step-2">
              <h2 className="font-heading text-2xl font-semibold text-center">Escolha Data e Horário</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      Selecione a Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md"
                      data-testid="calendar"
                    />
                  </CardContent>
                </Card>

                {/* Time Slots */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Clock className="w-5 h-5 text-primary" />
                      Selecione o Horário
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-lg font-mono text-sm transition-all ${
                            selectedTime === time
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary hover:bg-secondary/80'
                          }`}
                          data-testid={`time-slot-${time.replace(':', '')}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-full" data-testid="back-step-2">
                  Voltar
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!canProceedToStep3}
                  className="rounded-full gap-2"
                  data-testid="next-step-2"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info & Confirm */}
          {step === 3 && (
            <div className="space-y-8" data-testid="step-3">
              <h2 className="font-heading text-2xl font-semibold text-center">Confirme seus Dados</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Summary */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Info className="w-5 h-5 text-primary" />
                      Resumo da Reserva
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Serviço</span>
                      <span className="font-medium">{serviceTypes.find(s => s.id === selectedService)?.title}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Data</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Horário</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Duração</span>
                      <span className="font-medium">{selectedDuration} hora(s)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Total Estimado</span>
                      <span className="font-mono font-bold text-primary text-xl">${getServicePrice()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Nome Completo</label>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome"
                          className="bg-secondary border-0"
                          required
                          data-testid="input-name"
                        />
                      </div>
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
                          data-testid="input-email"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Telefone</label>
                        <Input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+258 84 000 0000"
                          className="bg-secondary border-0"
                          required
                          data-testid="input-phone"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Observações (opcional)</label>
                        <Textarea 
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Alguma informação adicional..."
                          className="bg-secondary border-0 resize-none"
                          rows={3}
                          data-testid="input-notes"
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} className="rounded-full" data-testid="back-step-3">
                  Voltar
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!canSubmit}
                  className="rounded-full gap-2 btn-glow"
                  data-testid="submit-booking"
                >
                  Confirmar Reserva
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;

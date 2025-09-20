import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Smartphone, Bell, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function HeroSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sprout,
      title: t('iotMonitoring'),
      description: t('iotDesc')
    },
    {
      icon: Smartphone,
      title: t('communication'),
      description: t('commDesc')
    },
    {
      icon: Bell,
      title: t('notifications'),
      description: t('notifDesc')
    },
    {
      icon: Globe,
      title: t('multilingual'),
      description: t('multiDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">AgriConnect</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-medium mb-4">
            {t('subtitle')}
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('description')}
          </p>

          {/* Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/farmer-dashboard'}
            >
              <Sprout className="mr-2 h-5 w-5" />
              {t('loginAsFarmer')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg rounded-xl border-2 transition-all duration-300"
              onClick={() => window.location.href = '/authority-dashboard'}
            >
              <Smartphone className="mr-2 h-5 w-5" />
              {t('loginAsAuthority')}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {t('features')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary-glow/5 rounded-2xl p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Agricultural Authorities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">99.9%</div>
              <div className="text-muted-foreground">Message Delivery Rate</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
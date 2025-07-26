import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, CheckCircle, TrendingUp, Calendar } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold text-primary">Habitual</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your life one habit at a time. Track, monitor, and achieve your daily goals with our intuitive habit tracking system.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="transition-all duration-200 hover:scale-105"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="animate-slide-up shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Simple Tracking</h3>
              <p className="text-muted-foreground">
                Mark habits as done, missed, or none with a single click. Keep it simple, keep it effective.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visual Progress</h3>
              <p className="text-muted-foreground">
                See your progress at a glance with beautiful status badges and intuitive color coding.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Daily Focus</h3>
              <p className="text-muted-foreground">
                Focus on today's habits without overwhelming complexity. Build consistency one day at a time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to build better habits?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of people who are already transforming their lives with Habitual.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
            className="bg-accent hover:bg-accent/90 transition-all duration-200 hover:scale-105"
          >
            Start Your Journey Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

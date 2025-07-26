import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddHabitFormProps {
  onAddHabit: (name: string) => Promise<void>;
}

export const AddHabitForm = ({ onAddHabit }: AddHabitFormProps) => {
  const [habitName, setHabitName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddHabit(habitName.trim());
      setHabitName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="animate-slide-up shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Add New Habit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="text"
            placeholder="Enter habit name..."
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="flex-1 transition-all duration-200 focus:scale-[1.02]"
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            disabled={!habitName.trim() || isSubmitting}
            className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-1" />
            {isSubmitting ? 'Adding...' : 'Add'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
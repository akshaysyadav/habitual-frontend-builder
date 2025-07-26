import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Circle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Habit {
  _id: string;
  name: string;
  status: 'done' | 'missed' | 'none';
}

interface HabitCardProps {
  habit: Habit;
  onStatusUpdate: (id: string, status: Habit['status']) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
}

export const HabitCard = ({ habit, onStatusUpdate, onDelete, isUpdating }: HabitCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(habit._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: Habit['status']) => {
    switch (status) {
      case 'done':
        return <Badge className="bg-success text-success-foreground">✅ Done</Badge>;
      case 'missed':
        return <Badge className="bg-warning text-warning-foreground">❌ Missed</Badge>;
      case 'none':
        return <Badge variant="secondary" className="bg-neutral text-neutral-foreground">⏺️ None</Badge>;
    }
  };

  const getStatusButtonVariant = (buttonStatus: Habit['status']) => {
    if (habit.status === buttonStatus) {
      switch (buttonStatus) {
        case 'done':
          return 'default';
        case 'missed':
          return 'destructive';
        case 'none':
          return 'secondary';
      }
    }
    return 'outline';
  };

  return (
    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-foreground">{habit.name}</h3>
          {getStatusBadge(habit.status)}
        </div>
        
        <div className="flex gap-2 mb-3">
          <Button
            size="sm"
            variant={getStatusButtonVariant('done')}
            onClick={() => onStatusUpdate(habit._id, 'done')}
            disabled={isUpdating}
            className={cn(
              "flex-1 transition-all duration-200",
              habit.status === 'done' && "bg-success hover:bg-success/90"
            )}
          >
            <Check className="w-4 h-4 mr-1" />
            Done
          </Button>
          
          <Button
            size="sm"
            variant={getStatusButtonVariant('missed')}
            onClick={() => onStatusUpdate(habit._id, 'missed')}
            disabled={isUpdating}
            className={cn(
              "flex-1 transition-all duration-200",
              habit.status === 'missed' && "bg-warning hover:bg-warning/90"
            )}
          >
            <X className="w-4 h-4 mr-1" />
            Missed
          </Button>
          
          <Button
            size="sm"
            variant={getStatusButtonVariant('none')}
            onClick={() => onStatusUpdate(habit._id, 'none')}
            disabled={isUpdating}
            className={cn(
              "flex-1 transition-all duration-200",
              habit.status === 'none' && "bg-neutral hover:bg-neutral/90"
            )}
          >
            <Circle className="w-4 h-4 mr-1" />
            None
          </Button>
        </div>
        
        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting || isUpdating}
          className="w-full transition-all duration-200"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isDeleting ? 'Deleting...' : 'Delete Habit'}
        </Button>
      </CardContent>
    </Card>
  );
};
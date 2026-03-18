'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';

interface DeletePostButtonProps {
  id: string;
  title: string;
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Post deleted successfully');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="h-10 w-10 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-50"
      title="Delete Post"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}

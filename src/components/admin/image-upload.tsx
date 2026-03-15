'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      // Generate a unique file name
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      setIsUploading(true);

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('blog-images').getPublicUrl(filePath);

      onChange(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    // We would ideally delete it from storage, but we'll just clear the value for simplicity
    onChange('');
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={handleRemove}
            className="absolute right-2 top-2 h-8 w-8 rounded-full shadow-sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex aspect-video w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-3" />
            ) : (
              <UploadCloud className="h-8 w-8 text-muted-foreground mb-3" />
            )}
            <p className="mb-2 text-sm text-foreground font-medium">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}

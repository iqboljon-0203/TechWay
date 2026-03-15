'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  delay?: number;
  image?: string;
  href?: string;
};

export function ServiceCard({
  title,
  description,
  icon,
  className = '',
  delay = 0,
  image,
  href = '/services',
}: ServiceCardProps) {
  return (
    <Link href={href as any} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5, scale: 1.01 }}
        className="group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-background/50 p-8 shadow-sm backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 dark:hover:border-primary/30"
      >
      {/* Background Image if provided */}
      {image && (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity duration-700">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        </div>
      )}

      {/* Subtle glow effect behind the card on hover */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          {/* Icon Container */}
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20 bg-background/50 backdrop-blur-md">
            {icon}
          </div>

          <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300">
            {title}
          </h3>

          <p className="max-w-md leading-relaxed text-muted-foreground/90 group-hover:text-foreground transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Arrow visible on hover */}
        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
          Learn More <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}

// Bounded Types
export type BoundedProps = {
  children: React.ReactNode;
  className?: string;
  isPadded?: boolean;
  as?: React.ElementType;
};

// CTA props
export type CTAProps = {
  className?: string;
  href: string;
  children: React.ReactNode;
};

// Prev Newsletter Action Props
export type PrevNewsletterActionProps = {
  status: string;
  message: string;
};

// Submit Button Props
export type SubmitButtonProps = {
  className?: string;
  children: React.ReactNode;
};

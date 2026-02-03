import { ALL_VANS_QUERYResult } from '@/sanity/types';

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

// Prev Newsletter Action Props
export type PrevContactActionProps = {
  status: string;
  message: string;
  field?: string;
};

// Van Card Props
export type VanCardProps = NonNullable<ALL_VANS_QUERYResult['vans']>[number] & {
  className?: string;
};

// Van Type Text Props
export type VanTypeTextProps = {
  type: NonNullable<ALL_VANS_QUERYResult['vans']>[number]['type'];
  className?: string;
};

// Back to Props
export type BackToProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

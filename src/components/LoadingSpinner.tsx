// components/LoadingSpinner.tsx
import React from 'react';

type LoadingSpinnerProps = {
  size?: number;
  className?: string;
};

export default function LoadingSpinner({
  size = 32,
  className = '',
}: LoadingSpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <g fill="currentColor">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <circle
              key={i}
              cx="12"
              cy="3"
              r="1"
              transform={`rotate(${angle} 12 12)`}
            >
              <animate
                attributeName="r"
                values="1;2;1"
                dur="0.6s"
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 12 12;0 12 12"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

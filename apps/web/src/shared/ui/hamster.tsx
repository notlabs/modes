/** @jsxImportSource @emotion/react */
import { keyframes, css, Keyframes } from '@emotion/react';

const standUpAnimation = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.2) translateY(-30px); }
`;

const bodySquishAnimation = keyframes`
  0%, 100% { ry: 100; }
  50% { ry: 85; }
`;

const bellySquishAnimation = keyframes`
  0%, 100% { ry: 50; }
  50% { ry: 40; }
`;

const eyesBlinkAnimation = keyframes`
  0%, 45%, 55%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.1); }
`;

const getAnimationStyles = (
  animation: Keyframes,
  speed: number,
  delay: number
) => css`
  animation: ${animation} ${speed}s ease-in-out ${delay}s infinite;
`;

type HamsterProps = {
  delay?: number;
  width?: number;
  height?: number;
  speed?: number;
};

export const Hamster = ({
  delay = 0,
  width = 400,
  height = 400,
  speed = 3,
}: HamsterProps) => (
  <div style={{ width, height }} className="inline-block">
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <g
        css={[
          getAnimationStyles(standUpAnimation, speed, delay),
          css`
            transform-origin: center bottom;
          `,
        ]}
      >
        <ellipse
          css={getAnimationStyles(bodySquishAnimation, speed, delay)}
          cx="200"
          cy="220"
          rx="120"
          ry="100"
          fill="#E8C49F"
        />
        <path d="M120 130 Q130 90 160 110" fill="#E8C49F" />
        <path d="M280 130 Q270 90 240 110" fill="#E8C49F" />
        <path d="M125 125 Q133 95 155 110" fill="#FFC0CB" />
        <path d="M275 125 Q267 95 245 110" fill="#FFC0CB" />

        <circle cx="200" cy="180" r="90" fill="#F4D4B5" />
        <g
          css={[
            getAnimationStyles(eyesBlinkAnimation, speed + 1, delay),
            css`
              transform-origin: center;
            `,
          ]}
        >
          <circle cx="160" cy="160" r="15" fill="#000000" />
          <circle cx="240" cy="160" r="15" fill="#000000" />
          <circle cx="165" cy="155" r="5" fill="#FFFFFF" />
          <circle cx="245" cy="155" r="5" fill="#FFFFFF" />
        </g>
        <path d="M190 180 Q200 185 210 180 Q200 195 190 180" fill="#FFA0A0" />

        <circle cx="130" cy="190" r="25" fill="#FFB6C1" opacity="0.6" />
        <circle cx="270" cy="190" r="25" fill="#FFB6C1" opacity="0.6" />

        <g stroke="#B39374" strokeWidth="2">
          <line x1="140" y1="185" x2="90" y2="175" />
          <line x1="140" y1="190" x2="90" y2="190" />
          <line x1="140" y1="195" x2="90" y2="205" />
          <line x1="260" y1="185" x2="310" y2="175" />
          <line x1="260" y1="190" x2="310" y2="190" />
          <line x1="260" y1="195" x2="310" y2="205" />
        </g>

        <ellipse cx="160" cy="315" rx="25" ry="15" fill="#E8C49F" />
        <ellipse cx="240" cy="315" rx="25" ry="15" fill="#E8C49F" />

        <ellipse
          css={getAnimationStyles(bellySquishAnimation, speed, delay)}
          cx="200"
          cy="270"
          rx="70"
          ry="50"
          fill="#FFF5EA"
        />
      </g>
    </svg>
  </div>
);

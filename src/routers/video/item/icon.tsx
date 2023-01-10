import { FC } from "react";
export const CoinIcon: FC<{
  height: number | string;
  width?: number | string;
}> = ({ height, width = height }) => (
  <svg fill='none' viewBox='0 0 24 24' height={height} width={width}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.25 4.75a.75.75 0 010 1.5h-2.5v1.29c1.117.125 2.062.539 2.761 1.253.849.867 1.239 2.077 1.239 3.457v.5a.75.75 0 01-1.5 0v-.5c0-1.105-.31-1.895-.81-2.407-.383-.39-.934-.678-1.69-.79V17a.75.75 0 01-1.5 0v-5.947c-.756.112-1.307.4-1.69.79-.5.512-.81 1.302-.81 2.407v.5a.75.75 0 01-1.5 0v-.5c0-1.38.39-2.59 1.239-3.457.7-.714 1.644-1.128 2.761-1.252V8.25h-2.5a.75.75 0 010-1.5h6.5z'
      fill='#707070'
    />
  </svg>
);

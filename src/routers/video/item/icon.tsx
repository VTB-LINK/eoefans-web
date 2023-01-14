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

export const BiliIcon: FC<{
  height: number | string;
  width?: number | string;
  color?: string;
}> = ({ height, width = height, color = "#fff" }) => (
  <svg viewBox='0 0 18 18' height={height} width={width}>
    <path
      fill={color}
      fillRule='evenodd'
      clipRule='evenodd'
      d='M3.73252 2.67094C3.33229 2.28484 3.33229 1.64373 3.73252 1.25764C4.11291 0.890684 4.71552 0.890684 5.09591 1.25764L7.21723 3.30403C7.27749 3.36218 7.32869 3.4261 7.37081 3.49407H10.5789C10.6211 3.4261 10.6723 3.36218 10.7325 3.30403L12.8538 1.25764C13.2342 0.890684 13.8368 0.890684 14.2172 1.25764C14.6175 1.64373 14.6175 2.28484 14.2172 2.67094L13.364 3.49407H14C16.2091 3.49407 18 5.28493 18 7.49407V12.9996C18 15.2087 16.2091 16.9996 14 16.9996H4C1.79086 16.9996 0 15.2087 0 12.9996V7.49406C0 5.28492 1.79086 3.49407 4 3.49407H4.58579L3.73252 2.67094ZM4 5.42343C2.89543 5.42343 2 6.31886 2 7.42343V13.0702C2 14.1748 2.89543 15.0702 4 15.0702H14C15.1046 15.0702 16 14.1748 16 13.0702V7.42343C16 6.31886 15.1046 5.42343 14 5.42343H4ZM5 9.31747C5 8.76519 5.44772 8.31747 6 8.31747C6.55228 8.31747 7 8.76519 7 9.31747V10.2115C7 10.7638 6.55228 11.2115 6 11.2115C5.44772 11.2115 5 10.7638 5 10.2115V9.31747ZM12 8.31747C11.4477 8.31747 11 8.76519 11 9.31747V10.2115C11 10.7638 11.4477 11.2115 12 11.2115C12.5523 11.2115 13 10.7638 13 10.2115V9.31747C13 8.76519 12.5523 8.31747 12 8.31747Z'
    ></path>
  </svg>
);

export const UPIcon: FC<{
  height: number | string;
  width?: number | string;
  color?: string;
  title: string;
}> = ({ height, width = height, color = "#fff", title }) => (
  <svg width={width} height={height} viewBox='0 0 32 16'>
    <g>
      <title>{title}</title>
      <g>
        <defs transform='translate(-0.125002 0) translate(-0.125002 -3.50005) translate(-0.250003 -0.875012) translate(3.62505 0.375005) translate(-16.5001 0) translate(0 -13.0001) translate(46 34.5) scale(0.718746 0.677774) translate(-46 -34.5) translate(1.65244 6.37735) scale(0.62608 0.39753) translate(-1.65244 -6.37735) translate(5.70947 19.6703) scale(1.02315 1) translate(-5.70947 -19.6703) translate(65.882 19.6703) scale(1.04525 1.09279) translate(-65.882 -19.6703) translate(3.59401 17.685) scale(1.01299 1.10378) translate(-3.59401 -17.685)'>
          <clipPath id='svg_9'>
            <rect height='49' width='63' y='-18' x='-7' />
          </clipPath>
        </defs>
        <g transform='translate(-6 1)' clipPath='url(#svg_9)'>
          <path
            stroke='#D9D9D9'
            fillRule='evenodd'
            fill='none'
            strokeMiterlimit='8'
            strokeWidth='1.33333'
            d='m7.30751,0.74584c0,-0.562 0.68339,-1.01758 1.52641,-1.01758l26.19677,0c0.84302,0 1.52644,0.45559 1.52644,1.01758l0,12.58943c0,0.56201 -0.68342,1.01761 -1.52644,1.01761l-26.19677,0c-0.84303,0 -1.52641,-0.45561 -1.52641,-1.01761l0,-12.58943z'
          />
        </g>
      </g>
      <text
        stroke='rgb(222,222,222)'
        fontSize='12'
        y='12'
        x='8'
        strokeWidth='0.5'
      >
        UP
      </text>
    </g>
  </svg>
);

import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  popInSlideDown: {
    '0%': { transform: 'translate3d(0, -110px, 0)' },
    '20%': { transform: 'translate3d(0, 0px, 0)' },
    '80%': { transform: 'translate3d(0, 0px, 0)' },
    '100%': { transform: 'translate3d(0, 110px, 0)' },
  },
});

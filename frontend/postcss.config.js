import jitProps from 'postcss-jit-props';
import OpenProps from 'open-props';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    // PostCSS JIT Props - nur die verwendeten Props werden gebundelt
    jitProps(OpenProps),
    // Autoprefixer für Browser-Kompatibilität
    autoprefixer(),
  ],
};

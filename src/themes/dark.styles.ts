import { css } from 'lit';

export default css`
  :host,
  .sl-theme-dark {
    /*
     * Color Primitives
     */

    /* Blue Gray */
    --sl-color-blue-gray-50: 20 26 40;
    --sl-color-blue-gray-100: 25 32 52;
    --sl-color-blue-gray-200: 34 45 63;
    --sl-color-blue-gray-300: 55 69 89;
    --sl-color-blue-gray-400: 75 89 109;
    --sl-color-blue-gray-500: 105 121 144;
    --sl-color-blue-gray-600: 153 168 189;
    --sl-color-blue-gray-700: 208 218 230;
    --sl-color-blue-gray-800: 231 237 245;
    --sl-color-blue-gray-900: 246 250 254;
    --sl-color-blue-gray-950: 253 255 255;

    /* Cool Gray */
    --sl-color-cool-gray-50: 21 26 39;
    --sl-color-cool-gray-100: 27 33 49;
    --sl-color-cool-gray-200: 35 45 59;
    --sl-color-cool-gray-300: 59 69 85;
    --sl-color-cool-gray-400: 79 89 103;
    --sl-color-cool-gray-500: 111 119 133;
    --sl-color-cool-gray-600: 161 168 180;
    --sl-color-cool-gray-700: 214 218 224;
    --sl-color-cool-gray-800: 234 236 240;
    --sl-color-cool-gray-900: 248 249 251;
    --sl-color-cool-gray-950: 254 255 255;

    /* Gray */
    --sl-color-gray-50: 28 28 31;
    --sl-color-gray-100: 33 33 37;
    --sl-color-gray-200: 43 43 46;
    --sl-color-gray-300: 67 67 74;
    --sl-color-gray-400: 86 86 95;
    --sl-color-gray-500: 118 118 127;
    --sl-color-gray-600: 166 166 175;
    --sl-color-gray-700: 217 217 221;
    --sl-color-gray-800: 233 233 236;
    --sl-color-gray-900: 249 249 250;
    --sl-color-gray-950: 255 255 255;

    /* True Gray */
    --sl-color-true-gray-50: 26 26 26;
    --sl-color-true-gray-100: 32 32 32;
    --sl-color-true-gray-200: 42 42 42;
    --sl-color-true-gray-300: 68 68 68;
    --sl-color-true-gray-400: 86 86 86;
    --sl-color-true-gray-500: 120 120 120;
    --sl-color-true-gray-600: 168 168 168;
    --sl-color-true-gray-700: 217 217 217;
    --sl-color-true-gray-800: 234 234 234;
    --sl-color-true-gray-900: 250 250 250;
    --sl-color-true-gray-950: 255 255 255;

    /* Warm Gray */
    --sl-color-warm-gray-50: 28 27 26;
    --sl-color-warm-gray-100: 38 34 32;
    --sl-color-warm-gray-200: 45 41 40;
    --sl-color-warm-gray-300: 72 68 64;
    --sl-color-warm-gray-400: 91 87 82;
    --sl-color-warm-gray-500: 125 118 112;
    --sl-color-warm-gray-600: 173 167 163;
    --sl-color-warm-gray-700: 219 216 214;
    --sl-color-warm-gray-800: 236 234 233;
    --sl-color-warm-gray-900: 250 250 249;
    --sl-color-warm-gray-950: 255 255 254;

    /* Red */
    --sl-color-red-50: 85 24 24;
    --sl-color-red-100: 132 34 33;
    --sl-color-red-200: 158 33 31;
    --sl-color-red-300: 191 35 32;
    --sl-color-red-400: 226 45 42;
    --sl-color-red-500: 245 74 72;
    --sl-color-red-600: 254 118 118;
    --sl-color-red-700: 255 170 170;
    --sl-color-red-800: 255 207 207;
    --sl-color-red-900: 255 231 231;
    --sl-color-red-950: 255 247 247;

    /* Orange */
    --sl-color-orange-50: 87 36 19;
    --sl-color-orange-100: 129 49 22;
    --sl-color-orange-200: 159 57 22;
    --sl-color-orange-300: 200 70 18;
    --sl-color-orange-400: 240 93 19;
    --sl-color-orange-500: 255 120 28;
    --sl-color-orange-600: 255 151 65;
    --sl-color-orange-700: 255 191 121;
    --sl-color-orange-800: 255 220 175;
    --sl-color-orange-900: 255 242 218;
    --sl-color-orange-950: 255 252 242;

    /* Amber */
    --sl-color-amber-50: 79 39 16;
    --sl-color-amber-100: 125 57 19;
    --sl-color-amber-200: 151 68 19;
    --sl-color-amber-300: 186 88 16;
    --sl-color-amber-400: 223 124 15;
    --sl-color-amber-500: 251 163 21;
    --sl-color-amber-600: 255 196 43;
    --sl-color-amber-700: 255 216 82;
    --sl-color-amber-800: 255 235 143;
    --sl-color-amber-900: 255 248 204;
    --sl-color-amber-950: 255 255 240;

    /* Yellow */
    --sl-color-yellow-50: 64 42 16;
    --sl-color-yellow-100: 118 67 22;
    --sl-color-yellow-200: 138 81 19;
    --sl-color-yellow-300: 166 102 14;
    --sl-color-yellow-400: 207 143 14;
    --sl-color-yellow-500: 240 184 20;
    --sl-color-yellow-600: 255 209 30;
    --sl-color-yellow-700: 255 229 76;
    --sl-color-yellow-800: 255 245 143;
    --sl-color-yellow-900: 255 254 200;
    --sl-color-yellow-950: 255 255 237;

    /* Lime */
    --sl-color-lime-50: 42 61 18;
    --sl-color-lime-100: 58 87 24;
    --sl-color-lime-200: 68 102 23;
    --sl-color-lime-300: 82 129 21;
    --sl-color-lime-400: 106 168 22;
    --sl-color-lime-500: 137 209 31;
    --sl-color-lime-600: 168 235 59;
    --sl-color-lime-700: 195 247 105;
    --sl-color-lime-800: 222 254 162;
    --sl-color-lime-900: 241 255 208;
    --sl-color-lime-950: 252 255 236;

    /* Green */
    --sl-color-green-50: 16 53 31;
    --sl-color-green-100: 25 87 49;
    --sl-color-green-200: 28 106 56;
    --sl-color-green-300: 29 133 65;
    --sl-color-green-400: 32 168 78;
    --sl-color-green-500: 43 202 99;
    --sl-color-green-600: 80 227 133;
    --sl-color-green-700: 139 244 177;
    --sl-color-green-800: 192 252 213;
    --sl-color-green-900: 225 255 236;
    --sl-color-green-950: 245 255 249;

    /* Emerald */
    --sl-color-emerald-50: 7 49 38;
    --sl-color-emerald-100: 13 82 63;
    --sl-color-emerald-200: 15 99 74;
    --sl-color-emerald-300: 16 125 91;
    --sl-color-emerald-400: 20 155 109;
    --sl-color-emerald-500: 29 190 134;
    --sl-color-emerald-600: 59 216 158;
    --sl-color-emerald-700: 115 236 188;
    --sl-color-emerald-800: 172 248 213;
    --sl-color-emerald-900: 214 255 234;
    --sl-color-emerald-950: 241 255 250;

    /* Teal */
    --sl-color-teal-50: 16 50 48;
    --sl-color-teal-100: 24 82 78;
    --sl-color-teal-200: 24 98 93;
    --sl-color-teal-300: 24 123 114;
    --sl-color-teal-400: 25 153 141;
    --sl-color-teal-500: 32 189 171;
    --sl-color-teal-600: 54 217 196;
    --sl-color-teal-700: 100 239 217;
    --sl-color-teal-800: 158 251 233;
    --sl-color-teal-900: 209 255 246;
    --sl-color-teal-950: 245 255 255;

    /* Cyan */
    --sl-color-cyan-50: 21 56 70;
    --sl-color-cyan-100: 28 82 103;
    --sl-color-cyan-200: 28 98 122;
    --sl-color-cyan-300: 25 121 149;
    --sl-color-cyan-400: 24 150 183;
    --sl-color-cyan-500: 26 187 217;
    --sl-color-cyan-600: 46 216 243;
    --sl-color-cyan-700: 109 237 254;
    --sl-color-cyan-800: 170 248 255;
    --sl-color-cyan-900: 212 255 255;
    --sl-color-cyan-950: 241 255 255;

    /* Sky */
    --sl-color-sky-50: 17 54 77;
    --sl-color-sky-100: 20 78 115;
    --sl-color-sky-200: 19 93 138;
    --sl-color-sky-300: 18 109 166;
    --sl-color-sky-400: 22 137 204;
    --sl-color-sky-500: 31 170 238;
    --sl-color-sky-600: 64 194 253;
    --sl-color-sky-700: 130 216 255;
    --sl-color-sky-800: 191 235 255;
    --sl-color-sky-900: 229 247 255;
    --sl-color-sky-950: 245 254 255;

    /* Blue */
    --sl-color-blue-50: 26 37 77;
    --sl-color-blue-100: 37 62 143;
    --sl-color-blue-200: 39 68 180;
    --sl-color-blue-300: 40 82 221;
    --sl-color-blue-400: 47 103 240;
    --sl-color-blue-500: 67 135 251;
    --sl-color-blue-600: 102 170 255;
    --sl-color-blue-700: 152 202 255;
    --sl-color-blue-800: 196 224 255;
    --sl-color-blue-900: 224 239 255;
    --sl-color-blue-950: 244 251 255;

    /* Indigo */
    --sl-color-indigo-50: 40 37 88;
    --sl-color-indigo-100: 54 50 134;
    --sl-color-indigo-200: 61 52 168;
    --sl-color-indigo-300: 73 60 207;
    --sl-color-indigo-400: 85 74 234;
    --sl-color-indigo-500: 105 106 246;
    --sl-color-indigo-600: 134 145 253;
    --sl-color-indigo-700: 170 185 255;
    --sl-color-indigo-800: 204 215 255;
    --sl-color-indigo-900: 229 236 255;
    --sl-color-indigo-950: 243 247 255;

    /* Violet */
    --sl-color-violet-50: 53 25 92;
    --sl-color-violet-100: 81 34 154;
    --sl-color-violet-200: 96 38 187;
    --sl-color-violet-300: 115 45 222;
    --sl-color-violet-400: 130 63 242;
    --sl-color-violet-500: 144 97 251;
    --sl-color-violet-600: 172 144 255;
    --sl-color-violet-700: 201 186 255;
    --sl-color-violet-800: 226 219 255;
    --sl-color-violet-900: 242 238 255;
    --sl-color-violet-950: 250 248 255;

    /* Purple */
    --sl-color-purple-50: 51 21 71;
    --sl-color-purple-100: 93 33 140;
    --sl-color-purple-200: 112 38 173;
    --sl-color-purple-300: 131 40 211;
    --sl-color-purple-400: 152 56 239;
    --sl-color-purple-500: 173 90 252;
    --sl-color-purple-600: 197 137 255;
    --sl-color-purple-700: 221 185 255;
    --sl-color-purple-800: 238 218 255;
    --sl-color-purple-900: 248 237 255;
    --sl-color-purple-950: 255 250 255;

    /* Fuchsia */

    --sl-color-fuchsia-50: 60 20 62;
    --sl-color-fuchsia-100: 117 31 122;
    --sl-color-fuchsia-200: 139 31 148;
    --sl-color-fuchsia-300: 167 35 180;
    --sl-color-fuchsia-400: 197 45 216;
    --sl-color-fuchsia-500: 222 76 244;
    --sl-color-fuchsia-600: 237 126 254;
    --sl-color-fuchsia-700: 245 176 255;
    --sl-color-fuchsia-800: 250 213 255;
    --sl-color-fuchsia-900: 255 237 255;
    --sl-color-fuchsia-950: 255 249 255;

    /* Pink */
    --sl-color-pink-50: 71 18 39;
    --sl-color-pink-100: 136 30 71;
    --sl-color-pink-200: 162 30 81;
    --sl-color-pink-300: 195 32 97;
    --sl-color-pink-400: 225 46 124;
    --sl-color-pink-500: 242 78 158;
    --sl-color-pink-600: 249 119 187;
    --sl-color-pink-700: 254 173 217;
    --sl-color-pink-800: 255 212 237;
    --sl-color-pink-900: 255 236 248;
    --sl-color-pink-950: 255 247 253;

    /* Rose */
    --sl-color-rose-50: 79 18 36;
    --sl-color-rose-100: 141 26 59;
    --sl-color-rose-200: 164 26 61;
    --sl-color-rose-300: 196 27 64;
    --sl-color-rose-400: 231 38 76;
    --sl-color-rose-500: 250 69 98;
    --sl-color-rose-600: 255 118 138;
    --sl-color-rose-700: 255 169 180;
    --sl-color-rose-800: 255 210 216;
    --sl-color-rose-900: 255 233 235;
    --sl-color-rose-950: 255 246 247;

    /*
     * Theme Tokens
     */

    /* Primary */
    --sl-color-primary-50: var(--sl-color-sky-50);
    --sl-color-primary-100: var(--sl-color-sky-100);
    --sl-color-primary-200: var(--sl-color-sky-200);
    --sl-color-primary-300: var(--sl-color-sky-300);
    --sl-color-primary-400: var(--sl-color-sky-400);
    --sl-color-primary-500: var(--sl-color-sky-500);
    --sl-color-primary-600: var(--sl-color-sky-600);
    --sl-color-primary-700: var(--sl-color-sky-700);
    --sl-color-primary-800: var(--sl-color-sky-800);
    --sl-color-primary-900: var(--sl-color-sky-900);
    --sl-color-primary-950: var(--sl-color-sky-950);

    /* Success */
    --sl-color-success-50: var(--sl-color-green-50);
    --sl-color-success-100: var(--sl-color-green-100);
    --sl-color-success-200: var(--sl-color-green-200);
    --sl-color-success-300: var(--sl-color-green-300);
    --sl-color-success-400: var(--sl-color-green-400);
    --sl-color-success-500: var(--sl-color-green-500);
    --sl-color-success-600: var(--sl-color-green-600);
    --sl-color-success-700: var(--sl-color-green-700);
    --sl-color-success-800: var(--sl-color-green-800);
    --sl-color-success-900: var(--sl-color-green-900);
    --sl-color-success-950: var(--sl-color-green-950);

    /* Warning */
    --sl-color-warning-50: var(--sl-color-amber-50);
    --sl-color-warning-100: var(--sl-color-amber-100);
    --sl-color-warning-200: var(--sl-color-amber-200);
    --sl-color-warning-300: var(--sl-color-amber-300);
    --sl-color-warning-400: var(--sl-color-amber-400);
    --sl-color-warning-500: var(--sl-color-amber-500);
    --sl-color-warning-600: var(--sl-color-amber-600);
    --sl-color-warning-700: var(--sl-color-amber-700);
    --sl-color-warning-800: var(--sl-color-amber-800);
    --sl-color-warning-900: var(--sl-color-amber-900);
    --sl-color-warning-950: var(--sl-color-amber-950);

    /* Danger */
    --sl-color-danger-50: var(--sl-color-red-50);
    --sl-color-danger-100: var(--sl-color-red-100);
    --sl-color-danger-200: var(--sl-color-red-200);
    --sl-color-danger-300: var(--sl-color-red-300);
    --sl-color-danger-400: var(--sl-color-red-400);
    --sl-color-danger-500: var(--sl-color-red-500);
    --sl-color-danger-600: var(--sl-color-red-600);
    --sl-color-danger-700: var(--sl-color-red-700);
    --sl-color-danger-800: var(--sl-color-red-800);
    --sl-color-danger-900: var(--sl-color-red-900);
    --sl-color-danger-950: var(--sl-color-red-950);

    /* Neutral */
    --sl-color-neutral-50: var(--sl-color-gray-50);
    --sl-color-neutral-100: var(--sl-color-gray-100);
    --sl-color-neutral-200: var(--sl-color-gray-200);
    --sl-color-neutral-300: var(--sl-color-gray-300);
    --sl-color-neutral-400: var(--sl-color-gray-400);
    --sl-color-neutral-500: var(--sl-color-gray-500);
    --sl-color-neutral-600: var(--sl-color-gray-600);
    --sl-color-neutral-700: var(--sl-color-gray-700);
    --sl-color-neutral-800: var(--sl-color-gray-800);
    --sl-color-neutral-900: var(--sl-color-gray-900);
    --sl-color-neutral-950: var(--sl-color-gray-950);

    /* Neutral one-offs */
    --sl-color-neutral-0: 24 24 27;
    --sl-color-neutral-1000: 255 255 255;

    /*
     * Border radius tokens
     */

    --sl-border-radius-small: 0.125rem; /* 2px */
    --sl-border-radius-medium: 0.25rem; /* 4px */
    --sl-border-radius-large: 0.5rem; /* 8px */
    --sl-border-radius-x-large: 1rem; /* 16px */

    --sl-border-radius-circle: 50%;
    --sl-border-radius-pill: 9999px;

    /*
     * Elevation tokens
     */

    --sl-shadow-x-small: 0 1px 0 rgb(0 0 0 / 12%);
    --sl-shadow-small: 0 1px 2px rgb(0 0 0 / 18%);
    --sl-shadow-medium: 0 2px 4px rgb(0 0 0 / 18%);
    --sl-shadow-large: 0 2px 8px rgb(0 0 0 / 18%);
    --sl-shadow-x-large: 0 4px 16px rgb(0 0 0 / 18%);

    /*
     * Spacing tokens
     */

    --sl-spacing-xxx-small: 0.125rem; /* 2px */
    --sl-spacing-xx-small: 0.25rem; /* 4px */
    --sl-spacing-x-small: 0.5rem; /* 8px */
    --sl-spacing-small: 0.75rem; /* 12px */
    --sl-spacing-medium: 1rem; /* 16px */
    --sl-spacing-large: 1.25rem; /* 20px */
    --sl-spacing-x-large: 1.75rem; /* 28px */
    --sl-spacing-xx-large: 2.25rem; /* 36px */
    --sl-spacing-xxx-large: 3rem; /* 48px */
    --sl-spacing-xxxx-large: 4.5rem; /* 72px */

    /*
     * Transition tokens
     */

    --sl-transition-x-slow: 1000ms;
    --sl-transition-slow: 500ms;
    --sl-transition-medium: 250ms;
    --sl-transition-fast: 150ms;
    --sl-transition-x-fast: 50ms;

    /*
     * Typography tokens
     */

    /* Fonts */
    --sl-font-mono: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
    --sl-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    --sl-font-serif: Georgia, 'Times New Roman', serif;

    /* Font sizes */
    --sl-font-size-xx-small: 0.625rem; /* 10px */
    --sl-font-size-x-small: 0.75rem; /* 12px */
    --sl-font-size-small: 0.875rem; /* 14px */
    --sl-font-size-medium: 1rem; /* 16px */
    --sl-font-size-large: 1.25rem; /* 20px */
    --sl-font-size-x-large: 1.5rem; /* 24px */
    --sl-font-size-xx-large: 2.25rem; /* 36px */
    --sl-font-size-xxx-large: 3rem; /* 48px */
    --sl-font-size-xxxx-large: 4.5rem; /* 72px */

    /* Font weights */
    --sl-font-weight-light: 300;
    --sl-font-weight-normal: 400;
    --sl-font-weight-semibold: 500;
    --sl-font-weight-bold: 700;

    /* Letter spacings */
    --sl-letter-spacing-dense: -0.015em;
    --sl-letter-spacing-normal: normal;
    --sl-letter-spacing-loose: 0.075em;

    /* Line heights */
    --sl-line-height-dense: 1.4;
    --sl-line-height-normal: 1.8;
    --sl-line-height-loose: 2.2;

    /*
     * Form tokens
     */

    /* Focus ring */
    --sl-focus-ring-width: 3px;
    --sl-focus-ring-alpha: 33%;

    /* Buttons */
    --sl-button-font-size-small: var(--sl-font-size-x-small);
    --sl-button-font-size-medium: var(--sl-font-size-small);
    --sl-button-font-size-large: var(--sl-font-size-medium);

    /* Inputs */
    --sl-input-height-small: 1.875rem; /* 30px */
    --sl-input-height-medium: 2.5rem; /* 40px */
    --sl-input-height-large: 3.125rem; /* 50px */

    --sl-input-background-color: var(--sl-color-neutral-0);
    --sl-input-background-color-hover: var(--sl-color-neutral-0);
    --sl-input-background-color-focus: var(--sl-color-neutral-0);
    --sl-input-background-color-disabled: var(--sl-color-neutral-100);
    --sl-input-border-color: var(--sl-color-neutral-300);
    --sl-input-border-color-hover: var(--sl-color-neutral-400);
    --sl-input-border-color-focus: var(--sl-color-primary-500);
    --sl-input-border-color-disabled: var(--sl-color-neutral-300);
    --sl-input-border-width: 1px;

    --sl-input-border-radius-small: var(--sl-border-radius-medium);
    --sl-input-border-radius-medium: var(--sl-border-radius-medium);
    --sl-input-border-radius-large: var(--sl-border-radius-medium);

    --sl-input-font-family: var(--sl-font-sans);
    --sl-input-font-weight: var(--sl-font-weight-normal);
    --sl-input-font-size-small: var(--sl-font-size-small);
    --sl-input-font-size-medium: var(--sl-font-size-medium);
    --sl-input-font-size-large: var(--sl-font-size-large);
    --sl-input-letter-spacing: var(--sl-letter-spacing-normal);

    --sl-input-color: var(--sl-color-neutral-700);
    --sl-input-color-hover: var(--sl-color-neutral-700);
    --sl-input-color-focus: var(--sl-color-neutral-700);
    --sl-input-color-disabled: var(--sl-color-neutral-900);
    --sl-input-icon-color: var(--sl-color-neutral-500);
    --sl-input-icon-color-hover: var(--sl-color-neutral-600);
    --sl-input-icon-color-focus: var(--sl-color-neutral-600);
    --sl-input-placeholder-color: var(--sl-color-neutral-500);
    --sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);
    --sl-input-spacing-small: var(--sl-spacing-small);
    --sl-input-spacing-medium: var(--sl-spacing-medium);
    --sl-input-spacing-large: var(--sl-spacing-large);

    /* Labels */
    --sl-input-label-font-size-small: var(--sl-font-size-small);
    --sl-input-label-font-size-medium: var(--sl-font-size-medium);
    --sl-input-label-font-size-large: var(--sl-font-size-large);

    --sl-input-label-color: inherit;

    /* Help text */
    --sl-input-help-text-font-size-small: var(--sl-font-size-x-small);
    --sl-input-help-text-font-size-medium: var(--sl-font-size-small);
    --sl-input-help-text-font-size-large: var(--sl-font-size-medium);

    --sl-input-help-text-color: var(--sl-color-neutral-500);

    /* Toggle (checkboxes, radios, switches) */
    --sl-toggle-size: 1rem;

    /*
     * Overlay tokens
     */

    --sl-overlay-background-color: 0 0 0;
    --sl-overlay-opacity: 33%;

    /*
     * Panels
     */

    --sl-panel-background-color: var(--sl-color-neutral-0);
    --sl-panel-border-color: var(--sl-color-neutral-200);

    /*
     * Tooltip tokens
     */

    --sl-tooltip-border-radius: var(--sl-border-radius-medium);
    --sl-tooltip-background-color: var(--sl-color-neutral-800);
    --sl-tooltip-color: var(--sl-color-neutral-0);
    --sl-tooltip-font-family: var(--sl-font-sans);
    --sl-tooltip-font-weight: var(--sl-font-weight-normal);
    --sl-tooltip-font-size: var(--sl-font-size-small);
    --sl-tooltip-line-height: var(--sl-line-height-dense);
    --sl-tooltip-padding: var(--sl-spacing-xx-small) var(--sl-spacing-x-small);
    --sl-tooltip-arrow-size: 5px;
    --sl-tooltip-arrow-start-end-offset: 8px;

    /*
     * Z-index tokens
     */

    --sl-z-index-drawer: 700;
    --sl-z-index-dialog: 800;
    --sl-z-index-dropdown: 900;
    --sl-z-index-toast: 950;
    --sl-z-index-tooltip: 1000;
  }
`;

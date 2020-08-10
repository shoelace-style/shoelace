const ANIMATIONS_SCALE_UP = {
  SCALE_UP_CENTER: 'scale-up-center',
  SCALE_UP_TOP: 'scale-up-top',
  SCALE_UP_TR: 'scale-up-tr',
  SCALE_UP_RIGHT: 'scale-up-right',
  SCALE_UP_BR: 'scale-up-br',
  SCALE_UP_BOTTOM: 'scale-up-bottom',
  SCALE_UP_BL: 'scale-up-bl',
  SCALE_UP_LEFT: 'scale-up-left',
  SCALE_UP_TL: 'scale-up-tl',
  SCALE_UP_HOR_CENTER: 'scale-up-hor-center',
  SCALE_UP_HOR_LEFT: 'scale-up-hor-left',
  SCALE_UP_HOR_RIGHT: 'scale-up-hor-right',
  SCALE_UP_VER_CENTER: 'scale-up-ver-center',
  SCALE_UP_VER_TOP: 'scale-up-ver-top',
  SCALE_UP_VER_BOTTOM: 'scale-up-ver-bottom'
} as const;

const ANIMATIONS_SCALE_DOWN = {
  SCALE_DOWN_CENTER: 'scale-down-center',
  SCALE_DOWN_TOP: 'scale-down-top',
  SCALE_DOWN_TR: 'scale-down-tr',
  SCALE_DOWN_RIGHT: 'scale-down-right',
  SCALE_DOWN_BR: 'scale-down-br',
  SCALE_DOWN_BOTTOM: 'scale-down-bottom',
  SCALE_DOWN_BL: 'scale-down-bl',
  SCALE_DOWN_LEFT: 'scale-down-left',
  SCALE_DOWN_TL: 'scale-down-tl',
  SCALE_DOWN_HOR_CENTER: 'scale-down-hor-center',
  SCALE_DOWN_HOR_LEFT: 'scale-down-hor-left',
  SCALE_DOWN_HOR_RIGHT: 'scale-down-hor-right',
  SCALE_DOWN_VER_CENTER: 'scale-down-ver-center',
  SCALE_DOWN_VER_TOP: 'scale-down-ver-top',
  SCALE_DOWN_VER_BOTTOM: 'scale-down-ver-bottom'
} as const;

const ANIMATIONS_ROTATE = {
  ROTATE_CENTER: 'rotate-center',
  ROTATE_TOP: 'rotate-top',
  ROTATE_TR: 'rotate-tr',
  ROTATE_RIGHT: 'rotate-right',
  ROTATE_BR: 'rotate-br',
  ROTATE_BOTTOM: 'rotate-bottom',
  ROTATE_BL: 'rotate-bl',
  ROTATE_LEFT: 'rotate-left',
  ROTATE_TL: 'rotate-tl',
  ROTATE_HOR_CENTER: 'rotate-hor-center',
  ROTATE_HOR_TOP: 'rotate-hor-top',
  ROTATE_HOR_BOTTOM: 'rotate-hor-bottom',
  ROTATE_VERT_CENTER: 'rotate-vert-center',
  ROTATE_VERT_LEFT: 'rotate-vert-left',
  ROTATE_VERT_RIGHT: 'rotate-vert-right',
  ROTATE_DIAGONAL_1: 'rotate-diagonal-1',
  ROTATE_DIAGONAL_2: 'rotate-diagonal-2',
  ROTATE_DIAGONAL_TR: 'rotate-diagonal-tr',
  ROTATE_DIAGONAL_BR: 'rotate-diagonal-br',
  ROTATE_DIAGONAL_BL: 'rotate-diagonal-bl',
  ROTATE_DIAGONAL_TL: 'rotate-diagonal-tl'
} as const;

const ANIMATIONS_ROTATE_SCALE = {
  ROTATE_SCALE_UP: 'rotate-scale-up',
  ROTATE_SCALE_DOWN: 'rotate-scale-down',
  ROTATE_SCALE_UP_HOR: 'rotate-scale-up-hor',
  ROTATE_SCALE_DOWN_HOR: 'rotate-scale-down-hor',
  ROTATE_SCALE_UP_VER: 'rotate-scale-up-ver',
  ROTATE_SCALE_DOWN_VER: 'rotate-scale-down-ver',
  ROTATE_SCALE_UP_DIAG_1: 'rotate-scale-up-diag-1',
  ROTATE_SCALE_DOWN_DIAG_1: 'rotate-scale-down-diag-1',
  ROTATE_SCALE_UP_DIAG_2: 'rotate-scale-up-diag-2',
  ROTATE_SCALE_DOWN_DIAG_2: 'rotate-scale-down-diag-2'
} as const;

const ANIMATIONS_ROTATE_90 = {
  ROTATE_90_CW: 'rotate-90-cw',
  ROTATE_90_CCW: 'rotate-90-ccw',
  ROTATE_90_TOP_CW: 'rotate-90-top-cw',
  ROTATE_90_TOP_CCW: 'rotate-90-top-ccw',
  ROTATE_90_TR_CW: 'rotate-90-tr-cw',
  ROTATE_90_TR_CCW: 'rotate-90-tr-ccw',
  ROTATE_90_RIGHT_CW: 'rotate-90-right-cw',
  ROTATE_90_RIGHT_CCW: 'rotate-90-right-ccw',
  ROTATE_90_BR_CW: 'rotate-90-br-cw',
  ROTATE_90_BR_CCW: 'rotate-90-br-ccw',
  ROTATE_90_BOTTOM_CW: 'rotate-90-bottom-cw',
  ROTATE_90_BOTTOM_CCW: 'rotate-90-bottom-ccw',
  ROTATE_90_BL_CW: 'rotate-90-bl-cw',
  ROTATE_90_BL_CCW: 'rotate-90-bl-ccw',
  ROTATE_90_LEFT_CW: 'rotate-90-left-cw',
  ROTATE_90_LEFT_CCW: 'rotate-90-left-ccw',
  ROTATE_90_TL_CW: 'rotate-90-tl-cw',
  ROTATE_90_TL_CCW: 'rotate-90-tl-ccw',
  ROTATE_90_HORIZONTAL_FWD: 'rotate-90-horizontal-fwd',
  ROTATE_90_HORIZONTAL_BCK: 'rotate-90-horizontal-bck',
  ROTATE_90_VERTICAL_FWD: 'rotate-90-vertical-fwd',
  ROTATE_90_VERTICAL_BCK: 'rotate-90-vertical-bck'
} as const;

const ANIMATIONS_FLIP = {
  FLIP_HORIZONTAL_BOTTOM: 'flip-horizontal-bottom',
  FLIP_HORIZONTAL_TOP: 'flip-horizontal-top',
  FLIP_HORIZONTAL_BCK: 'flip-horizontal-bck',
  FLIP_HORIZONTAL_FWD: 'flip-horizontal-fwd',
  FLIP_VERTICAL_RIGHT: 'flip-vertical-right',
  FLIP_VERTICAL_LEFT: 'flip-vertical-left',
  FLIP_VERTICAL_BCK: 'flip-vertical-bck',
  FLIP_VERTICAL_FWD: 'flip-vertical-fwd',
  FLIP_DIAGONAL_1_TR: 'flip-diagonal-1-tr',
  FLIP_DIAGONAL_1_BL: 'flip-diagonal-1-bl',
  FLIP_DIAGONAL_1_BCK: 'flip-diagonal-1-bck',
  FLIP_DIAGONAL_1_FWD: 'flip-diagonal-1-fwd',
  FLIP_DIAGONAL_2_BR: 'flip-diagonal-2-br',
  FLIP_DIAGONAL_2_TL: 'flip-diagonal-2-tl',
  FLIP_DIAGONAL_2_BCK: 'flip-diagonal-2-bck',
  FLIP_DIAGONAL_2_FWD: 'flip-diagonal-2-fwd'
} as const;

const ANIMATIONS_FLIP_2 = {
  FLIP_2_HOR_TOP_1: 'flip-2-hor-top-1',
  FLIP_2_HOR_TOP_2: 'flip-2-hor-top-2',
  FLIP_2_HOR_TOP_BCK: 'flip-2-hor-top-bck',
  FLIP_2_HOR_TOP_FWD: 'flip-2-hor-top-fwd',
  FLIP_2_VER_RIGHT_1: 'flip-2-ver-right-1',
  FLIP_2_VER_RIGHT_2: 'flip-2-ver-right-2',
  FLIP_2_VER_RIGHT_BCK: 'flip-2-ver-right-bck',
  FLIP_2_VER_RIGHT_FWD: 'flip-2-ver-right-fwd',
  FLIP_2_HOR_BOTTOM_1: 'flip-2-hor-bottom-1',
  FLIP_2_HOR_BOTTOM_2: 'flip-2-hor-bottom-2',
  FLIP_2_HOR_BOTTOM_BCK: 'flip-2-hor-bottom-bck',
  FLIP_2_HOR_BOTTOM_FWD: 'flip-2-hor-bottom-fwd',
  FLIP_2_VER_LEFT_1: 'flip-2-ver-left-1',
  FLIP_2_VER_LEFT_2: 'flip-2-ver-left-2',
  FLIP_2_VER_LEFT_BCK: 'flip-2-ver-left-bck',
  FLIP_2_VER_LEFT_FWD: 'flip-2-ver-left-fwd'
} as const;

const ANIMATIONS_FLIP_SCALE = {
  FLIP_SCALE_UP_HOR: 'flip-scale-up-hor',
  FLIP_SCALE_DOWN_HOR: 'flip-scale-down-hor',
  FLIP_SCALE_UP_VER: 'flip-scale-up-ver',
  FLIP_SCALE_DOWN_VER: 'flip-scale-down-ver',
  FLIP_SCALE_UP_DIAG_1: 'flip-scale-up-diag-1',
  FLIP_SCALE_DOWN_DIAG_1: 'flip-scale-down-diag-1',
  FLIP_SCALE_UP_DIAG_2: 'flip-scale-up-diag-2',
  FLIP_SCALE_DOWN_DIAG_2: 'flip-scale-down-diag-2'
} as const;

const ANIMATIONS_FLIP_SCALE_2 = {
  FLIP_SCALE_2_HOR_TOP: 'flip-scale-2-hor-top',
  FLIP_SCALE_2_VER_RIGHT: 'flip-scale-2-ver-right',
  FLIP_SCALE_2_HOR_BOTTOM: 'flip-scale-2-hor-bottom',
  FLIP_SCALE_2_VER_LEFT: 'flip-scale-2-ver-left'
} as const;

const ANIMATIONS_SWING = {
  SWING_TOP_FWD: 'swing-top-fwd',
  SWING_TOP_BCK: 'swing-top-bck',
  SWING_TOP_RIGHT_FWD: 'swing-top-right-fwd',
  SWING_TOP_RIGHT_BCK: 'swing-top-right-bck',
  SWING_RIGHT_FWD: 'swing-right-fwd',
  SWING_RIGHT_BCK: 'swing-right-bck',
  SWING_BOTTOM_RIGHT_FWD: 'swing-bottom-right-fwd',
  SWING_BOTTOM_RIGHT_BCK: 'swing-bottom-right-bck',
  SWING_BOTTOM_FWD: 'swing-bottom-fwd',
  SWING_BOTTOM_BCK: 'swing-bottom-bck',
  SWING_BOTTOM_LEFT_FWD: 'swing-bottom-left-fwd',
  SWING_BOTTOM_LEFT_BCK: 'swing-bottom-left-bck',
  SWING_LEFT_FWD: 'swing-left-fwd',
  SWING_LEFT_BCK: 'swing-left-bck',
  SWING_TOP_LEFT_FWD: 'swing-top-left-fwd',
  SWING_TOP_LEFT_BCK: 'swing-top-left-bck'
} as const;

const ANIMATIONS_SLIDE = {
  SLIDE_TOP: 'slide-top',
  SLIDE_TR: 'slide-tr',
  SLIDE_RIGHT: 'slide-right',
  SLIDE_BR: 'slide-br',
  SLIDE_BOTTOM: 'slide-bottom',
  SLIDE_BL: 'slide-bl',
  SLIDE_LEFT: 'slide-left',
  SLIDE_TL: 'slide-tl'
} as const;

const ANIMATIONS_SLIDE_BCK = {
  SLIDE_BCK_CENTER: 'slide-bck-center',
  SLIDE_BCK_TOP: 'slide-bck-top',
  SLIDE_BCK_TR: 'slide-bck-tr',
  SLIDE_BCK_RIGHT: 'slide-bck-right',
  SLIDE_BCK_BR: 'slide-bck-br',
  SLIDE_BCK_BOTTOM: 'slide-bck-bottom',
  SLIDE_BCK_BL: 'slide-bck-bl',
  SLIDE_BCK_LEFT: 'slide-bck-left',
  SLIDE_BCK_TL: 'slide-bck-tl'
} as const;

const ANIMATIONS_SLIDE_FWD = {
  SLIDE_FWD_CENTER: 'slide-fwd-center',
  SLIDE_FWD_TOP: 'slide-fwd-top',
  SLIDE_FWD_TR: 'slide-fwd-tr',
  SLIDE_FWD_RIGHT: 'slide-fwd-right',
  SLIDE_FWD_BR: 'slide-fwd-br',
  SLIDE_FWD_BOTTOM: 'slide-fwd-bottom',
  SLIDE_FWD_BL: 'slide-fwd-bl',
  SLIDE_FWD_LEFT: 'slide-fwd-left',
  SLIDE_FWD_TL: 'slide-fwd-tl'
} as const;

const ANIMATIONS_SLIDE_ROTATE = {
  SLIDE_ROTATE_HOR_TOP: 'slide-rotate-hor-top',
  SLIDE_ROTATE_HOR_T_BCK: 'slide-rotate-hor-t-bck',
  SLIDE_ROTATE_HOR_T_FWD: 'slide-rotate-hor-t-fwd',
  SLIDE_ROTATE_VER_RIGHT: 'slide-rotate-ver-right',
  SLIDE_ROTATE_VER_R_BCK: 'slide-rotate-ver-r-bck',
  SLIDE_ROTATE_VER_R_FWD: 'slide-rotate-ver-r-fwd',
  SLIDE_ROTATE_HOR_BOTTOM: 'slide-rotate-hor-bottom',
  SLIDE_ROTATE_HOR_B_BCK: 'slide-rotate-hor-b-bck',
  SLIDE_ROTATE_HOR_B_FWD: 'slide-rotate-hor-b-fwd',
  SLIDE_ROTATE_VER_LEFT: 'slide-rotate-ver-left',
  SLIDE_ROTATE_VER_L_BCK: 'slide-rotate-ver-l-bck',
  SLIDE_ROTATE_VER_L_FWD: 'slide-rotate-ver-l-fwd'
} as const;

const ANIMATIONS_SHADOW_DROP = {
  SHADOW_DROP_CENTER: 'shadow-drop-center',
  SHADOW_DROP_TOP: 'shadow-drop-top',
  SHADOW_DROP_RIGHT: 'shadow-drop-right',
  SHADOW_DROP_BOTTOM: 'shadow-drop-bottom',
  SHADOW_DROP_LEFT: 'shadow-drop-left',
  SHADOW_DROP_LR: 'shadow-drop-lr',
  SHADOW_DROP_TB: 'shadow-drop-tb',
  SHADOW_DROP_TR: 'shadow-drop-tr',
  SHADOW_DROP_BR: 'shadow-drop-br',
  SHADOW_DROP_BL: 'shadow-drop-bl',
  SHADOW_DROP_TL: 'shadow-drop-tl'
} as const;

const ANIMATIONS_SHADOW_DROP_2 = {
  SHADOW_DROP_2_CENTER: 'shadow-drop-2-center',
  SHADOW_DROP_2_TOP: 'shadow-drop-2-top',
  SHADOW_DROP_2_RIGHT: 'shadow-drop-2-right',
  SHADOW_DROP_2_BOTTOM: 'shadow-drop-2-bottom',
  SHADOW_DROP_2_LEFT: 'shadow-drop-2-left',
  SHADOW_DROP_2_LR: 'shadow-drop-2-lr',
  SHADOW_DROP_2_TB: 'shadow-drop-2-tb',
  SHADOW_DROP_2_TR: 'shadow-drop-2-tr',
  SHADOW_DROP_2_BR: 'shadow-drop-2-br',
  SHADOW_DROP_2_BL: 'shadow-drop-2-bl',
  SHADOW_DROP_2_TL: 'shadow-drop-2-tl'
} as const;

const ANIMATIONS_SHADOW_POP = {
  SHADOW_POP_TR: 'shadow-pop-tr',
  SHADOW_POP_BR: 'shadow-pop-br',
  SHADOW_POP_BL: 'shadow-pop-bl',
  SHADOW_POP_TL: 'shadow-pop-tl'
} as const;

const ANIMATIONS_SHADOW_INSET = {
  SHADOW_INSET_CENTER: 'shadow-inset-center',
  SHADOW_INSET_TOP: 'shadow-inset-top',
  SHADOW_INSET_RIGHT: 'shadow-inset-right',
  SHADOW_INSET_BOTTOM: 'shadow-inset-bottom',
  SHADOW_INSET_LEFT: 'shadow-inset-left',
  SHADOW_INSET_LR: 'shadow-inset-lr',
  SHADOW_INSET_TB: 'shadow-inset-tb',
  SHADOW_INSET_TR: 'shadow-inset-tr',
  SHADOW_INSET_BR: 'shadow-inset-br',
  SHADOW_INSET_BL: 'shadow-inset-bl',
  SHADOW_INSET_TL: 'shadow-inset-tl'
} as const;

const ANIMATIONS_SCALE_IN = {
  SCALE_IN_CENTER: 'scale-in-center',
  SCALE_IN_TOP: 'scale-in-top',
  SCALE_IN_TR: 'scale-in-tr',
  SCALE_IN_RIGHT: 'scale-in-right',
  SCALE_IN_BR: 'scale-in-br',
  SCALE_IN_BOTTOM: 'scale-in-bottom',
  SCALE_IN_BL: 'scale-in-bl',
  SCALE_IN_LEFT: 'scale-in-left',
  SCALE_IN_TL: 'scale-in-tl',
  SCALE_IN_HOR_CENTER: 'scale-in-hor-center',
  SCALE_IN_HOR_LEFT: 'scale-in-hor-left',
  SCALE_IN_HOR_RIGHT: 'scale-in-hor-right',
  SCALE_IN_VER_CENTER: 'scale-in-ver-center',
  SCALE_IN_VER_TOP: 'scale-in-ver-top',
  SCALE_IN_VER_BOTTOM: 'scale-in-ver-bottom'
} as const;

const ANIMATIONS_ROTATE_IN = {
  ROTATE_IN_CENTER: 'rotate-in-center',
  ROTATE_IN_TOP: 'rotate-in-top',
  ROTATE_IN_TR: 'rotate-in-tr',
  ROTATE_IN_RIGHT: 'rotate-in-right',
  ROTATE_IN_BR: 'rotate-in-br',
  ROTATE_IN_BOTTOM: 'rotate-in-bottom',
  ROTATE_IN_BL: 'rotate-in-bl',
  ROTATE_IN_LEFT: 'rotate-in-left',
  ROTATE_IN_TL: 'rotate-in-tl',
  ROTATE_IN_HOR: 'rotate-in-hor',
  ROTATE_IN_VER: 'rotate-in-ver',
  ROTATE_IN_DIAG_1: 'rotate-in-diag-1',
  ROTATE_IN_DIAG_2: 'rotate-in-diag-2'
} as const;

const ANIMATIONS_ROTATE_IN_2 = {
  ROTATE_IN_2_CW: 'rotate-in-2-cw',
  ROTATE_IN_2_CCW: 'rotate-in-2-ccw',
  ROTATE_IN_2_FWD_CW: 'rotate-in-2-fwd-cw',
  ROTATE_IN_2_FWD_CCW: 'rotate-in-2-fwd-ccw',
  ROTATE_IN_2_BCK_CW: 'rotate-in-2-bck-cw',
  ROTATE_IN_2_BCK_CCW: 'rotate-in-2-bck-ccw',
  ROTATE_IN_2_TR_CW: 'rotate-in-2-tr-cw',
  ROTATE_IN_2_TR_CCW: 'rotate-in-2-tr-ccw',
  ROTATE_IN_2_BR_CW: 'rotate-in-2-br-cw',
  ROTATE_IN_2_BR_CCW: 'rotate-in-2-br-ccw',
  ROTATE_IN_2_BL_CW: 'rotate-in-2-bl-cw',
  ROTATE_IN_2_BL_CCW: 'rotate-in-2-bl-ccw',
  ROTATE_IN_2_TL_CW: 'rotate-in-2-tl-cw',
  ROTATE_IN_2_TL_CCW: 'rotate-in-2-tl-ccw'
} as const;

const ANIMATIONS_SWIRL_IN = {
  SWIRL_IN_FWD: 'swirl-in-fwd',
  SWIRL_IN_BCK: 'swirl-in-bck',
  SWIRL_IN_TOP_FWD: 'swirl-in-top-fwd',
  SWIRL_IN_TOP_BCK: 'swirl-in-top-bck',
  SWIRL_IN_TR_FWD: 'swirl-in-tr-fwd',
  SWIRL_IN_TR_BCK: 'swirl-in-tr-bck',
  SWIRL_IN_RIGHT_FWD: 'swirl-in-right-fwd',
  SWIRL_IN_RIGHT_BCK: 'swirl-in-right-bck',
  SWIRL_IN_BR_FWD: 'swirl-in-br-fwd',
  SWIRL_IN_BR_BCK: 'swirl-in-br-bck',
  SWIRL_IN_BOTTOM_FWD: 'swirl-in-bottom-fwd',
  SWIRL_IN_BOTTOM_BCK: 'swirl-in-bottom-bck',
  SWIRL_IN_BL_FWD: 'swirl-in-bl-fwd',
  SWIRL_IN_BL_BCK: 'swirl-in-bl-bck',
  SWIRL_IN_LEFT_FWD: 'swirl-in-left-fwd',
  SWIRL_IN_LEFT_BCK: 'swirl-in-left-bck',
  SWIRL_IN_TL_FWD: 'swirl-in-tl-fwd',
  SWIRL_IN_TL_BCK: 'swirl-in-tl-bck'
} as const;

const ANIMATIONS_FLIP_IN = {
  FLIP_IN_HOR_BOTTOM: 'flip-in-hor-bottom',
  FLIP_IN_HOR_TOP: 'flip-in-hor-top',
  FLIP_IN_VER_RIGHT: 'flip-in-ver-right',
  FLIP_IN_VER_LEFT: 'flip-in-ver-left',
  FLIP_IN_DIAG_1_TR: 'flip-in-diag-1-tr',
  FLIP_IN_DIAG_1_BL: 'flip-in-diag-1-bl',
  FLIP_IN_DIAG_2_TL: 'flip-in-diag-2-tl',
  FLIP_IN_DIAG_2_BR: 'flip-in-diag-2-br'
} as const;

const ANIMATIONS_SLIT_IN = {
  SLIT_IN_VERTICAL: 'slit-in-vertical',
  SLIT_IN_HORIZONTAL: 'slit-in-horizontal',
  SLIT_IN_DIAGONAL_1: 'slit-in-diagonal-1',
  SLIT_IN_DIAGONAL_2: 'slit-in-diagonal-2'
} as const;

const ANIMATIONS_SLIDE_IN = {
  SLIDE_IN_TOP: 'slide-in-top',
  SLIDE_IN_TR: 'slide-in-tr',
  SLIDE_IN_RIGHT: 'slide-in-right',
  SLIDE_IN_BR: 'slide-in-br',
  SLIDE_IN_BOTTOM: 'slide-in-bottom',
  SLIDE_IN_BL: 'slide-in-bl',
  SLIDE_IN_LEFT: 'slide-in-left',
  SLIDE_IN_TL: 'slide-in-tl'
} as const;

const ANIMATIONS_SLIDE_IN_FWD = {
  SLIDE_IN_FWD_CENTER: 'slide-in-fwd-center',
  SLIDE_IN_FWD_TOP: 'slide-in-fwd-top',
  SLIDE_IN_FWD_TR: 'slide-in-fwd-tr',
  SLIDE_IN_FWD_RIGHT: 'slide-in-fwd-right',
  SLIDE_IN_FWD_BR: 'slide-in-fwd-br',
  SLIDE_IN_FWD_BOTTOM: 'slide-in-fwd-bottom',
  SLIDE_IN_FWD_BL: 'slide-in-fwd-bl',
  SLIDE_IN_FWD_LEFT: 'slide-in-fwd-left',
  SLIDE_IN_FWD_TL: 'slide-in-fwd-tl'
} as const;

const ANIMATIONS_SLIDE_IN_BCK = {
  SLIDE_IN_BCK_CENTER: 'slide-in-bck-center',
  SLIDE_IN_BCK_TOP: 'slide-in-bck-top',
  SLIDE_IN_BCK_TR: 'slide-in-bck-tr',
  SLIDE_IN_BCK_RIGHT: 'slide-in-bck-right',
  SLIDE_IN_BCK_BR: 'slide-in-bck-br',
  SLIDE_IN_BCK_BOTTOM: 'slide-in-bck-bottom',
  SLIDE_IN_BCK_BL: 'slide-in-bck-bl',
  SLIDE_IN_BCK_LEFT: 'slide-in-bck-left',
  SLIDE_IN_BCK_TL: 'slide-in-bck-tl'
} as const;

const ANIMATIONS_SLIDE_IN_BLURRED = {
  SLIDE_IN_BLURRED_TOP: 'slide-in-blurred-top',
  SLIDE_IN_BLURRED_TR: 'slide-in-blurred-tr',
  SLIDE_IN_BLURRED_RIGHT: 'slide-in-blurred-right',
  SLIDE_IN_BLURRED_BR: 'slide-in-blurred-br',
  SLIDE_IN_BLURRED_BOTTOM: 'slide-in-blurred-bottom',
  SLIDE_IN_BLURRED_BL: 'slide-in-blurred-bl',
  SLIDE_IN_BLURRED_LEFT: 'slide-in-blurred-left',
  SLIDE_IN_BLURRED_TL: 'slide-in-blurred-tl'
} as const;

const ANIMATIONS_SLIDE_IN_ELLIPTIC = {
  SLIDE_IN_ELLIPTIC_TOP_FWD: 'slide-in-elliptic-top-fwd',
  SLIDE_IN_ELLIPTIC_TOP_BCK: 'slide-in-elliptic-top-bck',
  SLIDE_IN_ELLIPTIC_RIGHT_FWD: 'slide-in-elliptic-right-fwd',
  SLIDE_IN_ELLIPTIC_RIGHT_BCK: 'slide-in-elliptic-right-bck',
  SLIDE_IN_ELLIPTIC_BOTTOM_FWD: 'slide-in-elliptic-bottom-fwd',
  SLIDE_IN_ELLIPTIC_BOTTOM_BCK: 'slide-in-elliptic-bottom-bck',
  SLIDE_IN_ELLIPTIC_LEFT_FWD: 'slide-in-elliptic-left-fwd',
  SLIDE_IN_ELLIPTIC_LEFT_BCK: 'slide-in-elliptic-left-bck'
} as const;

const ANIMATIONS_BOUNCE_IN = {
  BOUNCE_IN_TOP: 'bounce-in-top',
  BOUNCE_IN_RIGHT: 'bounce-in-right',
  BOUNCE_IN_BOTTOM: 'bounce-in-bottom',
  BOUNCE_IN_LEFT: 'bounce-in-left',
  BOUNCE_IN_FWD: 'bounce-in-fwd',
  BOUNCE_IN_BCK: 'bounce-in-bck'
} as const;

const ANIMATIONS_ROLL_IN = {
  ROLL_IN_LEFT: 'roll-in-left',
  ROLL_IN_TOP: 'roll-in-top',
  ROLL_IN_RIGHT: 'roll-in-right',
  ROLL_IN_BOTTOM: 'roll-in-bottom'
} as const;

const ANIMATIONS_ROLL_IN_BLURRED = {
  ROLL_IN_BLURRED_LEFT: 'roll-in-blurred-left',
  ROLL_IN_BLURRED_TOP: 'roll-in-blurred-top',
  ROLL_IN_BLURRED_RIGHT: 'roll-in-blurred-right',
  ROLL_IN_BLURRED_BOTTOM: 'roll-in-blurred-bottom'
} as const;

const ANIMATIONS_TILT_IN = {
  TILT_IN_TOP_1: 'tilt-in-top-1',
  TILT_IN_TOP_2: 'tilt-in-top-2',
  TILT_IN_TR: 'tilt-in-tr',
  TILT_IN_RIGHT_1: 'tilt-in-right-1',
  TILT_IN_RIGHT_2: 'tilt-in-right-2',
  TILT_IN_BR: 'tilt-in-br',
  TILT_IN_BOTTOM_1: 'tilt-in-bottom-1',
  TILT_IN_BOTTOM_2: 'tilt-in-bottom-2',
  TILT_IN_BL: 'tilt-in-bl',
  TILT_IN_LEFT_1: 'tilt-in-left-1',
  TILT_IN_LEFT_2: 'tilt-in-left-2',
  TILT_IN_TL: 'tilt-in-tl'
} as const;

const ANIMATIONS_TILT_IN_FWD = {
  TILT_IN_FWD_TR: 'tilt-in-fwd-tr',
  TILT_IN_FWD_BR: 'tilt-in-fwd-br',
  TILT_IN_FWD_BL: 'tilt-in-fwd-bl',
  TILT_IN_FWD_TL: 'tilt-in-fwd-tl'
} as const;

const ANIMATIONS_SWING_IN = {
  SWING_IN_TOP_FWD: 'swing-in-top-fwd',
  SWING_IN_TOP_BCK: 'swing-in-top-bck',
  SWING_IN_RIGHT_FWD: 'swing-in-right-fwd',
  SWING_IN_RIGHT_BCK: 'swing-in-right-bck',
  SWING_IN_BOTTOM_FWD: 'swing-in-bottom-fwd',
  SWING_IN_BOTTOM_BCK: 'swing-in-bottom-bck',
  SWING_IN_LEFT_FWD: 'swing-in-left-fwd',
  SWING_IN_LEFT_BCK: 'swing-in-left-bck'
} as const;

const ANIMATIONS_FADE_IN = {
  FADE_IN_FWD: 'fade-in-fwd',
  FADE_IN_BCK: 'fade-in-bck',
  FADE_IN_TOP: 'fade-in-top',
  FADE_IN_TR: 'fade-in-tr',
  FADE_IN_RIGHT: 'fade-in-right',
  FADE_IN_BR: 'fade-in-br',
  FADE_IN_BOTTOM: 'fade-in-bottom',
  FADE_IN_BL: 'fade-in-bl',
  FADE_IN_LEFT: 'fade-in-left',
  FADE_IN_TL: 'fade-in-tl'
} as const;

const ANIMATIONS_PUFF_IN = {
  PUFF_IN_CENTER: 'puff-in-center',
  PUFF_IN_TOP: 'puff-in-top',
  PUFF_IN_TR: 'puff-in-tr',
  PUFF_IN_RIGHT: 'puff-in-right',
  PUFF_IN_BR: 'puff-in-br',
  PUFF_IN_BOTTOM: 'puff-in-bottom',
  PUFF_IN_BL: 'puff-in-bl',
  PUFF_IN_LEFT: 'puff-in-left',
  PUFF_IN_TL: 'puff-in-tl',
  PUFF_IN_HOR: 'puff-in-hor',
  PUFF_IN_VER: 'puff-in-ver'
} as const;

const ANIMATIONS_FLICKER_IN = {
  FLICKER_IN_1: 'flicker-in-1',
  FLICKER_IN_2: 'flicker-in-2'
} as const;

const ANIMATIONS_TRACKING_IN = {
  TRACKING_IN_EXPAND: 'tracking-in-expand',
  TRACKING_IN_EXPAND_FWD: 'tracking-in-expand-fwd',
  TRACKING_IN_EXPAND_FWD_TOP: 'tracking-in-expand-fwd-top',
  TRACKING_IN_EXPAND_FWD_BOTTOM: 'tracking-in-expand-fwd-bottom',
  TRACKING_IN_CONTRACT: 'tracking-in-contract',
  TRACKING_IN_CONTRACT_BCK: 'tracking-in-contract-bck',
  TRACKING_IN_CONTRACT_BCK_TOP: 'tracking-in-contract-bck-top',
  TRACKING_IN_CONTRACT_BCK_BOTTOM: 'tracking-in-contract-bck-bottom'
} as const;

const ANIMATIONS_FOCUS_IN = {
  TEXT_FOCUS_IN: 'text-focus-in',
  FOCUS_IN_EXPAND: 'focus-in-expand',
  FOCUS_IN_EXPAND_FWD: 'focus-in-expand-fwd',
  FOCUS_IN_CONTRACT: 'focus-in-contract',
  FOCUS_IN_CONTRACT_BCK: 'focus-in-contract-bck'
} as const;

const ANIMATIONS_TEXT_SHADOW_DROP = {
  TEXT_SHADOW_DROP_CENTER: 'text-shadow-drop-center',
  TEXT_SHADOW_DROP_TOP: 'text-shadow-drop-top',
  TEXT_SHADOW_DROP_TR: 'text-shadow-drop-tr',
  TEXT_SHADOW_DROP_RIGHT: 'text-shadow-drop-right',
  TEXT_SHADOW_DROP_BR: 'text-shadow-drop-br',
  TEXT_SHADOW_DROP_BOTTOM: 'text-shadow-drop-bottom',
  TEXT_SHADOW_DROP_BL: 'text-shadow-drop-bl',
  TEXT_SHADOW_DROP_LEFT: 'text-shadow-drop-left',
  TEXT_SHADOW_DROP_TL: 'text-shadow-drop-tl'
} as const;

const ANIMATIONS_TEXT_SHADOW_POP = {
  TEXT_SHADOW_POP_TOP: 'text-shadow-pop-top',
  TEXT_SHADOW_POP_TR: 'text-shadow-pop-tr',
  TEXT_SHADOW_POP_RIGHT: 'text-shadow-pop-right',
  TEXT_SHADOW_POP_BR: 'text-shadow-pop-br',
  TEXT_SHADOW_POP_BOTTOM: 'text-shadow-pop-bottom',
  TEXT_SHADOW_POP_BL: 'text-shadow-pop-bl',
  TEXT_SHADOW_POP_LEFT: 'text-shadow-pop-left',
  TEXT_SHADOW_POP_TL: 'text-shadow-pop-tl'
} as const;

const ANIMATIONS_TEXT_POP_UP = {
  TEXT_POP_UP_TOP: 'text-pop-up-top',
  TEXT_POP_UP_TR: 'text-pop-up-tr',
  TEXT_POP_UP_RIGHT: 'text-pop-up-right',
  TEXT_POP_UP_BR: 'text-pop-up-br',
  TEXT_POP_UP_BOTTOM: 'text-pop-up-bottom',
  TEXT_POP_UP_BL: 'text-pop-up-bl',
  TEXT_POP_UP_LEFT: 'text-pop-up-left',
  TEXT_POP_UP_TL: 'text-pop-up-tl'
} as const;

const ANIMATIONS_VIBRATE = {
  VIBRATE_1: 'vibrate-1',
  VIBRATE_2: 'vibrate-2'
} as const;

const ANIMATIONS_SHAKE = {
  SHAKE_HORIZONTAL: 'shake-horizontal',
  SHAKE_VERTICAL: 'shake-vertical',
  SHAKE_LR: 'shake-lr',
  SHAKE_TOP: 'shake-top',
  SHAKE_TR: 'shake-tr',
  SHAKE_RIGHT: 'shake-right',
  SHAKE_BR: 'shake-br',
  SHAKE_BOTTOM: 'shake-bottom',
  SHAKE_BL: 'shake-bl',
  SHAKE_LEFT: 'shake-left',
  SHAKE_TL: 'shake-tl'
} as const;

const ANIMATIONS_JELLO = {
  JELLO_HORIZONTAL: 'jello-horizontal',
  JELLO_VERTICAL: 'jello-vertical',
  JELLO_DIAGONAL_1: 'jello-diagonal-1',
  JELLO_DIAGONAL_2: 'jello-diagonal-2'
} as const;

const ANIMATIONS_WOBBLE = {
  WOBBLE_HOR_BOTTOM: 'wobble-hor-bottom',
  WOBBLE_HOR_TOP: 'wobble-hor-top',
  WOBBLE_VER_LEFT: 'wobble-ver-left',
  WOBBLE_VER_RIGHT: 'wobble-ver-right'
} as const;

const ANIMATIONS_BOUNCE = {
  BOUNCE_TOP: 'bounce-top',
  BOUNCE_BOTTOM: 'bounce-bottom',
  BOUNCE_LEFT: 'bounce-left',
  BOUNCE_RIGHT: 'bounce-right'
} as const;

const ANIMATIONS_PULSATE = {
  PULSATE_BCK: 'pulsate-bck',
  PULSATE_FWD: 'pulsate-fwd',
  PING: 'ping'
} as const;

const ANIMATIONS_KEN_BURNS = {
  KEN_BURNS_TOP: 'ken-burns-top',
  KEN_BURNS_TOP_RIGHT: 'ken-burns-top-right',
  KEN_BURNS_RIGHT: 'ken-burns-right',
  KEN_BURNS_BOTTOM_RIGHT: 'ken-burns-bottom-right',
  KEN_BURNS_BOTTOM: 'ken-burns-bottom',
  KEN_BURNS_BOTTOM_LEFT: 'ken-burns-bottom-left',
  KEN_BURNS_LEFT: 'ken-burns-left',
  KEN_BURNS_TOP_LEFT: 'ken-burns-top-left'
} as const;

const ANIMATIONS_BG_PAN = {
  BG_PAN_LEFT: 'bg-pan-left',
  BG_PAN_RIGHT: 'bg-pan-right',
  BG_PAN_TOP: 'bg-pan-top',
  BG_PAN_BOTTOM: 'bg-pan-bottom',
  BG_PAN_TR: 'bg-pan-tr',
  BG_PAN_BR: 'bg-pan-br',
  BG_PAN_BL: 'bg-pan-bl',
  BG_PAN_TL: 'bg-pan-tl'
} as const;

export const ANIMATIONS = {
  ...ANIMATIONS_SCALE_UP,
  ...ANIMATIONS_SCALE_DOWN,
  ...ANIMATIONS_ROTATE,
  ...ANIMATIONS_ROTATE_SCALE,
  ...ANIMATIONS_ROTATE_90,
  ...ANIMATIONS_FLIP,
  ...ANIMATIONS_FLIP_2,
  ...ANIMATIONS_FLIP_SCALE,
  ...ANIMATIONS_FLIP_SCALE_2,
  ...ANIMATIONS_SWING,
  ...ANIMATIONS_SLIDE,
  ...ANIMATIONS_SLIDE_BCK,
  ...ANIMATIONS_SLIDE_FWD,
  ...ANIMATIONS_SLIDE_ROTATE,
  ...ANIMATIONS_SHADOW_DROP,
  ...ANIMATIONS_SHADOW_DROP_2,
  ...ANIMATIONS_SHADOW_POP,
  ...ANIMATIONS_SHADOW_INSET,
  ...ANIMATIONS_SCALE_IN,
  ...ANIMATIONS_ROTATE_IN,
  ...ANIMATIONS_ROTATE_IN_2,
  ...ANIMATIONS_SWIRL_IN,
  ...ANIMATIONS_FLIP_IN,
  ...ANIMATIONS_SLIT_IN,
  ...ANIMATIONS_SLIDE_IN,
  ...ANIMATIONS_SLIDE_IN_FWD,
  ...ANIMATIONS_SLIDE_IN_BCK,
  ...ANIMATIONS_SLIDE_IN_BLURRED,
  ...ANIMATIONS_SLIDE_IN_ELLIPTIC,
  ...ANIMATIONS_BOUNCE_IN,
  ...ANIMATIONS_ROLL_IN,
  ...ANIMATIONS_ROLL_IN_BLURRED,
  ...ANIMATIONS_TILT_IN,
  ...ANIMATIONS_TILT_IN_FWD,
  ...ANIMATIONS_SWING_IN,
  ...ANIMATIONS_FADE_IN,
  ...ANIMATIONS_PUFF_IN,
  ...ANIMATIONS_FLICKER_IN,
  ...ANIMATIONS_TRACKING_IN,
  ...ANIMATIONS_FOCUS_IN,
  ...ANIMATIONS_TEXT_SHADOW_DROP,
  ...ANIMATIONS_TEXT_SHADOW_POP,
  ...ANIMATIONS_TEXT_POP_UP,
  ...ANIMATIONS_VIBRATE,
  ...ANIMATIONS_SHAKE,
  ...ANIMATIONS_JELLO,
  ...ANIMATIONS_WOBBLE,
  ...ANIMATIONS_BOUNCE,
  ...ANIMATIONS_PULSATE,
  ...ANIMATIONS_KEN_BURNS,
  ...ANIMATIONS_BG_PAN
} as const;

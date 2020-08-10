import { EventEmitter, ComponentInterface } from '@stencil/core';
import { AnimationsType } from '../animations';

export interface IAnimatable {
  name?: AnimationsType;
  keyFrames?: Keyframe[];
  options?: KeyframeAnimationOptions;
  delay?: number;
  endDelay?: number;
  duration?: number;
  direction?: PlaybackDirection;
  composite?: CompositeOperation;
  easing?: string;
  fill?: FillMode;
  iterations?: number;
  iterationStart?: number;
  iterationComposite?: IterationCompositeOperation;
  autoPlay?: boolean;
  currentTime?: number;
  startTime?: number;
  playbackRate?: number;
  slStart: EventEmitter<HTMLElement>;
  slFinish: EventEmitter<HTMLElement>;
  slCancel: EventEmitter<HTMLElement>;
}

export type IAnimatableComponent = IAnimatable & ComponentInterface;

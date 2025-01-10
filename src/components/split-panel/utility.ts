export interface SnapFunctionParams {
  /** The position the divider has been dragged to, in pixels. */
  pos: number;
  /** The size of the split-panel across its primary axis, in pixels. */
  size: number;
  /** The snap-threshold passed to the split-panel, in pixels. May be infinity. */
  snapThreshold: number;
  /** Whether or not the user-agent is RTL. */
  isRtl: boolean;
  /** Whether or not the split panel is vertical. */
  vertical: boolean;
}

/** Used by sl-split-panel to convert an input position into a snapped position. */
export type SnapFunction = (opt: SnapFunctionParams) => number | null;

/** A SnapFunction which performs no snapping. */
export const SNAP_NONE = () => null;

/**
 * Converts a string containing either a series of fixed snap points (e.g. "100px 200px 800px", or "10% 50% 99%") or a repeat statement (e.g. "repeat(100px)" or "repeat(10%)") into a SnapFunction. `SnapFunction`s take in a `SnapFunctionOpts` and return the position that the split panel should snap to. 
 * 
 * @param snap - The snap string.
 * @returns a `SnapFunction` representing the snap string's logic.
 */

export function toSnapFunction(snap: string): SnapFunction {
  if (snap.startsWith("repeat(")) {
    const repeatVal = snap.substring("repeat(".length, snap.length - 1);
    const isPercent = repeatVal.endsWith("%");
    const repeatNum = Number.parseFloat(repeatVal);

    if (isNaN(repeatNum)) return SNAP_NONE;

    return ({ pos, size, snapThreshold, isRtl, vertical }) => {
      const snapIntervalPx = isPercent ? size * (repeatNum / 100) : repeatNum;
      const snapPoint = Math.round((isRtl && !vertical ? size - pos : pos) / snapIntervalPx) * snapIntervalPx;

      if (pos >= snapPoint - snapThreshold && pos <= snapPoint + snapThreshold) {
        return snapPoint;
      }

      return pos;
    }
  } else {
    const snapPoints = snap.split(" ");

    return ({ pos, size, snapThreshold, isRtl, vertical }) => {
      let newPos = pos;
      let minDistance = Number.POSITIVE_INFINITY;

      snapPoints.forEach(value => {
        let snapPoint: number;

        if (value.endsWith("%")) {
          snapPoint = size * (Number.parseFloat(value) / 100);
        } else {
          snapPoint = Number.parseFloat(value);
        }

        if (isRtl && !vertical) {
          snapPoint = size - snapPoint;
        }

        const distance = Math.abs(pos - snapPoint);

        if (distance <= snapThreshold && distance < minDistance) {
          newPos = snapPoint;
          minDistance = distance;
        }
      });

      return newPos;
    }
  }
}

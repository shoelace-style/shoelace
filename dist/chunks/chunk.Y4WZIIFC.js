import {
  SlDialog
} from "./chunk.Y7CKKVB3.js";

// src/react/dialog/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var dialog_default = createComponent(React, "sl-dialog", SlDialog, {
  onSlShow: "sl-show",
  onSlAfterShow: "sl-after-show",
  onSlHide: "sl-hide",
  onSlAfterHide: "sl-after-hide",
  onSlInitialFocus: "sl-initial-focus",
  onSlRequestClose: "sl-request-close"
});

export {
  dialog_default
};

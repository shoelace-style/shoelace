// src/internal/auto-increment.ts
var id = 0;
function autoIncrement() {
  return ++id;
}

export {
  autoIncrement
};

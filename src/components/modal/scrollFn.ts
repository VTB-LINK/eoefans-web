//@ts-nocheck
//阻止默认行为
export function preventDefault(e) {
  // console.log({ e });
  e.preventDefault();
}

export function enableScroll() {
  const wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, { passive: false });
  window.removeEventListener("touchmove", preventDefault, { passive: false });
}

export function disableScroll() {
  const wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, { passive: false }); // modern desktop
  window.addEventListener("touchmove", preventDefault, { passive: false }); // mobile
}

import { useEffect, useRef } from "react";

export default function useEffectWithoutFirstRender(func, deps) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};
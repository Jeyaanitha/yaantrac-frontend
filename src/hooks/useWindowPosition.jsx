import { useLayoutEffect, useState } from 'react';

function useWindowPosition(id) {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    function updatePosition() {
      const getOffSetHeight = window.document.getElementById(id).offsetHeight;
      if (window.pageYOffset > getOffSetHeight * 0.7) {
        setAnimation(true);
      }
    }
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [id]);
  return animation;
}

export default useWindowPosition;

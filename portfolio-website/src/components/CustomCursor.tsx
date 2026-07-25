import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer displays wider than 900px
    const isDesktop = () => {
      return (
        window.innerWidth >= 900 &&
        window.matchMedia("(pointer: fine)").matches
      );
    };

    if (!isDesktop()) {
      return;
    }

    setIsVisible(true);

    const mouse = { x: 0, y: 0 };
    const follower = { xr: 0, yr: 0 };
    let isHovering = false;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.x}px`;
        dotRef.current.style.top = `${mouse.y}px`;
      }
    };

    const updateFollower = () => {
      // Linear interpolation factor for lag (0.08 produces smooth lag)
      follower.xr += (mouse.x - follower.xr) * 0.08;
      follower.yr += (mouse.y - follower.yr) * 0.08;

      if (followerRef.current) {
        followerRef.current.style.left = `${follower.xr}px`;
        followerRef.current.style.top = `${follower.yr}px`;
      }

      animationFrameId = requestAnimationFrame(updateFollower);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect if element is hoverable
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "LABEL" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".hoverable") ||
        target.style.cursor === "pointer";

      if (isInteractive && !isHovering) {
        isHovering = true;
        document.body.classList.add("cursor-hover");
      } else if (!isInteractive && isHovering) {
        isHovering = false;
        document.body.classList.remove("cursor-hover");
      }
    };

    const handleMouseLeaveWindow = () => {
      if (dotRef.current && followerRef.current) {
        dotRef.current.style.opacity = "0";
        followerRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnterWindow = () => {
      if (dotRef.current && followerRef.current) {
        dotRef.current.style.opacity = "1";
        followerRef.current.style.opacity = "1";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    animationFrameId = requestAnimationFrame(updateFollower);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("cursor-hover");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor pointer-events-none hidden md:block" id="cursor-dot" />
      <div ref={followerRef} className="custom-cursor-follower pointer-events-none hidden md:block" id="cursor-follower" />
    </>
  );
}

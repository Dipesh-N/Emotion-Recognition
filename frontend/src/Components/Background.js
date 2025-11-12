import React, { useEffect, useMemo, useState } from "react";
// 🚨 Ensure you've installed and are importing from the correct V3 packages:
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Background = () => {
  // NEW: State to track engine initialization
  const [init, setInit] = useState(false);

  // 1. Initialize the engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Load the slim bundle of features
    }).then(() => {
      setInit(true); // Set state to true once loading is complete
    });
  }, []);

  // 2. The Configuration Options (Optimized)
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#16161fff", // Vintage cream background
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#5a524c", // Dark, desaturated particle color
        },
        shape: {
          type: "square",
        },
        size: {
          value: { min: 10, max: 12 }, // A little bigger
        },
        move: {
          enable: true,
          speed: 0.2, // Much slower for a "steady" feel
          direction: "none",
          random: false, // No random movement
          straight: false,
          outMode: "out",
        },
      },
      interactivity: {
        detect_on: "window", // Ensure hover is detected anywhere on the window
        events: {
          onhover: {
            enable: true,
            mode: "repulse", // Repulse on hover is enabled
          },
          onclick: {
            enable: false, // Disabled click events
          },
        },
        modes: {
          repulse: {
            distance: 150, // Increased distance for a larger effect area
            duration: 0.8,
            factor: 800, // Significantly increased factor for a stronger push
          },
        },
      },
    }),
    [],
  );

  // 3. Render only after initialization
  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }
  
  // Optional: return null or a loading spinner while loading
  return null; 
};

export default Background;
import { useEffect, useRef } from 'react'

function CloudCanvas() {
  const canvasRef = useRef(null)
  const cloudsInstanceRef = useRef(null)

  useEffect(() => {
    // Check if klouds is already loaded
    if (window.klouds && canvasRef.current && !cloudsInstanceRef.current) {
      cloudsInstanceRef.current = new window.klouds.create({
        selector: canvasRef.current,
        speed: 3,
        layerCount: 3,
        bgColor: "#99e9fc",
        cloudColor1: "#fae4b5",
        cloudColor2: "#ffffff",
      })
      return
    }

    // Load klouds library if not already loaded
    if (!window.klouds) {
      const script = document.createElement('script')
      script.src = './lib/klouds.js'
      script.async = true
      script.onload = () => {
        if (window.klouds && canvasRef.current && !cloudsInstanceRef.current) {
          cloudsInstanceRef.current = new window.klouds.create({
            selector: canvasRef.current,
            speed: 3,
            layerCount: 3,
            bgColor: "#99e9fc",
            cloudColor1: "#fae4b5",
            cloudColor2: "#ffffff",
          })
        }
      }
      script.onerror = () => {
        console.error('Failed to load klouds.js library')
      }
      document.head.appendChild(script)

      // Cleanup function
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cloudsInstanceRef.current && cloudsInstanceRef.current.stop) {
        cloudsInstanceRef.current.stop()
      }
    }
  }, [])

  return <canvas id="myCanvas" ref={canvasRef}></canvas>
}

export default CloudCanvas
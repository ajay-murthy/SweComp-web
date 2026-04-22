"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface Marker {
  id: string
  location: [number, number]
  label: string
}

interface Arc {
  id: string
  from: [number, number]
  to: [number, number]
  label?: string
}

interface GlobeProps {
  markers?: Marker[]
  arcs?: Arc[]
  className?: string
  markerColor?: [number, number, number]
  baseColor?: [number, number, number]
  arcColor?: [number, number, number]
  glowColor?: [number, number, number]
  dark?: number
  mapBrightness?: number
  markerSize?: number
  markerElevation?: number
  arcWidth?: number
  arcHeight?: number
  speed?: number
  theta?: number
  diffuse?: number
  mapSamples?: number
}

function projectMarker(
  lat: number,
  lng: number,
  phi: number,
  thetaTotal: number,
  size: number
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180

  // Cartesian on unit sphere
  const sx = Math.cos(latRad) * Math.sin(lngRad)
  const sy = Math.sin(latRad)
  const sz = Math.cos(latRad) * Math.cos(lngRad)

  // Rotate around Y axis by -phi
  const cosPhi = Math.cos(-phi)
  const sinPhi = Math.sin(-phi)
  const rx = sx * cosPhi + sz * sinPhi
  const rz = -sx * sinPhi + sz * cosPhi

  // Rotate around X axis by -theta
  const cosT = Math.cos(-thetaTotal)
  const sinT = Math.sin(-thetaTotal)
  const ry = sy * cosT - rz * sinT
  const rz2 = sy * sinT + rz * cosT

  const visible = rz2 > -0.1
  const radius = size / 2
  const x = rx * radius * 0.95 + size / 2
  const y = -ry * radius * 0.95 + size / 2

  return { x, y, visible }
}

export function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.3, 0.45, 0.85],
  baseColor = [1, 1, 1],
  arcColor = [0.3, 0.45, 0.85],
  glowColor = [0.94, 0.93, 0.91],
  dark = 0,
  mapBrightness = 10,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.5,
  arcHeight = 0.25,
  speed = 0.003,
  theta = 0.2,
  diffuse = 1.5,
  mapSamples = 16000,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelContainerRef = useRef<HTMLDivElement>(null)
  const labelEls = useRef<HTMLDivElement[]>([])

  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const velocity = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x
      const deltaY = e.clientY - pointerInteracting.current.y
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 }
      const now = Date.now()
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1)
        const maxVelocity = 0.15
        velocity.current = {
          phi: Math.max(-maxVelocity, Math.min(maxVelocity, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
          theta: Math.max(-maxVelocity, Math.min(maxVelocity, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
        }
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  // Build label DOM elements whenever markers change
  useEffect(() => {
    const container = labelContainerRef.current
    if (!container) return
    container.innerHTML = ""
    labelEls.current = markers.map((m) => {
      const el = document.createElement("div")
      el.style.cssText = `
        position: absolute;
        display: flex;
        align-items: center;
        gap: 6px;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: opacity 0.2s ease;
        white-space: nowrap;
      `
      const dot = document.createElement("div")
      dot.style.cssText = `
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #111;
        flex-shrink: 0;
      `
      const tag = document.createElement("span")
      tag.textContent = m.label
      tag.style.cssText = `
        font-size: 11px;
        font-weight: 500;
        color: #111;
        background: rgba(255,255,255,0.85);
        backdrop-filter: blur(4px);
        padding: 2px 8px;
        border: 1px solid rgba(0,0,0,0.12);
        letter-spacing: 0.02em;
      `
      el.appendChild(dot)
      el.appendChild(tag)
      container.appendChild(el)
      return el
    })
  }, [markers])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: markers.map((m) => ({ location: m.location, size: markerSize, id: m.id })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.7,
      })

      function animate() {
        if (!isPausedRef.current) {
          phi += speed
          if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
            phiOffsetRef.current += velocity.current.phi
            thetaOffsetRef.current += velocity.current.theta
            velocity.current.phi *= 0.95
            velocity.current.theta *= 0.95
          }
          const thetaMin = -0.4, thetaMax = 0.4
          if (thetaOffsetRef.current < thetaMin) {
            thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1
          } else if (thetaOffsetRef.current > thetaMax) {
            thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1
          }
        }

        const currentPhi = phi + phiOffsetRef.current + dragOffset.current.phi
        const currentTheta = theta + thetaOffsetRef.current + dragOffset.current.theta

        globe!.update({
          phi: currentPhi,
          theta: currentTheta,
          dark, mapBrightness, markerColor, baseColor, arcColor, markerElevation,
          markers: markers.map((m) => ({ location: m.location, size: markerSize, id: m.id })),
          arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        })

        // Update label positions
        const size = canvas.offsetWidth
        markers.forEach((m, i) => {
          const el = labelEls.current[i]
          if (!el) return
          const { x, y, visible } = projectMarker(
            m.location[0],
            m.location[1],
            currentPhi,
            currentTheta,
            size
          )
          el.style.left = `${x}px`
          el.style.top = `${y}px`
          el.style.opacity = visible ? "1" : "0"
        })

        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init() }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, arcs, markerColor, baseColor, arcColor, glowColor, dark, mapBrightness, markerSize, markerElevation, arcWidth, arcHeight, speed, theta, diffuse, mapSamples])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{ width: "100%", height: "100%", cursor: "grab", opacity: 0, transition: "opacity 1.2s ease", borderRadius: "50%", touchAction: "none" }}
      />
      <div
        ref={labelContainerRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
      />
    </div>
  )
}

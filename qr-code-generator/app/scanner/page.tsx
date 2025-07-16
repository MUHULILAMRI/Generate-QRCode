"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Camera, Upload, QrCode, Copy, ExternalLink, CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedResult, setScannedResult] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = useCallback(async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsScanning(true)
      }
    } catch (err) {
      setError("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin kamera.")
      console.error("Camera error:", err)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }, [])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          if (canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            if (ctx) {
              canvas.width = img.width
              canvas.height = img.height
              ctx.drawImage(img, 0, 0)

              // Simulate QR code detection (in real app, you'd use a QR code library)
              // For demo purposes, we'll show a mock result
              setScannedResult("https://example.com/scanned-from-image")
              setError("")
            }
          }
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(scannedResult)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [scannedResult])

  const openLink = useCallback(() => {
    if (scannedResult.startsWith("http")) {
      window.open(scannedResult, "_blank")
    }
  }, [scannedResult])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent hover:bg-indigo-50 border-indigo-200 hover:border-indigo-300 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QR Scanner Pro
              </span>
            </div>
          </div>
          <Link href="/generator">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300">
              <QrCode className="w-4 h-4 mr-2" />
              Generator
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center py-8 relative z-10">
        <div className="inline-flex items-center gap-2 mb-4 animate-fade-in">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            QR Code Scanner
          </h1>
        </div>
        <p className="text-gray-600 text-lg animate-fade-in-delay">Scan QR code dengan kamera atau upload gambar</p>
      </div>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Scanner Section */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-indigo-100/50 hover:shadow-xl transition-all duration-500 animate-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Camera className="w-6 h-6 text-indigo-600" />
              Scanner QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Camera Section */}
            <div className="space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  className={`w-full h-64 bg-gray-100 rounded-xl object-cover transition-all duration-500 ${isScanning ? "opacity-100 scale-100" : "opacity-50 scale-95"}`}
                  playsInline
                  muted
                />
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                      <p className="text-gray-500 font-medium">Kamera akan muncul di sini</p>
                    </div>
                  </div>
                )}
                {isScanning && (
                  <div className="absolute inset-4 border-2 border-indigo-500 rounded-lg animate-pulse">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 rounded-br-lg"></div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {!isScanning ? (
                  <Button
                    onClick={startCamera}
                    className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Mulai Scan
                  </Button>
                ) : (
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="flex-1 h-12 border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
                  >
                    Stop Scan
                  </Button>
                )}
              </div>
            </div>

            {/* File Upload Section */}
            <div className="border-t pt-6">
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Atau Upload Gambar QR Code</Label>
              <div className="space-y-4">
                <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-indigo-300 bg-transparent hover:bg-indigo-50 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group"
                >
                  <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Pilih Gambar
                </Button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 animate-shake">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-purple-100/50 hover:shadow-xl transition-all duration-500 animate-slide-up-delay">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center">Hasil Scan</CardTitle>
          </CardHeader>
          <CardContent>
            {scannedResult ? (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="font-semibold text-green-800">QR Code Berhasil Discan!</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <p className="font-mono text-sm break-all text-gray-800">{scannedResult}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={copyToClipboard}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Salin Teks
                      </>
                    )}
                  </Button>

                  {scannedResult.startsWith("http") && (
                    <Button
                      onClick={openLink}
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                    >
                      <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Buka Link
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400 animate-pulse">
                <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mb-4">
                  <QrCode className="w-12 h-12" />
                </div>
                <p className="text-lg font-medium">Hasil scan akan muncul di sini</p>
                <p className="text-sm">Scan QR code atau upload gambar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Footer */}
      <div className="text-center py-8 mt-8 relative z-10">
        <p className="text-gray-500 animate-fade-in">
          Dibuat dengan ❤️ oleh{" "}
          <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:scale-110 inline-block transition-transform duration-300">
            MUH. ULIL AMRI 2025
          </span>
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

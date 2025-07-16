"use client"

import type React from "react"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download, Link, Palette, Settings, Sparkles, ArrowLeft, QrCode } from "lucide-react"

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("https://ahoikapptn.com")
  const [qrCode, setQRCode] = useState("https://ahoikapptn.com")
  const [color, setColor] = useState("#6366f1")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [size, setSize] = useState(256)
  const [errorCorrection, setErrorCorrection] = useState("M")

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault()
    setQRCode(url)
  }

  const downloadQRCode = () => {
    const svg = document.querySelector("#qr-code-svg")
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      canvas.width = size
      canvas.height = size

      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.download = "qrcode.png"
        downloadLink.href = pngFile
        downloadLink.click()
      }

      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QR Generator Pro
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            QR Generator Pro
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Buat QR code yang menakjubkan dalam hitungan detik</p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-indigo-100/50">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Settings className="w-6 h-6 text-indigo-600" />
              Pengaturan QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={generateQRCode} className="space-y-6">
              {/* URL Input */}
              <div className="space-y-2">
                <Label htmlFor="url" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Link className="w-4 h-4" />
                  URL atau Teks
                </Label>
                <Input
                  id="url"
                  type="text"
                  placeholder="Masukkan URL atau teks yang ingin dijadikan QR code"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                />
              </div>

              {/* Color Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Palette className="w-4 h-4" />
                    Warna QR Code
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Warna Background</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Size Slider */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Ukuran: {size}x{size} pixels
                </Label>
                <div className="px-3">
                  <Slider
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                    max={400}
                    min={128}
                    step={16}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>128px</span>
                    <span>400px</span>
                  </div>
                </div>
              </div>

              {/* Error Correction */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Level Koreksi Error</Label>
                <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7%) - Cepat</SelectItem>
                    <SelectItem value="M">Medium (15%) - Standar</SelectItem>
                    <SelectItem value="Q">Quartile (25%) - Baik</SelectItem>
                    <SelectItem value="H">High (30%) - Terbaik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate QR Code
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* QR Code Display Section */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-purple-100/50">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center">Preview QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            {qrCode && (
              <div className="flex flex-col items-center space-y-6">
                <div className="p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={qrCode}
                    size={size}
                    fgColor={color}
                    bgColor={backgroundColor}
                    level={errorCorrection}
                    includeMargin={true}
                  />
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">QR Code untuk:</p>
                  <p className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg break-all max-w-sm">{qrCode}</p>
                </div>

                <Button
                  onClick={downloadQRCode}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PNG
                </Button>
              </div>
            )}

            {!qrCode && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-12 h-12" />
                </div>
                <p className="text-lg font-medium">QR Code akan muncul di sini</p>
                <p className="text-sm">Masukkan URL dan klik Generate</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center py-8 mt-8">
        <p className="text-gray-500">
          Dibuat dengan ❤️ oleh{" "}
          <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            MUH. ULIL AMRI 2025
          </span>
        </p>
      </div>
    </div>
  )
}

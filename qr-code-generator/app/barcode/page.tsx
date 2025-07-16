"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ArrowLeft, BarChart3, Settings, Sparkles, Copy, CheckCircle, Shield } from "lucide-react"
import Link from "next/link"
import { BarcodeValidator } from "@/components/barcode-validator"

export default function BarcodeGenerator() {
  const [text, setText] = useState("123456789012")
  const [barcodeType, setBarcodeType] = useState("CODE128")
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(100)
  const [displayValue, setDisplayValue] = useState(true)
  const [fontSize, setFontSize] = useState(20)
  const [textAlign, setTextAlign] = useState("center")
  const [textPosition, setTextPosition] = useState("bottom")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [lineColor, setLineColor] = useState("#000000")
  const [textColor, setTextColor] = useState("#000000")
  const [margin, setMargin] = useState(10)
  const [format, setFormat] = useState("PNG")
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const barcodeTypes = [
    { value: "CODE128", label: "Code 128", description: "Alphanumeric, paling umum" },
    { value: "CODE39", label: "Code 39", description: "Alphanumeric dengan simbol" },
    { value: "EAN13", label: "EAN-13", description: "13 digit untuk produk retail" },
    { value: "EAN8", label: "EAN-8", description: "8 digit untuk produk kecil" },
    { value: "UPC", label: "UPC-A", description: "12 digit untuk produk Amerika" },
    { value: "ITF14", label: "ITF-14", description: "14 digit untuk shipping" },
    { value: "MSI", label: "MSI", description: "Numeric untuk inventory" },
    { value: "pharmacode", label: "Pharmacode", description: "Untuk industri farmasi" },
  ]

  // Simulate barcode generation (in real app, you'd use a barcode library like JsBarcode)
  const generateBarcode = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = height + (displayValue ? fontSize + 20 : 0) + margin * 2

    // Clear canvas
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Generate barcode pattern (simplified simulation)
    const barcodeWidth = canvas.width - margin * 2
    const barcodeHeight = height
    const startX = margin
    const startY = margin

    // Draw barcode lines (simplified pattern)
    ctx.fillStyle = lineColor
    const lineWidth = width
    const numLines = Math.floor(barcodeWidth / (lineWidth * 2))

    for (let i = 0; i < numLines; i++) {
      const x = startX + i * lineWidth * 2
      const lineHeight = barcodeHeight * (0.8 + Math.random() * 0.2) // Vary line heights slightly
      ctx.fillRect(x, startY, lineWidth, lineHeight)
    }

    // Draw text if enabled
    if (displayValue) {
      ctx.fillStyle = textColor
      ctx.font = `${fontSize}px Arial`
      ctx.textAlign = textAlign as CanvasTextAlign

      let textX = startX + barcodeWidth / 2
      if (textAlign === "left") textX = startX
      if (textAlign === "right") textX = startX + barcodeWidth

      const textY = textPosition === "top" ? startY - 5 : startY + barcodeHeight + fontSize + 5

      ctx.fillText(text, textX, textY)
    }
  }

  useEffect(() => {
    generateBarcode()
  }, [
    text,
    barcodeType,
    width,
    height,
    displayValue,
    fontSize,
    textAlign,
    textPosition,
    backgroundColor,
    lineColor,
    textColor,
    margin,
  ])

  const downloadBarcode = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = `barcode-${text}.${format.toLowerCase()}`

    if (format === "PNG") {
      link.href = canvasRef.current.toDataURL("image/png")
    } else if (format === "JPG") {
      link.href = canvasRef.current.toDataURL("image/jpeg", 0.9)
    }

    link.click()
  }

  const copyBarcodeData = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const getBarcodeInfo = () => {
    const selectedType = barcodeTypes.find((type) => type.value === barcodeType)
    return selectedType || barcodeTypes[0]
  }

  const handleCorrectedValue = (correctedValue: string) => {
    setText(correctedValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`container mx-auto px-4 py-6 relative z-10 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Barcode Generator Pro
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/generator">
              <Button
                variant="outline"
                className="bg-transparent hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300 transition-all duration-300"
              >
                QR Generator
              </Button>
            </Link>
            <Link href="/scanner">
              <Button
                variant="outline"
                className="bg-transparent hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300 transition-all duration-300"
              >
                Scanner
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div
        className={`text-center py-8 relative z-10 transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Barcode Generator Pro
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Buat barcode dengan validasi standar industri dan kustomisasi lengkap</p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Settings Section */}
        <Card
          className={`backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-emerald-100/50 hover:shadow-xl transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Settings className="w-6 h-6 text-emerald-600" />
              Pengaturan Barcode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                {/* Text Input */}
                <div className="space-y-2">
                  <Label htmlFor="text" className="text-sm font-semibold text-gray-700">
                    Teks/Angka Barcode
                  </Label>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Masukkan teks atau angka"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                  />
                </div>

                {/* Barcode Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Jenis Barcode</Label>
                  <Select value={barcodeType} onValueChange={setBarcodeType}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {barcodeTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-gray-500">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Lebar: {width}px</Label>
                    <Slider
                      value={[width]}
                      onValueChange={(value) => setWidth(value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Tinggi: {height}px</Label>
                    <Slider
                      value={[height]}
                      onValueChange={(value) => setHeight(value[0])}
                      max={200}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-6">
                {/* Text Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-gray-700">Tampilkan Teks</Label>
                    <Switch checked={displayValue} onCheckedChange={setDisplayValue} />
                  </div>

                  {displayValue && (
                    <div className="space-y-4 pl-4 border-l-2 border-emerald-200">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700">Font: {fontSize}px</Label>
                        <Slider
                          value={[fontSize]}
                          onValueChange={(value) => setFontSize(value[0])}
                          max={30}
                          min={10}
                          step={2}
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Posisi</Label>
                          <Select value={textPosition} onValueChange={setTextPosition}>
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="top">Atas</SelectItem>
                              <SelectItem value="bottom">Bawah</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Align</Label>
                          <Select value={textAlign} onValueChange={setTextAlign}>
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="left">Kiri</SelectItem>
                              <SelectItem value="center">Tengah</SelectItem>
                              <SelectItem value="right">Kanan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Colors */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Background</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-10 rounded-lg cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Garis</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="color"
                        value={lineColor}
                        onChange={(e) => setLineColor(e.target.value)}
                        className="w-12 h-10 rounded-lg cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={lineColor}
                        onChange={(e) => setLineColor(e.target.value)}
                        className="flex-1 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Teks</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-10 rounded-lg cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Margin & Format */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Margin: {margin}px</Label>
                    <Slider
                      value={[margin]}
                      onValueChange={(value) => setMargin(value[0])}
                      max={50}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PNG">PNG</SelectItem>
                        <SelectItem value="JPG">JPG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
              <Button
                onClick={copyBarcodeData}
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
                    Salin Data
                  </>
                )}
              </Button>

              <Button
                onClick={downloadBarcode}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Download {format}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Validation Section */}
        <Card
          className={`backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-teal-100/50 hover:shadow-xl transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: "700ms" }}
        >
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              Validasi Standar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarcodeValidator value={text} format={barcodeType} onCorrectedValue={handleCorrectedValue} />
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card
          className={`backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-green-100/50 hover:shadow-xl transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: "900ms" }}
        >
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center">Preview Barcode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <canvas ref={canvasRef} className="max-w-full h-auto border border-gray-200 rounded-lg" />
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Barcode untuk:</p>
                <p className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg break-all max-w-sm">{text}</p>
                <p className="text-xs text-gray-500">Format: {getBarcodeInfo().label}</p>
              </div>

              {/* Barcode Info */}
              <div className="w-full p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                <h4 className="font-semibold text-emerald-800 mb-2">Informasi Barcode</h4>
                <div className="text-sm text-emerald-700 space-y-1">
                  <p>
                    <strong>Jenis:</strong> {getBarcodeInfo().label}
                  </p>
                  <p>
                    <strong>Panjang:</strong> {text.length} karakter
                  </p>
                  <p>
                    <strong>Dimensi:</strong> {width}px × {height}px
                  </p>
                  <p>
                    <strong>Format:</strong> {format}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center py-8 mt-8 relative z-10">
        <p className="text-gray-500">
          Dibuat dengan ❤️ oleh{" "}
          <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:scale-110 inline-block transition-transform duration-300">
            MUH. ULIL AMRI 2025
          </span>
        </p>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Info, Lightbulb, Copy, CheckCircle2 } from "lucide-react"
import {
  validateBarcodeFormat,
  getIndustryRecommendations,
  BARCODE_FORMATS,
  type ValidationResult,
} from "@/lib/barcode-validator"

interface BarcodeValidatorProps {
  value: string
  format: string
  onCorrectedValue?: (value: string) => void
}

export function BarcodeValidator({ value, format, onCorrectedValue }: BarcodeValidatorProps) {
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, message: "" })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (value) {
      const result = validateBarcodeFormat(value, format)
      setValidation(result)
    } else {
      setValidation({ isValid: true, message: "" })
    }
  }, [value, format])

  const handleCopyCorrection = async (correctedValue: string) => {
    try {
      await navigator.clipboard.writeText(correctedValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleApplyCorrection = (correctedValue: string) => {
    if (onCorrectedValue) {
      onCorrectedValue(correctedValue)
    }
  }

  const barcodeFormat = BARCODE_FORMATS[format]
  const recommendations = getIndustryRecommendations(format)

  if (!value) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Info className="w-4 h-4" />
            <span className="text-sm">Masukkan data untuk validasi</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Validation Status */}
      <Card
        className={`border-2 transition-all duration-300 ${
          validation.isValid ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {validation.isValid ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${validation.isValid ? "text-green-800" : "text-red-800"}`}>
                {validation.message}
              </p>

              {validation.suggestions && (
                <div className="mt-2 space-y-1">
                  {validation.suggestions.map((suggestion, index) => (
                    <p key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <Lightbulb className="w-3 h-3" />
                      {suggestion}
                    </p>
                  ))}
                </div>
              )}

              {validation.correctedValue && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-2">Saran Perbaikan:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-blue-100 px-2 py-1 rounded text-blue-900 font-mono text-sm">
                      {validation.correctedValue}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyCorrection(validation.correctedValue!)}
                      className="h-7 px-2 text-xs"
                    >
                      {copied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApplyCorrection(validation.correctedValue!)}
                      className="h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      Terapkan
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Format Information */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Informasi Format {barcodeFormat?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">{barcodeFormat?.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                Karakter: {barcodeFormat?.allowedChars}
              </Badge>
              {barcodeFormat?.length && (
                <Badge variant="outline" className="text-xs">
                  Panjang:{" "}
                  {Array.isArray(barcodeFormat.length) ? barcodeFormat.length.join(" atau ") : barcodeFormat.length}{" "}
                  digit
                </Badge>
              )}
              {barcodeFormat?.checkDigit && (
                <Badge variant="outline" className="text-xs">
                  Check Digit: Ya
                </Badge>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Contoh Valid:</p>
            <div className="flex flex-wrap gap-2">
              {barcodeFormat?.examples.map((example, index) => (
                <code key={index} className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                  {example}
                </code>
              ))}
            </div>
          </div>

          {recommendations.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Lightbulb className="w-4 h-4" />
                Rekomendasi Industri:
              </p>
              <ul className="space-y-1">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Value Analysis */}
      {value && (
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Analisis Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Panjang:</span>
                <span className="ml-2 font-mono">{value.length} karakter</span>
              </div>
              <div>
                <span className="text-gray-600">Tipe:</span>
                <span className="ml-2">{/^\d+$/.test(value) ? "Numeric" : "Alphanumeric"}</span>
              </div>
            </div>

            <div>
              <span className="text-gray-600 text-sm">Preview:</span>
              <div className="mt-1 p-2 bg-gray-50 rounded border font-mono text-sm break-all">{value}</div>
            </div>

            {format === "EAN13" && value.length >= 3 && (
              <div className="text-xs text-gray-600">
                <p>
                  <strong>Country Code:</strong> {value.substring(0, 3)}
                </p>
                {value.length >= 7 && (
                  <p>
                    <strong>Company Code:</strong> {value.substring(3, 7)}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export interface ValidationResult {
  isValid: boolean
  message: string
  suggestions?: string[]
  correctedValue?: string
}

export interface BarcodeFormat {
  name: string
  description: string
  pattern: RegExp
  length?: number | number[]
  checkDigit?: boolean
  allowedChars: string
  examples: string[]
}

export const BARCODE_FORMATS: Record<string, BarcodeFormat> = {
  CODE128: {
    name: "Code 128",
    description: "Alphanumeric barcode dengan density tinggi",
    pattern: /^[\x00-\x7F]+$/,
    allowedChars: "ASCII characters (0-127)",
    examples: ["ABC123", "Hello World", "12345ABCDE"],
  },
  CODE39: {
    name: "Code 39",
    description: "Alphanumeric barcode dengan start/stop character",
    pattern: /^[A-Z0-9\-.$/+%\s]+$/,
    allowedChars: "A-Z, 0-9, -, ., $, /, +, %, space",
    examples: ["ABC123", "HELLO-WORLD", "12345"],
  },
  EAN13: {
    name: "EAN-13",
    description: "13 digit barcode untuk produk retail",
    pattern: /^\d{12,13}$/,
    length: [12, 13],
    checkDigit: true,
    allowedChars: "0-9 (digits only)",
    examples: ["123456789012", "1234567890128"],
  },
  EAN8: {
    name: "EAN-8",
    description: "8 digit barcode untuk produk kecil",
    pattern: /^\d{7,8}$/,
    length: [7, 8],
    checkDigit: true,
    allowedChars: "0-9 (digits only)",
    examples: ["1234567", "12345670"],
  },
  UPC: {
    name: "UPC-A",
    description: "12 digit barcode untuk produk Amerika",
    pattern: /^\d{11,12}$/,
    length: [11, 12],
    checkDigit: true,
    allowedChars: "0-9 (digits only)",
    examples: ["12345678901", "123456789012"],
  },
  ITF14: {
    name: "ITF-14",
    description: "14 digit barcode untuk shipping",
    pattern: /^\d{13,14}$/,
    length: [13, 14],
    checkDigit: true,
    allowedChars: "0-9 (digits only)",
    examples: ["1234567890123", "12345678901234"],
  },
  MSI: {
    name: "MSI",
    description: "Numeric barcode untuk inventory",
    pattern: /^\d+$/,
    allowedChars: "0-9 (digits only)",
    examples: ["123456", "1234567890"],
  },
  pharmacode: {
    name: "Pharmacode",
    description: "Numeric barcode untuk farmasi (3-131070)",
    pattern: /^\d+$/,
    allowedChars: "0-9 (digits only)",
    examples: ["123", "1234", "12345"],
  },
}

// Calculate check digit for EAN/UPC
export function calculateEANCheckDigit(digits: string): number {
  const nums = digits.split("").map(Number)
  let sum = 0

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] * (i % 2 === 0 ? 1 : 3)
  }

  return (10 - (sum % 10)) % 10
}

// Calculate check digit for ITF-14
export function calculateITF14CheckDigit(digits: string): number {
  const nums = digits.split("").map(Number)
  let sum = 0

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] * (i % 2 === 0 ? 3 : 1)
  }

  return (10 - (sum % 10)) % 10
}

// Validate specific barcode formats
export function validateBarcodeFormat(value: string, format: string): ValidationResult {
  const barcodeFormat = BARCODE_FORMATS[format]

  if (!barcodeFormat) {
    return {
      isValid: false,
      message: "Format barcode tidak dikenali",
    }
  }

  // Check if empty
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      message: "Barcode tidak boleh kosong",
    }
  }

  const trimmedValue = value.trim()

  // Check pattern
  if (!barcodeFormat.pattern.test(trimmedValue)) {
    return {
      isValid: false,
      message: `Format tidak valid. Hanya diperbolehkan: ${barcodeFormat.allowedChars}`,
      suggestions: [`Contoh valid: ${barcodeFormat.examples.join(", ")}`],
    }
  }

  // Check length for specific formats
  if (barcodeFormat.length) {
    const allowedLengths = Array.isArray(barcodeFormat.length) ? barcodeFormat.length : [barcodeFormat.length]

    if (!allowedLengths.includes(trimmedValue.length)) {
      const lengthStr = allowedLengths.join(" atau ")
      let correctedValue = trimmedValue

      // Auto-correct length if possible
      if (format === "EAN13" && trimmedValue.length === 12) {
        const checkDigit = calculateEANCheckDigit(trimmedValue)
        correctedValue = trimmedValue + checkDigit
      } else if (format === "EAN8" && trimmedValue.length === 7) {
        const checkDigit = calculateEANCheckDigit(trimmedValue)
        correctedValue = trimmedValue + checkDigit
      } else if (format === "UPC" && trimmedValue.length === 11) {
        const checkDigit = calculateEANCheckDigit(trimmedValue)
        correctedValue = trimmedValue + checkDigit
      } else if (format === "ITF14" && trimmedValue.length === 13) {
        const checkDigit = calculateITF14CheckDigit(trimmedValue)
        correctedValue = trimmedValue + checkDigit
      }

      return {
        isValid: false,
        message: `Panjang harus ${lengthStr} digit. Saat ini: ${trimmedValue.length} digit`,
        suggestions: [`Contoh valid: ${barcodeFormat.examples.join(", ")}`],
        correctedValue: correctedValue !== trimmedValue ? correctedValue : undefined,
      }
    }
  }

  // Validate check digit for formats that require it
  if (barcodeFormat.checkDigit) {
    const result = validateCheckDigit(trimmedValue, format)
    if (!result.isValid) {
      return result
    }
  }

  // Special validations
  switch (format) {
    case "pharmacode":
      const num = Number.parseInt(trimmedValue)
      if (num < 3 || num > 131070) {
        return {
          isValid: false,
          message: "Pharmacode harus antara 3 dan 131070",
          suggestions: ["Contoh valid: 123, 1234, 12345"],
        }
      }
      break

    case "CODE39":
      if (trimmedValue.length > 43) {
        return {
          isValid: false,
          message: "Code 39 maksimal 43 karakter",
          suggestions: ["Pertimbangkan menggunakan Code 128 untuk teks yang lebih panjang"],
        }
      }
      break
  }

  return {
    isValid: true,
    message: "Format barcode valid ✓",
  }
}

function validateCheckDigit(value: string, format: string): ValidationResult {
  const digits = value.slice(0, -1)
  const providedCheckDigit = Number.parseInt(value.slice(-1))
  let calculatedCheckDigit: number

  switch (format) {
    case "EAN13":
    case "EAN8":
    case "UPC":
      calculatedCheckDigit = calculateEANCheckDigit(digits)
      break
    case "ITF14":
      calculatedCheckDigit = calculateITF14CheckDigit(digits)
      break
    default:
      return { isValid: true, message: "Check digit tidak diperlukan" }
  }

  if (providedCheckDigit !== calculatedCheckDigit) {
    const correctedValue = digits + calculatedCheckDigit
    return {
      isValid: false,
      message: `Check digit salah. Seharusnya: ${calculatedCheckDigit}`,
      correctedValue,
      suggestions: [`Nilai yang benar: ${correctedValue}`],
    }
  }

  return {
    isValid: true,
    message: "Check digit valid ✓",
  }
}

// Get industry recommendations
export function getIndustryRecommendations(format: string): string[] {
  const recommendations: Record<string, string[]> = {
    EAN13: ["Ideal untuk produk retail internasional", "Wajib untuk distribusi di Eropa", "Harus terdaftar di GS1"],
    EAN8: [
      "Untuk produk dengan kemasan kecil",
      "Alternatif EAN-13 untuk space terbatas",
      "Tetap memerlukan registrasi GS1",
    ],
    UPC: ["Standar untuk pasar Amerika Utara", "Wajib untuk retail di US dan Kanada", "Harus terdaftar di GS1 US"],
    ITF14: ["Untuk shipping dan logistik", "Digunakan pada karton dan pallet", "Berisi GTIN-14"],
    CODE128: ["Fleksibel untuk berbagai aplikasi", "Density tinggi, hemat space", "Cocok untuk internal tracking"],
    CODE39: ["Mudah dibaca oleh scanner lama", "Cocok untuk aplikasi industri", "Tidak memerlukan check digit"],
    MSI: ["Khusus untuk inventory management", "Biasa digunakan di warehouse", "Numeric only, simple format"],
    pharmacode: ["Khusus industri farmasi", "Encoding sederhana untuk obat", "Range terbatas: 3-131070"],
  }

  return recommendations[format] || []
}

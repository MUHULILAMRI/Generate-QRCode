"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Download, Palette, QrCode, Shield, Sparkles, Star, Zap, Camera, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Generate QR Code",
      description: "Buat QR code dalam hitungan detik dengan teknologi terdepan",
      delay: "0ms",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Generate Barcode",
      description: "Buat barcode dengan berbagai format (Code 128, EAN-13, UPC, dll)",
      delay: "100ms",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Scan QR Code",
      description: "Scan dan baca QR code dengan kamera atau upload gambar",
      delay: "200ms",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Kustomisasi Penuh",
      description: "Ubah warna, ukuran, dan pengaturan sesuai kebutuhan",
      delay: "300ms",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Download HD",
      description: "Download dalam format PNG/JPG berkualitas tinggi",
      delay: "400ms",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Aman & Private",
      description: "Semua proses dilakukan di browser, data Anda tetap aman",
      delay: "500ms",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Pilih Jenis",
      description: "Pilih QR Code atau Barcode sesuai kebutuhan",
      delay: "0ms",
    },
    {
      number: "02",
      title: "Input & Kustomisasi",
      description: "Masukkan data dan atur tampilan sesuai keinginan",
      delay: "200ms",
    },
    {
      number: "03",
      title: "Generate & Download",
      description: "Klik generate dan download hasil dalam format pilihan",
      delay: "400ms",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`container mx-auto px-4 py-6 relative z-10 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Code Generator Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/barcode">
              <Button
                variant="outline"
                className="bg-transparent hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300 transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Barcode
              </Button>
            </Link>
            <Link href="/scanner">
              <Button
                variant="outline"
                className="bg-transparent hover:bg-indigo-50 border-indigo-200 hover:border-indigo-300 transition-all duration-300"
              >
                <Camera className="w-4 h-4 mr-2" />
                Scanner
              </Button>
            </Link>
            <Link href="/generator">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300">
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 mb-8 transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-sm font-medium text-indigo-600">QR Code & Barcode Generator Terbaik 2025</span>
          </div>

          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
              Generate QR Code
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              & Barcode
            </span>
            <br />
            <span className="text-gray-800">Dalam Sekejap</span>
          </h1>

          <p
            className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Buat QR code dan barcode yang menakjubkan dengan kustomisasi penuh. Mendukung berbagai format barcode
            seperti Code 128, EAN-13, UPC-A, dan banyak lagi. Gratis, cepat, dan mudah digunakan!
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Link href="/generator">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <QrCode className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Buat QR Code
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/barcode">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <BarChart3 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Buat Barcode
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/scanner">
              <Button
                variant="outline"
                className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-300 hover:border-indigo-300 bg-transparent hover:bg-indigo-50 transition-all duration-300 hover:scale-105 group"
              >
                <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Scan Code
              </Button>
            </Link>
          </div>

          <div
            className={`flex items-center justify-center gap-6 mt-12 text-sm text-gray-500 transition-all duration-1000 delay-1200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="flex items-center gap-1 hover:scale-110 transition-transform duration-300">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span>100% Gratis</span>
            </div>
            <div className="flex items-center gap-1 hover:scale-110 transition-transform duration-300">
              <Shield className="w-4 h-4 text-green-500 animate-pulse" style={{ animationDelay: "1s" }} />
              <span>Aman & Private</span>
            </div>
            <div className="flex items-center gap-1 hover:scale-110 transition-transform duration-300">
              <Zap className="w-4 h-4 text-blue-500 animate-pulse" style={{ animationDelay: "2s" }} />
              <span>Multi Format</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: "1400ms" }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Fitur Unggulan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dilengkapi dengan fitur-fitur canggih untuk semua kebutuhan QR code dan barcode Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-500 group hover:scale-105 hover:-translate-y-2 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${1600 + index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: "2200ms" }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Cara Menggunakan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hanya 3 langkah mudah untuk membuat QR code atau barcode yang sempurna
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center relative transition-all duration-1000 hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${2400 + index * 200}ms` }}
            >
              <div
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 text-white text-2xl font-bold hover:scale-110 hover:rotate-12 transition-all duration-300 animate-bounce"
                style={{ animationDelay: `${index * 0.5}s`, animationDuration: "2s" }}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full">
                  <ArrowRight className="w-6 h-6 text-indigo-300 mx-auto animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <Card
          className={`backdrop-blur-sm bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: "3000ms" }}
        >
          <CardContent className="p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4 animate-pulse">Siap Membuat Code Pertama Anda?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang sudah mempercayai Code Generator Pro untuk kebutuhan QR code dan
              barcode mereka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/generator">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <QrCode className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  Mulai QR Code
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/barcode">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <BarChart3 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Mulai Barcode
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/scanner">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 group"
                >
                  <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Atau Scan Code
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200 relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: "3200ms" }}
        >
          <div className="flex items-center justify-center gap-2 mb-4 group">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Code Generator Pro
            </span>
          </div>
          <p className="text-gray-600 mb-4">QR Code & Barcode Generator terbaik untuk semua kebutuhan Anda</p>
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-gray-500 text-sm">
              © 2025 Code Generator Pro. Dibuat dengan ❤️ oleh{" "}
              <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:scale-110 inline-block transition-transform duration-300">
                MUH. ULIL AMRI
              </span>
            </p>
            <p className="text-gray-400 text-xs mt-2">Powered by Next.js, Tailwind CSS & React</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

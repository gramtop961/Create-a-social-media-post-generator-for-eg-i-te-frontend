'use client'

import { useState } from 'react'

type Platform = 'linkedin' | 'twitter' | 'instagram'

interface PlatformConfig {
  name: string
  maxLength: number
  icon: React.ReactNode
  style: string
  color: string
  bgColor: string
}

// Social Media Icons as React components
const LinkedInIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const platforms: Record<Platform, PlatformConfig> = {
  linkedin: {
    name: 'LinkedIn',
    maxLength: 3000,
    icon: <LinkedInIcon />,
    style: 'Professional and engaging',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200'
  },
  twitter: {
    name: 'Twitter/X',
    maxLength: 280,
    icon: <TwitterIcon />,
    style: 'Concise and impactful',
    color: 'text-black',
    bgColor: 'bg-gray-50 border-gray-200'
  },
  instagram: {
    name: 'Instagram',
    maxLength: 2200,
    icon: <InstagramIcon />,
    style: 'Visual and trendy',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 border-pink-200'
  }
}

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin')
  const [generatedPost, setGeneratedPost] = useState('')
  const [copied, setCopied] = useState(false)

  const formatPostForPlatform = (text: string, platform: Platform): string => {
    if (!text.trim()) return ''

    let formattedPost = text

    switch (platform) {
      case 'linkedin':
        formattedPost = `${text}\n\n#LinkedIn #Professional #Networking`
        break
      case 'twitter':
        if (text.length > 240) {
          formattedPost = text.substring(0, 240) + '...'
        }
        formattedPost += '\n\n#Twitter #SocialMedia'
        break
      case 'instagram':
        formattedPost = `${text}\n\n📸✨ #Instagram #Content #SocialMedia #Trending`
        break
    }

    return formattedPost
  }

  const handleGenerate = () => {
    if (!inputText.trim()) return
    const formatted = formatPostForPlatform(inputText, selectedPlatform)
    setGeneratedPost(formatted)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Social Media Post Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into platform-optimized social media posts with AI-powered formatting
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-8">
              <div>
                <label htmlFor="input-text" className="block text-lg font-semibold text-gray-800 mb-4">
                  ✨ What's on your mind?
                </label>
                <textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Share your thoughts, ideas, or message here..."
                  className="w-full h-40 p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-lg placeholder-gray-400 bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-6">
                  🎯 Choose Your Platform
                </label>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(platforms).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPlatform(key as Platform)}
                      className={`group p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                        selectedPlatform === key
                          ? `${config.bgColor} border-current ${config.color} shadow-lg`
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`${selectedPlatform === key ? config.color : 'text-gray-600'} transition-colors`}>
                            {config.icon}
                          </div>
                          <div>
                            <span className="font-semibold text-lg">{config.name}</span>
                            <p className="text-sm text-gray-600 mt-1">{config.style}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-500">
                            {config.maxLength.toLocaleString()}
                          </span>
                          <p className="text-xs text-gray-400">characters</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!inputText.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Post</span>
                </span>
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <div className={platforms[selectedPlatform].color}>
                      {platforms[selectedPlatform].icon}
                    </div>
                    <span>Generated for {platforms[selectedPlatform].name}</span>
                  </label>
                  {generatedPost && (
                    <div className="text-right">
                      <span className={`text-sm font-medium ${generatedPost.length > platforms[selectedPlatform].maxLength ? 'text-red-600' : 'text-gray-600'}`}>
                        {generatedPost.length.toLocaleString()} / {platforms[selectedPlatform].maxLength.toLocaleString()}
                      </span>
                      <p className="text-xs text-gray-400">characters</p>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    value={generatedPost}
                    readOnly
                    placeholder="Your optimized post will appear here..."
                    className="w-full h-80 p-6 border-2 border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white resize-none text-lg placeholder-gray-400 focus:outline-none"
                  />
                  {generatedPost && (
                    <button
                      onClick={copyToClipboard}
                      className={`absolute top-4 right-4 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        copied
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200'
                      }`}
                    >
                      {copied ? (
                        <span className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Copied!</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy</span>
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {generatedPost && (
                <div className={`${platforms[selectedPlatform].bgColor} border-2 rounded-2xl p-6`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={platforms[selectedPlatform].color}>
                      {platforms[selectedPlatform].icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      Platform Insights
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Style:</span>
                      <span className="font-medium">{platforms[selectedPlatform].style}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Character limit:</span>
                      <span className="font-medium">{platforms[selectedPlatform].maxLength.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Current length:</span>
                      <span className={`font-medium ${generatedPost.length > platforms[selectedPlatform].maxLength ? 'text-red-600' : 'text-green-600'}`}>
                        {generatedPost.length.toLocaleString()}
                      </span>
                    </div>
                    {generatedPost.length > platforms[selectedPlatform].maxLength && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm font-medium">
                          ⚠️ Your post exceeds the character limit by {(generatedPost.length - platforms[selectedPlatform].maxLength).toLocaleString()} characters
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'

type Platform = 'linkedin' | 'twitter' | 'instagram'

interface PlatformConfig {
  name: string
  maxLength: number
  emoji: string
  style: string
}

const platforms: Record<Platform, PlatformConfig> = {
  linkedin: {
    name: 'LinkedIn',
    maxLength: 3000,
    emoji: '💼',
    style: 'Professional and engaging'
  },
  twitter: {
    name: 'Twitter/X',
    maxLength: 280,
    emoji: '🐦',
    style: 'Concise and impactful'
  },
  instagram: {
    name: 'Instagram',
    maxLength: 2200,
    emoji: '📸',
    style: 'Visual and trendy'
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Social Media Post Generator
          </h1>
          <p className="text-lg text-gray-600">
            Transform your ideas into platform-optimized social media posts
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to post?
                </label>
                <textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your message here..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Platform
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(platforms).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPlatform(key as Platform)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedPlatform === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl mr-2">{config.emoji}</span>
                          <span className="font-medium">{config.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {config.maxLength} chars
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{config.style}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!inputText.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Generate Post
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Generated Post for {platforms[selectedPlatform].name}
                  </label>
                  {generatedPost && (
                    <span className="text-sm text-gray-500">
                      {generatedPost.length} / {platforms[selectedPlatform].maxLength} chars
                    </span>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    value={generatedPost}
                    readOnly
                    placeholder="Your formatted post will appear here..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none"
                  />
                  {generatedPost && (
                    <button
                      onClick={copyToClipboard}
                      className={`absolute top-3 right-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        copied
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  )}
                </div>
              </div>

              {generatedPost && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Platform Guidelines:
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• {platforms[selectedPlatform].style}</li>
                    <li>• Max length: {platforms[selectedPlatform].maxLength} characters</li>
                    <li>• Current length: {generatedPost.length} characters</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

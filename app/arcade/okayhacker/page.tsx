'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Terminal,
  Lock,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Zap,
  Key,
  Database,
  Globe,
  FileText,
  Hash,
  Server,
  Code,
  Network,
  Bug,
  Info,
  ChevronRight,
  Award,
  Layers,
} from 'lucide-react'

/**
 * File: app/arcade/okayhacker/page.tsx
 * Notes:
 * - Drop this file into your Next.js App Router project to expose the game at /arcade/okayhacker
 * - TailwindCSS required (which your project already uses). No server code needed.
 * - Uses only client-side state. Designed to be self-contained.
 */
export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6">
        <OkayHackerGame />
      </div>
    </main>
  )
}

function OkayHackerGame() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<Array<{ message: string; type: string; timestamp?: string }>>([])
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [hints, setHints] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [levelCompleted, setLevelCompleted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [showLevelModal, setShowLevelModal] = useState(false)
  const [levelStartTime, setLevelStartTime] = useState<number | null>(null)
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const levels = useMemo(
    () => [
      {
        id: 1,
        name: 'Weak Authentication',
        icon: <Key className="w-5 h-5" />,
        difficulty: 'Novice',
        description: 'Default credentials vulnerability',
        objective: 'Access the admin panel using default credentials',
        solution: 'admin:password',
        hints: [
          'Default credentials often follow patterns like admin:admin',
          "Try common combinations with 'admin' username",
          'Format: username:password - the password is a common word',
        ],
        instruction: '$ ssh admin@10.0.0.1\nPassword: ',
        modalContent: {
          title: 'Default Credentials Attack',
          description:
            'Many systems ship with default usernames and passwords that administrators forget to change.',
          when: 'Used when targeting routers, IoT devices, databases, and enterprise applications.',
          example: 'Common defaults: admin/admin, root/root, admin/password, user/user',
        },
        learning: 'Always change default credentials immediately after installation!',
      },
      {
        id: 2,
        name: 'SQL Injection',
        icon: <Database className="w-5 h-5" />,
        difficulty: 'Beginner',
        description: 'Database query manipulation',
        objective: 'Bypass login authentication using SQL injection',
        solution: "admin' --",
        hints: [
          'SQL comments can terminate the rest of a query',
          'Use SQL comment syntax: --',
          "Try: admin' followed by comment syntax",
        ],
        instruction: "$ SELECT * FROM users WHERE username='[INPUT]' AND password='…'",
        modalContent: {
          title: 'SQL Injection (SQLi)',
          description:
            'Attackers insert malicious SQL code into application queries to manipulate the database.',
          when: 'Exploited in login forms, search boxes, and any user input that interacts with databases.',
          example: "Input like ' OR 1=1 -- can make conditions always true",
        },
        learning: 'Use parameterized queries and input validation to prevent SQL injection!',
      },
      {
        id: 3,
        name: 'Command Injection',
        icon: <Terminal className="w-5 h-5" />,
        difficulty: 'Beginner',
        description: 'OS command execution vulnerability',
        objective: 'Execute system commands through vulnerable input',
        solution: '127.0.0.1; ls',
        hints: [
          'Chain commands using semicolon or &&',
          "The system expects an IP but doesn't validate properly",
          'Try: 127.0.0.1; [command]',
        ],
        instruction: '$ ping -c 3 [INPUT]',
        modalContent: {
          title: 'Command Injection',
          description: 'Occurs when user input is passed directly to system commands without sanitization.',
          when: 'Found in network tools, file processors, and system administration interfaces.',
          example: "Input like '127.0.0.1; whoami' can execute additional commands",
        },
        learning: 'Never pass user input directly to system commands. Use allow-lists and proper escaping!',
      },
      {
        id: 4,
        name: 'XSS Payload',
        icon: <Globe className="w-5 h-5" />,
        difficulty: 'Intermediate',
        description: 'Cross-site scripting injection',
        objective: 'Inject JavaScript to steal cookies',
        solution: '<img src=x onerror=alert(document.cookie)>',
        hints: [
          'Image tags can execute JavaScript via error handlers',
          'Use onerror event to trigger code',
          'Format: <img src=x onerror=...>',
        ],
        instruction: '$ POST /comment\nContent: [INPUT]',
        modalContent: {
          title: 'Cross-Site Scripting (XSS)',
          description: 'Malicious scripts are injected into web pages viewed by other users.',
          when: 'Exploited in comment sections, forums, and anywhere user content is displayed.',
          example: 'Tags like <img> and <script> can execute JavaScript in victims\' browsers',
        },
        learning: 'Always encode user input and use Content Security Policy headers!',
      },
      {
        id: 5,
        name: 'Path Traversal',
        icon: <FileText className="w-5 h-5" />,
        difficulty: 'Intermediate',
        description: 'Directory traversal attack',
        objective: "Access the system's shadow file",
        solution: '../../../etc/shadow',
        hints: ['Use ../ to navigate up directories', 'The shadow file is in /etc/', 'You need exactly three ../ sequences'],
        instruction: '$ GET /files/[INPUT]',
        modalContent: {
          title: 'Path/Directory Traversal',
          description:
            'Attackers access files outside the intended directory by manipulating file paths.',
          when: 'Exploited in file download features, image galleries, and document viewers.',
          example: 'Sequences like ../ move up directories to access sensitive files',
        },
        learning: 'Validate file paths and use chroot jails to restrict file access!',
      },
      {
        id: 6,
        name: 'Cryptographic Flaw',
        icon: <Hash className="w-5 h-5" />,
        difficulty: 'Intermediate',
        description: 'Weak encryption implementation',
        objective: 'Decode this Base64 JWT token: eyJhZG1pbiI6dHJ1ZX0=',
        solution: '{"admin":true}',
        hints: [
          'JWT tokens have three parts, but this only has payload',
          'Base64 decode the token to see its contents',
          'The decoded JSON is your answer',
        ],
        instruction: '$ jwt_decoder [INPUT]',
        modalContent: {
          title: 'Cryptographic Vulnerabilities',
          description: 'Weak or improperly implemented cryptography can expose sensitive data.',
          when: 'Found in authentication tokens, password storage, and data encryption.',
          example: 'Unsigned JWTs, weak hashing algorithms, or predictable tokens',
        },
        learning: 'Always use proven cryptographic libraries and never roll your own crypto!',
      },
      {
        id: 7,
        name: 'IDOR Exploit',
        icon: <Server className="w-5 h-5" />,
        difficulty: 'Intermediate',
        description: 'Insecure Direct Object Reference',
        objective: 'Access user ID 1337\'s profile (you are user 1000)',
        solution: '/api/users/1337',
        hints: ['The API endpoint follows a pattern', 'Just change your user ID in the URL', 'Format: /api/users/[ID]'],
        instruction: '$ curl https://api.target.com/[INPUT]',
        modalContent: {
          title: 'Insecure Direct Object References (IDOR)',
          description: 'Applications expose internal object references allowing unauthorized access.',
          when: 'Common in APIs, profile pages, and document access systems.',
          example: 'Changing /user/1234 to /user/1235 might access another user\'s data',
        },
        learning: 'Always verify user authorization for every resource access!',
      },
      {
        id: 8,
        name: 'Buffer Overflow',
        icon: <Bug className="w-5 h-5" />,
        difficulty: 'Advanced',
        description: 'Memory corruption vulnerability',
        objective: "Overflow the 8-byte buffer with pattern 'A' x 16",
        solution: 'AAAAAAAAAAAAAAAA',
        hints: [
          'The buffer is 8 bytes, you need to overflow it',
          "Send exactly 16 'A' characters",
          'Pattern: AAAAAAAAAAAAAAAA',
        ],
        instruction: '$ ./vulnerable_app [INPUT]\nBuffer size: 8 bytes',
        modalContent: {
          title: 'Buffer Overflow',
          description: 'Writing more data than allocated memory can corrupt adjacent memory.',
          when: 'Exploited in C/C++ programs, network services, and legacy applications.',
          example:
            'Sending 100 characters to a 50-character buffer can crash or control the program',
        },
        learning: 'Use memory-safe languages and bounds checking to prevent overflows!',
      },
      {
        id: 9,
        name: 'DNS Hijacking',
        icon: <Network className="w-5 h-5" />,
        difficulty: 'Advanced',
        description: 'DNS cache poisoning',
        objective: 'Redirect example.com to malicious IP 6.6.6.6',
        solution: 'example.com A 6.6.6.6',
        hints: ['DNS A records map domains to IPs', 'Format: domain A IP', 'Use the exact IP: 6.6.6.6'],
        instruction: '$ dns_inject --record [INPUT]',
        modalContent: {
          title: 'DNS Cache Poisoning',
          description:
            'Attackers corrupt DNS resolver caches to redirect traffic to malicious servers.',
          when: 'Used for phishing, malware distribution, and man-in-the-middle attacks.',
          example: "Poisoning DNS to redirect bank.com to attacker's server",
        },
        learning: 'Use DNSSEC and verify DNS responses to prevent poisoning!',
      },
      {
        id: 10,
        name: 'Session Hijacking',
        icon: <Wifi className="w-5 h-5" />,
        difficulty: 'Advanced',
        description: 'Session token theft',
        objective: 'Use stolen session ID: SID-ADMIN-2024-SECURE',
        solution: 'Cookie: session=SID-ADMIN-2024-SECURE',
        hints: ['HTTP cookies carry session tokens', 'Format: Cookie: session=[TOKEN]', 'Use the exact token provided'],
        instruction: "$ curl -H '[INPUT]' https://target.com/admin",
        modalContent: {
          title: 'Session Hijacking',
          description:
            'Attackers steal or predict session tokens to impersonate legitimate users.',
          when: 'Exploited through XSS, network sniffing, or predictable session IDs.',
          example: 'Stealing cookies via XSS or intercepting them over unencrypted connections',
        },
        learning: 'Use HTTPS, secure cookie flags, and regenerate sessions after login!',
      },
      {
        id: 11,
        name: 'XXE Injection',
        icon: <Code className="w-5 h-5" />,
        difficulty: 'Expert',
        description: 'XML External Entity attack',
        objective: 'Read /etc/passwd using XXE',
        solution: '<!DOCTYPE x [<!ENTITY file SYSTEM "file:///etc/passwd">]>',
        hints: [
          'XXE uses DOCTYPE declarations',
          'SYSTEM entities can read files',
          'Format: <!DOCTYPE x [<!ENTITY ... SYSTEM "file:///...">]>',
        ],
        instruction: '$ POST /xml-parser\n[INPUT]',
        modalContent: {
          title: 'XML External Entity (XXE)',
          description: 'Attackers exploit XML parsers to read files or perform SSRF attacks.',
          when: 'Found in XML uploads, SOAP services, and configuration parsers.',
          example: 'DOCTYPE declarations can define entities that read system files',
        },
        learning: 'Disable external entity processing in XML parsers!',
      },
      {
        id: 12,
        name: 'Race Condition',
        icon: <Zap className="w-5 h-5" />,
        difficulty: 'Expert',
        description: 'TOCTOU vulnerability',
        objective: 'Transfer $1000 twice with balance of $1000: TRANSFER&&TRANSFER',
        solution: 'TRANSFER&&TRANSFER',
        hints: ['Execute two operations simultaneously', 'Use && to chain commands', 'Both transfers must execute before balance check'],
        instruction: '$ bank_transfer --amount 1000 --command [INPUT]',
        modalContent: {
          title: 'Race Condition',
          description: 'Multiple operations execute simultaneously causing unexpected behavior.',
          when: 'Exploited in financial systems, file operations, and authentication checks.',
          example: 'Two simultaneous withdrawals before balance is updated',
        },
        learning: 'Use proper locking mechanisms and atomic operations!',
      },
      {
        id: 13,
        name: 'API Key Leak',
        icon: <Key className="w-5 h-5" />,
        difficulty: 'Expert',
        description: 'Exposed credentials in source',
        objective: 'Find the API key in comments: <!-- API: sk-0xDEADBEEF -->',
        solution: 'sk-0xDEADBEEF',
        hints: [
          'Check HTML comments in source code',
          "The key starts with 'sk-'",
          'It contains hexadecimal: 0xDEADBEEF',
        ],
        instruction: '$ view-source https://target.com\n<!-- API: ??? -->\nExtract key: ',
        modalContent: {
          title: 'API Key/Secret Exposure',
          description: 'Sensitive credentials accidentally exposed in code, configs, or repositories.',
          when: 'Found in JavaScript source, GitHub repos, and configuration files.',
          example: 'API keys in client-side code or committed .env files',
        },
        learning: 'Never commit secrets to repositories. Use environment variables and secret management!',
      },
      {
        id: 14,
        name: 'Zero-Day Challenge',
        icon: <Shield className="w-5 h-5" />,
        difficulty: 'Master',
        description: 'Combined attack vector',
        objective: "Chain XSS + CSRF: <script>fetch('/transfer?to=attacker')</script>",
        solution: "<script>fetch('/transfer?to=attacker')</script>",
        hints: [
          'Combine XSS with CSRF for maximum impact',
          'Use fetch() to make requests',
          'Target: /transfer?to=attacker',
        ],
        instruction: '$ POST /profile/bio\n[INPUT]',
        modalContent: {
          title: 'Chained Vulnerabilities',
          description: 'Multiple vulnerabilities combined for sophisticated attacks.',
          when: 'Advanced persistent threats chain multiple exploits for maximum impact.',
          example: 'XSS to steal tokens + CSRF to perform actions + privilege escalation',
        },
        learning: 'Defense in depth is crucial - one vulnerability can enable others!',
      },
    ],
    []
  )

  const achievements = useMemo(
    () => [
      { id: 'first_hack', name: 'First Blood', description: 'Complete your first level', icon: '🩸' },
      { id: 'no_hints', name: 'Solo Hunter', description: 'Complete 3 levels without hints', icon: '🎯' },
      { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a level in under 30 seconds', icon: '⚡' },
      { id: 'halfway', name: 'Rising Threat', description: 'Complete 7 levels', icon: '📈' },
      { id: 'perfect_run', name: 'Flawless', description: 'Complete 5 levels in a row without wrong answers', icon: '💎' },
      { id: 'master_hacker', name: 'Elite', description: 'Complete all 14 levels', icon: '👑' },
    ],
    []
  )

  useEffect(() => {
    if (gameStarted && currentLevel < levels.length) {
      setShowLevelModal(true)
      setLevelStartTime(Date.now())
    }
  }, [currentLevel, gameStarted, levels.length])

  const addToTerminal = (message: string, type: string = 'user') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false })
    setTerminalOutput((prev) => [...prev, { message, type, timestamp }])
  }

  const startLevel = () => {
    setShowLevelModal(false)
    setTerminalOutput([])
    const level = levels[currentLevel]
    addToTerminal(`┌─[okayhacker@localhost]─[~/challenges/level_${level.id}]`, 'prompt')
    addToTerminal(`└──╼ cat README.md`, 'command')
    addToTerminal(`# ${level.name}`, 'header')
    addToTerminal(`## Objective: ${level.objective}`, 'info')
    addToTerminal(``, 'empty')
    addToTerminal(level.instruction, 'system')
  }

  const handleStartGame = () => {
    setGameStarted(true)
    setCurrentLevel(0)
    setScore(0)
    setTerminalOutput([])
  }

  const unlockAchievement = (achievementId: string) => {
    if (!unlockedAchievements.includes(achievementId)) {
      setUnlockedAchievements((prev) => [...prev, achievementId])
      const achievement = achievements.find((a) => a.id === achievementId)
      if (achievement) {
        addToTerminal(``, 'empty')
        addToTerminal(`🏆 Achievement Unlocked: ${achievement.name}`, 'achievement')
        addToTerminal(`   ${achievement.description}`, 'achievement-desc')
      }
    }
  }

  const requestHint = () => {
    const level = levels[currentLevel]
    if (hints < level.hints.length) {
      addToTerminal(``, 'empty')
      addToTerminal(`💡 Hint ${hints + 1}/${level.hints.length}: ${level.hints[hints]}`, 'warning')
      setHints((prev) => prev + 1)
    } else {
      addToTerminal(`[!] No more hints available`, 'error')
    }
  }

  const handleSubmit = () => {
    if (!userInput.trim() || levelCompleted) return

    // Add to history
    setTerminalHistory((prev) => [...prev, userInput])
    setHistoryIndex(-1)

    addToTerminal(
      `┌─[okayhacker@localhost]─[~/challenges/level_${levels[currentLevel].id}]`,
      'prompt'
    )
    addToTerminal(`└──╼ ${userInput}`, 'command')

    const level = levels[currentLevel]

    if (userInput.trim() === level.solution) {
      const timeElapsed = (Date.now() - (levelStartTime ?? Date.now()))
      const pointsEarned = Math.max(100 - hints * 25, 25)

      addToTerminal(``, 'empty')
      addToTerminal(`[+] ACCESS GRANTED`, 'success')
      addToTerminal(`[+] Points earned: ${pointsEarned}`, 'success')
      addToTerminal(`[+] Time: ${(timeElapsed / 1000).toFixed(1)}s`, 'success')

      setScore((prev) => prev + pointsEarned)
      setLevelCompleted(true)

      // Achievements
      if (currentLevel === 0) unlockAchievement('first_hack')
      if (hints === 0 && currentLevel >= 2) unlockAchievement('no_hints')
      if (timeElapsed < 30000) unlockAchievement('speed_demon')
      if (currentLevel === 6) unlockAchievement('halfway')

      addToTerminal(``, 'empty')
      addToTerminal(`📚 ${level.learning}`, 'learning')

      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel((prev) => prev + 1)
          setLevelCompleted(false)
          setHints(0)
          setShowHint(false)
        } else {
          setGameCompleted(true)
          unlockAchievement('master_hacker')
        }
      }, 1200)
    } else {
      addToTerminal(`[-] Access Denied: Invalid input`, 'error')

      const lc = userInput.toLowerCase()
      if (lc === 'help') {
        addToTerminal(`Available commands:`, 'info')
        addToTerminal(`  hint     - Get a hint (-25 points)`, 'info')
        addToTerminal(`  clear    - Clear terminal`, 'info')
        addToTerminal(`  restart  - Restart current level`, 'info')
      } else if (lc === 'hint') {
        requestHint()
      } else if (lc === 'clear') {
        setTerminalOutput([])
      } else if (lc === 'restart') {
        startLevel()
      }
    }

    setUserInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < terminalHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setUserInput(terminalHistory[terminalHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setUserInput(terminalHistory[terminalHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setUserInput('')
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const TerminalView = () => (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
      {/* macOS Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer" />
        </div>
        <div className="text-gray-400 text-sm font-medium">
          okayhacker@localhost — bash — {terminalOutput.length} lines
        </div>
        <div className="text-gray-500 text-xs">Level {currentLevel + 1}/{levels.length}</div>
      </div>

      {/* Terminal Content */}
      <div className="bg-black p-4 h-96 overflow-y-auto font-mono text-sm custom-scrollbar">
        {terminalOutput.map((output, index) => (
          <div
            key={index}
            className={`mb-1 ${
              output.type === 'success'
                ? 'text-green-400'
                : output.type === 'error'
                ? 'text-red-400'
                : output.type === 'warning'
                ? 'text-yellow-400'
                : output.type === 'info'
                ? 'text-cyan-400'
                : output.type === 'system'
                ? 'text-gray-400'
                : output.type === 'header'
                ? 'text-pink-400 font-bold text-base'
                : output.type === 'prompt'
                ? 'text-green-400'
                : output.type === 'command'
                ? 'text-white'
                : output.type === 'learning'
                ? 'text-purple-400 italic'
                : output.type === 'achievement'
                ? 'text-yellow-300 font-bold'
                : output.type === 'achievement-desc'
                ? 'text-yellow-200 text-xs'
                : output.type === 'empty'
                ? ''
                : 'text-gray-300'
            }`}
          >
            {output.type !== 'empty' && output.message}
          </div>
        ))}
        <div className="h-4" />
      </div>

      {/* Input Area */}
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-sm">┌─[okayhacker]─[$]</span>
        </div>
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-green-400 text-sm">└──╼</span>
          <input
            type={currentLevel === 0 && !showPassword ? 'password' : 'text'}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={levelCompleted}
            className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none disabled:opacity-50"
            placeholder={levelCompleted ? 'Level completed...' : 'Enter command...'}
            autoFocus
          />
          {currentLevel === 0 && (
            <button
              onClick={() => setShowPassword((s) => !s)}
              className="text-gray-500 transition-colors hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const LevelModal = () => {
    if (!showLevelModal) return null
    const level = levels[currentLevel]
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
        <div className="w-full max-w-2xl rounded-lg border border-pink-500/20 bg-gray-900 shadow-2xl">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-pink-500/10 p-2">{level.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Level {level.id}: {level.name}
                  </h2>
                  <span
                    className={`mt-1 inline-block rounded px-2 py-1 text-xs ${
                      level.difficulty === 'Novice'
                        ? 'bg-green-500/20 text-green-400'
                        : level.difficulty === 'Beginner'
                        ? 'bg-blue-500/20 text-blue-400'
                        : level.difficulty === 'Intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : level.difficulty === 'Advanced'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {level.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
                <h3 className="mb-2 flex items-center font-semibold text-pink-400">
                  <Info className="mr-2 h-4 w-4" />
                  {level.modalContent.title}
                </h3>
                <p className="mb-3 text-sm text-gray-300">{level.modalContent.description}</p>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-semibold text-cyan-400">WHEN IT'S USED:</span>
                    <p className="mt-1 text-sm text-gray-400">{level.modalContent.when}</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-cyan-400">EXAMPLE:</span>
                    <p className="mt-1 rounded bg-black/50 p-2 font-mono text-sm text-gray-400">
                      {level.modalContent.example}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-pink-500/20 bg-pink-500/5 p-4">
                <h4 className="mb-2 font-semibold text-yellow-400">Your Mission:</h4>
                <p className="text-sm text-gray-300">{level.objective}</p>
              </div>
            </div>

            <button
              onClick={startLevel}
              className="flex w-full transform items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 py-3 font-bold text-white transition-all hover:scale-[1.02] hover:from-pink-600 hover:to-pink-700"
            >
              <Terminal className="h-5 w-5" />
              <span>Start Hacking</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen overflow-hidden bg-black text-white">
        <div className="relative flex min-h-screen items-center justify-center p-8">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-black to-cyan-500/10" />
          <div className="absolute inset-0">
            <div className="absolute left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-pink-500/20 blur-3xl" />
            <div className="delay-1000 absolute bottom-20 right-20 h-96 w-96 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 opacity-50 blur-2xl bg-pink-500" />
                  <Layers className="relative h-24 w-24 text-pink-500" />
                </div>
              </div>

              <h1 className="mb-2 text-7xl font-bold">
                <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  okayhacker
                </span>
              </h1>
              <p className="mb-2 text-2xl text-gray-400">let's play</p>
              <p className="text-lg text-gray-500">Master 14 Real-World Cybersecurity Challenges</p>

              <div className="mt-12 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3 mx-auto">
                <div className="rounded-lg border border-pink-500/20 bg-gray-900/50 p-6 backdrop-blur">
                  <Shield className="mx-auto mb-3 h-8 w-8 text-pink-500" />
                  <h3 className="mb-2 text-lg font-semibold">Learn by Doing</h3>
                  <p className="text-sm text-gray-400">Hands-on challenges teaching real vulnerabilities</p>
                </div>

                <div className="rounded-lg border border-cyan-500/20 bg-gray-900/50 p-6 backdrop-blur">
                  <Terminal className="mx-auto mb-3 h-8 w-8 text-cyan-500" />
                  <h3 className="mb-2 text-lg font-semibold">macOS Terminal</h3>
                  <p className="text-sm text-gray-400">Authentic command-line hacking experience</p>
                </div>

                <div className="rounded-lg border border-purple-500/20 bg-gray-900/50 p-6 backdrop-blur">
                  <Award className="mx-auto mb-3 h-8 w-8 text-purple-500" />
                  <h3 className="mb-2 text-lg font-semibold">Achievements</h3>
                  <p className="text-sm text-gray-400">Unlock badges and track your progress</p>
                </div>
              </div>

              <button
                onClick={handleStartGame}
                className="mt-12 transform rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-12 py-4 text-xl font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:scale-105 hover:from-pink-600 hover:to-pink-700"
              >
                Initialize System
              </button>

              <p className="mt-8 text-xs text-gray-600">For educational purposes only. Practice responsible disclosure.</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(31,41,55,0.5); border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(236,72,153,0.3); border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(236,72,153,0.5); }
          .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          .delay-1000 { animation-delay: 1000ms; }
          @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
        `}</style>
      </div>
    )
  }

  if (gameCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-8 text-white">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-pink-500/20 to-cyan-500/20" />
          <div className="relative mx-auto max-w-4xl text-center">
            <CheckCircle className="mx-auto mb-8 h-32 w-32 text-green-400" />
            <h1 className="mb-4 bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent">
              Elite Status Achieved
            </h1>
            <p className="mb-8 text-2xl text-gray-400">You’ve mastered all 14 challenges</p>

            <div className="mb-8 rounded-lg border border-pink-500/20 bg-gray-900/80 p-8 backdrop-blur">
              <h2 className="mb-6 text-3xl font-bold">
                Final Score: <span className="text-pink-500">{score}</span>
              </h2>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-lg border p-4 ${
                      unlockedAchievements.includes(achievement.id)
                        ? 'border-pink-500/30 bg-gradient-to-br from-pink-500/20 to-cyan-500/20'
                        : 'border-gray-700 bg-gray-800/50 opacity-50'
                    }`}
                  >
                    <div className="mb-2 text-3xl">{achievement.icon}</div>
                    <p className="text-sm font-bold">{achievement.name}</p>
                    <p className="mt-1 text-xs text-gray-400">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setGameStarted(false)
                setCurrentLevel(0)
                setScore(0)
                setGameCompleted(false)
                setUnlockedAchievements([])
                setTerminalOutput([])
                setTerminalHistory([])
              }}
              className="transform rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:from-pink-600 hover:to-pink-700"
            >
              Hack Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl p-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur">
          <div className="flex items-center space-x-4">
            <Layers className="h-8 w-8 text-pink-500" />
            <div>
              <h1 className="text-2xl font-bold">okayhacker</h1>
              <p className="text-xs text-gray-500">Ethical Hacking Simulator</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs uppercase text-gray-500">Score</p>
              <p className="text-xl font-bold text-pink-500">{score}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase text-gray-500">Progress</p>
              <p className="text-xl font-bold text-cyan-500">{currentLevel + 1}/14</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-4 lg:col-span-1">
            {/* Current Level */}
            <div className="rounded-lg border border-pink-500/20 bg-gray-900/80 p-4 backdrop-blur">
              <h3 className="mb-3 text-sm font-semibold uppercase text-pink-400">Current Challenge</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {levels[currentLevel].icon}
                  <div>
                    <p className="font-semibold">{levels[currentLevel].name}</p>
                    <p className="text-xs text-gray-500">{levels[currentLevel].description}</p>
                  </div>
                </div>

                <button
                  onClick={requestHint}
                  disabled={levelCompleted}
                  className="w-full rounded border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-900"
                >
                  <Key className="mr-2 inline h-4 w-4" />
                  Hint ({Math.max(0, 3 - hints)}/3) [-25 pts]
                </button>
              </div>
            </div>

            {/* Level Progress */}
            <div className="rounded-lg border border-cyan-500/20 bg-gray-900/80 p-4 backdrop-blur">
              <h3 className="mb-3 text-sm font-semibold uppercase text-cyan-400">All Levels</h3>
              <div className="custom-scrollbar max-h-64 space-y-1 overflow-y-auto">
                {levels.map((level, index) => (
                  <div
                    key={level.id}
                    className={`flex items-center space-x-2 rounded p-2 text-xs ${
                      index === currentLevel
                        ? 'border border-pink-500/30 bg-pink-500/20'
                        : index < currentLevel
                        ? 'bg-green-900/20'
                        : 'opacity-50'
                    }`}
                  >
                    <div className="h-5 w-5">
                      {index < currentLevel ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : index === currentLevel ? (
                        <ChevronRight className="h-5 w-5 animate-pulse text-pink-500" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <span className={index <= currentLevel ? 'text-white' : 'text-gray-600'}>
                      {level.id}. {level.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Terminal */}
          <div className="lg:col-span-3">
            <TerminalView />

            {/* Quick Commands */}
            <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
              <span>Quick Commands:</span>
              <button onClick={() => setUserInput('help')} className="text-cyan-400 hover:text-cyan-300">
                help
              </button>
              <span>•</span>
              <button onClick={() => setUserInput('hint')} className="text-pink-400 hover:text-pink-300">
                hint
              </button>
              <span>•</span>
              <button onClick={() => setUserInput('clear')} className="text-gray-400 hover:text-gray-300">
                clear
              </button>
              <span>•</span>
              <span className="text-gray-600">↑↓ for history</span>
            </div>
          </div>
        </div>
      </div>

      {/* Level Modal */}
      <LevelModal />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(31,41,55,0.5); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(236,72,153,0.3); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(236,72,153,0.5); }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .delay-1000 { animation-delay: 1000ms; }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
      `}</style>
    </div>
  )
}

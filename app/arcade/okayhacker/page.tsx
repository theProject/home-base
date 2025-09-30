"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  Wifi,
  Hash,
  Server,
  Code,
  Network,
  Bug,
  Info,
  ChevronRight,
  Award,
  Layers,
  Cloud,
  HardDrive,
  Fingerprint,
} from 'lucide-react';

import GlitchText from '@/components/GlitchText';
/*
 * Nope, webdevtools are a good spot
 * to look and cheat - but i thought
 * of that.  dont get discouraged!
 * ~lithium187
 */

const OkayHackerGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<any[]>([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [levelStartTime, setLevelStartTime] = useState<number | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [typingEffect, setTypingEffect] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  // Obfuscated solutions to prevent dev tools inspection
  const getSolution = (levelId: number) => {
    const encoded: Record<number, string> = {
      1: 'YWRtaW46cGFzc3dvcmQ=',
      2: 'YWRtaW4nIC0t',
      3: 'MTI3LjAuMC4xOyBscw==',
      4: 'PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KGRvY3VtZW50LmNvb2tpZSk+',
      5: 'Li4vLi4vLi4vZXRjL3NoYWRvdw==',
      6: 'eyJhZG1pbiI6dHJ1ZX0=',
      7: 'L2FwaS91c2Vycy8xMzM3',
      8: 'QUFBQUFBQUFBQUFBQUFBQQ==',
      9: 'ZXhhbXBsZS5jb20gQSA2LjYuNi42',
      10: 'Q29va2llOiBzZXNzaW9uPVNJRC1BRE1JTi0yMDI0LVNFQ1VSRQ==',
      11: 'PCFET0NUWVBFIHggWzwhRU5USVRZIGZpbGUgU1lTVEVNICJmaWxlOi8vL2V0Yy9wYXNzd2QiPl0+',
      12: 'VFJBTnNGRVImJlRSQU5TRkVS',
      13: 'c2stMHhERUFEQkVFRg==',
      14: 'PHNjcmlwdD5mZXRjaCgnL3RyYW5zZmVyP3RvPWF0dGFja2VyJyk8L3NjcmlwdD4=',
      15: 'MTAuMC4wLjEvLi4vLi4vYWRtaW4=',
      16: 'YWRtaW5fdG9rZW49ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKdWIyNWxJbjAuZXlKaFpHMXBiaUk2ZEhKMVpYMD4=',
      17: 'U0VUIEBAdmVyc2lvbl9jb21tZW50PSNQV05FRA==',
      // New challenges
      18: 'VHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWQ=',
      19: 'Ly9ldmlsLmNvbQ==',
      20: 'WC1GcmFtZS1PcHRpb25zOiBERU5Z',
    };
    return atob(encoded[levelId]);
  };

  // Level definitions
  const levels = [
    {
      id: 1,
      name: 'Weak Authentication',
      icon: <Key className="w-5 h-5" />,
      difficulty: 'Novice',
      category: 'Authentication',
      description: 'Default credentials vulnerability',
      objective: 'Access the admin panel using default credentials',
      hints: [
        'Default credentials often follow patterns like admin:admin or admin:password',
        'Try common combinations with ‘admin’ as the username',
        'Format is username:password - the password is a common English word',
      ],
      instruction:
        "$ ssh admin@10.0.0.1\n[!] Authentication required\nEnter credentials (format: username:password):",
      modalContent: {
        title: 'Default Credentials & Weak Authentication',
        description:
          'Default credentials are pre-configured username/password combinations that come with software...',
        technical:
          'Authentication mechanisms validate user identity. Common weaknesses include...',
        when:
          'Exploited in: IoT devices (cameras, routers), database systems, enterprise apps...',
        example:
          'Common defaults include: admin/admin, root/toor, administrator/password...',
        impact:
          'Can lead to complete system compromise...',
        prevention:
          'Force password changes on first login, enable MFA, etc.',
      },
      learning:
        '💡 Always change default credentials immediately! Use unique, complex passwords and enable MFA.',
    },
    {
      id: 2,
      name: 'SQL Injection',
      icon: <Database className="w-5 h-5" />,
      difficulty: 'Beginner',
      category: 'Injection',
      description: 'Database query manipulation',
      objective: 'Bypass login authentication using SQL injection',
      hints: [
        'SQL comments (–) can terminate the rest of a query',
        'The apostrophe closes the username string early',
        "Try: admin’ followed by SQL comment syntax",
      ],
      instruction:
        "$ SELECT * FROM users WHERE username=’[INPUT]’ AND password=’…’",
      modalContent: {
        title: 'SQL Injection (SQLi) - OWASP #3',
        description:
          'SQL injection occurs when untrusted data is sent to an interpreter as part of a command or query...',
        technical:
          'SQL injection exploits occur when user input is concatenated directly into SQL queries...',
        when:
          'Found in: login forms, search functions, product pages, user profiles...',
        example:
          "Payloads like ’ OR ‘1’=‘1’ – make conditions always true...",
        impact:
          'Authentication bypass, data exfiltration, data manipulation...',
        prevention:
          'Use parameterized queries/prepared statements, stored procedures, input validation...',
      },
      learning:
        '💡 Never concatenate user input into queries! Use parameterized statements and principle of least privilege.',
    },
    {
      id: 3,
      name: 'Command Injection',
      icon: <Terminal className="w-5 h-5" />,
      difficulty: 'Beginner',
      category: 'Injection',
      description: 'OS command execution vulnerability',
      objective: 'Execute system commands through vulnerable input',
      hints: [
        'Chain commands using semicolon (;) in Unix/Linux',
        'The app expects an IP but doesn’t validate special characters',
        'Try: 127.0.0.1; ls to list directory contents',
      ],
      instruction:
        "$ ping -c 3 [INPUT]\n[!] Network diagnostic tool v2.1",
      modalContent: {
        title: 'OS Command Injection - Critical Vulnerability',
        description:
          'Command injection vulnerabilities allow attackers to execute arbitrary operating system commands...',
        technical:
          'Command injection occurs when applications use system(), exec(), eval() or similar functions...',
        when:
          'Common in: network administration tools, file processing utilities...',
        example:
          "‘127.0.0.1; cat /etc/passwd’ exposes sensitive files...",
        impact:
          'Complete system compromise, data theft, malware installation...',
        prevention:
          'Avoid system calls with user input, use language-specific APIs, implement strict input validation...',
      },
      learning:
        '💡 Never pass user input to system commands! Use built-in library functions and strict validation.',
    },
    {
      id: 4,
      name: 'XSS Payload',
      icon: <Globe className="w-5 h-5" />,
      difficulty: 'Intermediate',
      category: 'Injection',
      description: 'Cross-site scripting injection',
      objective: 'Inject JavaScript to steal cookies using an image tag',
      hints: [
        'Image tags can execute JavaScript via onerror events',
        'When image fails to load, onerror triggers',
        'Structure: <img src=x onerror=alert(document.cookie)>',
      ],
      instruction:
        "$ POST /comment\nContent-Type: text/html\n[!] Comment system v3.2\nEnter comment:",
      modalContent: {
        title: 'Cross-Site Scripting (XSS) - OWASP #2',
        description:
          'XSS flaws occur when applications include untrusted data in web pages without proper validation...',
        technical:
          'Three main types: Reflected XSS, Stored XSS, and DOM-based XSS...',
        when:
          'Vulnerable areas: comment sections, user profiles, search results...',
        example:
          "Basic: <script>alert(1)</script>. Event handlers: <img src=x onerror=alert(1)>...",
        impact:
          'Session hijacking, account takeover, phishing...',
        prevention:
          'Context-aware output encoding, CSP headers, input validation...',
      },
      learning:
        '💡 Always encode output and implement CSP! Never trust user input.',
    },
    {
      id: 5,
      name: 'Path Traversal',
      icon: <FileText className="w-5 h-5" />,
      difficulty: 'Intermediate',
      category: 'Broken Access Control',
      description: 'Directory traversal attack',
      objective:
        'Access the system’s shadow file containing password hashes',
      hints: [
        'Use ../ sequences to navigate up directories',
        'The shadow file is located in /etc/ directory',
        'You need exactly three ../ to reach the root',
      ],
      instruction:
        "$ GET /files/[INPUT]\n[!] File Server v1.0\nCurrent directory: /var/www/files/",
      modalContent: {
        title:
          'Path/Directory Traversal - OWASP #1 (Broken Access Control)',
        description:
          'Path traversal vulnerabilities allow attackers to access files and directories outside the web root folder...',
        technical:
          'Traversal sequences include: ../, ..\\, URL-encoded variants, Unicode...',
        when:
          'Vulnerable features: file download/upload systems, template engines...',
        example:
          'Common targets: /etc/passwd, /etc/shadow, .env, wp-config.php...',
        impact:
          'Source code disclosure, sensitive data exposure...',
        prevention:
          'Use indirect object references, strict input validation, disable directory listing...',
      },
      learning:
        '💡 Never use user input directly in file paths! Use indirect references and proper access controls.',
    },
    {
      id: 6,
      name: 'JWT Manipulation',
      icon: <Hash className="w-5 h-5" />,
      difficulty: 'Intermediate',
      category: 'Cryptographic Failures',
      description: 'Weak JWT implementation',
      objective:
        'Decode this Base64 JWT payload: eyJhZG1pbiI6dHJ1ZX0=',
      hints: [
        'JWT tokens have header.payload.signature parts',
        'This is just the payload portion, Base64 encoded',
        'Decode it to see the JSON object inside',
      ],
      instruction:
        "$ jwt_decoder –token [INPUT]\n[!] JWT Validator v2.0\nEnter decoded payload:",
      modalContent: {
        title: 'JWT Vulnerabilities & Cryptographic Failures - OWASP #2',
        description:
          'JSON Web Tokens (JWT) are widely used for authentication but often implemented insecurely...',
        technical:
          'JWT structure: header.payload.signature. Vulnerabilities include algorithm substitution, none acceptance...',
        when:
          'Found in: REST APIs, SSO systems, mobile apps, microservices...',
        example:
          "Changing alg, weak HMAC secrets, modifying payload claims...",
        impact:
          'Authentication bypass, privilege escalation, account takeover...',
        prevention:
          'Use strong, rotated secrets, validate algorithm strictly, check expiration, use JWK...',
      },
      learning:
        '💡 Always validate JWT signatures and algorithms! Use strong secrets and proper expiration.',
    },
    {
      id: 7,
      name: 'IDOR Exploit',
      icon: <Server className="w-5 h-5" />,
      difficulty: 'Intermediate',
      category: 'Broken Access Control',
      description: 'Insecure Direct Object Reference',
      objective:
        'Access user ID 1337’s profile (you are user 1000)',
      hints: [
        'The API uses predictable patterns for user resources',
        'Simply change your user ID to the target ID',
        'API endpoint format: /api/users/[ID]',
      ],
      instruction:
        "$ curl https://api.target.com/[INPUT]\n[!] API Gateway v4.1\nYour user ID: 1000",
      modalContent: {
        title:
          'Insecure Direct Object References (IDOR) - Access Control Flaw',
        description:
          'IDOR vulnerabilities occur when applications expose direct references to internal objects without proper checks...',
        technical:
          'Predictable patterns in numeric IDs, filenames, API endpoints...',
        when:
          'Vulnerable endpoints: user profiles, documents, invoices, messages...',
        example:
          'Changing /api/user/1000/profile to /api/user/1001/profile...',
        impact:
          'Data breaches, privacy violations, financial theft...',
        prevention:
          'Use unpredictable IDs (UUIDs), proper authorization checks, logging...',
      },
      learning:
        '💡 Always verify user authorization for every resource! Don’t rely on obscurity.',
    },
    {
      id: 8,
      name: 'Buffer Overflow',
      icon: <Bug className="w-5 h-5" />,
      difficulty: 'Advanced',
      category: 'Memory Corruption',
      description: 'Stack-based buffer overflow',
      objective:
        'Overflow the 8-byte buffer with exactly 16 ‘A’ characters',
      hints: [
        'Buffer size is 8 bytes, overflow with double that',
        'Send a string of 16 capital ‘A’ characters',
        'Pattern: AAAAAAAAAAAAAAAA (16 A’s)',
      ],
      instruction:
        "$ ./vulnerable_app –input [INPUT]\n[!] Buffer size: 8 bytes\n[!] Stack canary: disabled",
      modalContent: {
        title: 'Buffer Overflow - Memory Corruption Vulnerability',
        description:
          'Buffer overflows occur when programs write more data to a buffer than it can hold...',
        technical:
          'Types: stack-based, heap-based, integer overflows, format string bugs...',
        when:
          'Common in: C/C++ applications, embedded systems, drivers...',
        example:
          'Classic overflow, EIP overwrite, ROP chains...',
        impact:
          'RCE, privilege escalation, DoS, data corruption...',
        prevention:
          'Use memory-safe languages, compiler protections, safe functions, bounds checking...',
      },
      learning:
        '💡 Use memory-safe languages and functions! Enable all compiler security features.',
    },
    {
      id: 9,
      name: 'DNS Poisoning',
      icon: <Network className="w-5 h-5" />,
      difficulty: 'Advanced',
      category: 'Network Security',
      description: 'DNS cache poisoning attack',
      objective:
        'Poison DNS to redirect example.com to IP 6.6.6.6',
      hints: [
        'DNS A records map domain names to IP addresses',
        'Format: domain_name A ip_address',
        'Exact format: example.com A 6.6.6.6',
      ],
      instruction:
        "$ dns_inject –record [INPUT]\n[!] DNS Cache Manager v3.0\nInject DNS record:",
      modalContent: {
        title: 'DNS Cache Poisoning - Network Layer Attack',
        description:
          'DNS cache poisoning corrupts DNS resolver caches...',
        technical:
          'Vectors: birthday attacks, Kaminsky, fragmentation...',
        when:
          'Targets: recursive resolvers, ISP DNS, corporate DNS...',
        example:
          'Redirect bank.com to phishing, fake updates, DNS injection...',
        impact:
          'Large-scale phishing, malware distribution, credential theft...',
        prevention:
          'Deploy DNSSEC, randomize ports/IDs, 0x20 encoding, DoH/DoT...',
      },
      learning:
        '💡 Implement DNSSEC and use encrypted DNS! Monitor responses.',
    },
    {
      id: 10,
      name: 'Session Hijacking',
      icon: <Wifi className="w-5 h-5" />,
      difficulty: 'Advanced',
      category: 'Authentication',
      description: 'Session token theft and replay',
      objective:
        'Use stolen session: Cookie: session=SID-ADMIN-2024-SECURE',
      hints: [
        'HTTP cookies carry session tokens in requests',
        'Headers format: Cookie: name=value',
        'Full format: Cookie: session=SID-ADMIN-2024-SECURE',
      ],
      instruction:
        "$ curl -H ‘[INPUT]’ https://target.com/admin\n[!] Session Manager v5.2",
      modalContent: {
        title: 'Session Hijacking - Authentication Bypass',
        description:
          'Session hijacking involves stealing or predicting valid session tokens...',
        technical:
          'Methods: XSS, sniffing, MITM, fixation, prediction...',
        when:
          'Vulnerable: HTTP sites, missing Secure/HttpOnly, predictable IDs...',
        example:
          'document.cookie exfiltration, public WiFi capture, fixation...',
        impact:
          'Account takeover, fraud, data theft...',
        prevention:
          'HTTPS everywhere, Secure/HttpOnly, SameSite, regen sessions...',
      },
      learning:
        '💡 Always use HTTPS and secure cookie flags! Regenerate sessions after login.',
    },
    {
      id: 11,
      name: 'XXE Injection',
      icon: <Code className="w-5 h-5" />,
      difficulty: 'Expert',
      category: 'Injection',
      description: 'XML External Entity attack',
      objective:
        'Read /etc/passwd using XXE in DOCTYPE declaration',
      hints: [
        'XXE uses DOCTYPE to define external entities',
        'SYSTEM entities can read local files',
        'Structure: <!DOCTYPE x [<!ENTITY file SYSTEM "file:///etc/passwd">]>',
      ],
      instruction:
        "$ POST /xml-parser\nContent-Type: application/xml\n[!] XML Processor v2.1",
      modalContent: {
        title: 'XML External Entity (XXE) Injection - OWASP #5',
        description:
          'XXE vulnerabilities exploit XML parsers that process external entity references...',
        technical:
          'Attacks: classic XXE, blind XXE, error-based XXE, DoS (billion laughs)...',
        when:
          'Vulnerable: SOAP services, REST XML, SAML, XML config parsers...',
        example:
          "File disclosure via SYSTEM entity; SSRF with http://internal-server...",
        impact:
          'File disclosure, SSRF, DoS, potential RCE.',
        prevention:
          'Disable DTD/external entities, validate XML, use JSON...',
      },
      learning:
        '💡 Disable external entity processing! Prefer JSON when possible.',
    },
    {
      id: 12,
      name: 'Race Condition',
      icon: <Zap className="w-5 h-5" />,
      difficulty: 'Expert',
      category: 'Business Logic',
      description: 'TOCTOU vulnerability exploitation',
      objective:
        'Transfer $1000 twice simultaneously: TRANSFER&&TRANSFER',
      hints: [
        'Execute two operations before balance check',
        'Use && to run commands in parallel',
        'Command: TRANSFER&&TRANSFER',
      ],
      instruction:
        "$ bank_transfer –amount 1000 –balance 1000\n[!] Banking System v8.3\nCommand:",
      modalContent: {
        title: 'Race Condition / TOCTOU - Concurrency Vulnerability',
        description:
          'Race conditions occur when multiple processes access shared resources simultaneously...',
        technical:
          'TOCTOU (file races), double-spending, privilege escalation races...',
        when:
          'Financial transactions, file ops, auth checks, coupon redemption...',
        example:
          'Double withdrawal with parallel operations; symlink races...',
        impact:
          'Financial loss, data corruption, privilege escalation...',
        prevention:
          'Atomic ops, proper locking, DB transactions, idempotency keys...',
      },
      learning:
        '💡 Use atomic operations and proper locking! Test concurrent scenarios.',
    },
    {
      id: 13,
      name: 'API Key Exposure',
      icon: <Key className="w-5 h-5" />,
      difficulty: 'Expert',
      category: 'Security Misconfiguration',
      description: 'Exposed credentials in source',
      objective:
        'Find exposed API key: sk-0xDEADBEEF (check HTML comments)',
      hints: [
        'Developers often leave sensitive data in comments',
        'The key starts with ‘sk-’ prefix',
        'Contains hexadecimal: 0xDEADBEEF',
      ],
      instruction:
        "$ view-source https://app.target.com\n<!-- API: ??? -->\n[!] Extract the API key:",
      modalContent: {
        title:
          'API Key & Secret Exposure - OWASP #5 (Security Misconfiguration)',
        description:
          'API keys, passwords, and secrets exposed in code, repos, or client builds are critical failures...',
        technical:
          'Locations: JS source, public repos, config files, error messages, comments...',
        when:
          'Via: Git commits, client-side JS, mobile apps, CDNs, S3, CI logs...',
        example:
          'AWS keys in .git, tokens in localStorage, Stripe keys in builds...',
        impact:
          'Financial loss, breaches, service disruption...',
        prevention:
          'Env vars, secret managers, rotate keys, least privilege, scan repos...',
      },
      learning:
        '💡 Never commit secrets! Use environment variables and secret management.',
    },
    {
      id: 14,
      name: 'Chained XSS-CSRF',
      icon: <Shield className="w-5 h-5" />,
      difficulty: 'Master',
      category: 'Complex Attack Chain',
      description: 'Combined XSS and CSRF attack',
      objective:
        "Chain XSS with CSRF: <script>fetch('/transfer?to=attacker')</script>",
      hints: [
        'XSS executes JavaScript in victim’s browser',
        'Use fetch() to make authenticated requests',
        'Target endpoint: /transfer?to=attacker',
      ],
      instruction:
        "$ POST /profile/bio\n[!] Profile Editor v6.0\nBio update:",
      modalContent: {
        title: 'Chained Vulnerabilities - Advanced Attack Patterns',
        description:
          'Real-world attacks rarely exploit single vulnerabilities...',
        technical:
          'Common chains: XSS→CSRF, SQLi→RCE, SSRF→RCE, IDOR→ATO...',
        when:
          'APTs, targeted attacks, bug bounty proofs...',
        example:
          "XSS steals CSRF token → CSRF changes email → takeover...",
        impact:
          'Complete system compromise, massive data breaches...',
        prevention:
          'Defense in depth, multiple layers, regular testing...',
      },
      learning:
        '💡 Implement defense in depth! One vuln can enable many others.',
    },
    {
      id: 15,
      name: 'SSRF Attack',
      icon: <Cloud className="w-5 h-5" />,
      difficulty: 'Expert',
      category: 'Injection',
      description: 'Server-Side Request Forgery',
      objective:
        'Access internal admin panel via SSRF: 10.0.0.1/../../admin',
      hints: [
        'SSRF allows requests to internal networks',
        'Combine internal IP with path traversal',
        'Format: 10.0.0.1/../../admin',
      ],
      instruction:
        "$ POST /url-fetcher\n[!] URL Fetcher v3.1\nFetch URL:",
      modalContent: {
        title: 'Server-Side Request Forgery (SSRF) - OWASP #10',
        description:
          'SSRF allows requests from the vulnerable server to internal/external resources...',
        technical:
          'Vectors: URL params, webhooks, PDF/image processors, proxy services...',
        when:
          'Vulnerable: webhooks, file downloads, link previews, cloud metadata...',
        example:
          'AWS metadata, localhost admin, blind SSRF via DNS...',
        impact:
          'Cloud takeover, internal access, data exposure, RCE...',
        prevention:
          'Whitelist protocols/domains, block private IPs, disable dangerous schemes...',
      },
      learning:
        '💡 Validate and whitelist URLs! Isolate sensitive services.',
    },
    {
      id: 16,
      name: 'Insecure Deserialization',
      icon: <HardDrive className="w-5 h-5" />,
      difficulty: 'Master',
      category: 'Injection',
      description: 'Object injection via cookies',
      objective:
        'Inject admin token in cookie: admin_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhZG1pbiI6dHJ1ZX0>',
      hints: [
        'The cookie contains a tampered JWT token',
        "Algorithm is set to ‘none’ (no signature required)",
        'Cookie format: admin_token=[base64_jwt]',
      ],
      instruction:
        "$ GET /dashboard\nCookie: [INPUT]\n[!] Session Handler v7.2",
      modalContent: {
        title: 'Insecure Deserialization - OWASP #8',
        description:
          'Insecure deserialization occurs when untrusted data is used to reconstruct objects...',
        technical:
          'Vulnerable formats: Java serialization, Python pickle, PHP serialize(), .NET...',
        when:
          'Found in: session cookies, API tokens, queues, caches, RPC...',
        example:
          'Java gadget chains, Python pickle RCE, PHP magic methods...',
        impact:
          'RCE, privilege escalation, auth bypass, DoS...',
        prevention:
          'Never deserialize untrusted data, use signatures, isolate processes...',
      },
      learning:
        '💡 Never deserialize untrusted data! Validate everything.',
    },
    {
      id: 17,
      name: 'SQL Truncation',
      icon: <Database className="w-5 h-5" />,
      difficulty: 'Master',
      category: 'Injection',
      description: 'MySQL truncation attack',
      objective:
        'Bypass filter with comment: SET @@version_comment=#PWNED',
      hints: [
        'MySQL truncates data at certain limits',
        'Comments can hide malicious payloads',
        'Use # for MySQL comments after payload',
      ],
      instruction:
        "$ mysql> [INPUT]\n[!] MySQL Filter v5.7\nExecute query:",
      modalContent: {
        title: 'SQL Truncation & Advanced Injection Techniques',
        description:
          'SQL truncation attacks exploit database-specific behaviors...',
        technical:
          'Techniques include: truncation attacks, scientific notation...',
        when:
          'Advanced SQL injection scenarios...',
        example:
          "Truncation via field limits; WAF bypass tricks...",
        impact:
          'Authentication bypass, data exfiltration...',
        prevention:
          'Parameterized queries, input length validation...',
      },
      learning:
        '💡 Validate input length and use parameterized queries! Know your DB’s quirks.',
    },
    // NEW LEVELS
    {
      id: 18,
      name: 'HTTP Request Smuggling',
      icon: <Network className="w-5 h-5" />,
      difficulty: 'Advanced',
      category: 'Proxy/Edge',
      description: 'CL/TE desync',
      objective:
        "Smuggle a request by forcing chunked parsing (enter the header exactly).",
      hints: [
        'Proxies may disagree on Content-Length vs Transfer-Encoding.',
        'Chunked parsing often wins when TE is present.',
        "Header to trigger chunked mode: Transfer-Encoding: chunked",
      ],
      instruction:
        "$ proxy_test --headers [INPUT]\n[!] Reverse Proxy v1.9\nEnter header:",
      modalContent: {
        title: 'HTTP Request Smuggling (CL.TE / TE.CL)',
        description:
          'When front and back proxies parse request bodies differently, attackers can smuggle a hidden request...',
        technical:
          'Classic vectors: CL.TE and TE.CL with crafted chunk sizes...',
        when:
          'Affects CDNs, WAFs, load balancers, mixed stacks...',
        example:
          'Send TE: chunked with misleading CL to prepend a second request...',
        impact:
          'Cache poisoning, credential theft, internal request forgery.',
        prevention:
          'Normalize at the edge, strip ambiguous headers.',
      },
      learning:
        '💡 Normalize request parsing at the edge. Never allow CL and TE ambiguity.',
    },
    {
      id: 19,
      name: 'Open Redirect',
      icon: <Globe className="w-5 h-5" />,
      difficulty: 'Intermediate',
      category: 'Web',
      description: 'Protocol-relative redirect',
      objective:
        'Abuse next= parameter with a protocol-relative URL to leave the site.',
      hints: [
        'Some filters only block http:// and https:// prefixes.',
        'Protocol-relative URLs start with //',
        'Try a destination like //evil.com',
      ],
      instruction:
        "$ GET /login?next=[INPUT]\n[!] Router v2.4\nProvide redirect target:",
      modalContent: {
        title: 'Open Redirect (Unvalidated Redirects)',
        description:
          'Unvalidated redirects enable phishing and token theft by sending users to attacker domains.',
        technical:
          'Bypass patterns: //host, mixed-case schemes, encoded schemes.',
        when:
          'Common on login, logout, OAuth, magic links.',
        example:
          'next=//evil.com still leaves the origin if only http(s) is blacklisted.',
        impact:
          'Phishing, session fixation, trust erosion.',
        prevention:
          'Enforce allowlists of internal paths; validate server-side.',
      },
      learning:
        '💡 Validate redirect targets against a strict allowlist; prefer internal relative paths.',
    },
    {
      id: 20,
      name: 'Clickjacking Defense',
      icon: <Shield className="w-5 h-5" />,
      difficulty: 'Beginner',
      category: 'Headers',
      description: 'Frame busting via header',
      objective:
        "Set the header that blocks framing outright (enter it exactly).",
      hints: [
        'Legacy header still widely honored.',
        'Short and to the point.',
        'Format: X-Frame-Options: DENY',
      ],
      instruction:
        "$ set_header [INPUT]\n[!] Security Headers v1.0\nHeader:",
      modalContent: {
        title: 'Clickjacking (UI Redress) & Mitigations',
        description:
          'Framing a site in a transparent overlay can trick users into clicking hidden controls.',
        technical:
          'Defenses include X-Frame-Options and CSP frame-ancestors.',
        when:
          'Payment approvals, admin panels, destructive actions, SSO prompts.',
        example:
          'Using DENY prevents any framing across origins, including same-origin frames.',
        impact:
          'Account takeover via invisible click flows, consent spoofing.',
        prevention:
          "Set both X-Frame-Options: DENY and CSP frame-ancestors 'none'.",
      },
      learning:
        '💡 Use both X-Frame-Options and CSP frame-ancestors to stop framing attacks.',
    },
  ];

  // Achievements
  const achievements = [
    { id: 'first_hack', name: 'First Blood', description: 'Complete your first level', icon: '🩸', color: 'from-red-500 to-red-600' },
    { id: 'no_hints', name: 'Solo Hunter', description: 'Complete 3 levels without hints', icon: '🎯', color: 'from-green-500 to-green-600' },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a level in under 30 seconds', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
    { id: 'halfway', name: 'Rising Threat', description: 'Complete 10 levels', icon: '📈', color: 'from-blue-500 to-blue-600' },
    { id: 'perfect_run', name: 'Flawless', description: '5 levels without wrong answers', icon: '💎', color: 'from-purple-500 to-purple-600' },
    { id: 'master_hacker', name: 'Elite Hacker', description: 'Complete all 20 levels', icon: '👑', color: 'from-pink-500 to-cyan-500' },
  ];

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Lock body scroll when modal is open (prevents mobile “minimize” issue)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const prev = document.body.style.overflow;
      document.body.style.overflow = showLevelModal ? 'hidden' : prev || '';
      return () => { document.body.style.overflow = prev; };
    }
  }, [showLevelModal]);

  // Show level modal when starting or changing level
  useEffect(() => {
    if (gameStarted && currentLevel < levels.length && !gameCompleted) {
      setShowLevelModal(true);
      setLevelStartTime(Date.now());
    }
  }, [currentLevel, gameStarted, gameCompleted, levels.length]);

  // Focus input after modal closes
  useEffect(() => {
    if (gameStarted && !showLevelModal) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [showLevelModal, gameStarted]);

  // Typewriter (reserved)
  const typewriterEffect = (text: string, callback?: () => void) => {
    setIsTyping(true);
    let index = 0;
    const timer = setInterval(() => {
      setTypingEffect(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
        setIsTyping(false);
        callback && callback();
      }
    }, 30);
  };

  const addToTerminal = (message: string, type = 'user') => {
    // Timestamp formatting happens client-side on interaction, not during SSR.
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setTerminalOutput((prev) => [...prev, { message, type, timestamp }]);
  };

  const startLevel = () => {
    setShowLevelModal(false);
    setTerminalOutput([]);
    const level = levels[currentLevel];
    addToTerminal(
      `┌─[okayhacker@localhost]─[~/challenges/level_${level.id.toString().padStart(2, '0')}]`,
      'prompt',
    );
    addToTerminal(`└──╼ cat README.md`, 'command');
    setTimeout(() => {
      addToTerminal(`# LEVEL ${level.id}: ${level.name.toUpperCase()}`, 'header');
      addToTerminal(`## Category: ${level.category}`, 'category');
      addToTerminal(`## Objective: ${level.objective}`, 'info');
      addToTerminal(``, 'empty');
      addToTerminal(level.instruction, 'system');
      addToTerminal(``, 'empty');
    }, 200);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setCurrentLevel(0);
    setScore(0);
    setTerminalOutput([]);
    setUnlockedAchievements([]);
  };

  const unlockAchievement = (achievementId: string) => {
    if (!unlockedAchievements.includes(achievementId)) {
      setUnlockedAchievements((prev) => [...prev, achievementId]);
      const achievement = achievements.find((a) => a.id === achievementId);
      if (achievement) {
        setTimeout(() => {
          addToTerminal(``, 'empty');
          addToTerminal(
            `🏆 ACHIEVEMENT UNLOCKED: ${achievement.name.toUpperCase()}`,
            'achievement',
          );
          addToTerminal(`   ${achievement.description}`, 'achievement-desc');
        }, 500);
      }
    }
  };

  const handleSubmit = () => {
    if (!userInput || levelCompleted) return;
    if (userInput.trim()) {
      setTerminalHistory((prev) => [...prev, userInput]);
      setHistoryIndex(-1);
    }
    addToTerminal(
      `┌─[okayhacker@localhost]─[~/challenges/level_${levels[currentLevel].id
        .toString()
        .padStart(2, '0')}]`,
      'prompt',
    );
    addToTerminal(`└──╼ ${userInput}`, 'command');
    const level = levels[currentLevel];
    const solution = getSolution(level.id);
    if (userInput.trim() === solution) {
      const timeElapsed = levelStartTime ? Date.now() - levelStartTime : 0;
      const pointsEarned = Math.max(100 - hints * 25, 25);
      addToTerminal(``, 'empty');
      addToTerminal(`[+] ACCESS GRANTED - LEVEL ${level.id} COMPLETE`, 'success');
      addToTerminal(`[+] Points earned: ${pointsEarned}`, 'success');
      addToTerminal(`[+] Time: ${(timeElapsed / 1000).toFixed(1)}s`, 'success');
      setScore((prev) => prev + pointsEarned);
      setLevelCompleted(true);
      // Achievements
      if (currentLevel === 0) unlockAchievement('first_hack');
      if (hints === 0 && currentLevel >= 2) unlockAchievement('no_hints');
      if (timeElapsed < 30000) unlockAchievement('speed_demon');
      if (currentLevel === 9) unlockAchievement('halfway'); // 10th level
      addToTerminal(``, 'empty');
      addToTerminal(level.learning, 'learning');
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel((prev) => prev + 1);
          setLevelCompleted(false);
          setHints(0);
          setShowHint(false);
        } else {
          setGameCompleted(true);
          unlockAchievement('master_hacker');
        }
      }, 3000);
    } else {
      addToTerminal(`[-] ACCESS DENIED: Invalid input`, 'error');
      const cmd = userInput.toLowerCase().trim();
      if (cmd === 'help') {
        addToTerminal(`Available commands:`, 'info');
        addToTerminal(`  hint     - Get a hint (-25 points)`, 'info');
        addToTerminal(`  clear    - Clear terminal output`, 'info');
        addToTerminal(`  restart  - Restart current level`, 'info');
        addToTerminal(`  info     - Show level information`, 'info');
      } else if (cmd === 'hint') {
        requestHint();
      } else if (cmd === 'clear') {
        setTerminalOutput([]);
      } else if (cmd === 'restart') {
        startLevel();
      } else if (cmd === 'info') {
        addToTerminal(`Level ${level.id}: ${level.name}`, 'info');
        addToTerminal(`Difficulty: ${level.difficulty}`, 'info');
        addToTerminal(`Category: ${level.category}`, 'info');
      }
    }
    setUserInput('');
  };

  const requestHint = () => {
    const level = levels[currentLevel];
    if (hints < level.hints.length) {
      addToTerminal(``, 'empty');
      addToTerminal(
        `💡 HINT ${hints + 1}/${level.hints.length}: ${level.hints[hints]}`,
        'warning',
      );
      setHints((prev) => prev + 1);
    } else {
      addToTerminal(`[!] No more hints available for this level`, 'error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalHistory.length > 0 && historyIndex < terminalHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setUserInput(terminalHistory[terminalHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setUserInput(terminalHistory[terminalHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setUserInput('');
      }
    }
  };

  const renderTerminal = () => (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-300 hover:shadow-pink-500/10">
      {/* macOS Terminal Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-850 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
          </div>
        </div>
        <div className="text-gray-400 text-xs font-medium flex items-center space-x-2">
          <Terminal className="w-3 h-3" />
          <span>okayhacker@localhost — bash — {terminalOutput.length} lines</span>
        </div>
        <div className="text-gray-500 text-xs bg-gray-700/50 px-2 py-1 rounded" suppressHydrationWarning>
          Level {currentLevel + 1}/{levels.length}
        </div>
      </div>
      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="
          bg-black p-4
          h-[45dvh] sm:h-[50dvh] md:h-[55dvh] lg:h-[60dvh]
          min-h-[260px] max-h-[70dvh]
          overflow-y-auto
          font-mono text-xs md:text-sm custom-scrollbar
          overscroll-contain
        "
      >
        {terminalOutput.map((output: any, index: number) => (
          <div
            key={index}
            className={`mb-1 ${
              output.type === 'success'
                ? 'text-green-400 font-semibold'
                : output.type === 'error'
                ? 'text-red-400'
                : output.type === 'warning'
                ? 'text-yellow-400'
                : output.type === 'info'
                ? 'text-cyan-400'
                : output.type === 'system'
                ? 'text-gray-400'
                : output.type === 'header'
                ? 'text-pink-400 font-bold text-base md:text-lg'
                : output.type === 'category'
                ? 'text-purple-400 text-xs'
                : output.type === 'prompt'
                ? 'text-green-400'
                : output.type === 'command'
                ? 'text-white'
                : output.type === 'learning'
                ? 'text-purple-400 italic'
                : output.type === 'achievement'
                ? 'text-yellow-300 font-bold animate-pulse'
                : output.type === 'achievement-desc'
                ? 'text-yellow-200 text-xs'
                : output.type === 'empty'
                ? ''
                : 'text-gray-300'
            } ${output.type === 'header' ? 'mt-2' : ''}`}
          >
            {output.type !== 'empty' && (
              <>
                {output.type === 'system' && (
                  <span className="text-gray-600 mr-2">[{output.timestamp}]</span>
                )}
                {output.message}
              </>
            )}
          </div>
        ))}
        <div className="h-4" />
      </div>
      {/* Input Area */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-850 border-t border-gray-800 p-4 sticky bottom-0">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-xs md:text-sm font-semibold">┌─[okayhacker]─[$]</span>
        </div>
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-green-400 text-xs md:text-sm font-semibold">└──╼</span>
          <input
            ref={inputRef}
            type={currentLevel === 1 && !showPassword ? 'password' : 'text'}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={levelCompleted || isTyping}
            className="flex-1 bg-transparent text-white font-mono text-xs md:text-sm focus:outline-none disabled:opacity-50 placeholder-gray-600"
            placeholder={levelCompleted ? 'Level completed! Proceeding...' : 'Enter command...'}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            inputMode="text"
          />
          {currentLevel === 1 && (
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-300 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Enhanced Level Modal
  const LevelModal = () => {
    if (!showLevelModal) return null;
    const level = levels[currentLevel];
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl w-full max-w-4xl border border-pink-500/30 shadow-2xl shadow-pink-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="p-3 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-xl border border-pink-500/30">
                  {level.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Level {level.id}: {level.name}
                  </h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        level.difficulty === 'Novice'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : level.difficulty === 'Beginner'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : level.difficulty === 'Intermediate'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : level.difficulty === 'Advanced'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : level.difficulty === 'Expert'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}
                    >
                      {level.difficulty}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600">
                      {level.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 max-h-[70dvh] overflow-y-auto custom-scrollbar pr-2">
              {/* Main Info Card */}
              <div className="bg-black/40 rounded-xl p-4 md:p-6 border border-gray-800">
                <h3 className="text-pink-400 font-bold mb-3 flex items-center text-lg">
                  <Info className="w-5 h-5 mr-2" />
                  {level.modalContent.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                  {level.modalContent.description}
                </p>
                {/* Technical Details */}
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-800">
                  <h4 className="text-cyan-400 text-xs font-bold uppercase mb-2">Technical Details</h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    {level.modalContent.technical}
                  </p>
                </div>
                {/* When Used */}
                <div className="bg-pink-500/5 rounded-lg p-4 mb-4 border border-pink-500/20">
                  <h4 className="text-pink-400 text-xs font-bold uppercase mb-2">Attack Vectors</h4>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                    {level.modalContent.when}
                  </p>
                </div>
                {/* Example */}
                <div className="bg-black/60 rounded-lg p-4 mb-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 text-xs font-bold uppercase mb-2">Real-World Examples</h4>
                  <p className="text-gray-300 text-xs md:text-sm font-mono leading-relaxed break-all">
                    {level.modalContent.example}
                  </p>
                </div>
                {/* Impact & Prevention */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/20">
                    <h4 className="text-red-400 text-xs font-bold uppercase mb-2">Impact</h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {level.modalContent.impact}
                    </p>
                  </div>
                  <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                    <h4 className="text-green-400 text-xs font-bold uppercase mb-2">Prevention</h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {level.modalContent.prevention}
                    </p>
                  </div>
                </div>
              </div>
              {/* Mission Objective */}
              <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-xl p-4 md:p-6 border border-pink-500/30">
                <h4 className="text-yellow-400 font-bold mb-2 text-lg">Your Mission</h4>
                <p className="text-white text-sm md:text-base">{level.objective}</p>
              </div>
            </div>
            <button
              onClick={startLevel}
              className="w-full mt-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/25"
            >
              <Terminal className="w-5 h-5" />
              <span className="text-lg">Initialize Attack Vector</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Landing Page (shown before the game starts)
  if (!gameStarted) {
    return (
      <div className="min-h-[100dvh] bg-black text-white overflow-hidden">
        <div className="relative min-h-[100dvh] flex items-center justify-center p-4 md:p-8">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-black to-cyan-500/5"></div>
            <div className="absolute top-20 left-4 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-4 sm:right-20 w-52 sm:w-96 h-52 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            {/* NASTY SYSTEM — stays on one line and won’t overwrite the next line */}

{/* centered, responsive, single-line glitch */}
<div className="glitch-wrap glitch--auto">
  <GlitchText
    speed={1}
    enableShadows
    enableOnHover
    className="glitch-title"
  >
    hack the planet
  </GlitchText>
</div>

{/* Byline logo under it */}
<h1 className="text-2xl sm:text-3xl md:text-2xl font-bold mt-2">
  <span className="logo text-white tracking-tight">
    brought to you by <span className="logo-em">okayhacker</span>
  </span>
</h1>


            <p className="text-lg sm:text-xl md:text-3xl text-gray-400 mb-2">let&apos;s play</p>

            {/* Suppress hydration warning on dynamic-length copy */}
            <p className="text-sm md:text-lg text-gray-500" suppressHydrationWarning>
              Master {levels.length} Real-World Cybersecurity Challenges
            </p>

            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900/80 to-black backdrop-blur border border-pink-500/20 rounded-xl p-6 transform hover:scale-105 transition-all">
                <Shield className="w-8 h-8 text-pink-500 mb-3 mx-auto" />
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                  OWASP Top 10
                </h3>
                <p className="text-xs md:text-sm text-gray-400">Real vulnerabilities from production systems</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black backdrop-blur border border-cyan-500/20 rounded-xl p-6 transform hover:scale-105 transition-all">
                <Terminal className="w-8 h-8 text-cyan-500 mb-3 mx-auto" />
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  macOS Terminal
                </h3>
                <p className="text-xs md:text-sm text-gray-400">Authentic command-line hacking experience</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black backdrop-blur border border-purple-500/20 rounded-xl p-6 transform hover:scale-105 transition-all">
                <Award className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Learn & Earn
                </h3>
                <p className="text-xs md:text-sm text-gray-400">Detailed explanations and achievement system</p>
              </div>
            </div>

            <button
              onClick={handleStartGame}
              className="mt-8 md:mt-12 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold py-4 px-8 md:px-12 rounded-xl text-lg md:text-xl transition-all transform hover:scale-105 shadow-2xl shadow-pink-500/25"
            >
              <Fingerprint className="inline w-6 h-6 mr-2" />
              Initialize -The System- v.2025.01.1940.a
            </button>

            <p className="mt-6 md:mt-8 text-xs text-gray-600">
              Educational purposes only, yet mandatory information everyone should know about. Practice responsible disclosure.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 md:mt-12 max-w-2xl mx-auto">
              <div className="text-center" suppressHydrationWarning>
                <p className="text-2xl md:text-3xl font-bold text-pink-500">{levels.length}</p>
                <p className="text-xs text-gray-500">Challenges</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-cyan-500">6</p>
                <p className="text-xs text-gray-500">Achievements</p>
              </div>
              <div className="text-center" suppressHydrationWarning>
                <p className="text-2xl md:text-3xl font-bold text-purple-500">
                  {levels.length * 100}
                </p>
                <p className="text-xs text-gray-500">Max Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-yellow-500">∞</p>
                <p className="text-xs text-gray-500">Replayability</p>
              </div>
            </div>
          </div>
        </div>

   <style jsx global>{`
  .logo{
    font-family:"Helvetica Neue",Helvetica,Arial,"Liberation Sans",system-ui,-apple-system,"Segoe UI",sans-serif !important;
    font-weight:700 !important;
    letter-spacing:-0.04em !important;
    color:#fff !important;
  }

  /* wrapper prevents wrapping/overlap and centers the title */
  .glitch-wrap{
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    height:clamp(56px,7vw,140px);
    margin-bottom:0.25rem;
    overflow:visible;
  }

  /* animate the GlitchText element itself */
  .glitch-title{
    position:relative;
    white-space:nowrap !important;
    line-height:1 !important;
    display:inline-block !important;
    user-select:none;

    font-weight:800;
    font-size:clamp(32px,7vw,96px);
    color:#fff; /* in case component sets its own color */

    --glitch-speed: 1000ms;
    animation: glitch-rgb var(--glitch-speed) steps(2, end) infinite;
    animation-play-state: paused; /* default paused; runs on hover via wrapper */
    will-change: transform, text-shadow;

    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* play on hover; use glitch--auto on wrapper to always run */
  .glitch--hover .glitch-title:hover { animation-play-state: running; }
  .glitch--auto .glitch-title { animation-play-state: running; }

  @media (prefers-reduced-motion: reduce){
    .glitch-title{
      animation:none !important;
      text-shadow:none !important;
      transform:none !important;
    }
  }

  @keyframes glitch-rgb{
    0%   { transform: translate(0,0) skew(0deg);        text-shadow: 0 0 0 #000, 0 0 0 #000; }
    6%   { transform: translate(1px,-1px) skew(0.2deg);  text-shadow: 2px 0 0 #ff004c, -2px 0 0 #00f7ff; }
    12%  { transform: translate(-1px,1px) skew(-0.2deg); text-shadow: -2px 0 0 #ff004c, 2px 0 0 #00f7ff; }
    18%  { transform: translate(2px,0) skew(0.3deg);     text-shadow: 3px 0 0 #ff004c, -3px 0 0 #00f7ff; }
    24%  { transform: translate(-2px,0) skew(-0.3deg);   text-shadow: -3px 0 0 #ff004c, 3px 0 0 #00f7ff; }
    30%  { transform: translate(0,1px) skew(0.1deg);     text-shadow: 1px 0 0 #ff004c, -1px 0 0 #00f7ff; }
    36%  { transform: translate(0,-1px) skew(-0.1deg);   text-shadow: -1px 0 0 #ff004c, 1px 0 0 #00f7ff; }
    60%  { transform: translate(1px,0) skew(0.2deg);     text-shadow: 2px 0 0 #ff004c, -2px 0 0 #00f7ff; }
    76%  { transform: translate(-1px,0) skew(-0.2deg);   text-shadow: -2px 0 0 #ff004c, 2px 0 0 #00f7ff; }
    100% { transform: translate(0,0) skew(0deg);         text-shadow: 0 0 0 #000, 0 0 0 #000; }
  }
`}</style>

      </div>
    );
  }

  // Completion Screen (shown after all levels completed)
  if (gameCompleted) {
    return (
      <div className="min-h-[100dvh] bg-black text-white flex items-center justify-center p-4 md:p-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>
          <div className="relative max-w-5xl mx-auto text-center">
            <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-green-400 mx-auto mb-6 md:mb-8 animate-bounce" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              Elite Status Achieved
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-6 md:mb-8" suppressHydrationWarning>
              You’ve mastered all {levels.length} challenges
            </p>
            <div className="bg-gray-900/80 backdrop-blur rounded-lg p-8 mb-8 border border-pink-500/20">
              <h2 className="text-3xl font-bold mb-6">
                Final Score:{' '}
                <span className="text-pink-500">{score}</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      unlockedAchievements.includes(achievement.id)
                        ? `bg-gradient-to-br ${achievement.color} border-pink-500/30`
                        : 'bg-gray-800/50 border-gray-700 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="font-bold text-sm">{achievement.name}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setGameStarted(false);
                setCurrentLevel(0);
                setScore(0);
                setGameCompleted(false);
                setUnlockedAchievements([]);
                setTerminalOutput([]);
                setTerminalHistory([]);
              }}
              className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Hack Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Game UI (shown while playing)
  const currentHintsLeft = levels[currentLevel]?.hints?.length
    ? Math.max(levels[currentLevel].hints.length - hints, 0)
    : 0;

  return (
    <div className="min-h-[100dvh] bg-black text-white">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 bg-gray-900/50 backdrop-blur rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-4">
            <Layers className="w-8 h-8 text-pink-500" />
            <div>
             {/* Glitch headline (hover to animate). Use glitch--auto instead of glitch--hover for always-on */}
<div className="glitch-wrap glitch--hover">
  <GlitchText speed={1} enableShadows enableOnHover className="glitch-title">
    The System
  </GlitchText>
</div>

{/* Your logo */}
<h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-2 md:mb-4">
  <span className="logo">okayhacker</span>
</h1>

              <p className="text-xs text-gray-500">Ethical Hacking Simulator</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Score</p>
              <p className="text-xl font-bold text-pink-500">{score}</p>
            </div>
            <div className="text-right" suppressHydrationWarning>
              <p className="text-xs text-gray-500 uppercase">Progress</p>
              <p className="text-xl font-bold text-cyan-500">{currentLevel + 1}/{levels.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Current Level */}
            <div className="bg-gray-900/80 backdrop-blur rounded-lg p-4 border border-pink-500/20">
              <h3 className="text-sm font-semibold text-pink-400 mb-3 uppercase">Current Challenge</h3>
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
                  disabled={levelCompleted || hints >= levels[currentLevel].hints.length}
                  className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded transition-colors border border-gray-700"
                >
                  <Key className="w-4 h-4 inline mr-2" />
                  Hint ({currentHintsLeft}/{levels[currentLevel].hints.length}) [-25 pts]
                </button>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-gray-900/80 backdrop-blur rounded-lg p-4 border border-cyan-500/20">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase">All Levels</h3>
              <div className="space-y-1 max-h-[50dvh] overflow-y-auto custom-scrollbar">
                {levels.map((level, index) => (
                  <div
                    key={level.id}
                    className={`flex items-center space-x-2 p-2 rounded text-xs ${
                      index === currentLevel
                        ? 'bg-pink-500/20 border border-pink-500/30'
                        : index < currentLevel
                        ? 'bg-green-900/20'
                        : 'opacity-50'
                    }`}
                  >
                    <div className="w-5 h-5">
                      {index < currentLevel ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : index === currentLevel ? (
                        <ChevronRight className="w-5 h-5 text-pink-500 animate-pulse" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-600" />
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
            {renderTerminal()}
            {/* Quick Commands */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span>Quick Commands:</span>
              <button onClick={() => setUserInput('help')} className="text-cyan-400 hover:text-cyan-300">help</button>
              <span>•</span>
              <button onClick={() => setUserInput('hint')} className="text-pink-400 hover:text-pink-300">hint</button>
              <span>•</span>
              <button onClick={() => setUserInput('clear')} className="text-gray-400 hover:text-gray-300">clear</button>
              <span>•</span>
              <button onClick={() => setUserInput('info')} className="text-purple-400 hover:text-purple-300">info</button>
              <span className="text-gray-600">↑↓ for history</span>
            </div>
          </div>
        </div>

        {/* Achievements Bar */}
        {unlockedAchievements.length > 0 && (
          <div className="mt-6 bg-gray-900/50 backdrop-blur rounded-lg p-4 border border-purple-500/20">
            <h3 className="text-sm font-semibold text-purple-400 mb-3 uppercase">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {achievements
                .filter((a) => unlockedAchievements.includes(a.id))
                .map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-2 rounded-lg flex items-center space-x-2 border border-purple-500/30"
                  >
                    <span className="text-xl">{achievement.icon}</span>
                    <span className="text-xs font-semibold">{achievement.name}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Level Modal */}
      <LevelModal />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(31, 41, 55, 0.5); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(236, 72, 153, 0.3); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(236, 72, 153, 0.5); }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .delay-1000 { animation-delay: 1000ms; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

export default function Page() {
  return <OkayHackerGame />;
}

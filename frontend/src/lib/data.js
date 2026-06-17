export const PROFILE = {
  name: "Saranmani M",
  shortName: "SARANMANI",
  role: "Cloud · Storage · Cybersecurity",
  email: "m.saranmani.1@gmail.com",
  phone: "+91 72996 63327",
  location: "Chennai, India",
  photoUrl:
    "https://customer-assets.emergentagent.com/job_saranmani-portfolio/artifacts/uiidkdb9_ChatGPT%20Image%20Jun%207%2C%202026%2C%2006_04_26%20PM%20%281%29%20%281%29.png",
    resumeUrl: "/my-portfolio_6/Saranmani_Resume.pdf",
  headline:
    "Building reliable and secure digital infrastructure, calm and precise.",
  description:
    "Final-year Information Technology student passionate about cloud computing, cybersecurity, storage technologies, and Python development.",
  bio: "I am an Information Technology graduate from Vel Tech, Chennai. I specialize in Storage administrator, SAN/NAS, cloud security, and cryptography. I've published a peer-reviewed IEEE paper on Homomorphic Encryption and won 2nd prize at CYBERNIX'25.",
};

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/saranmani-m/",
  github: "https://github.com/Saranmani-M",
  instagram: "https://www.instagram.com/m.sxrxn/",
  twitter: "https://x.com/Saran0048597646",
  leetcode: "https://leetcode.com/u/M-SARANMANI/",
};

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "achievements", label: "Achievements" },
  { id: "certificates", label: "Certificates" },
  { id: "articles", label: "Articles" },
  { id: "profiles", label: "Coding Profiles" },
  { id: "contact", label: "Contact" },
];

export const SKILL_GROUPS = [
  {
    title: "Systems",
    index: "01",
    items: ["Linux (Ubuntu)", "Windows", "SAN", "NAS", "RAID", "Backup & Recovery"],
  },
  {
    title: "Cloud",
    index: "02",
    items: ["AWS", "EC2", "S3", "IAM"],
  },
  {
    title: "Security / Crypto",
    index: "03",
    items: [
      "Homomorphic Encryption",
      "Paillier",
      "ElGamal",
      "Web Security",
      "Networking",
      "Security Fundamentals",
    ],
  },
  {
    title: "Programming",
    index: "04",
    items: ["Python", "Django", "Java (Spring Boot)", "Angular"],
  },
  {
    title: "Tools",
    index: "05",
    items: ["Git", "GitHub", "VS Code", "PuTTY", "WinSCP", "PyCharm"],
  },
];

export const FEATURED_PROJECT = {
  title: "Secure Cloud Storage System",
  subtitle: "Using Homomorphic Encryption",
  year: "2025",
  role: "Designer · Engineer",
  cover:
    "https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  problem:
    "Organisations storing sensitive data in the cloud face a constant tension between accessibility and confidentiality. Conventional encryption protects data at rest, but the moment processing is required the information must be decrypted — exposing it to the cloud provider and any compromise in transit.",
  solution:
    "A privacy-preserving multi-tenant storage layer where computation happens directly on encrypted data. Files are encrypted client-side using a hybrid Paillier + ElGamal scheme, allowing arithmetic and search operations on ciphertext without ever revealing the underlying plaintext to the server.",
  architecture: [
    "Client SDK in Python — key generation, encryption, lattice-based operations",
    "Object storage layer — encrypted blobs with metadata isolation per tenant",
    "Compute proxy — performs additions and multiplications on ciphertexts",
    "Audit trail — append-only log of access and operations",
  ],
  technologies: [
    "Python",
    "Homomorphic Encryption",
    "Paillier",
    "ElGamal",
    "Cloud Storage",
    "Linux",
  ],
  outcome:
    "Published as a peer-reviewed IEEE paper at ICIRCA 2026 and awarded 2nd Prize at CYBERNIX '25 (Vel Tech). Demonstrated end-to-end encrypted analytics on 385 samples with 99%+ data integrity and sub-second encryption (Paillier 0.085s · ElGamal 0.112s).",
};

export const SECOND_PROJECT = {
  title: "Face Recognition System",
  subtitle: "Python · OpenCV",
  year: "2025",
  role: "Engineer",
  cover:
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1400&q=75",
  problem:
    "Build a lightweight, privacy-conscious face recognition pipeline that works on commodity hardware — no cloud calls, no biometric leakage.",
  solution:
    "An OpenCV-based pipeline using Haar cascades for detection and a custom recogniser trained on a small in-house dataset. Encrypted feature vectors are stored locally; nothing leaves the device.",
  technologies: ["Python", "OpenCV", "NumPy", "Linux"],
  outcome:
    "Presented at ASSET-2025 (March 2025). Stable real-time recognition on a CPU-only laptop with sub-100ms inference per frame.",
};

export const COMING_PROJECTS = [
  {
    title: "AWS Automated Backup Engine",
    discipline: "Cloud · Storage",
    year: "Soon",
  },
  {
    title: "Linux Hardening Toolkit",
    discipline: "Security · Open Source",
    year: "Soon",
  },
  {
    title: "Python SAN Volume Visualiser",
    discipline: "Infrastructure",
    year: "Soon",
  },
];

export const RESEARCH = {
  title:
    "Optimizing Cloud Data Security Using Homomorphic Encryption: A Hybrid Paillier and ElGamal Approach",
  venue: "ICIRCA 2026 · IEEE",
  date: "June 2026",
  status: "Peer-reviewed · Presented",
  abstract:
    "We propose a hybrid homomorphic encryption scheme combining the additive properties of Paillier with the multiplicative structure of ElGamal to enable arithmetic operations directly on ciphertext stored in untrusted cloud environments. The work focuses on reducing the practical overhead of fully homomorphic systems by selectively applying the right primitive per operation, while preserving end-to-end confidentiality.",
  metrics: [
    { k: "Paillier", v: "0.085s", note: "Per-encryption" },
    { k: "ElGamal", v: "0.112s", note: "Per-encryption" },
    { k: "Integrity", v: "99%+", note: "Across operations" },
    { k: "Samples", v: "385", note: "Evaluation set" },
  ],
};

export const ACHIEVEMENTS = [
  {
    title: "2nd Prize · CYBERNIX '25",
    org: "Vel Tech · Project Expo",
    date: "Feb 2025",
    line: "Awarded for the Secure Cloud Storage System using Homomorphic Encryption.",
  },
  {
    title: "IEEE Paper · ICIRCA 2026",
    org: "Hybrid Paillier + ElGamal scheme",
    date: "Jun 2026",
    line: "Peer-reviewed publication and conference presentation.",
  },
  {
    title: "Face Recognition Paper · ASSET-2025",
    org: "Conference presentation",
    date: "Mar 2025",
    line: "Lightweight OpenCV-based recognition pipeline on commodity hardware.",
  },
];

export const CERTIFICATIONS = [
  {
    title: "AWS Security - Encryption Fundamentals",
    org: "Amazon Web Services",
    line: "Cryptographic primitives, KMS, and securing data at rest and in transit.",
    image: "https://unsplash.com"
  },
  {
    title: "Full Stack Development - Angular + Spring Boot",
    org: "Digital India Corporation",
    line: "End-to-end web application development across the JVM and TypeScript ecosystems.",
    image: "https://unsplash.com"
  },
  {
    title: "Web Security",
    org: "Vel Tech - Value Added Course",
    line: "OWASP fundamentals, authentication, and common attack surfaces.",
    image: "https://unsplash.com"
  }
];

export const ARTICLES = [
  {
    title: "Getting Started with AWS EC2",
    category: "Cloud",
    read: "6 min read",
    excerpt:
      "A grounded walk-through of launching, configuring and securing your first EC2 instance — without the marketing fog.",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Linux Security Hardening Basics",
    category: "Security",
    read: "8 min read",
    excerpt:
      "The unglamorous habits — users, SSH, firewalls, journaling — that quietly keep a Linux box out of trouble.",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Python for Cloud Automation",
    category: "Programming",
    read: "7 min read",
    excerpt:
      "From boto3 to small, deliberate scripts: how Python becomes the connective tissue of a calm cloud setup.",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Understanding Homomorphic Encryption",
    category: "Cryptography",
    read: "10 min read",
    excerpt:
      "What it really means to compute on encrypted data — explained without the equations, with the intuition kept intact.",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=70",
  },
];

export const PROFILES = [
  {
    name: "GitHub",
    handle: "@Saranmani-M",
    url: "https://github.com/Saranmani-M",
    line: "Open source experiments, cloud scripts, security notes.",
  },
  {
    name: "LeetCode",
    handle: "@M-SARANMANI",
    url: "https://leetcode.com/u/M-SARANMANI/",
    line: "Algorithmic practice — building muscle memory in Python.",
  },
];

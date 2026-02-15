const SKILL_CATEGORIES = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms', 'Operating System', 'Database'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'C programming'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'NoSQL'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'DevOps', 'Jenkins'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Testing', 'Jest']
}

export function extractSkills(jdText) {
  const text = jdText.toLowerCase()
  const extracted = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: []
  }
  
  Object.keys(SKILL_CATEGORIES).forEach(category => {
    const found = SKILL_CATEGORIES[category].filter(skill => 
      text.includes(skill.toLowerCase())
    )
    if (found.length > 0) {
      extracted[category] = found
    }
  })
  
  // Default if no skills detected
  const hasAnySkills = Object.values(extracted).some(arr => arr.length > 0)
  if (!hasAnySkills) {
    extracted.other = ['Communication', 'Problem solving', 'Basic coding', 'Projects']
  }
  
  return extracted
}

export function generateChecklist(skills) {
  const rounds = []
  
  rounds.push({
    title: 'Round 1: Aptitude & Basics',
    items: [
      'Practice quantitative aptitude problems',
      'Review logical reasoning patterns',
      'Brush up verbal ability',
      'Take timed mock tests',
      'Review basic mathematics',
      'Practice puzzles and brain teasers'
    ]
  })
  
  const round2Items = ['Master time complexity analysis', 'Practice array and string problems']
  if (skills.coreCS?.includes('DSA') || skills.coreCS?.includes('Data Structures')) {
    round2Items.push('Review linked lists, trees, graphs')
    round2Items.push('Practice dynamic programming')
  }
  if (skills.coreCS?.includes('DBMS') || skills.data) {
    round2Items.push('Review SQL queries and normalization')
  }
  if (skills.coreCS?.includes('OS')) {
    round2Items.push('Understand process scheduling and memory management')
  }
  if (skills.coreCS?.includes('OOP')) {
    round2Items.push('Review OOP principles and design patterns')
  }
  round2Items.push('Solve medium-level coding problems')
  
  rounds.push({
    title: 'Round 2: DSA & Core CS',
    items: round2Items
  })
  
  const round3Items = ['Prepare project explanations with impact']
  if (skills.web) {
    round3Items.push('Review frontend architecture and state management')
    round3Items.push('Explain REST API design principles')
  }
  if (skills.languages) {
    round3Items.push(`Deep dive into ${skills.languages[0]} features`)
  }
  if (skills.cloud) {
    round3Items.push('Understand cloud deployment basics')
  }
  if (skills.data) {
    round3Items.push('Explain database optimization techniques')
  }
  round3Items.push('Practice system design fundamentals')
  round3Items.push('Review your tech stack thoroughly')
  
  rounds.push({
    title: 'Round 3: Technical Interview',
    items: round3Items
  })
  
  rounds.push({
    title: 'Round 4: Managerial & HR',
    items: [
      'Prepare STAR format answers',
      'Practice behavioral questions',
      'Research company culture and values',
      'Prepare questions for interviewer',
      'Review your strengths and weaknesses',
      'Practice salary negotiation basics'
    ]
  })
  
  return rounds
}

export function generate7DayPlan(skills) {
  const plan = []
  
  plan.push({
    day: 'Day 1-2',
    title: 'Basics & Core CS',
    tasks: [
      'Review fundamental CS concepts',
      skills.coreCS?.includes('OOP') ? 'Study OOP principles in depth' : 'Study programming fundamentals',
      skills.coreCS?.includes('DBMS') ? 'Practice SQL queries' : 'Review data structures basics',
      'Solve 5 easy coding problems'
    ]
  })
  
  plan.push({
    day: 'Day 3-4',
    title: 'DSA & Coding Practice',
    tasks: [
      'Solve 10 medium-level problems',
      'Focus on arrays, strings, and hashmaps',
      skills.coreCS?.includes('DSA') ? 'Practice tree and graph algorithms' : 'Review sorting and searching',
      'Time yourself on coding challenges'
    ]
  })
  
  const day5Tasks = ['Polish your resume with quantified achievements', 'Prepare 2-minute project pitches']
  if (skills.web?.includes('React')) {
    day5Tasks.push('Review React hooks and component lifecycle')
  }
  if (skills.languages) {
    day5Tasks.push(`Review ${skills.languages[0]} advanced features`)
  }
  day5Tasks.push('Align projects with job requirements')
  
  plan.push({
    day: 'Day 5',
    title: 'Projects & Resume',
    tasks: day5Tasks
  })
  
  plan.push({
    day: 'Day 6',
    title: 'Mock Interviews',
    tasks: [
      'Practice explaining your projects',
      'Do mock technical interviews',
      'Practice behavioral questions',
      'Record yourself and review'
    ]
  })
  
  plan.push({
    day: 'Day 7',
    title: 'Revision & Weak Areas',
    tasks: [
      'Review all notes and key concepts',
      'Revisit difficult problems',
      'Practice company-specific questions',
      'Get good rest before interview'
    ]
  })
  
  return plan
}

export function generateQuestions(skills) {
  const questions = []
  
  if (skills.coreCS?.includes('DSA') || skills.coreCS?.includes('Data Structures')) {
    questions.push('Explain the difference between array and linked list. When would you use each?')
    questions.push('How would you optimize search in sorted data? Explain time complexity.')
    questions.push('Describe how a hash table works and handle collisions.')
  }
  
  if (skills.coreCS?.includes('OOP')) {
    questions.push('Explain polymorphism with a real-world example.')
    questions.push('What are SOLID principles? Explain any two.')
  }
  
  if (skills.coreCS?.includes('DBMS') || skills.data) {
    questions.push('Explain database indexing and when it helps performance.')
    questions.push('What is normalization? Explain 1NF, 2NF, 3NF.')
  }
  
  if (skills.web?.includes('React')) {
    questions.push('Explain state management options in React.')
    questions.push('What are React hooks? Explain useState and useEffect.')
  }
  
  if (skills.web?.includes('Node.js') || skills.web?.includes('Express')) {
    questions.push('How does Node.js handle asynchronous operations?')
  }
  
  if (skills.languages?.includes('Java')) {
    questions.push('Explain the difference between abstract class and interface in Java.')
  }
  
  if (skills.languages?.includes('Python')) {
    questions.push('What are decorators in Python? Provide an example.')
  }
  
  if (skills.cloud) {
    questions.push('Explain the difference between horizontal and vertical scaling.')
  }
  
  questions.push('Walk me through your most challenging project.')
  questions.push('How do you approach debugging a complex issue?')
  
  return questions.slice(0, 10)
}

export function calculateReadinessScore(company, role, jdText, skills) {
  let score = 35
  
  const categoryCount = Object.keys(skills).length
  score += Math.min(categoryCount * 5, 30)
  
  if (company && company.trim().length > 0) score += 10
  if (role && role.trim().length > 0) score += 10
  if (jdText.length > 800) score += 10
  
  return Math.min(score, 100)
}

export function analyzeJD(company, role, jdText) {
  const skills = extractSkills(jdText)
  const checklist = generateChecklist(skills)
  const plan = generate7DayPlan(skills)
  const questions = generateQuestions(skills)
  const baseScore = calculateReadinessScore(company, role, jdText, skills)
  const companyIntel = generateCompanyIntel(company)
  const roundMapping = generateRoundMapping(companyIntel.size, skills)
  
  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    company: company?.trim() || '',
    role: role?.trim() || '',
    jdText: jdText.trim(),
    extractedSkills: skills,
    roundMapping,
    checklist,
    plan7Days: plan,
    questions,
    baseScore,
    skillConfidenceMap: {},
    finalScore: baseScore,
    companyIntel,
    // Legacy fields for backward compatibility
    readinessScore: baseScore,
    plan
  }
}

export function saveToHistory(analysis) {
  const history = getHistory()
  history.unshift(analysis)
  localStorage.setItem('jd_history', JSON.stringify(history))
}

export function updateHistoryItem(updatedItem) {
  const history = getHistory()
  const index = history.findIndex(item => item.id === updatedItem.id)
  if (index !== -1) {
    history[index] = updatedItem
    localStorage.setItem('jd_history', JSON.stringify(history))
  }
}

export function getHistory() {
  const stored = localStorage.getItem('jd_history')
  if (!stored) return []
  
  try {
    const parsed = JSON.parse(stored)
    // Validate and filter corrupted entries
    return parsed.filter(item => {
      return item && 
             typeof item.id === 'string' && 
             typeof item.jdText === 'string' &&
             item.extractedSkills !== undefined
    })
  } catch (e) {
    console.error('History corrupted, resetting')
    return []
  }
}

export function getHistoryItem(id) {
  const history = getHistory()
  return history.find(item => item.id === id)
}

const ENTERPRISE_COMPANIES = [
  'amazon', 'google', 'microsoft', 'apple', 'meta', 'facebook', 'netflix',
  'infosys', 'tcs', 'wipro', 'cognizant', 'accenture', 'capgemini',
  'ibm', 'oracle', 'salesforce', 'adobe', 'intel', 'cisco', 'dell',
  'hp', 'samsung', 'sony', 'walmart', 'target', 'jpmorgan', 'goldman sachs'
]

export function generateCompanyIntel(companyName) {
  const name = companyName.toLowerCase()
  
  let size = 'Startup'
  if (ENTERPRISE_COMPANIES.some(c => name.includes(c))) {
    size = 'Enterprise'
  } else if (name.includes('tech') || name.includes('solutions') || name.includes('systems')) {
    size = 'Mid-size'
  }
  
  const industry = name.includes('bank') || name.includes('finance') ? 'Financial Services' :
                   name.includes('health') || name.includes('medical') ? 'Healthcare' :
                   name.includes('retail') || name.includes('ecommerce') ? 'Retail & E-commerce' :
                   'Technology Services'
  
  const hiringFocus = size === 'Enterprise' 
    ? 'Structured DSA rounds, strong core CS fundamentals, system design for senior roles, emphasis on problem-solving under time constraints.'
    : size === 'Mid-size'
    ? 'Balanced approach: DSA basics + practical coding, project discussions, technology stack alignment.'
    : 'Practical problem solving, hands-on coding challenges, stack depth over breadth, culture fit and learning agility.'
  
  return { size, industry, hiringFocus }
}

export function generateRoundMapping(companySize, skills) {
  const hasDSA = skills.coreCS?.includes('DSA') || skills.coreCS?.includes('Data Structures')
  const hasWeb = skills.web && skills.web.length > 0
  const hasCloud = skills.cloud && skills.cloud.length > 0
  
  if (companySize === 'Enterprise') {
    return [
      {
        round: 'Round 1: Online Assessment',
        description: 'DSA problems (2-3), aptitude, and logical reasoning',
        why: 'Filters candidates at scale. Tests coding speed and accuracy under time pressure.'
      },
      {
        round: 'Round 2: Technical Interview - DSA',
        description: 'Live coding, data structures, algorithms, complexity analysis',
        why: 'Evaluates problem-solving approach, code quality, and communication during coding.'
      },
      {
        round: 'Round 3: Technical Interview - Projects',
        description: 'Deep dive into projects, system design basics, tech stack questions',
        why: 'Assesses practical experience, architectural thinking, and technology choices.'
      },
      {
        round: 'Round 4: HR & Behavioral',
        description: 'Culture fit, situational questions, salary discussion',
        why: 'Ensures alignment with company values and long-term potential.'
      }
    ]
  }
  
  if (companySize === 'Mid-size') {
    return [
      {
        round: 'Round 1: Coding Assessment',
        description: hasDSA ? 'DSA problems + practical coding' : 'Practical coding challenges',
        why: 'Tests both algorithmic thinking and real-world coding ability.'
      },
      {
        round: 'Round 2: Technical Discussion',
        description: 'Projects walkthrough, technology stack, problem-solving approach',
        why: 'Evaluates hands-on experience and depth in relevant technologies.'
      },
      {
        round: 'Round 3: Final Round',
        description: 'Team fit, learning mindset, role expectations',
        why: 'Confirms mutual fit and clarifies role responsibilities.'
      }
    ]
  }
  
  // Startup
  return [
    {
      round: 'Round 1: Practical Coding',
      description: hasWeb ? 'Build a feature or fix a bug in their stack' : 'Real-world problem solving',
      why: 'Tests ability to deliver working code quickly with minimal guidance.'
    },
    {
      round: 'Round 2: System Discussion',
      description: 'Architecture choices, trade-offs, scalability thinking',
      why: 'Assesses practical engineering judgment and ability to make informed decisions.'
    },
    {
      round: 'Round 3: Culture & Vision Fit',
      description: 'Startup mindset, adaptability, ownership mentality',
      why: 'Ensures candidate thrives in fast-paced, ambiguous environments.'
    }
  ]
}

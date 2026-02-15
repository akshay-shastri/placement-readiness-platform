export function getCompletionStatus() {
  // Check test checklist (10 items)
  const testChecklist = localStorage.getItem('prp_test_checklist')
  const testsPassed = testChecklist ? Object.values(JSON.parse(testChecklist)).filter(Boolean).length : 0
  const allTestsPassed = testsPassed === 10

  // Check proof links (3 required)
  const submission = localStorage.getItem('prp_final_submission')
  let allLinksProvided = false
  if (submission) {
    const links = JSON.parse(submission)
    allLinksProvided = links.lovable && links.github && links.deployed
  }

  // Check step completion (8 steps)
  const stepCompletion = localStorage.getItem('prp_step_completion')
  let allStepsCompleted = false
  if (stepCompletion) {
    const steps = JSON.parse(stepCompletion)
    allStepsCompleted = Object.values(steps).filter(Boolean).length === 8
  }

  const isShipped = allTestsPassed && allLinksProvided && allStepsCompleted

  return {
    testsPassed,
    allTestsPassed,
    allLinksProvided,
    allStepsCompleted,
    isShipped
  }
}

export function getStepCompletion() {
  const stored = localStorage.getItem('prp_step_completion')
  if (stored) {
    return JSON.parse(stored)
  }
  return {
    requirements: false,
    design: false,
    implementation: false,
    features: false,
    validation: false,
    testing: false,
    proof: false,
    deployment: false
  }
}

export function saveStepCompletion(steps) {
  localStorage.setItem('prp_step_completion', JSON.stringify(steps))
}

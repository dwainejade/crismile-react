import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

function EmailForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const successMessageRef = useRef(null)

  const scriptURL = "https://script.google.com/macros/s/AKfycbyuXBmZPwFWc05fLT5kaTzMolLzrzOXm2_SnsHFb9hb6QUNxIJxu3xUqyzbL1jgUf4GNw/exec"

  useEffect(() => {
    // Initialize success message for GSAP animation
    gsap.set(successMessageRef.current, {
      opacity: 0,
    })
  }, [])

  const showSuccessMessage = () => {
    gsap.fromTo(
      successMessageRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      }
    )
  }

  const hideSuccessMessage = () => {
    gsap.to(successMessageRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.16,
      ease: "power2.in",
    })
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      return
    }

    if (!isValidEmail(trimmedEmail)) {
      alert("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("Email", trimmedEmail)

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Network response was not ok")

      // Show success message with GSAP animation
      showSuccessMessage()
      setEmail("")

      // Hide success message after 7 seconds with GSAP animation
      setTimeout(() => {
        hideSuccessMessage()
      }, 7000)

    } catch (error) {
      alert("Oops! Something went wrong.")
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="email-container">
            <input 
              type="email" 
              className="email-input" 
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            className="subscribe-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </button>
        </div>
      </form>

      <div className="success-message" ref={successMessageRef}>
        🎉 Thank you for subscribing! We'll keep you updated on our exciting game development journey.
      </div>
    </div>
  )
}

export default EmailForm
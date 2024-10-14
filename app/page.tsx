'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight, BookOpen, Users, Brain, BarChart, FileCheck, Lightbulb, GraduationCap, MessageCircle, Sun, Moon, Linkedin, Twitter, Sliders, PieChart, Edit3 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Role = 'STUDENT' | 'TEACHER'

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("teachers")
  const [darkMode, setDarkMode] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState<Role>("STUDENT")
  const [name, setName] = useState("")
  const nameInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleLoginSignup = (action: 'login' | 'signup') => {
    setIsLogin(action === 'login')
    setIsLoginOpen(true)
  }

  const handleRequestDemo = () => {
    nameInputRef.current?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => nameInputRef.current?.focus(), 500)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      action: 'login'
    })

    if (result?.error) {
      console.error('Login error:', result.error)
      toast.error('Login failed. Please check your credentials.')
    } else {
      setIsLoginOpen(false)
      toast.success('Login successful! Redirecting to dashboard...', {
        onClose: () => router.push('/dashboard')
      })
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        redirect: false,
        name,
        email,
        password,
        role,
        action: 'signup'
      })

      if (result?.error) {
        console.error('Signup error:', result.error)
        toast.error(result.error || 'Sign up failed. Please try again.')
      } else {
        setIsLoginOpen(false)
        toast.success('Sign up successful! Redirecting to dashboard...', {
          onClose: () => router.push('/dashboard')
        })
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('An error occurred during sign up. Please try again.')
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <header className="bg-[#55b3f3] dark:bg-[#259ef0] text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 mr-2 text-white" />
            <h1 className="text-2xl font-bold">master-ed</h1>
          </div>
          <nav className="flex items-center">
            <Button 
              variant="outline" 
              className="text-white bg-transparent hover:bg-white hover:text-[#55b3f3] dark:hover:bg-[#55b3f3] dark:hover:text-white border-white transition-colors duration-300"
              onClick={() => setIsLoginOpen(true)}
            >
              Login / Sign Up
            </Button>
            <Button variant="ghost" className="ml-2 text-white" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#259ef0] dark:text-[#55b3f3]">Revolutionize Your Learning Experience</h2>
          <p className="text-xl text-[#55b3f3] dark:text-[#85c8f6] mb-8">Empower your education journey with AI-assisted learning and teaching tools</p>
          <Button className="bg-[#259ef0] hover:bg-[#55b3f3] text-white" onClick={() => setIsLoginOpen(true)}>
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        <Tabs defaultValue="teachers" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 bg-[#e0e0e0] dark:bg-[#333333]">
            <TabsTrigger 
              value="teachers" 
              onClick={() => setActiveTab("teachers")}
              className="data-[state=active]:bg-white data-[state=active]:text-[#259ef0] dark:data-[state=active]:bg-[#55b3f3] dark:data-[state=active]:text-white"
            >
              For Teachers
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              onClick={() => setActiveTab("students")}
              className="data-[state=active]:bg-white data-[state=active]:text-[#259ef0] dark:data-[state=active]:bg-[#55b3f3] dark:data-[state=active]:text-white"
            >
              For Students
            </TabsTrigger>
          </TabsList>
          <TabsContent value="teachers" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<BookOpen className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Custom AI Environments"
                description="Quickly set up AI environments tailored to your course content."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Student Management"
                description="Efficiently manage your students, track progress, and provide personalized feedback."
              />
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Automated Grading"
                description="Save time with AI-powered grading and assessment tools."
              />
              <FeatureCard
                icon={<PieChart className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Analytics Dashboard"
                description="Gain insights into student performance and engagement with comprehensive analytics."
              />
              <FeatureCard
                icon={<Sliders className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Customizable Controls"
                description="Set hint levels and learning aid availability for optimal student support."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Maximize Human Interaction"
                description="Free up more time for actual teaching and provide personalized attention to your students."
              />
            </div>
          </TabsContent>
          <TabsContent value="students" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<FileCheck className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Personalized Learning"
                description="Receive tailored study plans and resources based on your learning style and progress."
              />
              <FeatureCard
                icon={<MessageCircle className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="24/7 AI Tutor"
                description="Get instant help and explanations from your personal AI tutor anytime, anywhere."
              />
              <FeatureCard
                icon={<BarChart className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Progress Tracking"
                description="Monitor your learning progress and identify areas for improvement."
              />
              <FeatureCard
                icon={<Lightbulb className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Smart Learning Assistance"
                description="Get help with summarizing, transcribing, and translating learning materials."
              />
              <FeatureCard
                icon={<Edit3 className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Interactive Note-Taking"
                description="Highlight and annotate learning materials with AI-enhanced tools."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-[#259ef0] dark:text-[#55b3f3]" />}
                title="Collaborative Learning"
                description="Easily seek help from professors or peers on challenging topics."
              />
            </div>
          </TabsContent>
        </Tabs>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#259ef0] dark:text-[#55b3f3]">Ready to Transform Your Education?</h2>
          <p className="text-xl text-[#55b3f3] dark:text-[#85c8f6] mb-8">Join master-ed today and experience the future of learning</p>
          <div className="flex justify-center gap-4">
            <Button className="bg-[#259ef0] hover:bg-[#55b3f3] text-white" onClick={() => handleLoginSignup('signup')}>
              Sign Up Now
            </Button>
            <Button variant="outline" className="text-[#259ef0] dark:text-[#55b3f3] border-[#259ef0] dark:border-[#55b3f3]" onClick={handleRequestDemo}>
              Request a Demo
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#259ef0] dark:text-[#55b3f3]">Contact Us</h2>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" ref={nameInputRef} />
                </div>
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" placeholder="Your organization" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <Button type="submit" className="w-full bg-[#259ef0] hover:bg-[#55b3f3] text-white">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-[#55b3f3] dark:bg-[#259ef0] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">master-ed</h3>
              <p>Empowering education through AI innovation</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul>
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
              <div className="flex items-center mb-4">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-r-none focus-visible:ring-0  focus-visible:ring-offset-0 bg-white text-black border-0" 
                />
                <Button type="submit" className="rounded-l-none bg-white text-[#259ef0] hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-200">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-200">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} master-ed. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
            <DialogDescription>
              {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleSignup}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Your email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Your password" required />
            </div>
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" type="text" placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Role</Label>
                  <RadioGroup value={role} onValueChange={(value: Role) => setRole(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="STUDENT" id="student" />
                      <Label htmlFor="student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="TEACHER" id="teacher" />
                      <Label htmlFor="teacher">Teacher</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}
            <Button type="submit" className="w-full">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-[#85c8f6] dark:border-[#259ef0]">
      <CardContent className="flex items-start p-6">
        <div className="mr-4 mt-1">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-[#259ef0] dark:text-[#55b3f3]">{title}</h3>
          <p className="text-[#55b3f3] dark:text-[#85c8f6]">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Code, Paintbrush, Smartphone, Send, ChevronRight, ArrowRight } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const words = ['Design', 'Simplicity', 'Quality', 'Innovation', 'Excellence']

export default function Home() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [headingWord, setHeadingWord] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const [loopNum, setLoopNum] = useState(0)
	const [typingSpeed, setTypingSpeed] = useState(150)
	const [isIntersecting, setIsIntersecting] = useState({
		services: false,
		portfolio: false,
		about: false,
		contact: false
	})

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsIntersecting(prev => ({
							...prev,
							[entry.target.id]: true
						}))
					}
				})
			},
			{ threshold: 0.1 }
		)

		const sections = ['services', 'portfolio', 'about', 'contact']
		sections.forEach(section => {
			const element = document.getElementById(section)
			if (element) observer.observe(element)
		})

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const handleTyping = () => {
			const i = loopNum % words.length
			const fullWord = words[i]!

			if (isDeleting) {
				setHeadingWord(fullWord.substring(0, headingWord.length - 1))
			} else {
				setHeadingWord(fullWord.substring(0, headingWord.length + 1))
			}

			setTypingSpeed(isDeleting ? 30 : 150)

			if (!isDeleting && headingWord === fullWord) {
				setTimeout(() => setIsDeleting(true), 1500)
			} else if (isDeleting && headingWord === '') {
				setIsDeleting(false)
				setLoopNum(loopNum + 1)
				setTypingSpeed(500)
			}
		}

		const timer = setTimeout(handleTyping, typingSpeed)
		return () => clearTimeout(timer)
	}, [headingWord, isDeleting, loopNum, typingSpeed])

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from
gray-900 to-black text-foreground">
			<div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

			<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold">W</span>
							</div>
							<span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
								WebWeaver
							</span>
						</div>

						<nav className="hidden md:flex space-x-8">
							{['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
								<a
									key={item}
									href={`#${item.toLowerCase()}`}
									className="relative group text-foreground/80 hover:text-foreground transition-colors"
								>
									{item}
									<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
								</a>
							))}
						</nav>

						<Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
							{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>

					{isMenuOpen && (
						<div className="md:hidden absolute left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border/50">
							<nav className="px-4 py-2 space-y-2">
								{['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
									<a
										key={item}
										href={`#${item.toLowerCase()}`}
										className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-blue-500/10 rounded-lg transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										{item}
									</a>
								))}
							</nav>
						</div>
					)}
				</div>
			</header>

			<main className="flex-grow relative z-10">
				<section className="relative min-h-[90vh] flex items-center">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 animate-gradient" />
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
						<div className="space-y-8 animate-fade-in">
							<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
									Weaving Digital{' '}
								</span>
								<span className="text-blue-400 inline-block min-w-[200px]">
									{headingWord}
									<span className="animate-blink">|</span>
								</span>
							</h1>
							<p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-foreground/80 leading-relaxed">
								Crafting immersive digital experiences that captivate, engage, and deliver exceptional results.
							</p>
							<div className="flex items-center justify-center space-x-4">
								<Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 group" asChild>
									<a href="#contact">
										Get Started
										<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
									</a>
								</Button>
								<Button size="lg" variant="outline" className="border-blue-500/50 hover:bg-blue-500/10" asChild>
									<a href="#portfolio">View Our Work</a>
								</Button>
							</div>
						</div>
					</div>
				</section>

				<section id="services" className={`py-32 ${isIntersecting.services ? 'animate-fade-up' : 'opacity-0'}`}>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center space-y-4 mb-16">
							<h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
								Our Services
							</h2>
							<p className="text-xl text-foreground/80 max-w-2xl mx-auto">
								Comprehensive digital solutions tailored to your needs
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[
								{
									icon: Code,
									title: 'Web Development',
									description: 'Custom-built websites that are fast, secure, and scalable, designed to meet your specific business needs.'
								},
								{
									icon: Paintbrush,
									title: 'UI/UX Design',
									description: 'Intuitive and visually stunning interfaces that create meaningful connections with your users.'
								},
								{
									icon: Smartphone,
									title: 'Mobile Apps',
									description: 'Native and cross-platform mobile applications that deliver seamless experiences across all devices.'
								}
							].map((service, index) => (
								<Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/50 transition-all duration-300">
									<CardHeader>
										<CardTitle className="flex items-center text-blue-400 space-x-3">
											<service.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
											<span>{service.title}</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-foreground/80 leading-relaxed">{service.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				<section id="portfolio" className={`py-32 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent ${isIntersecting.portfolio ? 'animate-fade-up' : 'opacity-0'}`}>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center space-y-4 mb-16">
							<h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
								Featured Work
							</h2>
							<p className="text-xl text-foreground/80 max-w-2xl mx-auto">
								Explore our latest projects and success stories
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[1, 2, 3, 4, 5, 6].map((item) => (
								<Card key={item} className="group bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
									<div className="relative">
										<Image
											src={`/api/placeholder/400/300`}
											alt={`Project ${item}`}
											width={400}
											height={300}
											className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
											<Button variant="secondary" size="sm" className="ml-auto">
												View Details
												<ChevronRight className="ml-2 h-4 w-4" />
											</Button>
										</div>
									</div>
									<CardContent className="p-4">
										<h3 className="text-lg font-semibold mb-2 text-blue-400">Project {item}</h3>
										<p className="text-foreground/80">
											An innovative solution leveraging cutting-edge technologies.
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				<section id="about" className={`py-32 ${isIntersecting.about ? 'animate-fade-up' : 'opacity-0'}`}>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-2 gap-16 items-center">
							<div className="space-y-6">
								<h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
									About WebWeaver
								</h2>
								<p className="text-xl text-foreground/80 leading-relaxed">
									We are a passionate developers dedicated to creating exceptional digital experiences. With years of experience and a commitment to staying at the forefront of technology, we deliver solutions that help our clients succeed in the digital world.
								</p>
								<div className="grid grid-cols-3 gap-4 pt-4">
									{[
										{ number: '100+', label: 'Projects' },
										{ number: '50+', label: 'Clients' },
										{ number: '5+', label: 'Years' }
									].map((stat, index) => (
										<div key={index} className="text-center">
											<div className="text-2xl font-bold text-blue-400">{stat.number}</div>
											<div className="text-sm text-foreground/80">{stat.label}</div>
										</div>
									))}
								</div>
							</div>
							<div className="relative group">
								<div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
								<Image
									src="https://openup.com/wp-content/uploads/2022/08/How-to-motivate-teambuilding1.png"
									alt="WebWeaver Team"
									width={600}
									height={400}
									className="relative rounded-lg shadow-2xl"
								/>
							</div>
						</div>
					</div>
				</section>

				<section id="contact" className={`py-32 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent ${isIntersecting.contact ? 'animate-fade-up' : 'opacity-0'}`}>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-2 gap-16">
							<div className="space-y-6">
								<h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-from-blue-400 to-blue-600">
									Get in Touch
								</h2>
								<p className="text-xl text-foreground/80 leading-relaxed">
									Ready to start your next project? Contact us today and let&apos;s discuss how we can help bring your vision to life.
								</p>
								<div className="space-y-4">
									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
											<Send className="h-6 w-6 text-blue-400" />
										</div>
										<div>
											<h3 className="font-semibold text-blue-400">Email Us</h3>
											<p className="text-foreground/80">hello@webweaver.com</p>
										</div>
									</div>
								</div>
							</div>

							<form action="https://getform.io/f/ayvkvezb" method="POST">
								<Card className="bg-card/50 backdrop-blur-sm border-border/50">
									<CardContent className="p-6 space-y-4">
										<div className="space-y-2">
											<label htmlFor="name" className="text-sm font-medium">
												Name
											</label>
											<Input
												id="name"
												name="name"
												placeholder="Your name"
												className="bg-background/50 border-border/50 focus:border-blue-500"
											/>
										</div>

										<div className="space-y-2">
											<label htmlFor="email" className="text-sm font-medium">
												Email
											</label>
											<Input
												id="email"
												type="email"
												name="email"
												placeholder="Your email"
												className="bg-background/50 border-border/50 focus:border-blue-500"
											/>
										</div>

										<div className="space-y-2">
											<label htmlFor="message" className="text-sm font-medium">
												Message
											</label>
											<Textarea
												id="message"
												name="message"
												placeholder="Tell us about your project"
												className="min-h-[120px] bg-background/50 border-border/50 focus:border-blue-500"
											/>
										</div>

										<Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
											Send Message
											<Send className="ml-2 h-4 w-4" />
										</Button>
									</CardContent>
								</Card>
							</form>
						</div>
					</div>
				</section>
			</main>

			<footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="space-y-4">
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
									<span className="text-white font-bold">W</span>
								</div>
								<span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
									WebWeaver
								</span>
							</div>
							<p className="text-foreground/80">
								Crafting digital experiences that make a difference.
							</p>
						</div>

						{[
							{
								title: 'Services',
								links: ['Web Development', 'UI/UX Design', 'Mobile Apps', 'Consulting']
							},
							{
								title: 'Company',
								links: ['About', 'Portfolio', 'Careers', 'Blog']
							},
							{
								title: 'Legal',
								links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
							}
						].map((column, index) => (
							<div key={index} className="space-y-4">
								<h3 className="font-semibold text-blue-400">{column.title}</h3>
								<ul className="space-y-2">
									{column.links.map((link, linkIndex) => (
										<li key={linkIndex}>
											<a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="mt-12 pt-8 border-t border-border/50 text-center text-foreground/60">
						<p>&copy; {new Date().getFullYear()} WebWeaver. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	)
}


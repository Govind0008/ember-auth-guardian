
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-subtle': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'spin-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				// New animations
				'shimmer': {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '0% 0' }
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'float-slow': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'float-slow-reverse': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(10px)'
					}
				},
				'float-3d': {
					'0%, 100%': {
						transform: 'translateY(0) translateX(0) rotate(0)'
					},
					'25%': {
						transform: 'translateY(-5px) translateX(5px) rotate(5deg)'
					},
					'50%': {
						transform: 'translateY(0) translateX(0) rotate(0)'
					},
					'75%': {
						transform: 'translateY(5px) translateX(-5px) rotate(-5deg)'
					}
				},
				'float-3d-reverse': {
					'0%, 100%': {
						transform: 'translateY(0) translateX(0) rotate(0)'
					},
					'25%': {
						transform: 'translateY(5px) translateX(-5px) rotate(-5deg)'
					},
					'50%': {
						transform: 'translateY(0) translateX(0) rotate(0)'
					},
					'75%': {
						transform: 'translateY(-5px) translateX(5px) rotate(5deg)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						textShadow: '0 0 10px rgba(74, 108, 247, 0.5), 0 0 20px rgba(74, 108, 247, 0.3)'
					},
					'50%': {
						textShadow: '0 0 20px rgba(74, 108, 247, 0.8), 0 0 30px rgba(74, 108, 247, 0.5)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'pulse-subtle': 'pulse-subtle 2s infinite ease-in-out',
				'spin-slow': 'spin-slow 20s linear infinite',
				'bounce-subtle': 'bounce-subtle 2s infinite ease-in-out',
				// New animations
				'shimmer': 'shimmer 2s infinite linear',
				'float': 'float 4s ease-in-out infinite',
				'float-slow': 'float-slow 8s ease-in-out infinite',
				'float-slow-reverse': 'float-slow-reverse 8s ease-in-out infinite',
				'float-3d': 'float-3d 8s ease-in-out infinite',
				'float-3d-reverse': 'float-3d-reverse 8s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			},
			boxShadow: {
				'glow': '0 0 15px rgba(74, 108, 247, 0.5)',
				'glow-intense': '0 0 25px rgba(74, 108, 247, 0.7)'
			},
			textShadow: {
				'glow': '0 0 10px rgba(74, 108, 247, 0.5), 0 0 20px rgba(74, 108, 247, 0.3)'
			},
			perspective: {
				'1000': '1000px'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// Add text-shadow plugin
		function({ addUtilities }) {
			const newUtilities = {
				'.text-shadow-glow': {
					textShadow: '0 0 10px rgba(74, 108, 247, 0.5), 0 0 20px rgba(74, 108, 247, 0.3)'
				},
			}
			addUtilities(newUtilities)
		},
		// Add text gradient plugin
		function({ addUtilities }) {
			const newUtilities = {
				'.text-gradient': {
					background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;

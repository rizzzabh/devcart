import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  Package,
  ArrowRight,
  Star,
  Users,
  Code2,
  Zap,
  Shield,
  Sparkles,
  ChevronRight,
  Play,
  Github,
  ExternalLink,
} from "lucide-react";
import Footer from "../components/Footer.jsx";

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20">
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-4 py-20 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/25">
                    <Package className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-6 leading-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  DevTool Directory
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                Discover, explore, and access the most powerful developer tools
                to accelerate your workflow and build amazing projects.
              </p>

              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Join thousands of developers who trust our curated collection of
                premium development tools and resources.
              </p>

              {/* Conditional Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                {user ? (
                  // Authenticated user buttons
                  <>
                    <Link
                      to="/home"
                      className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl text-lg font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3"
                    >
                      Browse Tools
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/my-orders"
                      className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-white rounded-2xl text-lg font-semibold backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
                    >
                      My Orders
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </>
                ) : (
                  // Guest user buttons
                  <>
                    <Link
                      to="/login"
                      className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl text-lg font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3"
                    >
                      Get Started
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/register"
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl text-lg font-semibold shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 flex items-center gap-3"
                    >
                      Sign Up Free
                      <Star className="h-5 w-5" />
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    icon: Code2,
                    number: "500+",
                    label: "Developer Tools",
                    color: "blue",
                  },
                  {
                    icon: Users,
                    number: "10K+",
                    label: "Active Users",
                    color: "green",
                  },
                  {
                    icon: Star,
                    number: "4.9",
                    label: "Average Rating",
                    color: "yellow",
                  },
                  {
                    icon: Zap,
                    number: "99.9%",
                    label: "Uptime",
                    color: "purple",
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-12 h-12 bg-${stat.color}-600/20 rounded-xl flex items-center justify-center mx-auto mb-3`}
                    >
                      <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 bg-gray-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose DevTool Directory?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need to supercharge your development workflow in
                one place.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Trusted & Secure",
                  description:
                    "All tools are thoroughly vetted and secured with enterprise-grade protection.",
                  color: "green",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "Instant access to your tools with our optimized delivery network worldwide.",
                  color: "yellow",
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description:
                    "Join a thriving community of developers sharing insights and recommendations.",
                  color: "blue",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 bg-${feature.color}-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon
                      className={`h-7 w-7 text-${feature.color}-400`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who are already using our
                  platform to discover and access the best development tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl text-lg font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Sign In
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}

import {
  Github,
  Mail,
  Twitter,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Send,
  Code,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-800/95 to-gray-900/80 border-t border-gray-700/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                DevTool Directory
              </h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
              Discover, explore, and access the most powerful developer tools to
              accelerate your workflow and build amazing projects.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-2 mx-auto">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Tools</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-lg mb-2 mx-auto">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-400">Users</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-lg mb-2 mx-auto">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h4 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-400" />
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest tools and updates delivered to your inbox.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                "Browse Tools",
                "Categories",
                "Popular Tools",
                "New Arrivals",
                "Featured",
                "API Documentation",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-4 mb-8">
              {[
                "Help Center",
                "Contact Us",
                "Bug Reports",
                "Feature Requests",
                "Community",
                "Discord Server",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <span>support@devtools.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700/50 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
              <p>
                © {new Date().getFullYear()} DevTool Directory. All rights
                reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <a href="#" className="hover:text-white transition-colors">
                  Cookies
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              {[
                {
                  Icon: Github,
                  href: "https://github.com/your-repo",
                  label: "GitHub",
                },
                {
                  Icon: Twitter,
                  href: "https://twitter.com/yourhandle",
                  label: "Twitter",
                },
                {
                  Icon: Linkedin,
                  href: "https://linkedin.com/company/yourcompany",
                  label: "LinkedIn",
                },
                {
                  Icon: Youtube,
                  href: "https://youtube.com/@yourchannel",
                  label: "YouTube",
                },
                {
                  Icon: Mail,
                  href: "mailto:contact@devtools.com",
                  label: "Email",
                },
              ].map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-blue-700/20 border border-gray-700/50 hover:border-blue-500/50 rounded-xl flex items-center justify-center transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

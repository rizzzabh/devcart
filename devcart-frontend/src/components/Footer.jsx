import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-gradient-to-t from-gray-900 via-gray-800/90 to-transparent py-8 px-4">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        <div className="mb-4 flex justify-center space-x-6">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="mailto:contact@youremail.com"
            className="hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} DevTool Directory. Built with ❤️ for
          developers.
        </p>
      </div>
    </footer>
  );
}

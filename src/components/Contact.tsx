import { Download } from 'lucide-react'

export default function Contact() {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/Resume_Alyssa_Lai.pdf'
    link.download = 'Resume_Alyssa_Lai.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <footer
      id="contact"
      className="py-16 px-6 md:px-12"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 版权信息 */}
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2025 Alyssa Lai. All rights reserved.
          </p>

          {/* 社交链接 + 简历下载 */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2.5 rounded-full transition-all duration-300"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="#"
              className="p-2.5 rounded-full transition-all duration-300"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
              }}
            >
              <Download size={16} />
              下载简历
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Mail, Monitor, Smartphone, Sparkles, Tablet } from "lucide-react"
import { cn } from "@/lib/utils"

type ViewportSize = "mobile" | "tablet" | "desktop"

interface MailPreviewProps {
  subject?: string
  html?: string
  isLoading?: boolean
}

export const MailPreview = ({ subject, html, isLoading }: MailPreviewProps) => {
  const [viewport, setViewport] = useState<ViewportSize>("desktop")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const viewportWidths: Record<ViewportSize, string> = {
    mobile: "400px",
    tablet: "768px",
    desktop: "100%",
  }

  useEffect(() => {
    if (iframeRef.current && html) {
      const doc = iframeRef.current.contentDocument
      if (doc) {
        doc.open()
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
              <style>
                * {
                  box-sizing: border-box;
                }
                html, body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  background: white;
                  color: #1a1a1a;
                  line-height: 1.6;
                }
                /* Base responsive rules - apply to all */
                img {
                  max-width: 100%;
                  height: auto;
                }
                /* Mobile and tablet specific - strict overflow prevention */
                @media screen and (max-width: 1024px) {
                  html, body {
                    overflow-x: hidden;
                  }
                  body {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  }
                  /* Prevent horizontal overflow on smaller screens */
                  table {
                    width: 100% !important;
                    max-width: 100% !important;
                    table-layout: auto !important;
                    border-collapse: collapse;
                  }
                  table td, table th {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    max-width: 100%;
                  }
                  /* Make images responsive on mobile */
                  img {
                    max-width: 100% !important;
                    height: auto !important;
                    display: block;
                  }
                  /* Responsive containers on mobile */
                  div, p, span, a, li, td, th {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  }
                  /* Prevent fixed widths from causing overflow on mobile */
                  [style*="width"] {
                    max-width: 100% !important;
                  }
                  /* Email-specific fixes for mobile */
                  .email-content, .email-body, [class*="email"] {
                    max-width: 100% !important;
                    width: 100% !important;
                  }
                  /* Handle pre and code blocks on mobile */
                  pre, code {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    max-width: 100%;
                  }
                  /* Ensure all block elements respect container on mobile */
                  blockquote, ul, ol {
                    max-width: 100%;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  }
                }
              </style>
            </head>
            <body>${html}</body>
          </html>
        `)
        doc.close()
      }
    }
  }, [html])

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-48 animate-pulse rounded bg-muted" />
            <Tabs value={viewport} onValueChange={(v) => setViewport(v as ViewportSize)}>
              <TabsList className="h-9">
                <TabsTrigger value="mobile" className="px-3">
                  <Smartphone className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="tablet" className="px-3">
                  <Tablet className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="desktop" className="px-3">
                  <Monitor className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <div className="relative">
              <Mail className="h-16 w-16 animate-pulse" />
              <Sparkles className="h-6 w-6 absolute -top-2 -right-2 text-primary animate-bounce" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-medium">Generating your email...</p>
              <p className="text-sm">This usually takes a few seconds</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold max-w-[80vw] md:max-w-[70vw] truncate">{subject || "Email Preview"}</h2>
          </div>
          <Tabs value={viewport} className="shrink-0" onValueChange={(v) => setViewport(v as ViewportSize)}>
            <TabsList className="h-9">
              <TabsTrigger value="mobile" className="px-3">
                <Smartphone className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="tablet" className="px-3">
                <Tablet className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="desktop" className="px-3">
                <Monitor className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-x-hidden overflow-y-auto">
        <div
          className={cn(
            "mx-auto h-full transition-all duration-300",
            viewport !== "desktop" && "border border-border rounded-lg shadow-sm bg-white",
          )}
          style={{ width: viewportWidths[viewport], maxWidth: "100%" }}
        >
          <iframe
            ref={iframeRef}
            title="Email Preview"
            className="w-full h-full min-h-[400px] rounded-lg border-0"
            sandbox="allow-same-origin"
            style={{ overflow: "hidden" }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

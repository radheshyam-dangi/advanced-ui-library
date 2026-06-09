import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { buttonDocSchema } from "@/components/ui/button.docs"
import { Info, HelpCircle, Code, ShieldCheck, Sparkles } from "lucide-react"


export default function App() {
  // 15+ Reactive State Controllers Matrix Configuration
  const [variant, setVariant] = useState<any>("default")
  const [size, setSize] = useState<any>("default")
  const [fullWidth, setFullWidth] = useState<boolean>(false)
  const [rounded, setRounded] = useState<any>("md")
  const [elevation, setElevation] = useState<any>("none")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingText, setLoadingText] = useState<string>("Processing...")
  const [animation, setAnimation] = useState<any>("none")
  const [hapticFeedback, setHapticFeedback] = useState<boolean>(false)
  const [iconGap, setIconGap] = useState<any>("sm")
  const [badgeCount, setBadgeCount] = useState<number>(0)
  const [useLeftIcon, setUseLeftIcon] = useState<boolean>(false)
  const [useRightIcon, setUseRightIcon] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [childrenText, setChildrenText] = useState<string>("")

  const [activeTab, setActiveTab] = useState<"preview" | "code" | "schema" | "a11y">("preview")

  // Code Generation Dynamic Construction Template
  const computeCodeSnippet = () => {
    let snippet = `<Button`
    if (variant !== "default") snippet += `\n  variant="${variant}"`
    if (size !== "default") snippet += `\n  size="${size}"`
    if (fullWidth) snippet += `\n  fullWidth`
    if (rounded !== "md") snippet += `\n  rounded="${rounded}"`
    if (elevation !== "none") snippet += `\n  elevation="${elevation}"`
    if (isLoading) snippet += `\n  isLoading`
    if (isLoading && loadingText) snippet += `\n  loadingText="${loadingText}"`
    if (animation !== "none") snippet += `\n  animation="${animation}"`
    if (hapticFeedback) snippet += `\n  hapticFeedback`
    if (iconGap !== "sm") snippet += `\n  iconGap="${iconGap}"`
    if (badgeCount > 0) snippet += `\n  badgeCount={${badgeCount}}`
    if (useLeftIcon) snippet += `\n  leftIcon={<Sparkles />}`
    if (useRightIcon) snippet += `\n  rightIcon={<Info />}`
    if (disabled) snippet += `\n  disabled`
    snippet += `\n>\n  ${childrenText || "Static Button"}\n</Button>`
    return snippet
  }

  return (
    <div className="min-w-screen min-h-screen flex bg-zinc-50 text-zinc-900 font-sans antialiased">
      
      {/* Documentation Navigator Panel */}
      <aside className="w-72 bg-white border-r border-[#e5e4e7] p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#aa3bff] flex items-center justify-center text-white font-black text-sm">C</div>
            <div>
              <h2 className="text-md font-bold tracking-tight">Core Design Lab</h2>
              <p className="text-[10px] text-zinc-400 font-medium">VERSION 1.0.0 (STABLE)</p>
            </div>
          </div>
          <nav className="space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block px-3 mb-2">Form Elements</span>
            <button className="w-full text-left px-3 py-2 rounded-lg font-semibold text-sm bg-purple-50 text-[#aa3bff] flex items-center justify-between">
              <span>🔘 {buttonDocSchema.name}</span>
              <span className="text-[10px] bg-purple-100 text-[#aa3bff] px-1.5 py-0.5 rounded-md font-bold">15+ Controllers</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Master Workspace Portal */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight">{buttonDocSchema.name}</h1>
          <p className="text-zinc-500 mt-2 text-md leading-relaxed max-w-3xl">{buttonDocSchema.description}</p>
        </div>

        {/* Component Controller Matrix Framework Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* Visual Canvas Output */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex border-b border-[#e5e4e7] gap-6 text-sm font-bold">
              <button onClick={() => setActiveTab("preview")} className={`pb-3 flex items-center gap-2 ${activeTab === "preview" ? "border-b-2 border-[#aa3bff] text-[#aa3bff]" : "text-zinc-400"}`}><Sparkles className="w-4 h-4"/> Canvas Preview</button>
              <button onClick={() => setActiveTab("code")} className={`pb-3 flex items-center gap-2 ${activeTab === "code" ? "border-b-2 border-[#aa3bff] text-[#aa3bff]" : "text-zinc-400"}`}><Code className="w-4 h-4"/> Declarative Code</button>
              <button onClick={() => setActiveTab("schema")} className={`pb-3 flex items-center gap-2 ${activeTab === "schema" ? "border-b-2 border-[#aa3bff] text-[#aa3bff]" : "text-zinc-400"}`}><HelpCircle className="w-4 h-4"/> Controller Specifications</button>
              <button onClick={() => setActiveTab("a11y")} className={`pb-3 flex items-center gap-2 ${activeTab === "a11y" ? "border-b-2 border-[#aa3bff] text-[#aa3bff]" : "text-zinc-400"}`}><ShieldCheck className="w-4 h-4"/> Accessibility</button>
            </div>

            <div className="border border-[#e5e4e7] bg-white rounded-2xl p-12 min-h-[380px] flex items-center justify-center relative shadow-sm">
              {activeTab === "preview" && (
                <Button
                  variant={variant}
                  size={size}
                  fullWidth={fullWidth}
                  rounded={rounded}
                  elevation={elevation}
                  isLoading={isLoading}
                  loadingText={loadingText}
                  animation={animation}
                  hapticFeedback={hapticFeedback}
                  iconGap={iconGap}
                  badgeCount={badgeCount > 0 ? badgeCount : undefined}
                  leftIcon={useLeftIcon ? <Sparkles className="w-4 h-4" /> : undefined}
                  rightIcon={useRightIcon ? <Info className="w-4 h-4" /> : undefined}
                  disabled={disabled}
                >
                  {childrenText || undefined}
                </Button>
              )}

              {activeTab === "code" && (
                <pre className="w-full p-5 bg-[#08060d] text-emerald-400 font-mono text-xs leading-relaxed rounded-xl overflow-x-auto text-left shadow-lg">
                  <code>{computeCodeSnippet()}</code>
                </pre>
              )}

              {activeTab === "schema" && (
                <div className="w-full text-left overflow-x-auto">
                  <table className="w-full text-xs text-zinc-600">
                    <thead>
                      <tr className="border-b border-[#e5e4e7] text-zinc-400 font-bold text-[10px] uppercase tracking-wider">
                        <th className="pb-2 text-left">Property Controller</th>
                        <th className="pb-2 text-left">Type Definition</th>
                        <th className="pb-2 text-left">Fallback Default</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e4e7]">
                      {buttonDocSchema.propsList.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 font-bold text-zinc-900">{item.name}</td>
                          <td className="py-2.5 font-mono text-[#aa3bff]">{item.type}</td>
                          <td className="py-2.5 font-mono">{item.default}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "a11y" && (
                <ul className="w-full text-left list-disc pl-5 space-y-3 text-sm text-zinc-600 font-medium">
                  {buttonDocSchema.accessibility.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Core Multi-Variant Controller Management Console Terminal */}
          <div className="border border-[#e5e4e7] bg-white rounded-2xl p-6 shadow-sm space-y-5 text-left h-auto max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold text-[11px] uppercase tracking-wider text-zinc-400">Props Matrix Terminal (15+ Controllers)</h3>
            
            {/* 1. Content Node Controller */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500">children (Static Text Fallback Override)</label>
              <input type="text" value={childrenText} onChange={(e) => setChildrenText(e.target.value)} placeholder="Leaving blank enforces default standard content..." className="w-full p-2 text-xs border border-[#e5e4e7] rounded-md outline-none bg-zinc-50 focus:bg-white focus:border-[#aa3bff]" />
            </div>

            {/* 2. Visual Variant Engine */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500">variant</label>
              <select value={variant} onChange={(e: any) => setVariant(e.target.value)} className="w-full p-2 text-xs border border-[#e5e4e7] rounded-md outline-none bg-zinc-50">
                <option value="default">default</option>
                <option value="outline">outline</option>
                <option value="secondary">secondary</option>
                <option value="destructive">destructive</option>
                <option value="ghost">ghost</option>
                <option value="glass">glass</option>
              </select>
            </div>

            {/* 3. Dimension Scale Engine */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500">size</label>
              <select value={size} onChange={(e: any) => setSize(e.target.value)} className="w-full p-2 text-xs border border-[#e5e4e7] rounded-md outline-none bg-zinc-50">
                <option value="xs">xs</option>
                <option value="sm">sm</option>
                <option value="default">default</option>
                <option value="lg">lg</option>
                <option value="xl">xl</option>
              </select>
            </div>

            {/* 4. Smooth Mask Rounding Scale */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500">rounded</label>
              <select value={rounded} onChange={(e: any) => setRounded(e.target.value)} className="w-full p-2 text-xs border border-[#e5e4e7] rounded-md outline-none bg-zinc-50">
                <option value="none">none</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
                <option value="full">full</option>
              </select>
            </div>

            {/* 5. Depth Shadow Level Engine */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500">elevation</label>
              <select value={elevation} onChange={(e: any) => setElevation(e.target.value)} className="w-full p-2 text-xs border border-[#e5e4e7] rounded-md outline-none bg-zinc-50">
                <option value="none">none</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
              </select>
            </div>

            {/* 6. Runtime Micro-Animations Control */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500">animation</label>
              <select value={animation} onChange={(e: any) => setAnimation(e.target.value)} className="w-full p-2 text-xs border border-[#e5e4e7] rounded-md outline-none bg-zinc-50">
                <option value="none">none</option>
                <option value="pulse">pulse</option>
                <option value="bounce">bounce (on Hover)</option>
                <option value="scaleUp">scaleUp</option>
              </select>
            </div>

            {/* 7. Loading States & Feedback Override Text */}
            <div className="p-3 bg-zinc-50 border border-dashed border-[#e5e4e7] rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-600">isLoading state active</label>
                <input type="checkbox" checked={isLoading} onChange={(e) => setIsLoading(e.target.checked)} className="rounded text-[#aa3bff] focus:ring-[#aa3bff]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 block">loadingText Value</label>
                <input type="text" value={loadingText} onChange={(e) => setLoadingText(e.target.value)} disabled={!isLoading} className="w-full p-1.5 text-xs border border-[#e5e4e7] bg-white rounded-md outline-none" />
              </div>
            </div>

            {/* 8. Floating Status Badges Controls */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500">badgeCount indicator</label>
              <input type="number" min="0" max="99" value={badgeCount} onChange={(e) => setBadgeCount(parseInt(e.target.value) || 0)} className="w-full p-2 text-xs border border-[#e5e4e7] rounded-md outline-none bg-zinc-50" />
            </div>

            {/* 9. Layout Management Gap Engine */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500">iconGap distance metrics</label>
              <select value={iconGap} onChange={(e: any) => setIconGap(e.target.value)} className="w-full p-2 text-xs border border-[#e5e4e7] rounded-md outline-none bg-zinc-50">
                <option value="xs">xs</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
              </select>
            </div>

            {/* Toggle Configuration Checkboxes For Multi-state Options */}
            <div className="border-t border-[#e5e4e7] pt-4 space-y-2 text-xs font-semibold text-zinc-600">
              <div className="flex items-center justify-between">
                <span>fullWidth blocks geometry</span>
                <input type="checkbox" checked={fullWidth} onChange={(e) => setFullWidth(e.target.checked)} className="rounded text-[#aa3bff]" />
              </div>
              <div className="flex items-center justify-between">
                <span>Inject leftIcon element node</span>
                <input type="checkbox" checked={useLeftIcon} onChange={(e) => setUseLeftIcon(e.target.checked)} className="rounded text-[#aa3bff]" />
              </div>
              <div className="flex items-center justify-between">
                <span>Inject rightIcon element node</span>
                <input type="checkbox" checked={useRightIcon} onChange={(e) => setUseRightIcon(e.target.checked)} className="rounded text-[#aa3bff]" />
              </div>
              <div className="flex items-center justify-between">
                <span>hapticFeedback pulse simulation</span>
                <input type="checkbox" checked={hapticFeedback} onChange={(e) => setHapticFeedback(e.target.checked)} className="rounded text-[#aa3bff]" />
              </div>
              <div className="flex items-center justify-between">
                <span>disabled native flag</span>
                <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} className="rounded text-[#aa3bff]" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
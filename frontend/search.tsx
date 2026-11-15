import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from './components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'

type Entry = { ref: string; title: string; section: string; excerpt: string; body: string }
function SearchDialog({ indexUrl, siteTitle }: { indexUrl: string; siteTitle: string }) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [entries, setEntries] = React.useState<Entry[]>([])
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const trigger = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen(value => !value) }
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [])
  React.useEffect(() => {
    if (!open || status === 'ready') return
    setStatus('loading')
    const controller = new AbortController()
    fetch(indexUrl, { signal: controller.signal }).then(r => { if (!r.ok) throw Error(); return r.json() }).then(data => { setEntries(data); setStatus('ready') }).catch(e => { if (e.name !== 'AbortError') setStatus('error') })
    return () => controller.abort()
  }, [open, indexUrl])
  const trimmed = query.trim().toLocaleLowerCase()
  const terms = trimmed.split(/\s+/).filter(Boolean)
  const results = terms.length ? entries.filter(item => {
    const text = `${item.title} ${item.section} ${item.excerpt} ${item.body}`.toLocaleLowerCase()
    return terms.every(term => text.includes(term))
  }).sort((a, b) => Number(b.title.toLocaleLowerCase().includes(trimmed)) - Number(a.title.toLocaleLowerCase().includes(trimmed))).slice(0, 12) : []
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button ref={trigger} variant="outline" className="search-trigger" aria-label="搜索文档"><span>搜索文档...</span><kbd>Ctrl K</kbd></Button></DialogTrigger>
    <DialogContent
      className="search-dialog"
      overlayClassName="search-overlay"
      data-has-query={terms.length > 0}
      onCloseAutoFocus={event => {
        if (trigger.current?.getClientRects().length) return
        const more = document.querySelector<HTMLButtonElement>('.header-more')
        if (!more?.getClientRects().length) return
        event.preventDefault()
        more.focus()
      }}
      closeContent={<>
        <span className="search-close-label">关闭</span>
        <svg className="search-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </>}
    >
      <DialogHeader><DialogTitle>搜索 {siteTitle}</DialogTitle><DialogDescription>搜索标题与文章内容，快速找到你需要的笔记。</DialogDescription></DialogHeader>
      <label className="search-field"><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="请输入搜索内容" aria-label="搜索文章" enterKeyHint="search" /></label>
      <div className="search-results" aria-live="polite">
        {status === 'error' ? <p>搜索索引加载失败，请关闭后重试。</p> : status !== 'ready' ? <p>正在加载搜索索引…</p> : !terms.length ? <p>输入关键词开始搜索。</p> : !results.length ? <p>没有找到相关文档。</p> : results.map(item => <a key={item.ref} href={item.ref}><strong>{item.title}</strong><small>{item.section}</small><span>{item.excerpt}</span></a>)}
      </div>
    </DialogContent>
  </Dialog>
}
const root = document.getElementById('noteharbor-search')
if (root && root.dataset.index) createRoot(root).render(<SearchDialog indexUrl={root.dataset.index} siteTitle={root.dataset.title || document.title} />)

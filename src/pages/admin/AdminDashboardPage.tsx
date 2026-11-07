import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Newspaper, Users2, ArrowUpRight } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { listWiseConnectInquiries, type StoredInquiry } from '@/lib/wiseConnect'

export function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listWiseConnectInquiries().then((s) => {
      setInquiries(s)
      setLoading(false)
    })
  }, [])

  // Aggregate by inquiry type
  const byType: Record<string, number> = {}
  for (const item of inquiries) {
    const type = item.values?.inquiryType || 'General / Other'
    byType[type] = (byType[type] ?? 0) + 1
  }

  return (
    <div>
      <Reveal>
        <h1 className="font-display text-2xl font-bold text-plum sm:text-3xl">Dashboard</h1>
        <p className="mt-2 text-plum/60">Overview of inquiries and portal management.</p>
      </Reveal>

      {loading ? (
        <p className="mt-8 text-plum/50">Loading…</p>
      ) : (
        <>
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
            <RevealItem>
              <StatCard label="Total Inquiries" value={inquiries.length} />
            </RevealItem>
            <RevealItem>
              <Link
                to="/admin/wise-connect"
                className="group flex flex-col justify-between rounded-2xl border border-plum/10 bg-white p-5 shadow-card transition-all duration-300 hover:border-teal/30 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-plum/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal" />
                </div>
                <div className="mt-4">
                  <p className="font-display text-lg font-bold text-plum">WISE Connect</p>
                  <p className="text-xs text-plum/60">View contact inquiries</p>
                </div>
              </Link>
            </RevealItem>
            <RevealItem>
              <Link
                to="/admin/happenings"
                className="group flex flex-col justify-between rounded-2xl border border-plum/10 bg-white p-5 shadow-card transition-all duration-300 hover:border-teal/30 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Newspaper className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-plum/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal" />
                </div>
                <div className="mt-4">
                  <p className="font-display text-lg font-bold text-plum">Happenings</p>
                  <p className="text-xs text-plum/60">Publish stories & updates</p>
                </div>
              </Link>
            </RevealItem>
            <RevealItem>
              <Link
                to="/admin/team"
                className="group flex flex-col justify-between rounded-2xl border border-plum/10 bg-white p-5 shadow-card transition-all duration-300 hover:border-teal/30 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Users2 className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-plum/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal" />
                </div>
                <div className="mt-4">
                  <p className="font-display text-lg font-bold text-plum">Team Members</p>
                  <p className="text-xs text-plum/60">Manage team profiles</p>
                </div>
              </Link>
            </RevealItem>
          </RevealGroup>

          {Object.keys(byType).length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-10 rounded-3xl border border-plum/10 bg-white p-6 shadow-card">
                <h2 className="font-display text-lg font-semibold text-plum">
                  Inquiries by category
                </h2>
                <div className="mt-4 space-y-2">
                  {Object.entries(byType).map(([type, count]) => (
                    <div key={type} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 truncate text-sm text-plum/70 sm:w-48">
                        {type}
                      </span>
                      <div className="h-2 flex-1 rounded-full bg-plum/5">
                        <div
                          className="h-2 rounded-full bg-teal"
                          style={{
                            width: `${inquiries.length ? (count / inquiries.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right text-sm font-semibold text-plum">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-plum/10 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-plum/45">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-bold text-plum">{value}</p>
    </div>
  )
}

import { useEffect, useState } from 'react';
import { Header } from './Header';
import { StatsGrid } from './StatsGrid';
import { FilterDropdown } from './FilterDropdown';
import { SearchBox } from './SearchBox';
import { FeedbackCard } from './FeedbackCard';
import { Modal } from './Modal';
import { fetchStats, fetchFeedbacks, submitResponse } from './lib/api';
import type { Feedback, Stats } from './lib/api';

export default function ResponsePage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState<'all' | 'replied' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [s, f] = await Promise.all([fetchStats(), fetchFeedbacks(filter, search)]);
      setStats(s);
      setFeedbacks(f);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMsg);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search]);

  const handleSubmit = async (id: number, message: string) => {
    try {
      await submitResponse(id, message);
      // refresh
      await load();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to submit response';
      setError(errorMsg);
      console.error('Error submitting response:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      
      <div className="bg-gradient-to-br from-[#2d0a6b] via-[#5b247a] to-[#e94e77] px-8 pt-12 pb-16 border-b border-white/20">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="font-['Syne'] text-4xl font-bold text-white m-0 mb-2">Trainee Feedback</h1>
          <p className="text-base text-white/70 m-0 mb-10">Review and respond to student feedback for trainers</p>
          <StatsGrid stats={stats} />
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 py-8">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Error loading data</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">Make sure the backend server is running on http://localhost:3001</p>
            <button 
              onClick={() => load()}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
            >
              Retry
            </button>
          </div>
        )}
        
        <div className="flex gap-3 items-center mb-6">
          <SearchBox value={search} onChange={e => setSearch(e.target.value)} />
          <FilterDropdown
            options={[
              { value: 'all', label: 'All Feedbacks' },
              { value: 'replied', label: 'Replied' },
              { value: 'pending', label: 'Pending' }
            ]}
            selected={filter}
            onChange={(v) => setFilter(v as any)}
          />
        </div>

        <div className="flex flex-col gap-3">
          {loading && <div className="text-center text-white/70 py-16">Loading feedback…</div>}
          {!loading && feedbacks.length === 0 && <div className="text-center text-white/70 py-16">No feedback found.</div>}
          {!loading && feedbacks.map(f => (
            <FeedbackCard key={f.id} feedback={f} onClick={() => setSelected(f)} />
          ))}
        </div>
      </div>

      {selected && (
        <Modal
          feedback={selected}
          onClose={() => setSelected(null)}
          onSubmit={async (id, message) => {
            await handleSubmit(id, message);
          }}
        />
      )}
    </div>
  );
}
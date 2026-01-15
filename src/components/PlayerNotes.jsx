import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotesForPlayer, createNote, deleteNote } from '../services/features';

function PlayerNotes({ playerId, playerName }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && playerId) {
      fetchNotes();
    }
  }, [user, playerId]);

  const fetchNotes = async () => {
    try {
      const data = await getNotesForPlayer(playerId);
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      setLoading(true);
      await createNote(playerId, playerName, newNote, category || null);
      setNewNote('');
      setCategory('');
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!confirm('Delete this note?')) return;

    try {
      await deleteNote(noteId);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  };

  if (!user) return null;

  return (
    <div className="bg-[#0a0a0a]/50 border border-white/5 rounded-sm backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1 h-1 bg-indigo-500 rounded-full"></span> INTEL NOTES
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-[9px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider transition-colors"
          >
            {showForm ? '✕ CANCEL' : '+ NEW'}
          </button>
        </div>

        {showForm && (
          <div className="mb-4 space-y-3 p-4 bg-black/20 border border-white/5 rounded-sm">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Log intelligence about this operative..."
              className="w-full bg-zinc-900 border border-white/10 rounded-sm px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 text-xs font-mono"
              rows="3"
            />
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-zinc-900 border border-white/10 rounded-sm px-3 py-2 text-white text-[10px] font-bold uppercase focus:outline-none focus:border-indigo-500 tracking-wider"
              >
                <option value="">GENERAL</option>
                <option value="rival">⚔️ RIVAL</option>
                <option value="friend">🤝 ALLY</option>
                <option value="study">📊 ANALYSIS</option>
                <option value="avoid">⚠️ THREAT</option>
              </select>
              <button
                onClick={handleAddNote}
                disabled={loading || !newNote.trim()}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-sm text-[10px] font-black uppercase tracking-wider transition-all"
              >
                {loading ? 'SAVING...' : 'LOG NOTE'}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {notes.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-white/5 rounded-sm">
              <p className="text-zinc-700 text-[10px] uppercase tracking-wider">NO INTEL LOGGED</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="bg-black/30 border border-white/5 rounded-sm p-3 hover:border-white/10 transition-colors group">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    {note.category && (
                      <span className="inline-block text-[9px] text-indigo-400 font-black uppercase tracking-wider mb-1 bg-indigo-500/10 px-2 py-0.5 rounded-sm">
                        {note.category}
                      </span>
                    )}
                    <p className="text-zinc-300 text-xs leading-relaxed font-mono">{note.note}</p>
                    <p className="text-zinc-700 text-[9px] mt-2 uppercase tracking-wider">
                      LOGGED: {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-zinc-600 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerNotes;
import { Download, FileText, ExternalLink } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'

export function StudentNotes() {
  const demoNotes = [
    { id: 1, title: 'Data Structures - Lecture 1', subject: 'CSE', type: 'PDF', size: '2.4 MB', url: 'https://www.tutorialspoint.com/data_structures_algorithms/data_structures_algorithms_tutorial.pdf' },
    { id: 2, title: 'Operating Systems - Process Management', subject: 'CSE', type: 'PDF', size: '1.8 MB', url: 'https://codex.cs.yale.edu/avi/os-book/OS9/practice-exercises/PDF-practice-solu-dir/3.pdf' },
    { id: 3, title: 'Discrete Mathematics - Graph Theory', subject: 'Math', type: 'DOCX', size: '1.1 MB', url: '#' },
    { id: 4, title: 'Computer Networks - OSI Model', subject: 'CSE', type: 'PDF', size: '3.5 MB', url: '#' },
    { id: 5, title: 'Database Systems - Normalization', subject: 'CSE', type: 'PDF', size: '2.1 MB', url: '#' },
  ]

  return (
    <Panel>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demoNotes.map((note) => (
          <div key={note.id} className={`${card} flex flex-col justify-between group hover:bg-slate-800/40 transition-all`}>
            <div className="mb-4">
              <div className="mb-3 rounded-lg bg-slate-900/60 p-3 w-fit text-cyan-400">
                <FileText size={24} />
              </div>
              <h4 className="font-bold text-slate-100 mb-1">{note.title}</h4>
              <p className="text-xs text-slate-400">{note.subject} | {note.type} | {note.size}</p>
            </div>
            
            <a 
              href={note.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${button} bg-slate-900/60 hover:bg-indigo-600/20 hover:text-indigo-400 flex items-center justify-center gap-2 border border-slate-700`}
            >
              <Download size={16} /> Download
            </a>
          </div>
        ))}
      </div>
    </Panel>
  )
}

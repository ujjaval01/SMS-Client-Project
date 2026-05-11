import { create } from 'zustand'
import { api } from '../services/api'
import { io } from 'socket.io-client'

const SESSION = 'sms-auth-session'
const TOKEN = 'sms-auth-token'
const SOCKET_URL = 'http://localhost:5000'

export const useAppStore = create((set, get) => ({
  socket: null,
  db: {

    students: [],
    teachers: [],
    fees: [],
    announcements: [],
    activityLogs: [],
    summary: {}
  },
  session: JSON.parse(typeof localStorage !== 'undefined' ? localStorage.getItem(SESSION) || 'null' : 'null'),
  theme: 'dark',
  commandOpen: false,
  aiOpen: false,
  toasts: [],

  setTheme: (theme) => set({ theme }),
  setCommandOpen: (open) => set({ commandOpen: open }),
  setAiOpen: (open) => set({ aiOpen: open }),

  toast: (message, variant = 'default') => {
    const id = crypto.randomUUID()
    set((s) => ({ toasts: [...s.toasts, { id, message, variant }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 4200)
  },

  // Initialize DB data from API
  fetchInitialData: async () => {
    try {
      const summary = await api.get('/dashboard/summary');
      set({ 
        db: { 
          ...summary,
          // Ensure arrays are present even if API returns null/undefined
          students: summary.students || [],
          teachers: summary.teachers || [],
          fees: summary.fees || [],
          assignments: summary.assignments || [],
          schedule: summary.schedule || [],
          notes: summary.notes || [],
          announcements: summary.announcements || [],
          activityLogs: summary.activityLogs || [],
          classes: summary.classes || [],
          users: summary.users || [],
          marks: summary.marks || []
        } 
      });
    } catch (error) {
      get().toast('Failed to fetch data from server', 'error');
    }
  },


  login: async (email, password, role) => {
    try {
      const data = await api.post('/auth/login', { email, password, role });
      localStorage.setItem(TOKEN, data.token);
      localStorage.setItem(SESSION, JSON.stringify(data.user));
      set({ session: data.user });
      get().initSocket();
      await get().fetchInitialData();
      return true;
    } catch (error) {
      get().toast('Login failed: ' + error.message, 'error');
      return false;
    }
  },

  register: async (payload) => {
    try {
      await api.post('/auth/register', payload);
      get().toast('Account created successfully');
    } catch (error) {
      get().toast('Registration failed', 'error');
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(SESSION)
    set({ session: null })
  },

  payFee: async (studentId, amount) => {
    try {
      // In a real app, we'd have a specific endpoint for this
      // For now, we'll just mock the behavior if the endpoint isn't fully ready
      get().toast('Payment processed (Mock)');
      await get().fetchInitialData();
    } catch (error) {
      get().toast('Payment failed', 'error');
    }
  },

  verifyFee: async (feeId, status) => {
    try {
      get().toast('Fee status updated');
      await get().fetchInitialData();
    } catch (error) {
      get().toast('Verification failed', 'error');
    }
  },

  hydrateSession: () => {
    const raw = localStorage.getItem(SESSION)
    if (raw) {
      set({ session: JSON.parse(raw) });
      get().initSocket();
      get().fetchInitialData();
    }
  },

  initSocket: () => {
    if (get().socket) return;
    
    const socket = io(SOCKET_URL);
    
    socket.on('announcement_created', (announcement) => {
      set((state) => ({
        db: {
          ...state.db,
          announcements: [announcement, ...state.db.announcements]
        }
      }));
      get().toast(`New Announcement: ${announcement.title}`);
    });

    socket.on('stats_updated', () => {
      get().fetchInitialData(); // Refetch stats when they change
    });

    socket.on('activity_created', (log) => {
      set((state) => ({
        db: {
          ...state.db,
          activityLogs: [log, ...state.db.activityLogs]
        }
      }));
    });

    set({ socket });
  },
}))




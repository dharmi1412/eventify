// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
import { useState, useEffect } from 'react'
import './App.css'
import { api, getToken, setToken, normalizeEvent } from './api/client.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [view, setView] = useState('dashboard')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Music', date: '', time: '', location: '', status: 'Active', price: '', emoji: '🎪', seats: 100, bannerUrl: '' })

  useEffect(() => {
    const token = getToken()
    if (token) {
      setIsLoggedIn(true)
      fetchEvents()
    }
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await api('/events')
      setEvents(response.data.events.map(normalizeEvent))
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await api('/auth/login', {
        method: 'POST',
        body: { email: loginForm.email, password: loginForm.password },
        skipAuth: true
      })
      setToken(response.data.token)
      setIsLoggedIn(true)
      setLoginError('')
      await fetchEvents()
    } catch (error) {
      setLoginError(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setToken(null)
    setIsLoggedIn(false)
    setLoginForm({ email: '', password: '' })
    setEvents([])
  }

  const handleCreate = () => {
    setView('create')
    setFormData({ title: '', description: '', category: 'Music', date: '', time: '', location: '', orgStatus: 'Active', price: '', emoji: '🎪', seats: 100, bannerUrl: '' })
    setEditingEvent(null)
  }

  const handleEdit = (event) => {
    setView('edit')
    setEditingEvent(event)
    setFormData({
      title: event.title || '',
      description: event.description || '',
      category: event.category || 'Music',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      orgStatus: event.orgStatus || 'Active',
      price: event.price || '',
      emoji: event.emoji || '🎪',
      seats: event.seats || 100,
      bannerUrl: event.bannerUrl || ''
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setLoading(true)
        await api(`/events/${id}`, { method: 'DELETE' })
        setEvents(events.filter(e => e.id !== id))
      } catch (error) {
        console.error('Failed to delete event:', error)
        alert('Failed to delete event: ' + (error.message || 'Unknown error'))
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const eventData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        orgStatus: formData.orgStatus,
        price: parseFloat(formData.price),
        emoji: formData.emoji,
        seats: parseInt(formData.seats),
        bannerUrl: formData.bannerUrl
      }

      if (editingEvent) {
        const response = await api(`/events/${editingEvent.id}`, {
          method: 'PATCH',
          body: eventData
        })
        setEvents(events.map(e => e.id === editingEvent.id ? normalizeEvent(response.data.event) : e))
      } else {
        const response = await api('/events', {
          method: 'POST',
          body: eventData
        })
        setEvents([...events, normalizeEvent(response.data.event)])
      }
      setView('dashboard')
      setFormData({ title: '', description: '', category: 'Music', date: '', time: '', location: '', orgStatus: 'Active', price: '', emoji: '🎪', seats: 100, bannerUrl: '' })
      setEditingEvent(null)
    } catch (error) {
      console.error('Failed to save event:', error)
      alert('Failed to save event: ' + (error.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setView('dashboard')
    setFormData({ title: '', description: '', category: 'Music', date: '', time: '', location: '', orgStatus: 'Active', price: '', emoji: '🎪', seats: 100, bannerUrl: '' })
    setEditingEvent(null)
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h1 className="admin-login-title">Admin Panel</h1>
          <p className="admin-login-subtitle">Sign in to manage events</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label>Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="Enter email"
                required
                disabled={loading}
              />
            </div>
            <div className="admin-form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>
            {loginError && <p className="admin-error">{loginError}</p>}
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <h1 className="admin-nav-title">Eventify Admin</h1>
        <button onClick={handleLogout} className="admin-btn admin-btn-logout">Logout</button>
      </nav>

      <div className="admin-content">
        {view === 'dashboard' && (
          <>
            <div className="admin-header">
              <h2>Events Management</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={fetchEvents} className="admin-btn admin-btn-secondary" disabled={loading}>
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
                <button onClick={handleCreate} className="admin-btn admin-btn-primary" disabled={loading}>+ Create Event</button>
              </div>
            </div>
            {loading && events.length === 0 ? (
              <p>Loading events...</p>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Emoji</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Seats</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(event => (
                      <tr key={event.id}>
                        <td>{event.emoji || '🎪'}</td>
                        <td>{event.title}</td>
                        <td>{event.category}</td>
                        <td>{event.date}</td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                        <td>
                          <span className={`admin-status admin-status-${(event.orgStatus || 'active').toLowerCase()}`}>
                            {event.orgStatus || 'Active'}
                          </span>
                        </td>
                        <td>${event.price}</td>
                        <td>{event.booked || 0}/{event.seats}</td>
                        <td>
                          <button onClick={() => handleEdit(event)} className="admin-btn admin-btn-small admin-btn-edit" disabled={loading}>Edit</button>
                          <button onClick={() => handleDelete(event.id)} className="admin-btn admin-btn-small admin-btn-delete" disabled={loading}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {events.length === 0 && !loading && <p style={{ padding: '20px', textAlign: 'center' }}>No events found</p>}
              </div>
            )}
          </>
        )}

        {(view === 'create' || view === 'edit') && (
          <div className="admin-form-container">
            <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Event title"
                  required
                  disabled={loading}
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event description"
                  rows="3"
                  disabled={loading}
                />
              </div>
              <div className="admin-form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  disabled={loading}
                >
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Arts">Arts</option>
                  <option value="Technology">Technology</option>
                  <option value="Food">Food</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div className="admin-form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div className="admin-form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Event location"
                  required
                  disabled={loading}
                />
              </div>
              <div className="admin-form-group">
                <label>Status</label>
                <select
                  value={formData.orgStatus}
                  onChange={(e) => setFormData({ ...formData, orgStatus: e.target.value })}
                  disabled={loading}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Pending">Pending</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Price </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Event price"
                  required
                  min="0"
                  step="0.01"
                  disabled={loading}
                />
              </div>
              <div className="admin-form-group">
                <label>Emoji</label>
                <input
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  placeholder="🎪"
                  maxLength="2"
                  disabled={loading}
                />
              </div>
              <div className="admin-form-group">
                <label>Total Seats</label>
                <input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  placeholder="Total seats"
                  required
                  min="1"
                  disabled={loading}
                />
              </div>
              <div className="admin-form-group">
                <label>Banner URL (optional)</label>
                <input
                  type="url"
                  value={formData.bannerUrl}
                  onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                  placeholder="https://example.com/banner.jpg"
                  disabled={loading}
                />
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingEvent ? 'Update Event' : 'Create Event')}
                </button>
                <button type="button" onClick={handleCancel} className="admin-btn admin-btn-secondary" disabled={loading}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import RecordModal from '../components/RecordModal';
import { Plus, Eye, Edit, Trash2, Power, LogOut, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState({ total: 0, active: 0, inactive: 0, records: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      const res = await API.get('/records');
      if (res.data.success) setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      await API.patch(`/records/${id}/toggle-status`);
      fetchRecords();
    } catch (err) {
      alert('Status change error!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Kya aap is record ko delete karna chahte hain?')) {
      try {
        await API.delete(`/records/${id}`);
        fetchRecords();
      } catch (err) {
        alert('Delete fail ho gaya!');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans p-6">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center pb-6 border-b border-zinc-800">
        <h1 className="text-xl font-bold tracking-widest text-white uppercase">VERITAS CONTROL PANEL</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-4 py-2 rounded text-sm transition">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Records</p>
            <p className="text-3xl font-bold text-white mt-1">{data.total}</p>
          </div>
          <FileText className="w-8 h-8 text-zinc-600" />
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Active Records</p>
            <p className="text-3xl font-bold text-emerald-400 mt-1">{data.active}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-500/50" />
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Inactive Records</p>
            <p className="text-3xl font-bold text-red-400 mt-1">{data.inactive}</p>
          </div>
          <XCircle className="w-8 h-8 text-red-500/50" />
        </div>
      </div>

      {/* Action Bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-zinc-300">Document Records</h2>
        <button 
          onClick={() => { setSelectedRecord(null); setIsModalOpen(true); }}
          className="bg-white text-black font-medium px-4 py-2 rounded flex items-center gap-2 hover:bg-zinc-200 transition text-sm"
        >
          <Plus className="w-4 h-4" /> Add New Record
        </button>
      </div>

      {/* Records Table */}
      <div className="max-w-7xl mx-auto bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950 text-zinc-300 uppercase text-xs border-b border-zinc-800">
              <tr>
                <th className="p-4">Deliverable ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Document ID</th>
                <th className="p-4">Company</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {data.records.map((rec) => (
                <tr key={rec._id} className="hover:bg-zinc-800/30 transition">
                  <td className="p-4 font-mono text-white">{rec.deliverableId}</td>
                  <td className="p-4 text-zinc-200">{rec.name}</td>
                  <td className="p-4">{rec.documentId}</td>
                  <td className="p-4">{rec.company}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${rec.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                      {rec.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Public View Button with Random String URL */}
                      <button 
                        onClick={() => window.open(`/view-doc/viewUYFUYFUYFUYFUfuFUFYpiuIHDPTIHJIDTIDTHJDTIOHJDIOTJHDIOTHJIHDITHJDIOTHgIUGIOTHOIDRH/${rec._id}`, '_blank')} 
                        className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded" 
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setSelectedRecord(rec); setIsModalOpen(true); }} className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleToggleStatus(rec._id)} className={`p-2 rounded text-zinc-200 ${rec.isActive ? 'bg-zinc-800 hover:bg-emerald-800' : 'bg-zinc-800 hover:bg-red-800'}`} title="Toggle Active Status">
                        <Power className={`w-4 h-4 ${rec.isActive ? 'text-emerald-400' : 'text-red-400'}`} />
                      </button>
                      <button onClick={() => handleDelete(rec._id)} className="p-2 bg-zinc-800 hover:bg-red-900/80 text-zinc-200 rounded" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.records.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-zinc-600">Koi record nahi mila. Pehla record add karein!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Popup Modal */}
      {isModalOpen && (
        <RecordModal 
          record={selectedRecord} 
          onClose={() => setIsModalOpen(false)} 
          onRefresh={fetchRecords} 
        />
      )}
    </div>
  );
}
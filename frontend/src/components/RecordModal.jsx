import React, { useState } from 'react';
import API from '../services/api';
import { X } from 'lucide-react';

export default function RecordModal({ record, onClose, onRefresh }) {
  const [formData, setFormData] = useState(record || {
    deliverableId: '',
    publishedOn: '',
    qrCodeStatus: 'VALIDATED',
    name: '',
    documentId: '',
    issuedOn: '',
    validUntil: '',
    type: '',
    model: 'N/A',
    company: 'PRIVATE',
    trainingLocation: 'JUBAIL',
    trainer: 'AHMED NAZEER'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (record) {
        await API.put(`/records/${record._id}`, formData);
      } else {
        await API.post('/records', formData);
      }
      onRefresh();
      onClose();
    } catch (err) {
      alert('Save fail ho gaya!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-xl p-6 text-white max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-4">
          <h3 className="text-lg font-bold">{record ? 'Edit Record' : 'Add New Record'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => {
            if (key === '_id' || key === 'createdAt' || key === 'updatedAt' || key === '__v' || key === 'isActive') return null;
            return (
              <div key={key}>
                <label className="block text-xs uppercase text-zinc-400 mb-1">{key}</label>
                <input 
                  type="text" 
                  name={key} 
                  value={formData[key]} 
                  onChange={handleChange} 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
                  required
                />
              </div>
            );
          })}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-zinc-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-white text-black font-semibold rounded text-sm hover:bg-zinc-200">Save Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}
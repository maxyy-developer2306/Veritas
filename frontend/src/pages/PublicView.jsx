import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import ViewDocument from '../components/ViewDocument';
import { AlertTriangle } from 'lucide-react';

export default function PublicView() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await API.get(`/records/${id}`);
        if (res.data.success) {
          setRecord(res.data.record);
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setErrorMsg(err.response.data.message || 'Yeh document inactive hai!');
        } else {
          setErrorMsg('Record nahi mila ya URL galat hai!');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-zinc-100 flex items-center justify-center font-bold">Loading Document...</div>;
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <div className="bg-red-950/80 border border-red-600 max-w-md w-full p-6 rounded-lg text-center shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-red-400 mb-2">DOCUMENT INACTIVE</h2>
          <p className="text-red-200 text-sm">{errorMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-200 py-6 flex justify-center items-center">
      <ViewDocument data={record} />
    </div>
  );
}
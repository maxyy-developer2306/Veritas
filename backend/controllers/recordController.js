import Record from '../models/Record.js';

// Sabhi records aur stats (Total, Active, Inactive) fetch karne ke liye
export const getRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    const total = records.length;
    const active = records.filter(r => r.isActive).length;
    const inactive = total - active;

    res.status(200).json({ success: true, total, active, inactive, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Single record view karne ke liye (Public View ke liye status check)
export const getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record nahi mila!' });
    }
    
    // Agar record inactive hai to frontend par red message show karne ke liye flag bhehenge
    if (!record.isActive) {
      return res.status(403).json({ 
        success: false, 
        inactive: true, 
        message: 'This document is in active' 
      });
    }

    res.status(200).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Naya record add karne ke liye (Popup form se)
export const createRecord = async (req, res) => {
  try {
    const newRecord = await Record.create(req.body);
    res.status(201).json({ success: true, message: 'Record kamyabi se add ho gaya!', data: newRecord });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Record edit/update karne ke liye
export const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Record update ho gaya!', data: updatedRecord });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Record delete karne ke liye
export const deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Record delete ho gaya!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Status toggle karne ke liye (Active <-> Inactive)
export const toggleStatus = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'Record nahi mila' });

    record.isActive = !record.isActive;
    await record.save();

    res.status(200).json({ success: true, message: 'Status tabdeel ho gaya!', data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
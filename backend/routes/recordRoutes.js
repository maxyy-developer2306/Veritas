import express from 'express';
import { 
  getRecords, 
  getRecordById, 
  createRecord, 
  updateRecord, 
  deleteRecord, 
  toggleStatus 
} from '../controllers/recordController.js';
// Agar chhein toh JWT verification middleware yahan laga sakte hain protected routes par

const router = express.Router();

router.get('/', getRecords);
router.get('/:id', getRecordById);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);
router.patch('/:id/toggle-status', toggleStatus);

export default router;
const pool = require('./db');
const express = require('express');
const router = express.Router();
const { Student } = require('./index');

// Render the interface page
router.get('/interface', (req, res) => {
    const query = 'SELECT * from items';

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error reading data:', error);
            return res.status(500).send('Server error');
        }
        res.render('interface', { data: results.rows });
    });
});
router.post('/add', async (req, res) => {
    const { name, phone, email, password } = req.body;
    try {
        await pool.query('INSERT INTO items (name, phone, email, password) VALUES ($1, $2, $3, $4)', [name, phone, email, password]);
        res.redirect('/interface');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Failed to insert data');
    }
});

router.get('/read', (req, res) => {
    const query = 'SELECT * FROM items';

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error reading data:', error);
            return res.status(500).send('Server error');
        }
        res.json(results.rows);
    });
});
//////////////////////////////////////////////////////////////////


router.get('/update', (req, res) => {
    res.render('update', { student: null, error: null });
  });
  
  router.post('/update', async (req, res) => {
    try {
      const studentId = req.body.id;
      console.log('Searching for student with ID:', studentId); // Log the request ID
      const student = await Student.findOne({ where: { id: studentId } });
      if (student) {
        console.log('Student found:', student);
        res.render('update', { student, error: null });
      } else {
        console.log('Student not found with ID:', studentId); // Log when student is not found
        res.render('update', { error: 'Student not found', student: null });
      }
    } catch (err) {
      console.error('Error fetching student:', err);
      res.status(500).send('Error fetching student');
    }
  });
  
  router.post('/students/update/save', async (req, res) => {
    try {
        const { id, name, email, phone, password } = req.body;
        console.log('Received data for update:', req.body); // Log updated data

        // Check if all fields are present
        if (!id || !name || !email || !phone || !password) {
            throw new Error('All fields are required');
        }

        const updateResult = await Student.update({ name, email, phone, password }, {
            where: { id }
        });

        if (updateResult[0] === 0) {
            throw new Error('Update failed, no rows affected');
        }

        console.log('Student updated successfully');
        res.redirect('/interface');
    } catch (err) {
        console.error('Error updating student:', err.message);
        res.status(500).send(`Error updating student: ${err.message}`);
    }
})

/////////////////////////////////////////////////////////




router.post('/delete', (req, res) => {
    const { id } = req.body;

    const query = 'DELETE FROM items WHERE id = $1';
    const values = [id];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Server error');
        }
        res.redirect('/interface');
    });
});

module.exports = router;

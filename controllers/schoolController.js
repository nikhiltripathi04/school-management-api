// controllers/schoolController.js
const db = require('../config/db');

/**
 * @desc    Add a new school
 * @route   POST /api/addSchool
 */
const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // --- Basic Validation ---
  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: 'All fields (name, address, latitude, longitude) are required.' });
  }
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ message: 'Latitude and Longitude must be numbers.' });
  }

  try {
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, address, latitude, longitude]);
    res.status(201).json({
      message: 'School added successfully!',
      schoolId: result.insertId
    });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Error adding school to the database.' });
  }
};

/**
 * @desc    List schools sorted by proximity
 * @route   GET /api/listSchools
 */
const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  // --- Validation ---
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: 'User latitude and longitude are required.' });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ message: 'Invalid latitude or longitude format.' });
  }

  try {
    // Haversine formula to calculate distance in kilometers.
    // 6371 is the Earth's radius in km.
    const sql = `
      SELECT id, name, address, latitude, longitude,
        ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance
      FROM schools
      ORDER BY distance;
    `;

    const [schools] = await db.query(sql, [userLat, userLon, userLat]);
    res.status(200).json(schools);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Error fetching schools from the database.' });
  }
};

module.exports = { addSchool, listSchools };
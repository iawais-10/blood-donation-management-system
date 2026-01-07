const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function recreateDatabase() {
  console.log('🔄 Recreating database with appointment status support...');
  
  try {
    // Connect without selecting a database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: Number(process.env.DB_PORT || 3306),
      multipleStatements: true
    });

    console.log('✓ Connected to MySQL');

    // Read schema file
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('✓ Schema file loaded');

    // Execute schema
    await connection.query(schema);

    console.log('✓ Database recreated successfully!');
    console.log('\n📋 Default Admin Account:');
    console.log('   Email: admin@bdms.com');
    console.log('   Password: Admin@123');
    console.log('\n✨ Appointments now support approval workflow!');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error recreating database:', error.message);
    process.exit(1);
  }
}

recreateDatabase();

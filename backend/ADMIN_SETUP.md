# Admin Account Management

## Default Admin Account
After running the database schema (schema.sql), a default admin account is created:
- **Email:** admin@bdms.com
- **Password:** Admin@123

## Creating New Admin Accounts

You have two options to create admin accounts:

### Option 1: Using the Script (Recommended)
Run this command in the backend directory:
```bash
npm run create-admin
```

The script will prompt you for:
- Admin name
- Admin email
- Admin password (plain text - it will be hashed automatically)

### Option 2: Manual Database Insert
If you need to add admin directly via SQL with a plain password, first hash it:

1. Create a temporary file `hashPassword.js`:
```javascript
const bcrypt = require('bcrypt');
const password = 'YourPasswordHere';
bcrypt.hash(password, 10).then(hash => console.log(hash));
```

2. Run it:
```bash
node hashPassword.js
```

3. Insert into database:
```sql
INSERT INTO users (name, email, password, role)
VALUES ('Admin Name', 'admin@example.com', 'HASHED_PASSWORD_HERE', 'admin');
```

## Important Notes
- Admin accounts cannot be created through the signup page
- All admin accounts must be created manually via database or script
- Passwords are hashed using bcrypt (10 rounds)
- Admin role has no blood_group requirement

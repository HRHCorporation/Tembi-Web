-- Script untuk membuat user admin baru
-- Database: tembi_laravel
-- Password yang di-hash: admin123

USE tembi_laravel;

-- Insert new admin user
INSERT INTO users (name, email, password, role_id, created_at, updated_at)
VALUES (
    'Admin Tembi',
    'admin@tembi.com',
    '$2b$10$xkYs7gbDJara/NR1P.eJauiHslfkoOzbDpivSGZ6I.NzkV.DfkCBS',
    1,
    NOW(),
    NOW()
);

-- Verifikasi user yang baru dibuat
SELECT id, name, email, role_id, created_at FROM users WHERE email = 'admin@tembi.com';

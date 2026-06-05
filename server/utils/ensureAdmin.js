const AdminUser = require('../models/AdminUser');

const DEFAULT_ADMIN = {
  name: 'EVRE Superadmin',
  email: 'admin@gmail.com',
  passwordHash: 'Admin123',
  role: 'superadmin',
  isActive: true,
};

async function ensureAdminUser() {
  const existing = await AdminUser.findOne({ email: DEFAULT_ADMIN.email });
  if (existing) return;

  await AdminUser.create(DEFAULT_ADMIN);
  console.log(`Default admin created: ${DEFAULT_ADMIN.email} / ${DEFAULT_ADMIN.passwordHash}`);
}

module.exports = ensureAdminUser;

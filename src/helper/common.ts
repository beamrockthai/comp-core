import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 14);
}

export async function checkPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

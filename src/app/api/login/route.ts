import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // Bắt buộc chạy trên server

// Đọc danh sách users từ file JSON
const filePath = path.join(process.cwd(), "data", "users.json");
const getUsers = () => JSON.parse(fs.readFileSync(filePath, "utf8"));

export async function POST(req: Request) {
  const { email, password } = await req.json();
  let users = getUsers();

  // Kiểm tra tài khoản có tồn tại không
  const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json({ message: "Sai email hoặc mật khẩu!" }, { status: 401 });
  }

  return NextResponse.json({ message: "Đăng nhập thành công!" }, { status: 200 });
}

import { NextResponse } from "next/server";

// Giả lập danh sách tài khoản trong database
const users = [
  { email: "admin@example.com", password: "123456" },
  { email: "user@example.com", password: "password" },
];

export async function POST(req: Request) {

  const { email, password } = await req.json();//Lấy email & password từ request.
    
  // Kiểm tra xem email & password có đúng không
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ message: "Sai email hoặc mật khẩu" }, { status: 401 });
  }

  // Nếu đúng, trả về token giả lập
  return NextResponse.json({ message: "Đăng nhập thành công!", token: "fake-jwt-token" });
}

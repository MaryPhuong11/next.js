import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

// Đọc danh sách người dùng từ file JSON
const getUsers = () => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Lỗi khi đọc users.json:", error);
    return [];
  }
};

// Xử lý yêu cầu POST (Đăng ký)
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    let users = getUsers();

    // Kiểm tra nếu email đã tồn tại trong mảng users
if (Array.isArray(users) && users.some(user => user.email === email)) {
  return NextResponse.json({ message: "Email đã tồn tại!" }, { status: 400 });
}


    // Thêm người dùng mới vào danh sách
    users.push({ email, password });

    // Lưu danh sách người dùng vào file JSON
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });
  } catch (error) {
    console.error("Lỗi server:", error);
    return NextResponse.json({ message: "Lỗi server!", error: String(error) }, { status: 500 });
  }
}



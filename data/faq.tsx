import * as React from 'react'

const faq = {
  title: 'Câu hỏi thường gặp',
  items: [
    {
      q: 'NovaStack phù hợp với loại sản phẩm nào?',
      a: 'Phù hợp cho SaaS B2B, nền tảng nội bộ, marketplace và các hệ thống cần API ổn định, xác thực người dùng và khả năng mở rộng theo tải.',
    },
    {
      q: 'Có hỗ trợ TypeScript và React không?',
      a: 'Có. Toàn bộ SDK, starter kit và ví dụ tích hợp đều ưu tiên TypeScript, React và Next.js để đội ngũ frontend/backend đồng bộ codebase.',
    },
    {
      q: 'Triển khai trên cloud nào?',
      a: 'Hỗ trợ workflow triển khai cho Vercel, Netlify, AWS và container (Docker/Kubernetes). Bạn giữ toàn quyền kiểm soát môi trường production.',
    },
    {
      q: 'Dữ liệu và bảo mật được xử lý thế nào?',
      a: 'Áp dụng mô hình least-privilege, mã hóa đường truyền TLS, tách môi trường, và checklist bảo mật cho xác thực, secret management và audit log.',
    },
  ],
}

export default faq

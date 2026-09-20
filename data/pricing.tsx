import { HStack, Text } from '@chakra-ui/react'

export default {
  title: 'Gói dịch vụ theo quy mô đội ngũ',
  description:
    'Chọn mức truy cập phù hợp — từ prototype nhanh đến nền tảng vận hành production.',
  plans: [
    {
      id: 'starter',
      title: 'Starter',
      description: 'Cho indie hacker và prototype công nghệ.',
      price: 'Miễn phí',
      features: [
        { title: 'SDK lõi + ví dụ tích hợp' },
        { title: 'Auth cơ bản (email / OAuth)' },
        { title: 'API rate limit tiêu chuẩn' },
        { title: 'Deploy preview' },
        { title: 'Tài liệu công khai' },
        { title: 'Cộng đồng kỹ thuật' },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'pro',
      title: 'Pro',
      description: 'Cho đội ngũ sản phẩm đang chạy production.',
      price: 'Liên hệ',
      isRecommended: true,
      features: [
        { title: 'Mọi thứ trong Starter' },
        { title: 'Observability & alerting' },
        { title: 'Role-based access control' },
        { title: 'CI/CD pipeline mẫu' },
        { title: 'Hỗ trợ ưu tiên' },
        { title: 'SLA uptime 99.9%' },
        null,
        {
          title: 'Private beta features',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      description: 'Cho tổ chức cần bảo mật và scale lớn.',
      price: (
        <HStack>
          <Text>Custom</Text>
        </HStack>
      ),
      features: [
        { title: 'VPC / private networking' },
        { title: 'SSO & SCIM' },
        { title: 'Audit log nâng cao' },
        { title: 'Dedicated support engineer' },
        { title: 'Training nội bộ' },
        null,
        {
          title: 'Roadmap ưu tiên',
          iconColor: 'green.500',
        },
      ],
      action: {
        href: '#',
      },
    },
  ],
}

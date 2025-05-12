# Product Waitlist

A beautiful, production-ready waitlist and admin dashboard built with Next.js 13, Tailwind CSS, and shadcn/ui. Created by the Linconwaves team for developers.

![Product Waitlist Preview](https://images.pexels.com/photos/8439097/pexels-photo-8439097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🎨 Beautiful, modern UI with dark mode support
- 📱 Fully responsive design
- ⚡ Built with Next.js 13 App Router
- 🎭 Framer Motion animations
- 📊 Comprehensive admin dashboard
- 📧 Email management system
- 📈 Analytics and statistics
- 🔒 Authentication system
- 🎯 SEO optimized

## Tech Stack

- [Next.js 13](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Linconwaves/product-waitlist.git

# Navigate to the project
cd product-waitlist

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your application running.

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── admin/             # Admin dashboard pages
│   ├── globals.css        # Global styles
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Admin Dashboard

Access the admin dashboard at `/admin/login` with these default credentials:
- Username: `admin`
- Password: `password`

Features:
- Overview statistics
- Subscriber management
- Email campaign tools
- Settings configuration
- Unsubscribe analytics

## Customization

1. **Theme**: Modify `app/globals.css` and `tailwind.config.ts`
2. **Components**: Edit or create new components in `components/`
3. **Content**: Update text in respective page components
4. **Styling**: Customize Tailwind classes or add new styles

## Deployment

Build your application for production:

```bash
npm run build
```

The project is configured for static exports, making it easy to deploy to any static hosting platform.

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Support

If you find this project helpful, please give it a ⭐️ on GitHub!

## Created By

Built with ❤️ by the [Linconwaves](https://github.com/Linconwaves) team.
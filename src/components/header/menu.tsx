import Link from 'next/link';

export interface MenuProps {
  title: string;
  link: string;
}

const menuData: MenuProps[] = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'About',
    link: '/about',
  },
  {
    title: 'Github',
    link: 'https://github.com/frontend-is-fun/ai-timeline-next',
  },
];
const Menu = () => (
  <div className='text-white flex flex-row justify-start items-start'>
    {
      menuData.map((menu: MenuProps) => {
        const { title, link } = menu;
        return (
          <Link
            key={title}
            href={link}
            className='p-2 hover:underline cursor-pointer'
          >
            {title}
          </Link>
        );
      },
      )
    }
  </div>
);

export default Menu;

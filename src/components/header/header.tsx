import Logo from './logo';
import Menu from './menu';

const Header = () => (
  <div className='w-full bg-header-bg h-16 flex flex-row justify-between items-center px-8'>
    <Logo />
    <Menu />
  </div>
);

export default Header;

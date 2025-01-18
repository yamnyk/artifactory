import { FC } from 'preact/compat';

import Header from './Header';
import Footer from './Footer';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

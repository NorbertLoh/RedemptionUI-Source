import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import RedemptionPage from "./pages/RedemptionPage";
import { Layout, Menu, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';

import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const { Header } = Layout;


function App() {
  const navigate = useNavigate();

  // Navbar home button redirect.
  const goHome = () => {
    return navigate(`/`);
  }

  const items1: MenuProps['items'] = [{
    key: 1,
    icon: <HomeOutlined onClick={goHome} style={{ fontSize: 18, color: "white" }} />,
  }];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            iconMarginInlineEnd: 0,
          },
        },
      }}
    >
      <Layout className='mainContainer'>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Menu
            style={{ marginInlineStart: 0, flex: 'auto' }}
            inlineIndent={0}
            theme="dark"
            mode="horizontal"
            items={items1}
          />
        </Header>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/events/:id" Component={RedemptionPage} />
        </Routes>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

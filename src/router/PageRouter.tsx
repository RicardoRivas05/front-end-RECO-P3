import { Route, Routes, Link } from 'react-router-dom';
import { Report } from '../pages/Report';
import { Form } from '../pages/Form';
import { Start } from '../pages/Start';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content } = Layout;

export const PageRouter: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = (theme ).useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Inicio']}>
          <Menu.Item key="Start">
            <Link to="/">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="Report">
            <Link to="/Report">Reporte</Link>
          </Menu.Item>
          <Menu.Item key="Form">
            <Link to="/Form">Formulario</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ paddingTop: '10px', paddingRight: '20px', paddingBottom: '30px', paddingLeft: '20px' }}>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <Routes>
            <Route path="*" element={<Start />} />
            <Route path="/Inicio" element={<Start />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Form" element={<Form />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default PageRouter;

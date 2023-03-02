import React, { FC, useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EditOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import './PageRouter.css'
import { Report, Form } from '../pages'

const { Header, Sider, Content } = Layout;

export const RouterPage: FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <LineChartOutlined />,
              label: <Link to="/report" >Report </Link>,
            },
            {
              key: '2',
              icon: <EditOutlined />,
              label: <Link to="/form">Form </Link>,
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 10, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path='/report' element={<Report />} />
            <Route path='/form' element={<Form />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
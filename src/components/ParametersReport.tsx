import { Card, Col, Row, Button, Divider } from 'antd';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd/es/date-picker';
import { Select } from 'antd';
import { FundTwoTone } from '@ant-design/icons';
import { Space, Typography } from 'antd';

const style: React.CSSProperties = { padding: '8px 0' };
const { Text, Link } = Typography;
const { RangePicker } = DatePicker;

export const Parameters: React.FC = () => (
  <>
    <Divider orientation="left">Parametros</Divider>
    <Row justify="center" align="middle">
      <Col span={24}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{ width: '90%' }}>
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <div style={style}>
                <Text strong>Fecha</Text>
                  <RangePicker showTime />
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div style={style}>
                <Text strong>Variable</Text>
                  <Select
                      showSearch
                      style={{ width: 413 }}
                      placeholder="Seleccionar variable"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      options={[
                        {
                          value: '1',
                          label: 'Estacion 1',
                        },
                        {
                          value: '2',
                          label: 'Estacion 2',
                        },
                        {
                          value: '3',
                          label: 'Estacion 3',
                        },
                        {
                          value: '4',
                          label: 'Estacion 4',
                        },
                        {
                          value: '5',
                          label: 'Estacion 5',
                        },
                        {
                          value: '6',
                          label: 'Estacion 6',
                        },
                      ]}
                    />
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div style={style}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="primary" shape="round" size="middle" style={{ width: '180px', height: '45px' }}>
                  Generar Reporte
                  </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </Col>
    </Row>
  </>
);

export default Parameters;
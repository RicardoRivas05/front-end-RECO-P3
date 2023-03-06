import { DownloadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Divider, Table } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

const { Dragger } = Upload;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: { file: UploadFile; fileList: UploadFile[] }) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: React.DragEvent<HTMLDivElement>) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export const Report = () => (
  <div className="site-layout-content">
    <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Ingreso de datos</h1>

    <Divider>Seleccione y carga el archivo en el siguiente espacio en formato .csv:</Divider>
    <br />
    <Dragger {...props} style={{ width: '90%', height: 150, margin: 'auto' }}>
      <p className="ant-upload-drag-icon">
        <DownloadOutlined />
      </p>
      <p className="ant-upload-text">Cargar el archivo .csv</p>
    </Dragger>
    <br />
    <Table style={{ width: '90%', margin: 'auto' }} columns={columns} dataSource={data} size="middle" />
  </div>
);

export default Report;
